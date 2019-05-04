# Express サードパーティ一覧

<h2 id="body-parser">body-parser</h2>

リクエストボディからパラメータを解析することができます。body-parserを利用すると`req.body`というようにリクエストクラスのプロパティとしてリクエストボディの値を取得できます。  

**公式サイト**

- [body-parser](https://github.com/expressjs/body-parser)

**使用例**

- [Express入門（MongoDBの利用）](https://irisash.github.io/github-pages/express/mongodb/)

<h2 id="method-override">method-override</h2>

HTMLフォームではDELETやPUTなどを送信することができません。method-overrideを利用すると、POSTリクエストのパラメータに`_method=DELETE`を付与することで、POSTリクエストをDELETEリクエストとして受け取るようにすることができます。

**公式サイト**

- [method-override](https://github.com/expressjs/method-override)

**使用例**

- [Express入門（MongoDBの利用）](https://irisash.github.io/github-pages/express/mongodb/)

<h2 id="express-session">express-session</h2>

セッション管理を利用するためのサードパーティミドルウェアです。初期設定ではメモリ上にセッションを格納しますが、外部パッケージを利用することでMongoDBやRedisへ保存先変更も容易にできます。  

**公式サイト**

- [express-session](https://github.com/expressjs/session)

**使用例**

- [Expressでセッションを利用する](https://irisash.github.io/github-pages/express/express_session/)

