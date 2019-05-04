# ExpressでBasic認証を実装する

Basic認証は認証方式の１つで最も簡潔で基本的な認証で、セキュリティ面では弱い部分を持ちますが、手軽に実装でき多くの環境で利用できる点で有用な認証の１つです。  
  
多くはApacheなどのアプリケーションサーバーでBasic認証を用意しますが、今回はExpressでBasic認証の設定をしてみます。  
  
実装済みのサンプルは[こちら](https://github.com/irisAsh/express-basic-auth-tutorial)のGithub上ありますのでご参照ください。  

<h2 id="basic-auth-overview">Basic認証の流れ</h2>

Basic認証の流れは以下のようになっています。

- クライアントが保護のかかったページに訪れる
- サーバーが認証を要求する
- クライアントがユーザー名とパスワードをサーバーへ送信する
- ユーザー名とパスワードが正しいことを確認しリクエストされたページの情報を返す

<h2 id="initialize-project">サンプルプロジェクトの用意</h2>

Basic認証を試すためのサンプルプロジェクトを用意します。  

```shell.prettyprint
$ express --view=pug express-basic-auth-tutorial
```

express-generatorでプロジェクトを作った後にページを３つ用意します。  

- / : ルート画面
- /tutorials : チュートリアル画面（このページにBasic認証保護をかけます）
- /about : About画面

Basic認証を試すだけですので、各画面は特に重要な実装はありません。

**ルート画面**

`/tutorials`,`/about`へのリンクとログアウトのボタンがあるだけです。  
(サンプルではテンプレートエンジンにPugを使っています。Pugの書き方がわからない方は[Pugの書き方まとめ](https://irisash.github.io/github-pages/express/pug_reference/)をご参考ください。)  

```index.pug.prettyprint
// index.pug

extends layout

block content
  h1= title
  p Welcome to #{title}
  ul
    li
      a(href='/tutorial') tutorial
    li
      a(href='/about') about
  a(href='/logout') logout
```

<img src="github-pages/images/express/basic_auth/root.png" alt="ルート画面" title="ルート画面" style="max-height:400px;">

**チュートリアル画面/About画面**

画面に「Tutorial Page」が表示されるだけです。About画面も同様です。  

```routes/tutorials.js.prettyprint
// routes/tutorials.js

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Tutorial Page');
});

module.exports = router;
```

<h2 id="return-www-authenticate">認証を要求する</h2>

さて、今の状態ではチュートリアル画面は認証なしで閲覧できる状態です。このページを表示するようにしようとすると認証が要求されるようにしましょう。  
  
そのためにはサーバーからのレスポンスで401のステータスコードを返し同時に「WWW-Authenticate」ヘッダをつけておくようにします。この「WWW-Authenticate」ヘッダが返ってくると認証のポップアップが自動で表示されます。  
  

```app.js.prettyprint
// app.js

app.use(express.static(path.join(__dirname, 'public')));

// 追加
app.use('/*', function (req, res, next) {
  if (req.originalUrl === '/about' || req.originalUrl === '/') {
    next();
  } else {
    if (false /* 認証がOKならtrue */) {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="tutorial"');
      next(createError(401));
    }
  }
});

app.use('/', indexRouter);
```

処理の説明ですが、まず`req.originalUrl`が`/`,`/about`以外は認証を通るようにしています。  
  
そして今は全て認証NGとして、NGの場合は`res.setHeader('WWW-Authenticate', 'Basic realm="tutorial"');`でヘッダに「WWW-Authenticate」を付与します。  
また`realm=????`には任意の保護領域名を設定します。これにより既に認証有効かどうかを判定できます。  
  
最後に`next(createError(401));`で401エラーを発生させます。  
  
さて、`/tutorial`にアクセスしチュートリアル画面を確認してみましょう。ユーザー名とパスワードを要求されるポップアップが表示されるようになっています。  

<img src="github-pages/images/express/basic_auth/popup.png" alt="認証ポップアップ画面" title="認証ポップアップ画面" style="max-height:400px;">

<h2 id="decode-authenticate">認証の情報を読み取る</h2>

認証ポップアップは表示されたので、ユーザー名とパスワードを入力し「Sign In」を押された後の実装をしましょう。  
クライアントから送信されたリクエストのAuthorizationヘッダにはユーザー名とパスワードの情報が含まれています。  
  
Basic認証では、ユーザ名とパスワードをコロン( : )で結合し、さらにBase64でエンコードされた情報が送信されるようになっています。従ってサーバー側ではの逆の操作を行う必要があります。  
正確にはAuthorizationヘッダの値は"Basic base64でエンコードされた文字列"となるので初めの"Basic "は省く必要があります。   
  
さて、app.jsを編集してBasic認証の実装を仕上げましょう。  

```app.js.prettyprint
// app.js

// 認証を登録したユーザーの情報
var allowedUsers = {
  "Express": "is good"
}
// 認証判定関数
var judgeAllowedUse = function(authorization) {
  // ヘッダの値が"Basic "であることを確認
  if (!authorization || !authorization.startsWith("Basic")) {
    return false;
  }
  // エンコードされた文字列を取得
  var encodedPassword = authorization.substring(6);
  // エンコードされた文字列をデコード
  var decodedPassword = Buffer(encodedPassword, 'base64').toString('binary');
  // ユーザー名とパスワードを分ける
  var colonIndex = decodedPassword.indexOf(':');
  var username = decodedPassword.slice(0, colonIndex);
  var password = decodedPassword.substring(colonIndex + 1);
  // 送信されたユーザー名とパスワードが認証登録されたものか確認
  if (!!allowedUsers[username] && allowedUsers[username] === password) {
    return true;
  } else {
    return false;
  }
}

app.use('/*', function (req, res, next) {
  if (req.originalUrl === '/about' || req.originalUrl === '/') {
    next();
  } else {
    var authorization = req.headers["authorization"] || "";
    if (judgeAllowedUse(authorization)) {
      // 認証OK
      next();
    } else {
      // 認証NG
      res.setHeader('WWW-Authenticate', 'Basic realm="tutorial"');
      next(createError(401));
    }
  }
});
```

まず、認証登録ユーザーを設定します。ここでは`allowedUsers`に`{ ユーザー名: パスワード }`の形式で保存しています。  
ただし、実際の本番環境ではコード内に含めないようにしてください。サーバー内のローカルファイルや環境変数など管理者以外が閲覧できない場所で情報を保存するようにしてください。  
  
`judgeAllowedUse`は認証を判定する関数です。引数にはAuthorizationのヘッダ値を渡すようにしています。  
関数の処理は先程説明した通りエンコード時と逆の処理をしています。送信された値が不正ならば`false`を返すようにしています。  
  
Authorizationのヘッダ値は`req.headers["authorization"]`で取得できます。  
  
以上で実装は終わりです。実際にチュートリアル画面を開いてみて登録してあるユーザー名とパスワードで認証を進めてください。チュートリアル画面が表示されれば成功です。  
  

<h2 id="logout">Basic認証のログアウト</h2>

基本的にBasic認証を行なったブラウザが閉じられれば認証情報はリセットされて、ブラウザを開き直して再度アクセスした時にまた認証が発生します。  
もし画面内からBasic認証をリセットしたい場合は、任意のアクセスで「WWW-Authenticate」ヘッダを加えて401のレスポンスを返すようにすれば可能です。  

```app.js.prettyprint
// app.js

app.use('/', indexRouter);
app.use('/tutorial', tutorialsRouter);
app.use('/about', aboutRouter);
// ログアウト処理
app.get('/logout', function (req, res) {
  res.set('WWW-Authenticate', 'Basic realm="tutorial"');
  return res.sendStatus(401);
});
```

<h2 id="use-basic-auth">basic-authを使う</h2>

さて、ヘッダーから情報をデコードする処理をしてくれるライブラリがあるので使ってみましょう。上のままで良いという方は、この実装は必要ないです。  
  
さてライブラリですが、[basic-auth](https://github.com/jshttp/basic-auth)というのがありますのでこれを使ってみましょう。  

```shell.prettyprint
$ yarn add basic-auth
```

```app.js.prettyprint
// app.js

// 追加
var basicAuth = require('basic-auth')
...

// 引数をcredentialsに変更
var judgeAllowedUse = function(credentials) {
  if (!credentials) {
    return false;
  }
  var username = credentials.name;
  var password = credentials.pass;
  var valid = true
  valid = !!allowedUsers[username] && allowedUsers[username] === password && valid;
  return valid;
}

app.use('/*', function (req, res, next) {
  if (req.originalUrl === '/about' || req.originalUrl === '/') {
    next();
  } else {
    // 変更
    var credentials = basicAuth(req);
    if (judgeAllowedUse(credentials)) {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="tutorial"');
      next(createError(401));
    }
  }
});
```

ライブラリにリクエスト値を渡す(`basicAuth(req);`)とユーザー名とパスワードをもつオブジェクトを返してくれます。あとは先程と同じで判定関数で認証登録済みかを確認するだけです。  
ライブラリを使うと少しだけ実装が楽になります。  
