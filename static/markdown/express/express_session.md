# Expressでセッションを利用する

Expressでセッション管理するためには[express-session](https://github.com/expressjs/session)というミドルウェアを使います。セッションはデフォルトではメモリに保存されますが、外部パッケージを利用することでRedisやMongoDBに保存先を変更することができます。  
  
また、本ページのexpress-sessionnのサンプルコードを[Github](https://github.com/irisAsh/express-session-tutorial)においていますのでご参考ください。  

<h2 id="express-session">express-sessionの設定</h2>

先ずはインストールです。`yarn`でパッケージをインストールします。  

```shell.prettyprint
$ yarn add express-session
```

インストールしたら、express-sessionを設定する実装をしましょう。`app.js`を編集します。  

```app.js.prettyprint
// app.js

var logger = require('morgan');
var session = require("express-session"); // 追加
...

app.use(express.static(path.join(__dirname, 'public')));

// 追加
app.use(session({
  secret: "secret word",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000
  }
}));
```

`session({ オプション })`でexpress-sessionの設定をします。簡単にですがオプションの説明をしておきます。  

<h3 id="secret">secret</h3>

クッキーに保存するセッションIDを署名するために使用される秘密ワードです。文字列または配列を設定できます。  
配列を設定した場合は署名時には配列の最初の文字列をしようし、署名検証には配列のすべての文字列が考慮されます。  

<h3 id="resave">resave</h3>

セッションをセッションストアに強制的に保存するかどうかの設定です。（`true`にするとセッションの変更なしでも保存されます）  
通常は`false`で良いです。  

<h3 id="saveUninitialized">saveUninitialized</h3>

初期化されていないセッションを強制的に保存するかどうかの設定です。  
通常は`false`で良いです。  

<h3 id="cookie">cookie</h3>

セッションIDのクッキーの設定を指定できます。ここでは`maxAge`(ミリ秒)でクッキーの保存期間を１分に設定しています。  

<h2 id="how-to-use-session">セッションの使い方</h2>

下図のようにページを訪れた回数をセッションを使って表示します。  

<img src="images/express/express_session/home_page.png" alt="Home画面" title="Home画面" style="max-height:400px;">

実装は下記のようになります。  

```routes/index.js.prettyprint
// routes/index.js

router.get('/', function(req, res, next) {
  var session = req.session;
  if (!!session.visitCount) {
    session.visitCount += 1;
  } else {
    session.visitCount = 1;
  }
  res.render('index', { visitCount: session.visitCount });
});
```

express-sessionを設定したことにより、`req.session`からセッションを取得することができます。ここでは訪問回数は`visitCount`に保存するようにし、初期値があれば１回分カウント、なければ１を設定するようにしています。  
  
実際に画面を開くと、画面を更新する度に訪問回数が増えていくのが確認できます。また、今回はセッションの設定で保存時間を１分に設定しているので１分以上経ってから画面を更新すると訪問回数が１回に戻るようになっています。  

<img src="images/express/express_session/visit_five_times.png" alt="訪問回数" title="訪問回数" style="max-height:400px;">

<h2 id="connect-mongo">MongoDBでセッションを管理する</h2>

セッションの格納先をメモリ上からMongoDBに変更してみましょう。MongoDBと連携するパッケージはいくつかありますが、ここでは[connect-mongo](https://github.com/jdesboeufs/connect-mongo)を使ってみます。  
  
また、MongoDBのインストールや使い方は以下を参考にしてください。  

- [Express入門（MongoDBの利用）](https://irisash.github.io/github-pages/express/mongodb/)
- [Express入門（Mongooseの利用）](https://irisash.github.io/github-pages/express/mongoose/)

**インストール**

```shell.prettyprint
$ yarn add connect-mongo
```

**実装**

```app.js.prettyprint
// app.js
...
var session = require("express-session");
var MongoStore = require('connect-mongo')(session); // 追加
...

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "secret word",
  resave: false,
  saveUninitialized: false,
  // 変更
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/express-sesstion-tutorial',
    ttl: 60
  })
}));
```

sessionの`store`オプションにセッションの格納先を指定をすることができます。  
  
`require('connect-mongo')(session)`でExpressとconnect-mongoの連携を行い、`store`オプションに指定します。  
  
connect-mongoのオプションには`url`にMongoDBのURLを指定する必要があります。
また、セッションの保存期間には`ttl`オプション（単位は秒）を使います。これはMongoDBのTTLインデックスを利用しています。TTLは指定した時間を過ぎると自動的にデータを削除するMongoDBの機能です。  
  

**確認**

先程と同様に訪問回数を確認してください。また、MongoDBコンソールでデータの中身を確認してみると実際にセッションか保存されていることがわかります。  
`sessions`コレクションにセッションが保存されています。  

```shell.prettyprint
$ mongo
...

> use express-sesstion-tutorial
sessions
> db.sessions.find()
{ "_id" : "Z9rKh7pJnj1cM6SCxkz2ZCMUEeFuAqxL", "expires" : ISODate("2019-04-21T15:12:49.411Z"), "session" : "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"visitCount\":2}" }
```

<h2 id="connect-redis">Redisでセッションを管理する</h2>

MongoDBの時と同様にRedisを使ってセッション管理ができるようにしてみましょう。  
  
Redisと連携するパッケージ[connect-redis](https://github.com/tj/connect-redis)を使って実装します。  
  
また、Redis自体の使い方については[Redisの環境設定](https://irisash.github.io/github-pages/redis/setup/)をご参考ください。  
  

**インストール**

```shell.prettyprint
$ yarn add connect-redis
```

**実装**

```app.js.prettyprint
// app.js

var session = require("express-session");
// 追加
var RedisStore = require('connect-redis')(session);
...

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "secret word",
  resave: false,
  saveUninitialized: false,
  // 追加
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379,
    prefix: 'session-tutorial:',
    ttl: 60
  })
}));
```

Expressとconnect-redisの連携は`require('connect-mongo')(session)`で設定します。そして`express-session`の`store`オプションにRedisを指定します。  
また、`connect-redis`のオプションについてですが、`host`と`port`オプションはRedisの場所を指定します。初期設定はホストが`127.0.0.1`で、ポートが`6379`です。  
`prefix`はRedisに保存する時のキーの接頭辞になります。上記の場合は`session-tutorial:ランダム値`の形式でキーが作成されます。  
`ttl`はセッションの保存期間で単位は秒です。  
