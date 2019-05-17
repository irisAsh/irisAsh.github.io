# ExpressとPassportを使ってForm認証を作成する

[ExpressでForm認証を実装する](https://irisash.github.io/express/form_auth/)では認証を提供するライブラリなしでForm認証を実装しました。今回は[Passport](http://www.passportjs.org/)というライブラリを使ってのForm認証の実装を説明したいと思います。  
  
サンプルは[Github](https://github.com/irisAsh/express-passport-local-tutorial)においていますのでご参考にしてください。  
  
また、セッション管理に`express-session`、データベースに`mongoose`を使っています。それぞれの使い方が分からない方は以下の記事をご参照ください。  

- [Expressでセッションを利用する](https://irisash.github.io/express/express_session/)
- [Express入門（Mongooseの利用）](https://irisash.github.io/express/mongoose/)

<h2 id="install">パッケージのインストール</h2>

まずはPassportパッケージをインストールします。Passportではいくつかの種類の認証が扱えるようになっていて、それぞれの認証の用途に合わせてパッケージが用意されています。  
Form認証の場合は`passport-local`というパッケージを使用します。また、ログイン状態を保持するためにセッション管理のパッケージ`express-session`もインストールしておきます。  
  
```shell
$ yarn run passport passport-local express-session
```

<h2 id="setup">認証処理を実装する</h2>

Passportでは認証時の動作をストラテジーと呼んでいて、実装ではこのストラテジーの設定をする必要があります。先程インストールした`passport-local`はユーザーIDとパスワード(emailなどに変更可)で認証するストラテジーの雛形を提供します。  

```app.js.prettyprint
// app.js

// パッケージのインポート
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
...

app.use(express.static(path.join(__dirname, 'public')));

// ここから追加
// セッションの設定
app.use(session({
  secret: 'secret word',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000
  }
}));
// Passportの初期化
app.use(passport.initialize());
// Passportとセッション管理を連携
app.use(passport.session());
// セッションにユーザーIDを格納
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// 認証後セッションのユーザーIDからユーザー情報を取得する
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// ログイン用のストラテジー
passport.use(new LocalStrategy(
  function(username, password, done) {
    // usernameで検索
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      // ユーザー登録なし
      if (!user) {
        return done(null, false, { message: 'usernameが登録されていません。' });
      }
      // パスワードを検証
      if (user.password !== password) {
        return done(null, false, { message: 'passwordが間違っています。' });
      }
      // 認証OKならユーザー情報を返す
      return done(null, user);
    });
  }
));
// サインアップ用のストラテジー
passport.use('local-signup', new LocalStrategy(
  function(username, password, done) {
    // usernameで検索
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      // ユーザー登録済み
      if (!!user) {
        return done(null, false, { message: '既に登録されているusernameです。' });
      }
      // ユーザー登録
      User.create({
        username,
        password
      })
      .then(function(user) {
        // 完了したらユーザー情報を返す
        return done(null, user);
      })
      .catch(function(err) {
        console.log(err);
        return done(null, false, { message: '登録エラー' });
      });
    });
  }
));

app.use('/', indexRouter);
app.use('/users', usersRouter);
```

実装の内容は大体コードのコメントに記載している内容になります。少し補足の説明をしておきます。  

### ログイン状態の保存

```js.prettyprint
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
```

ここではログイン/サインアップ成功後に返されるユーザーデータからセッションにユーザーIDを格納する処理が行われます。  
セッションにユーザーIDを保存することでログイン状態を保持しています。これは[PassportなしでのForm認証](https://irisash.github.io/express/form_auth/)では自前で実装しました。  
また引数に`user.id`と指定していますが、`user`のみにしてデータ全てを格納することもできます。  

### ストラテジーの設定

```js.prettyprint
// ログイン用
passport.use(new LocalStrategy( ... );

// サインアップ用
passport.use('local-signup', new LocalStrategy( ... ));
```

`passport.use`でストラテジーの定義を行います。ログイン用とサインアップ用の２種類を定義していますが、サインアップの方では第１引数に`'local-signup'`と指定しています。これはストラテジーの識別名で、後述しますが実際にアクセスした時に実行する認証の処理をこの識別名を使って呼び出します。ログイン用のように名前を指定しない場合は`logal`が識別名になります。複数ストラテジーを用意する場合は第１引数に名前を指定するようにしてください。  

<h2 id="authentication">認証処理を指定する</h2>

さて、設定したストラテジーを使用する処理をルーティングに設定しましょう。  

```routes/index.js.prettyprint
// routes/index.js

// サインアップ処理
router.post('/signup', passport.authenticate('local-signup', 
  {
    successRedirect: '/users',
    failureRedirect: '/signup',
    session: true
  }
));

// ログイン処理
router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/users',
    failureRedirect: '/login',
    session: true
  }
));
```

ルーターのMETHOD関数のコールバックに`passport.authenticate`を指定すると、エンドポイントにアクセスした時に認証が実行されるようになります。`authenticate`の第１引数には使用するストラテジーの識別名を、第2引数には次のオプションを指定します。  

- `successRedirect`: 認証成功時のリダイレクト先。
- `failureRedirect`: 認証失敗時のリダイレクト先。
- `session`: セッション管理をするかどうか。基本はログイン状態を保持するので`true`。

<h2 id="confirm">ログイン状態の確認</h2>

ログイン後はユーザーページにリダイレクトするようにしていますが、このページは当然ログインしている状態でないと表示されないようにしないといけません。  
ログイン状態の確認は`req.isAuthenticated`でできます。Passportを導入しているとリクエストオブジェクト`req`に`isAuthenticated`の関数が定義され、この関数が利用できるようになります。  

```routes/users.js.prettyprint
// routes/users.js

router.get('/',
  function(req, res, next) {
    // ログイン状態を確認
    if (req.isAuthenticated()) {
      // OKなら次のコールバックの処理に進む
      next();
    } else {
      // NGならHome画面へリダイレクト
      res.redirect('/');
    }
  },
  function(req, res, next) {
    var session = req.session;
    res.render('user', { title: 'User page' });
  }
);
```

<h2 id="logout">ログアウト</h2>

最後にログアウトです。任意の箇所でログアウトボタンを用意し`/logout`にPOSTリクエストするようにします。  
ログアウト自体の処理は`req.logout()`を呼び出すだけです。この`logout`関数もPassportを導入することで、リクエストオブジェクトに定義される関数の１つです。  

```routes/index.js.prettyprint
// routes/index.js

router.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});
```

<h2 id="reference">参考サイト</h2>

- [Easy Node Authentication: Setup and Local ― Scotch.io](https://scotch.io/tutorials/easy-node-authentication-setup-and-local#toc-handling-signupregistration)
