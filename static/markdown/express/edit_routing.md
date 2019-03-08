# ルーティングの設定

ホーム画面を用意するためにルーティングを設定します。ルーティングとは、アクセスされたURIとそれに対するアプリケーションの挙動(画面の描画やデータの操作など)を決めることです。  
ここでは`/home/`というURIにアクセスした時の挙動を定義していきます。  

## homeルートの追加

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

## ミドルウェアの使用

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

## リダイレクト

最後に、[http://localhost:3000](http://localhost:3000)にアクセスされた場合はホーム画面[http://localhost:3000/home](http://localhost:3000/home)にリダイレクトするようにしましょう。  
`routes/index.js`を下記のように編集するとリダイレクトするようになります。  

```routes/index.js.prettyprint
router.get('/', function(req, res, next) {
  res.redirect('/home'); // 変更
});
```

