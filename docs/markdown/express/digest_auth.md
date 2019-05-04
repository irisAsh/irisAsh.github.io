# ExpressでDigest認証を実装する

[ExpressでBasic認証を実装する](https://irisash.github.io/github-pages/express/basic_auth/)でBasic認証の仕組みをみました。そこで分かるのは、送信される情報の値を取得できれば、Base64でデコードするだけでパスワードを解読できてしまうということです。  
  
そこでクライアントから送信するパスワードはハッシュ化して、またサーバー側でも登録しているパスワードをハッシュ化し、それぞれの値を照合することで認可する方法が考案されました。これがDigest認証です。  
  
Digest認証のアルゴリズムや詳細については記事最後の参考サイトをご参考ください。今回の実装もそちらのサイトを参考に作成しました。実装済みのサンプルは[Github](https://github.com/irisAsh/express-digest-auth-tutorial)においていますのでご参考ください。  
  
<h2 id="initialize-project">実装準備</h2>

プロジェクトのテンプレートを[こちら](https://github.com/irisAsh/express-digest-auth-tutorial/tree/project-template)に置いています。認証を組み込むプロジェクトがない場合はこちらを活用ください。  
  
実装目標はサンプルの`/tutorial`ページにDigest認証を設定とします。  
  
<img src="images/express/digest_auth/root.png" alt="ルート画面" title="ルート画面" style="max-height:400px;">
  
まずは実装に利用するパッケージをインストールします。  

**node-uuid**

WWW-Authenticateヘッダーを返す際に、ランダムな文字列(nonce)を付与する必要があります。  
今回はUUIDを生成してその値をnonceの値として利用することにしました。UUID生成パッケージとして[node-uuid](https://github.com/kelektiv/node-uuid)を使用します。  
  
```shell.prettyprint
$ yarn add uuid
```

**express-session**

照合値の算出時にランダムな文字列(nonce)やリクエスト回数(nc)をサーバー側で保持しておく必要があります。それらの値はセッションで管理することにしました。Expressでセッションを管理するには[express-session](https://github.com/expressjs/session)を使います。  
  
`express-session`の使い方については[Expressでセッションを利用する](https://irisash.github.io/github-pages/express/express_session/)で説明しているのでご参考にしてください。  
  
```shell.prettyprint
$ yarn add express-session
```

**JavaScript-MD5**

ハッシュ化にはMD5アルゴリズムを使用します。[JavaScript-MD5](https://github.com/blueimp/JavaScript-MD5)はJavascriptでハッシュ化(MD5)するパッケージの１つです。  
  

```shell.prettyprint
$ yarn add blueimp-md5
```

<h2 id="response">Digest認証の実装</h2>

先に実装全体を記載してしまいます。  

```app.js.prettyprint
// app.js

var logger = require('morgan');
// 追加
var session = require("express-session");
var md5 = require('blueimp-md5');
var uuidv4 = require('uuid/v4');
...

// 追加
app.use(session({
  secret: "secret word",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000
  }
}));

// 登録ユーザー
var allowedUsers = {
  'Express': 'good'
};

// authorization のパラメータを分解
var parseAuthorization = function(authorization) {
  // 始めの'Digest 'を省き、', 'で分割
  var arr = authorization.substr(7).split(', ');
  var result = {};
  arr.forEach(function(param) {
    if (param.indexOf("=") < 0) {
      return;
    }
    var [key, value] = param.split("=");
    result[key] = value.replace(/"/g, '');
  });
  return result;
};

app.use('/*', function (req, res, next) {
  var session = req.session;
  // リクエスト数をカウントしセッションに残す
  if (!!session.nc) {
    session.nc += 1;
  } else {
    session.nc = 1;
  }
  if (req.originalUrl === '/about' || req.originalUrl === '/') {
    next();
  } else {
    var realm = 'tutorial';
    var method = 'GET';
    var qop = 'auth';
    var judgement = false;
    var authorization = req.get('authorization');
    if (!!authorization && !!session.nonce && !!session.nc) {
      var authParams = parseAuthorization(authorization);
      // リクエスト数が一致しているかチェック
      if (session.nc === parseInt(authParams.nc, 16)) {
        // responseを算出
        var a1 = authParams.username + ':' + realm + ':' + allowedUsers[authParams.username];
        var a2 = method + ':' + authParams.uri;
        var a1_md5 = md5(a1);
        var a2_md5 = md5(a2);
        var code = a1_md5 + ':' + session.nonce + ':' + authParams.nc + ':' + authParams.cnonce + ':' + qop + ':' + a2_md5;
        var code_md5 = md5(code);
        judgement = code_md5 === authParams.response;
      }
    }
    if (judgement) {
      // 認証OK
      next();
    } else {
      // 認証NG
      session.nonce = uuidv4();
      session.nc = 0;
      res.set({
        'WWW-Authenticate': 'Digest realm="' + realm + '", nonce="' + session.nonce + '", algorithm=MD5, qop="' + qop + '"'
      });
      next(createError(401));
    }
  }
});
```

<h2 id="response">認証要求のレスポンスを返す</h2>

クライアントが保護のかかったページに訪れた時にWWW-Authenticateヘッダーを返す必要があります。また以下の値を付与する必要があります。  
  

| key | value |
| --- | ----- |
| realm | 任意の保護領域名 |
| nonce | ランダムな文字列 |
| algorithm | MD5, MD5-sess, SHA-256, SHA-256-sess |
| qop | "auth", "auth-int" |

  
nonce の値は準備でインストールした node-uuid で生成した値を指定します。
また、algorithm には MD5 を指定します。 SHA-256 の方がセキュリティが強固になりますが、ブラウザがまだ対応していなかったため今回は MD5 にしました。  
qop は auth の場合はリクエストのメソッドから、auth-int の場合はリクエストボディを含めて照合します。  
  
実装例では下記のようなヘッダーを返すようになっています。  

```
WWW-Authenticate: Digest
  realm="tutorial",
  nonce="uuidv4で生成した文字列",
  algorithm=MD5,
  qop="auth"
```

クライアントへの返答時に、nonce の値はセッションに保存します。nonce はクライアントから同じ値が送信されますが、検証にはサーバーで発行した値を使うため保存しておく必要があります。  
  
また、クライアントのリクエスト回数(nc)もセッションに保存しておきます。クライアントからパスワードが送信される時に16進数のリクエスト回数も同時に付与されてきます。検証時にこのリクエスト回数も一致しているか確認します。  
  
<h2 id="authenticate">Digestを算出し検証する</h2>

クライアントからユーザー名とパスワードが送信されるので、送信される値から Digest の値を算出します。  

<img src="images/express/digest_auth/root.png" alt="認証画面" title="認証画面" style="max-height:400px;">

クライアントから送信される値は次のようになります。  

| key | value |
| --- | ----- |
| realm | 返答した値と同値 |
| nonce | 返答した値と同値 |
| algorithm | 返答した値と同値 |
| qop | 返答した値と同値 |
| username | ユーザー名 |
| uri | アクセスしたURI |
| nc | 16進数のリクエスト回数(8桁になるようゼロサプライされています) |
| cnonce | ランダムな文字列 |
| response | Digest値(この値をサーバ側でも算出して照合します) |

実装例では下記のような送信がされます。  

```
WWW-Authenticate: Digest
  realm="tutorial",
  nonce="uuidv4で生成した文字列",
  algorithm=MD5,
  qop="auth",
  username="Express",
  uri="/tutorial",
  nc="00000001",
  cnonce="ランダムな文字列",
  response="Digest値"
```

上記のリクエストの値は１列の文字列になっているので`parseAuthorization`で各値を分解しています。algorithm 以外の値はダブルクォートで囲まれているので注意してください。  
  
分解した値の nc はリクエスト数は16進数なので`parseInt(ncの値, 16)`で10進数に変換してからセッションで管理しているリクエスト回数が一致しているか確認しておきます。不一致の場合は再度認証要求を行いサーバーで保存しているリクエスト回数は0に初期化します。  
  
さて、残りはDigest値の算出です。流れは下記の通りです。  

- A1 = 'username:realm:password'
- A2 = 'method:uri' (method はHTTPメソッド、ここではGET)
- Digest値 = 'A1のMD5ハッシュ化:nonce:nc:cnonce:A2のMD5ハッシュ化' のMD5ハッシュ化

算出したDigest値とresponseの値が一致すれば認証OKです。  
  
実際に`/tutorial`にアクセスして認証手続きが完了すれば成功です。  
  
Digest認証の実装は以上となります。  

<h2 id="reference-links">参考サイト</h2>

- [RFC 7616 - HTTP Digest Access Authentication](https://tools.ietf.org/html/rfc7616)
- [HTTP クライアントを作ってみよう(6) - Digest 認証編 -](http://x68000.q-e-d.net/~68user/net/http-auth-2.html)
- [Digest認証のパラメータを眺めた - うならぼ](http://unarist.hatenablog.com/entry/2015/09/25/013142)
