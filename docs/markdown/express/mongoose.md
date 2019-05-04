# Express入門（Mongooseの利用）

[Express入門（MongoDBの利用）](https://irisash.github.io/github-pages/express/mongodb/)ではMongoDB Node.js Driverを使ったTodoの検索・作成・削除を説明しましたが、今回はNode.js用のMongoDBライブラリ[Mongoose](https://mongoosejs.com)の使い方を説明していきます。  
  

<h2 id="mongodb-install">MongoDBのインストール</h2>

MongoDB自体のインストールは[Express入門（MongoDBの利用）](https://irisash.github.io/github-pages/express/mongodb/)の「MongoDBのインストール」と同様なのでそちらの方をご参照ください。  

<h2 id="mongoose-install">Mongooseのインストール</h2>

TodoアプリにMongooseを組み込みますが、プロジェクトのテンプレートを[こちら](https://github.com/irisAsh/express-todo-tutorial/tree/initial-template)に用意していますので、こちらの状態から実装を始めていきます。  
また、完成済は[こちら](https://github.com/irisAsh/express-todo-tutorial/tree/tutorial-ver-mongoose)にあります。  
  
さて、Mongooseのインストールですが次のコマンド１つで完了です。  

```
$ yarn add mongoose
```

<h2 id="mongoose-connection">Mongooseで接続確認をする</h2>

アプリ起動時にMongoDBへの接続を確認するようにしておきましょう。  
`app.js`に次のコードを追加してください。  

```app.js.prettyprint
// app.js

// DB connection
var mongoose = require('mongoose');
var constants = require('./lib/constants');
mongoose.connect(constants.DB_URL + constants.DB_NAME, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
```

`lib/constants.js`にはMongoDBのURLとDB名を定義しています。本番環境など切り替えできるように別ファイルで定義しておくのが良いでしょう。  

```lib/constants.js.prettyprint
module.exports = Object.freeze({
  DB_URL: 'mongodb://127.0.0.1:27017/',
  DB_NAME: 'express-todo-tutorial'
});
```

<h2 id="mongoose-scheme">Mongooseでモデル作成</h2>

MongooseではMongoDB Driverと違って、モデルを定義する必要があります。Schemeクラスを使うことで実装できます。  
以下がTodoモデルの構造定義になります。  

```models/todo.js.prettyprint
// models/todo.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: String,
  description: String,
  status: String,
  estimatedDate: Date
});

module.exports = mongoose.model('Todo', TodoSchema);
```

Schemeを生成する際の引数にTodoのカラム定義を指定します。`カラム名: 型名`の形式で設定します。型名の一覧は下記の通りになります。  
  
- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map

<h2 id="mongoose-count">Mongooseでデータ数を取得する</h2>

Mongooseを使ってTodoの件数を取得してみます。サンプルでは以下のような画面になります。  

<img src="images/express/mongoose/home_page.png" alt="Todo件数取得" title="Todo件数取得" style="max-height:400px;">

先程定義したModelは`var Todo = require('../models/todo');`で読み込むことができます。この`Todo`を使ってDB操作を行えます。  
  
件数取得には`countDocuments`関数を使います。条件指定には関数の引数に指定する方法と一度検索クエリを作成する方法があります。  
  
**引数に指定する方法**

```js.prettyprint
Todo.countDocuments(検索条件, コールバック)
```

検索条件は直接MongoDBコンソールで指定する形式と同様`{ カラム名: { 比較文字: 値 } }`の形式で指定します。  
また、コールバックには`function (err, count) {}`の形で検索後の処理を指定できます。  
  

**検索クエリを作成する方法**

Schemeクラスには`where`関数というクエリを作成する関数があります。クエリは比較関数を使ってチェーンすることができます。最後にチェーンで`countDocuments`関数に関数につなぐことができます。  
比較関数は基本的にMongoDBの比較文字と同じ名称です。詳細は[公式の一覧](https://mongoosejs.com/docs/api.html#Query)を参照ください。  

```js.prettyprint
Todo
  .where('カラム名').比較関数(検索値)
  .where('カラム名').比較関数(検索値)
  ...
  .countDocuments(コールバック)
```

**Promiseを使う**

また、コールバックではなくPromiseを利用して後続処理を実装できます。検索処理でPromiseを受け取るには`exec`関数を使います。  

```js.prettyprint
Todo
  ...
  .countDocuments()
  .exec()
```

さて実際に`controllers/homeController.js`にTodoの件数を取得するコードを追加しましょう。  
ここでは先程説明した`where`を使う方法で検索し、後続処理をPromiseを使って実装しています。`Promise.all`で３種類の検索が全て終了した後に描画処理を行うようにしています。  

```controllers/homeController.js.prettyprint
// controllers/homeController.js

var Todo = require('../models/todo');

exports.index = function(req, res) {
  var now = Date();
  Promise.all([
    Todo.where('status').ne('completed').countDocuments().exec(),
    Todo.where('estimatedDate')
      .gte(new Date(now).setHours(0,0,0,0))
      .lte(new Date(now).setHours(23,59,59,999))
      .countDocuments().exec(),
    Todo.where('status').equals('completed').countDocuments().exec()
  ])
  .then(function(result) {
    res.render('home/index', {
      remainingTodoCount: result[0],
      todayTodoCount: result[1],
      completedTodoCount: result[2]
    });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
```

<h2 id="mongoose-query">MongooseでQueryHelperを利用する</h2>

検索条件を指定してTodoの件数を取得することができました。残りのTodoなど指定した検索条件は他箇所でも使うことがあるので、TodoモデルのQueryHelperを利用して、関数１つで検索条件を指定できるようにしましょう。  
  
モデルのQueryHelperの定義は`Schemeクラス.query.関数名`で定義できます。下記のようにクエリ定義を追加してください。  

```models/todo.js.prettyprint
// models/todo.js

// Query ============================================
TodoSchema.query.queryNotCompleted = function() {
  return this.where('status').ne('completed');
}
TodoSchema.query.queryToday = function() {
  var now = Date();
  return this
    .where('estimatedDate')
    .gte(new Date(now).setHours(0,0,0,0))
    .lte(new Date(now).setHours(23,59,59,999))
}
TodoSchema.query.queryCompleted = function() {
  return this.where('status').equals('completed');
}

module.exports = mongoose.model('Todo', TodoSchema);
```

さて、定義したクエリを使ってみましょう。下記のように`homeController.js`を編集します。  

```controllers/homeController.js.prettyprint
// controllers/homeController.js

exports.index = function(req, res) {
  Promise.all([
    Todo.countDocuments().queryNotCompleted().exec(),
    Todo.countDocuments().queryToday().exec(),
    Todo.countDocuments().queryCompleted().exec()
  ])
  .then(function(result) {
  ...
```

同様にTodoの一覧を取得する画面でも定義したクエリ関数を使ってみましょう。件数取得と同様にクエリを指定します。一覧取得には`find`関数を使うだけです。  

```controllers/todoController.js.prettyprint
// controllers/todoController.js

exports.index = function(req, res, next) {
  Todo.find().queryNotCompleted().exec()
  .then(function(todos) {
    res.render('todo/index', {
      todos: todos,
      date2Str: dateUtils.date2Str
    });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};

```

コード的にもみやすくなります。このようによく使う検索はモデルのQueryHelperにしておくと良いでしょう。

<h2 id="mongoose-insert">Mongooseで登録処理をする</h2>

Mongooseを使ってTodoを登録する処理を作りましょう。プロジェクトのテンプレートに用意してあるフォーム画面に登録処理を組み込みます。  
  
<img src="images/express/mongoose/form_page.png" alt="Form画面" title="Form画面" style="max-height:400px;">
  
POST処理を受け取ると`todoController.js`の`createPost`へ処理が走るようになっています。`createPost`にMongooseの登録処理を追加しましょう。  
追加処理はモデルの`create`関数を使います。使い方ですが引数に登録するTodoデータの値を指定するだけです。登録後の処理は検索時と同じように、引数にコールバックを指定するか、コールバックを指定しない場合は`create`関数がPromiseを返すのでPromiseを使って後続処理を実装できます。  

```controllers/todoController.js.prettyprint
// controllers/todoController.js

exports.createPost = function(req, res) {
  var { title, description, status, estimatedDate } = req.body;
  Todo.create({
    title,
    description,
    status,
    estimatedDate
  })
  .then(function(result) {
    res.redirect('/todo');
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
```

<h2 id="mongoose-delete">Mongooseで削除処理をする</h2>

続いてはTodoの削除処理です。一覧画面の削除ボタンは`/todo/TodoのID`へDeleteリクエストを飛ばすようになっています。  
コントローラーではURLのIDから削除対象のTodoを探し、そして削除する必要があります。  
方法は２通りでモデル関数の`deleteOne(検索条件)`を使って検索条件に一致するデータを１つ削除する方法か、一度`findOne(検索条件)`などで対象を１つ取得してからTodoインスタンスの`remove`を使うかがあります。  

**deleteOneを使った場合**

```controllers/todoController.js.prettyprint
// controllers/todoController.js

exports.delete = function(req, res) {
  var { id } = req.params;
  Todo.deleteOne({ _id: id })
  .then(function(result) {
  ...
```

**removeを使った場合**

```controllers/todoController.js.prettyprint
// controllers/todoController.js

exports.delete = function(req, res, next) {
  var { id } = req.params;
  Todo.findOne({ _id: id })
  .then(function(result) {
    if (!result) {
      throw new Error('削除対象が見つかりません');
    }
    return result.remove();
  })
  .then(function(result) {
    res.redirect('/todo');
  })
  ...
```

<h2 id="mongoose-update">Mongooseで更新処理をする</h2>

更新処理の前に編集フォーム画面に表示するTodoのデータを取得する必要がある。  
データ取得は`findOne`関数を使ってできます。  

```controllers/todoController.js.prettyprint
// controllers/todoController.js

exports.updateGet = function(req, res, next) {
  res.render('todo/update', { todo: {} });
  var { id } = req.params;
  Todo.findOne({ _id: id })
  .then(function(result) {
    if (!result) {
      throw new Error('削除対象が見つかりません');
    }
    res.render('todo/update', { todo: result });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
};
```

さてデータは取得できていますが、フォーム画面では`datetime-local`のINPUTタグを使っているので日付の形式を`YYYY-MM-DDThh:mm:ss`に変換する必要があります。  
そこでモデルのVirtualsを利用して、Todoに変換されたestimatedDateを取得できるプロパティを作成しましょう。  
プロパティ名は`estimatedDateISOS`として用意し、下記のようにView側で使えるようにします。  

```views/todo/form.pug.prettyprint
// views/todo/form.pug

div
  label(for='estimatedDate') 予定時刻：
  input#estimatedDate(
    type='datetime-local'
    name='estimatedDate'
    value=todo.estimatedDateISOS
  )
```

モデルに`todo.estimatedDateISOS`を定義しましょう。`Schemeクラス.virtual('プロパティ名').get(function() {})`の形で定義します。  

```models/todo.js.prettyprint
// models/todo.js

// Virtuals =========================================
TodoSchema.virtual('estimatedDateISOS').get(function () {
  return dateUtils.date2ISOS(this.estimatedDate);
});

module.exports = mongoose.model('Todo', TodoSchema);
```

<h2 id="mongoose-summary">まとめ</h2>

以上がTodoアプリの簡単な実装となります。MongoDB Driverと違ってMongooseではモデル定義ができるのでDB操作は簡潔に書くことができます。説明はMongooseの一部なので、より高度な機能を扱う場合は適宜Mongooseの[公式サイト](https://mongoosejs.com/)を確認しましょう。  
