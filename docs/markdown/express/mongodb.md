# ExpressでMongoDBを使う

Expressでデーターベースを使ってデータ管理をします。データベースといえばオープンソースではPostgreSQLやMySQL、商用ではOracle Database、Microsoft SQL ServerなどのRDB(リレーショナルデータベース)が一般的に利用されています。
しかし、ここではNoSQLと呼ばれるデータベースの１つMongoDBを使っていきます。MongoDBを使うメリットとしては、「大量のデータを高速で扱うことができる（扱うデータの構造には依ります）」「スキーマレスなデータ（ログ、スキーマ構造の変更が多いデータなど）をJSONで扱うことができる」などです。JSON形式でデータを扱えるのでJavascriptとも親和性が良いです。
逆に、スキーマ間の複雑な関係性が必要な場合やデータ整合性を重視する場合、トランザクションを頻繁に必要とする場合はRDBの方が向いています。

<h2 id="install-mongodb">MongoDBのインストール</h2>

MacOSでのインストールを説明します。その他の環境では[公式サイト](https://www.mongodb.com/download-center/community)等を参照ください。
説明といっても[Homebrew](https://brew.sh/index_ja)を使うとワンライナーで済みます。
下記のコマンドを実行するだけです。

```
$ brew install mongodb
```

次のコマンドでインストールの確認ができます。MongoDBのバージョンが確認できればインストール完了です。

```
$ mongo                     
MongoDB shell version v4.0.3
```

MongoDBの起動は次のコマンドで起動できます。

```
$ mongod
```

設定ファイルを参照しない場合はデフォルトで`/data`以下にデータが作成されていきます。変更する場合は`--dbpath パス`で指定できます。また、ログファイルの出力先も`--logpath パス`で変更できます。
Homebrewを使ってMongoDBをインストールした場合は`/usr/local/etc/mongod.conf`に設定ファイルが作成されています。この設定ファイルを使ってデータとログの書き込み先を変更する場合は下記のように起動時に`--config`オプションを使います。

```
$ mongod --config /usr/local/etc/mongod.conf
```

MongoDBをコンソール上で操作する場合はMongoDB起動後に`mongo`コマンドを実行するとコンソールが立ち上がります。下記では`use DB名`コマンドを使ってDBを作成しています。他DBに切り替える時もこのコマンドを使います。コンソールから抜ける時は`quite()`を使います。

```
$ mongo
MongoDB shell version v4.0.3
connecting to: mongodb://127.0.0.1:27017
...
...
>
> use express-todo-tutorial
switched to db express-todo-tutorial
> quite()

```

<h2 id="mongodb-nodejs-driver">MongoDB Node.JS Driverを使う</h2>

Node.jsでMongoDBを扱うためのライブラリがあります。[MongoDB Node.JS Driver](http://mongodb.github.io/node-mongodb-native/)や[Mongoose](https://mongoosejs.com/)が有名です。  
  
それぞれの特徴を比較してみると、MongoDB Driverはより高速に処理を行うことができます。しかし、ライブラリ自体にスキーマ構造を作成するような機能はないので、もし必要な場合は自前で用意する必要があります。単にDBへ読み描きするだけであればMongoDB Driverを使うのが良いでしょう。  
  
対してMongooseの方は扱う上でスキーマの構造を定義するので、MVCモデルでWebアプリを作成するのであればMongooseを使う方が後々楽になります。  
  
ここではMongoDB Driverの使い方を説明します。Mongooseの使い方は次回説明していきます。  

### インストール

プロジェクトフォルダのトップに移って下記のコマンドを実行しましょう。これだけでライブラリのインストールは完了です。

```
$ yarn add bson-ext kerberos node-gyp mongodb
```

### 接続確認

`app.js`でMongoDBの接続確認を行う処理を追加しましょう。


```app.js.prettyprint
// app.js

var app = express();
 
// 以下を追加
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
  'mongodb://127.0.0.1:27017/express-todo-tutorial',
  { useNewUrlParser: true },
  function(err, client) {
    console.log("Connected successfully to DB");
    client.close();
  }
);

```
 
ブラウザからlocalhostにアクセスして、Nodeサーバー上で「Connected successfully to DB」が出力されていれば成功です。（アプリ起動前には`mongod`でMongoDBを起動しておく事を忘れないでください。）  
  
コードの説明ですが、`require('mongodb').MongoClient`でMongoDBのクライアントクラスをロードしています。  
`MongoClient`の`connect`を使って実際にMongoDBにアクセスします。  
第１引数には、接続先のMongoDBのURLを指定します。デフォルトのままであれば`mongodb://127.0.0.1:27017/スキーマ名`でアクセスできます。  
第２引数にはオプションを指定します。ここでは`{useNewUrlParser true}`を指定して新しいURL解析を利用するようにしています。今後のMongoDBの接続URL形式更新に伴い指定する必要があります。指定しない場合は以下のような警告が表示されます。  

```
(node:32386) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
```

そして`connect`の第３引数には接続後に実行されるコールバックを指定します。今回は接続確認なのでログ出力後に接続を切断する処理を書いています。  

<h2 id="select-mongodb">MongoDBからデータ数を取得する</h2>

MongoDBからデータを取得し、TODOの件数を画面に表示します。表示内容の詳細については[Expressのルーティングの設定](https://irisash.com/express/editrouting/)をご参照ください。  

### DBアクセス部品の作成

MongoDBにアクセスする処理はデータ取得以外にも追加や削除などでも度々行うので、共通化して部品にしておきましょう。プロジェクト直下に`lib`フォルダを作成して、`constants.js`, `dbUtils.js`を用意しましょう。  

**フォルダ構造**

```
.
├── app.js
├── bin
│   └── www
├── controllers
│   ├── homeController.js
│   └── todoController.js
└── lib
    ├── constants.js
    └── dbUtils.js
```

**constants.js**

アプリケーション定数の定義をまとめておくために`constants.js`を用意しています。  
[Object.freeze()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)を使うとオブジェクトの値変更などを禁止してくれます。  

```lib/constants.js.prettyprint
// lib/constants.js

module.exports = Object.freeze({
  DB_URL: 'mongodb://127.0.0.1:27017/',
  DB_NAME: 'express-todo-tutorial'
});
```

**dbUtils.js**

```lib/dbUtils.js.prettyprint
// lib/dbUtils.js

var constants = require('./constants');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

exports.connectionToDB = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(
      constants.DB_URL + constants.DB_NAME,
      { useNewUrlParser: true },
      function(error, client) {
        if (error) {
          reject(error);
        } else {
          var db = client.db(constants.DB_NAME);
          resolve({ client, db });
        }
      }
    );
  });
};
```

MongoDB Driverの`mongodb.MongoClient`を使ってMongoDBにアクセスします。アクセスする関数`connectionToDB`は戻り値にPromiseを返すようにしています。ExpressではDBの接続などが非同期処理になっているので、Promiseを使わないとMongoDBからデータの件数を取得を呼び出してから、画面描画を行なっても基本的には画面描画の方が先に終わるので、画面に表示される件数は0件となってしまいます。  
そこでPromiseを使ってデータが取得が完了した後に画面の描画を開始するように実装していく必要があります。  

MongoDBのアクセスについては先程の内容と同じです。接続後の処理は`client.db(constants.DB_NAME)`でDBインスタンスを取得し、接続成功時として`{ clien, db }`でMongoClientとDBのインスタンを返すようにしています。この`db`の持つDB操作関数を使ってデータの取得などを実装できます。  

### 件数の取得

さて作成したDBアクセス部品を`controllers/homeController.js`に組み込みましょう。まずはコードから。

```controllers/homeController.js.prettyprint
// controllers/homeController.js

var dbUtils = require('../lib/dbUtils');

exports.index = function(req, res) {
  var dbClient;

  var countTodos = function(db) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .countDocuments(
        function(error, count) {
          if (error) {
            reject(error);
          } else {
            resolve(count);
          }
        }
      );
    });
  }

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    return countTodos(db);
  })
  .then(function(result) {
    res.render('home/index', {
      remainingTodoCount: result,
      todayTodoCount: 2,
      completedTodoCount: 1
    });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
  .then(function() {
    if (dbClient) {
      dbClient.close();
    }
  });
};
```

まずTodoデータ全体の件数を取得する`countTodos`を定義しています。こちらもアクセス部品と同様Promiseを返すようにしています。引数ではDBインスタンスを受け取るようにし、受け取ったDBインスタンスを使って`db.collection('todos')`でTodoコレクション(`todos`と名付けました)のインスタンスを取得できます。  
そして、コレクション関数の`countDocuments`でコレクションのデータ件数が取得できます。`countDocuments`の引数には検索条件を渡すことができます。ここでは一旦全件の件数を取得するようにします。検索条件は後ほど設定します。  
  
さて、実際に処理の開始は`dbUtils.connectionToDB()`のアクセスから始まります。アクセス後に取得したDBインスタンスを使って`countTodos(db)`の呼び出しをします。`dbClient = client;`としてMongoClientを一時的に保存していますが、これは処理の最後で`dbClient.close();`としてDB接続を閉じるために保存しています。  
  
最後に取得した件数を`remainingTodoCount`の値として設定すれば件数取得の完了です。現在はデータがないので画面には0件と表示されるでしょう。  

<img src="images/express/mongodb/get_data_count.png" alt="Todo件数取得" title="Todo件数取得" style="max-height:400px;">

<h2 id="insert-mongodb">MongoDBにデータを書き込む</h2>

データ件数を取得できるようになりましたが、今のままではデータを追加できないので一覧は0件のままです。データ追加を実装して正しく件数が表示されることを確認していきましょう。  

Todoのフォーム画面は[Expressのルーティングの設定](https://irisash.com/express/editrouting/)で既に用意しています。残りは「submit」ボタンを押した後の処理の実装です。  

**routes/todo.js**

  
データの追加処理はPOSTリクエストなので`routes/todo.js`では`router.post`を使って`/create`のPOST処理を登録しましょう。  

```routes/todo.js.prettyprint
// routes/todo.js
省略
...
router.get('/create', todoController.createGet);
router.post('/create', todoController.createPost);
```

**controllers/todoController.js**

MongoDBへの接続はこれまでの通りです。先程の件数取得と異なるのはデータ追加関数の定義箇所となります。  

```controllers/todoController.js.prettyprint
// controllers/todoController.js
省略
...
exports.createPost = function(req, res) {
  var dbClient;
  var createOneTodo = function(db, data) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .insertOne(data, function(error, r) {
        if (error) {
          reject(error);
        } else {
          resolve(r);
        }
      });
    });
  };
  
  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    var { title, description, status, estimatedDate } = req.body;
    return createOneTodo(db, {
      title,
      description,
      status,
      estimatedDate: new Date(estimatedDate)
    });
  })
  .then(function(result) {
    res.redirect('/todo');
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
  .then(function() {
    if (dbClient) {
      dbClient.close();
    }
  });
};
```

データ追加関数`createOneTodo`はDBインスタンスと挿入データとしています。データを1件追加にはコレクションの関数`insertOne`を利用します。第１引数に挿入データを第２引数には追加後のコールバックです。コールバックには追加した結果が渡されます。追加の成功件数や追加データなどが参照できます。ここではPromiseで結果情報を参照できるようにしていますが特には使用していません。  
  
また、POSTリクエストで渡されたデータは`req.body`から参照することができます。`createOneTodo`に渡すデータは`req.body`から拾って、適宜加工してから渡します。  
  
最後にPOST処理なのでデータ登録完了後は`res.redirect('/todo');`でTodoの一覧画面にリダイレクトしておきましょう。  

さて、実際にTodoを追加してみましょう。追加して行く度に「残りのTODO」の件数がカウントされていくのが確認できます。  

<h2 id="find-mongodb">MongoDBでデータ詳細を取得する</h2>

データ追加ができるようになりました。今度は「残りのTODO」の一覧画面にTODOの詳細が表示されるようにしましょう。  

**controllers/todoController.js**

```controllers/todoController.js.prettyprint
// controllers/todoController.js
省略
...
exports.index = function(req, res, next) {
  var dbClient;

  var getTodos = function(db) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .find({})
      .toArray(function(error, docs) {
        if (error) {
          reject(error);
        } else {
          resolve(docs);
        }
      });
    });
  }

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
   dbClient = client;
   return getTodos(db);
  })
  .then(function(result) {
    res.render('todo/index', {
      todos: result
    });
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  })
  .then(function() {
    if (dbClient) {
      dbClient.close();
    }
  });
};
```

データ検索はコレクションの`find`関数でできます。引数には検索条件を設定します。空オブジェクトを指定あるいは何も指定しない場合は全件検索になります。検索後は検索結果をそのままビュー側に渡しています。  
  
「残りのTODO」を取得する場合は検索条件を指定する必要がありますが、ここでは一旦全件検索しておきます。検索条件は後で設定します。  

**views/todo/index.pug**
[Expressのルーティングの設定](https://irisash.com/express/editrouting/)では、画面は固定の文字を表示していたので、データの中身を表示するように編集しましょう。

```views/todo/index.pug.prettyprint
// views/todo/index.pug
省略
...
  h1 残りのTODO
  if !!todos
    ul
      each todo in todos
        li
        p #{todo.title}
        p #{todo.description}
        p #{todo.status}
        p #{todo.estimatedDate}
        p
          | [
          a(href='') 編集
          | ]
        p
  	  | [
  	  a(href='') 削除
  	  | ]
```

追加画面で登録した内容が表示されれば成功です。  

<img src="images/express/mongodb/get_todo_list.png" alt="Todo件数取得" title="Todo件数取得" style="max-height:400px;">

<h2 id="where-mongodb">MongoDBで検索条件を指定する</h2>

さて、データ取得・追加まで一通りできるようになりました。次は検索条件を指定して必要とするデータのみ取得するようにしてみましょう。  
検索条件は様々な箇所で使い回しをする可能性があるので、クエリ作成の処理は共通化しておきましょう。lib配下に`todoQueries.js`を作成します。  

### 詳細画面に検索条件を追加する

**lib/todoQueries.js**

```lib/todoQueries.js.prettyprint
// lib/todoQueries.js

exports.completed = function() {
  return { status: { $eq: 'completed' } };
};
exports.notCompleted = function() {
  return { status: { $ne: 'completed' } };
};
exports.today = function() {
  var now = new Date();
  var start = new Date(new Date(now).setHours(0,0,0,0));
  var end = new Date(new Date(now).setHours(23,59,59,999));
  return {
    estimatedDate: {
      $gte: start,
      $lte: end
    }
  };
};
```

MongoDB Driverでは、MongoDBコンソールで扱うクエリと同様の書き方で条件を指定できます。基本的に条件は`{ プロパティ: 値 }`の形式か`{ プロパティ: { 比較文字: 値 } }`の形式で指定できます。以下に一部ですが比較文字の一覧を記載しておきます。  

| 比較文字 | 詳細 |
| -------- | ---- |
| $eq | 値と同値のデータを条件に検索します |
| $nq | 値と異なるデータを条件に検索します |
| $gt | 値より大きいデータを条件に検索します |
| $gte | 値と同値または値より大きいデータを条件に検索します |
| $lt | 値より小さいデータを条件に検索します |
| $lte | 値と同値または値より小さいデータを条件に検索します |

  
「残りのTODO」を検索する条件はステータスが`completed`でないとするので、その条件`{ status: { $ne: 'completed' } }`を返す`notCompleted`関数を定義しています。  
同様に「今日のTODO」の条件として`today`関数を、「完了済TODO」の条件として`completed`関数をそれぞれ用意しています。  

**controllers/todoController.js**

条件作成部品は用意できたので、実際に検索時に条件を指定してみましょう。  

```controllers/todoController.js.prettyprint
// controllers/todoController.js
省略
...
// クエリ作成部品をインポート
var todoQueries = require('../lib/todoQueries');

// 変更
var getTodos = function(db, condition) {
  return new Promise(function(resolve, reject) {
    db.collection('todos')
    .find(condition)
    .toArray(function(error, docs) {
      if (error) {
        reject(error);
      } else {
        resolve(docs);
      }
    });
  });
}

exports.index = function(req, res, next) {
  var dbClient;

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    // 変更
    return getTodos(db, todoQueries.notCompleted());
  })
  .then(function(result) {
    res.render('todo/index', {
...

```

条件検索の方法はコレクション関数`find`の引数に条件のオブジェクトを渡すことで実行できます。  
Todoを取得する関数は「残りのTODO」「今日のTODO」「完了済TODO」と使いまわせるようにファイル内でグローバルに定義し直します。さらに、第２引数には条件を指定できるようにしておきます。指定した条件を`find`関数に渡せば完了です。  
あとは、`getTodos`の呼び出し時にクエリ作成部品で指定するクエリを渡せば検索できます。  
  
データ追加でステータスが`completed`とそれ以外のデータを作成してみてください。`/todo`では`completed`以外のTodoしか表示されていないことが確認できます。  
  
同様にして「今日のTODO」「完了済TODO」も実装してみてください。  

### 件数一覧画面に検索条件を追加する

件数一覧画面にも検索条件を組み込みましょう。実装方法は`find`の時と同様です。`countDocuments`の関数にクエリを渡すだけです。  

```controllers/homeController.js.prettyprint
// controllers/homeController.js
省略
...
exports.index = function(req, res) {
  var dbClient;

  // 条件を設定できるように変更
  var countTodos = function(db, condition) {
    return new Promise(function(resolve, reject) {
      db.collection('todos')
      .countDocuments(
        // 条件を渡す
        condition,
        function(error, count) {
          if (error) {
            reject(error);
          } else {
            resolve(count);
          }
        }
      );
    });
  }

  dbUtils.connectionToDB()
  .then(function({ client, db }) {
    dbClient = client;
    // ３つの検索が全て終わるまで待つようにする
    return Promise.all([
      countTodos(db, todoQueries.notCompleted()),
      countTodos(db, todoQueries.today()),
      countTodos(db, todoQueries.completed()),
    ]);
  })
  .then(function(result) {
    res.render('home/index', {
      // 取得した件数をそれぞれ設定
      remainingTodoCount: result[0],
      todayTodoCount: result[1],
      completedTodoCount: result[2]
    });
  })
...

```

`countTodos`の変更は先程の`getTodos`と同様です。注意するのは`countTodos`を呼び出す際に３つの検索が全て終わってから、次の画面描画処理に移るようにしないといけないことです。  
そこで`Promise.all`を使ってこれを実装しています。`all`には実行するPromiseの配列を指定します。すると実行結果として指定したPromiseの結果が配列で取得できます（結果の配列の中身は`all`で渡したPromiseの順で返ってきます）  
  
`/home`の件数が期待どうりに取得できていれば成功です。  

<h2 id="delete-mongodb">MongoDBでデータを削除する</h2>
<h2 id="update-mongodb">MongoDBでデータを更新する</h2>
