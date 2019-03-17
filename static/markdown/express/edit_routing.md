# Expressのルーティングの設定

ホーム画面を用意するためにルーティングを設定します。ルーティングとは、アクセスされたURIとそれに対するアプリケーションの挙動(画面の描画やデータの操作など)を決めることです。  
ここでは`/home/`というURIにアクセスした時の挙動を定義していきます。  

<h2 id="create-home-router">homeルートの追加</h2>

まずは`/home`のエンドポイント(URI)を開きます。とりあえず`/home`のアクセス時の挙動は`/`にアクセスした時の挙動と同じにしておきます。  

```app.js.prettyprint
...
app.use('/', indexRouter);
app.use('/users', usersRouter);
// 下記を追加
app.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
...
```

ファイルを保存したら、[http://localhost:3000/home](http://localhost:3000/home)にアクセスしてみましょう。[http://localhost:3000](http://localhost:3000)と同じ画面が表示されているはずです。  

<h2 id="use-middle-ware">ミドルウェアの使用</h2>

Expressのミドルウェアはいくつかの種類のミドルウェアが使用できますが、ここではルーターレベルのミドルウェアを使用します。このミドルウェアを使ってルーティング処理をモジュール化することができます。これによってルーティングを細分化して定義したり処理の共通化を行うことができます。  
今回は、`/home`および`/home`以下のURI（例えば`/home/help`や`/home/about`）の挙動を定義するモジュールを作成します。  
基本的にルーターのモジュールは`routes`フォルダ配下に作成していきます。  
まずは下記の内容で`routes/home.js`を作成してください。  

```routes/home.js.prettyprint
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

`express.Router`クラスを使ってルーターレベルのミドルウェアを利用できます。ここでは`/home`のGETリクエストを定義するため`router.get()`を使っています。第一引数には`/home`以下のパス（`/home`自信を設定するため`/`）を指定し、また第二引数には`views/index.pug`を描画する処理を指定しています。  
さて、このモジュールをメインアプリケーションに設定するため`app.js`を編集します。  

```app.js.prettyprint
...
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home'); // 追加 home.jsで定義した内容を取り込んでいます
...
app.use('/', indexRouter);
app.use('/users', usersRouter);
// 先程追加したapp.get('/homw', ...)は削除
app.use('/home', homeRouter); // 追加 /home以下の処理をhome.jsに担わせています
...
```

[http://localhost:3000/home](http://localhost:3000/home)を確認すると先程と同じ挙動になっていることが確認できます。  

<h2 id="redirect">リダイレクト</h2>

最後に、[http://localhost:3000](http://localhost:3000)にアクセスされた場合はホーム画面[http://localhost:3000/home](http://localhost:3000/home)にリダイレクトするようにしましょう。  
`routes/index.js`を下記のように編集するとリダイレクトするようになります。  

```routes/index.js.prettyprint
router.get('/', function(req, res, next) {
  res.redirect('/home'); // 変更
});
```

<h2 id="add-controller">コントローラーの作成</h2>

ルーティングファイルに処理を書いていっても良いのですが、ルーティングファイルにはアクセスパスの振分だけにしておきたいので、具体的な振る舞いはコントローラーとして分けておきましょう。  
`controllers`フォルダを、その配下に`homeController.js`を作成し、ルーティングファイルに書いた内容を`homeController.js`に移しましょう。  

```
$ mkdir controllers
$ touch controllers/homeController.js
```
```homeController.js.prettyprint
// controllers/homeController.js

exports.index = function(req, res) {
  res.render('home/index');
};

```
```home.js.prettyprint
// routes/home.js

var express = require('express');
var router = express.Router();

var homeController = require('../controllers/homeController'); // 追加

router.get('/', homeController.index); // 変更
```

<h2 id="home-page">Home画面の整形</h2>

Homeの画面をモックデータを使ってTODOアプリ用に整形しておきましょう。`render`の第２引数にオブジェクト形式でView層にデータを渡すことができます。

```homeController.js.prettyprint
exports.index = function(req, res) {
  res.render('home/index', {
    remainingTodoCount: 4,
    todayTodoCount: 2,
    completedTodoCount: 1
  });
};
```

ここではテンプレートファイルにPugを使っているので、`#{変数名}`でController層から渡された値を描画できます。Pugの詳しい使い方は[こちら](https://irisash.com/express/pug_reference/)にまとめているのでご覧ください。

```home/index.pug.prettyprint
extends ../layout

block content
  h1 TODO アプリ
  p 
    | 残りのTODO: #{remainingTaskCount} [
    a(href='') 一覧へ
    |  ]
  p
    | 今日のTODO: #{todayTaskCount} [ 
    a(href='') 一覧へ
    |  ]
  a(href='') TODOの追加
```

下のように画面が表示されます。

<img src="images/express/edit_routing/home_page.png" alt="Home画面" title="Home画面" style="max-height:400px;">
