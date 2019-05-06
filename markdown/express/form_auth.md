# ExpressでForm認証を実装する

[ExpressでBasic認証を実装する](https://irisash.github.io/express/basic_auth/)や[ExpressでDigest認証を実装する](https://irisash.github.io/express/digest_auth/)でHTTPで定義される認証方式を実装しましたが、今回は多くのWebアプリケーションで利用されているForm認証を実装してみます。  
  
実装済みのサンプルは[こちら](https://github.com/irisAsh/express-form-auth-tutorial)においていますのでご参考ください。  
  
また、前提知識としてExpressでのセッション管理とMongoDB(Mongoose)の使い方が必要となります。各々の扱い方がわからない方は下記のリンクをご参考ください。  

- [Express入門（Mongooseの利用）](https://irisash.github.io/express/mongoose/)
- [Expressでセッションを利用する](https://irisash.github.io/express/express_session/)

<h2 id="overview">Form認証の流れ</h2>

Form認証の大まかな流れは下記の通りです。  

- クライアントからユーザー名とパスワードが送信される
- ユーザー名とパスワードをDBに保存する
  ログイン時はユーザー名とパスワードに一致するデータをDBから取得）
- ユーザーの識別値（ユーザーIDなど）をセッションに保存しログイン状態にします

**クライアントからユーザー名とパスワードが送信される**

この時ユーザー名とパスワードは平文で送信されるので、通常はSSLで暗号化します。今回はSSLの実装はしないので、パスワードのハッシュ化を実装することで代替とします。  

**ユーザー名とパスワードをDBに保存する**

パスワードはそのまま保存せずハッシュ化して保存するようにします。したがってデータを参照できる管理者側もパスワード自体はわからなくなります。もし、パスワードを忘れてしまった場合は新たに作り直すような機能が必要となります。  

**ユーザーの識別値（ユーザーIDなど）をセッションに保存しログイン状態にします**

セキュリティ的にこのセッションには有効期限を付与しておく方が良いです。またアクセスする毎にセッションを発行し直すとセキュリティ面を強固にできます。  

<h2 id="create-form">Formの作成</h2>

まずはサインインを行うフォーム画面を作成します。  

<img src="images/express/form_auth/home.png" alt="Home画面" title="Home画面" style="max-height:400px;">

<img src="images/express/form_auth/signin.png" alt="SignIn画面" title="SignIn画面" style="max-height:400px;">

以下がサインイン画面のコードです。  

```views/signin.pug.prettyprint
// views/signin.pug

doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src='https://cdnjs.cloudflare.com/ajax/libs/jsSHA/2.3.1/sha512.js')
  body
    h1= title

    form(method='POST' action=/'signin')
      div
        label(for='username') username：
        input#username(
          type='text'
          name='username'
          required='true'
        )
      div
        label(for='password') password：
        input#password(
          type='password'
          name='password'
          required='true'
        )
      div
        input(type='submit' value='submit' onClick='return getHashAndSubmit();')

    script.
      var getHashAndSubmit = function() {
        try {
          var passwordSelctor = document.getElementById('password');
          var shaObj = new jsSHA("SHA-512", "TEXT")
          shaObj.update(passwordSelctor.value)
          var hash = shaObj.getHash("HEX")
          passwordSelctor.value = hash
          return true;
        } catch (_e) {
          return false;
        }
      }
```

フォーム自体は特に変わったところはありません。今回は送信時にパスワードをハッシュ化するようにしてみたので、その部分だけ説明します。  
  
CDNでハッシュ化のパッケージをインポートしています。使用したパッケージは[jsSHA](https://cdnjs.com/libraries/jsSHA)というパッケージです。  
jsSHAの使い方は`new jsSHA("SHA-512", "TEXT")`で初期化します。第１引数にSHAアルゴリズムの種類、第２引数にハッシュ化対象の指定形式を設定します。次に初期化したオブジェクトの`update`関数でハッシュ化する値を指定し、`getHash`で実際にハッシュ値を取得します。  
  
このハッシュ化を使って、送信時にパスワードをハッシュ化した上でサーバーにリクエストをするようにしています。  
  
<h2 id="signin">サインイン</h2>

さて今回の主要部であるサインインの処理を実装します。クライアントから受け取ったユーザー名とパスワードをDBに保存するだけですが、パスワードはそのまま保存せずに受け取った値をさらにハッシュ化することでセキュリティを強固にできます。  
そして各値を保存した後はユーザーの識別値をセッションに保存してユーザーがログインした状態にする必要があります。今回はMongoDBのIDをセッションに保存することでログイン状態を保つようにしていきます。  
それでは実際の処理を`routes/index.js`に組み込んでいきます。  

```routes/index.js.prettyprint
// routes/index.js

// bcryptをインポート
var bcrypt = require('bcrypt');
var saltRounds = 10;
...

router.post('/signin', function(req, res, next) {
  var { username, password } = req.body;
  // bcrypt でハッシュ化してusernameとパスワードを保存
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  User.create({
    username,
    password: hash
  })
  .then(function(result) {
    // user_idをセッションに詰める
    var session = req.session;
    session.userId = result._id;
    res.redirect('/users');
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
});
```

ハッシュ化には[bcrypt](https://github.com/kelektiv/node.bcrypt.js)を使うことにします。bcryptはいくつかあるハッシュ化アルゴリズムの中でも、ソルト値・ストレッチング回数も考慮されて算出されるためとても便利です。  
インストールは下記のコマンドを実行してください。  

```shell.prettyprint
$ yarn add bcrypt
```

使い方ですが、まず`bcrypt.genSaltSync(加工コスト)`でソルト値を取得します。加工コストは任意の数値で初期値は10です。  
次に`bcrypt.hashSync(ハッシュ化対象, ソルト値)`で実際にハッシュ化された値が取得できます。  
後はハッシュ化した値をユーザーデータに登録するだけです。  
  
登録後はセッションに登録したユーザーデータのIDを保存してユーザーページへリダイレクトしています。  
  
<img src="images/express/form_auth/user.png" alt="User画面" title="User画面" style="max-height:400px;">

`/users`の振る舞いは次のようになっています。  

```routes/users.js.prettyprint
// routes/users.js

var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var session = req.session;
  if (!!session.userId) {
    User.findOne({ _id: session.userId })
    .then(function(result) {
      if (!result) {
        throw new Error('Userが見つかりません');
      }
      res.render('user/index', {
        title: 'Success',
        user: result
      });
    })
    .catch(function(err) {
      console.log(err);
      next(err);
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
```

`/users`にアクセスするとまずセッションにIDが保存されているか確認するようになっています。IDが保存されていなければ、Home画面へリダイレクトします。  
さらに保存されているIDと一致するユーザーデータを取得し、ユーザー情報を画面に描画するようになっています。  

<h2 id="logout">ログアウト</h2>

次はログアウトです。ユーザー画面にはログアウトのボタンをおいています。  

```views/user/index.pug.prettyprint
// views/user/index.pug

doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    h1= title

    p.
      username: #{user.username}

    form(method='post' action='/logout')
      input(type='submit' value='logout')
```

ボタンを押すと`/logout`へPOSTリクエストを送信します。サーバー側では保存されているセッションの値を削除しHome画面へリダイレクトしています。セッションの値を削除することでログイン状態がなくなり、再度`/users`へアクセスしようとするとHome画面へ飛ばされます。  

```routes/index.js.prettyprint
// routes/index.js

router.post('/logout', function(req, res, next) {
  var session = req.session;
  session.userId = null;
  res.redirect('/');
});
```

<h2 id="login">ログイン</h2>

最後にログイン画面です。ログアウトした場合はセッションの有効期限が切れてログイン状態がなくなった場合にこの画面からログインできるようにします。  
  
画面はサインインと全く同様のため割愛します。Formの`action`だけ`/login`に変更するようにしてください。  
  
ログイン処理はクライアントから受け取ったユーザー名とパスワードを受け取りDBに保存されている値と照合して組み合わせが正しいか確認します。  
まずはソースコードから。  

```routes/index.js.prettyprint
// routes/index.js

router.post('/login', function(req, res, next) {
  var { username, password } = req.body;
  User.findOne({ username })
  .then(function(result) {
    if (!result) {
      throw new Error('Userが見つかりません');
    }
    if (bcrypt.compareSync(password, result.password)) {
      // user_idをセッションに詰める
      var session = req.session;
      session.userId = result._id;
      res.redirect('/users');
    } else {
      res.redirect('/login');
    }
  })
  .catch(function(err) {
    console.log(err);
    next(err);
  });
});
```

はじめに受け取ったユーザー名でユーザーデータを検索します。見つかったらユーザーデータのパスワードと送信されたパスワードが一致しているか確認します。この時DBに保存されているパスワードはハッシュ化されているので`bcrypt.compareSync(元の値, ハッシュ化された値`を使って検証します。  
パスワードが一致している場合はセッションにユーザーデータのIDを保存してユーザー画面に遷移させます。  
  
以上でForm認証の実装は完了です。  
実際にはセキュリティ面を考慮してSSLの暗号化などの工夫が必要でしょうが、Form認証の基本的な流れはここで説明した流れになります。また今回は自前でForm認証を実装しましたが、ライブラリを利用するのも良いでしょう。機会があれば当サイトでもライブラリを使った実装を紹介してみようと思います。  

<h2 id="reference-links">参考サイト</h2>

- [Basic認証とフォームによる認証についてのまとめ - Qiita](https://qiita.com/toshiya/items/e7dcc7610b15884b167e)
- [管理画面にフォーム型ログイン認証を実装する](http://webeg.info/php-course/step3-030/)
