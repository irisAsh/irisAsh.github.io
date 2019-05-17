# Expressルーティング詳細

[Express入門（ルーティング）](https://irisash.github.io/express/editrouting/)ではTODOアプリを作成して、Expressでの簡単なルーティング設定方法を学びました。  
ここでは様々なケースのルーティング設定方法を学びます。学習する手法は下記になります。  

- 文字列パターンや正規表現で一致するURLをエンドポイントにする方法
- URL構造から特定のパラメータ値を取得する方法
- レスポンスを段階的に処理する方法

また、サンプル集は[こちら](https://github.com/irisAsh/express-routing-tutorial)においていますのでご参考ください。  

<h2 id="route-path">マッチングURL</h2>

文字列パターンと正規表現でマッチするURLに対してレスポンス処理を指定できます。  
  

<h3>特定の文字と一致または文字無</h3>

`?`は直前の１文字と一致するまたは文字がない場合と一致するパターンを作成します。  
次のルーティングは`/rootone`または`/root_one`のエンドポイントのレスポンスを処理します。  

```js.prettyprint
router.get('/root_?one', function(req, res, next) {
  res.send('root one');
});
```

<h3>特定の文字が１個以上で一致</h3>

`+`は直前の１文字が１個以上の場合と一致するパターンを作成します。  
次のルーティングは`/root_two`, `/root__two`, `/root___two`, ..., のエンドポイントのレスポンスを処理します。  

```js.prettyprint
router.get('/root_+two', function(req, res, next) {
  res.send('root two');
});
```

<h3>任意の文字と一致</h3>

`*`は任意の１文字と一致するパターンを作成します。  
次のルーティングは`/root_three`, `/root_twenty_three`, `/root_thirty_three` などのエンドポイントのレスポンスを処理します。  

```js.prettyprint
router.get('/root_*three', function(req, res, next) {
  res.send('root three');
});
```

<h3>特定のワードと一致</h3>

`()`はカッコで囲まれたワードと一致するパターンを作成します。`()`の後には`?`や`+`を指定して繰り返すワードの数を指定することができます。  
次のルーティングは`/root_four`, `/root_twenty_four`のエンドポイントのレスポンスを処理します。  

```js.prettyprint
router.get('/root_(twenty_)?four', function(req, res, next) {
  res.send('root four');
});
```

<h3>正規表現</h3>

`/`で正規表現を指定してパターンを作成します。
次のルーティングは`/root__five`, `root_a_five`, `/root_twenty_five`などのエンドポイントのレスポンスを処理します。  

```js.prettyprint
router.get(/root_.*_five/, function(req, res, next) {
  res.send('root five');
});
```

<h2 id="route-params">URL内のパラメータを取得する</h2>

Webアプリケーションでは`/users/12/adress`, `/authors/33/books/2`のようにIDの値などをURLに含めてルーティングを構成することがよくあります。ExpressでもそのようなURLを扱うことができます。  

<h3>URLに含まれるパラメータ値を取得する</h3>

`/:パラメータ名`と指定することで、URLに該当する値を`req.params.パラメータ名`の形式で参照することができるようになります。  

次のルーティングでは、`/artists/1/musics`, `/artists/23/musics`のようなエンドポイントを処理し、`req.params.artistId`でパラメータの値を参照することができます。  

```js.prettyprint
router.get('/artists/:artistId/musics', function(req, res, next) {
  res.send(req.params);
});
```

<img src="images/express/routing_detail/root_parameter.png" alt="ルートパラメータ" title="ルートパラメータ" style="max-height:400px;">

<h3>パラメータ値を意味のある構成にする</h3>

`-`, `.`は通常の文字として扱われるので、アプリケーションの仕様に意味付けられたURLを設定することができます。  

次のルーティングでは、`/artists/1/musics/2016-2019`のようなエンドポイントを処理し、`req.params.form`, `req.params.to`でパラメータの値を参照することができます。この例では2016年から2019年の曲を検索するようなURLとして構成することができます。  

```js.prettyprint
router.get('/artists/:artistId/musics/:from-:to', function(req, res, next) {
  res.send(req.params);
});
```

<img src="images/express/routing_detail/root_parameter_from_to.png" alt="ルートパラメータFromTo" title="ルートパラメータFromTo" style="max-height:400px;">

`.`を使った例も同様です。次のルーティングでは、`/artists/1/musics/album.rock`のようなエンドポイントを処理し、`req.params.unit`, `req.params.genru`でパラメータの値を参照することができます。例は曲をアルバムでロックのジャンルを検索するようなURLの例です。  

```js.prettyprint
router.get('/artists/:artistId/musics/:unit.:genru', function(req, res, next) {
  res.send(req.params);
});
```

<img src="images/express/routing_detail/root_parameter_unit_genru.png" alt="ルートパラメータUnitGenru" title="ルートパラメータUnitGenru" style="max-height:400px;">

<h3>パラメータ値を制限する</h3>

パラメータの値は正規表現を使って値を制限することができます。`()`の括弧内で正規表現を設定することで指定できます。  
次のルーティングでは、`/artists/22/musics/4`のようなエンドポイントを処理することができ、`/artists/22/musics/abc`のようなエンドポイントを拾うことはありません。   

```js.prettyprint
router.get('/artists/:artistId/musics/:musicId(\\d+)', function(req, res, next) {
  res.send(req.params);
});
```

<img src="images/express/routing_detail/root_parameter_reg.png" alt="ルートパラメータ正規表現" title="ルートパラメータ正規表現" style="max-height:400px;">

<h2 id="route-handler">ルートハンドラー</h2>

クライアントからのリクエストに対して、複数のコールバックを用意して処理させることができます。用途としては、本処理の前にログイン状態をチェックするなどの処理を組み込む際に利用できるでしょう。  
  
複数のコールバックの実装は、METHOD関数の第２引数以降に可変的に渡すか、あるいは第２引数にコールバックの配列を渡すことで実現できます。また、途中のコールバックは`next()`を記述して次のコールバックの処理へ移るよう明示する必要があります。  

<h3>可変長変数で渡す</h3>

```js.prettyprint
router.get('/handlers/three_callback',
  function(req, res, next) {
    console.log('callback 1');
    next();
  },
  function(req, res, next) {
    console.log('callback 2');
    next();
  },
  function(req, res, next) {
    console.log('callback 3');
    res.send('Three Callback');
  }
);
```

```shell.prettyprint
# 出力

callback 1
callback 2
callback 3
```

<h3>配列で渡す</h3>

```js.prettyprint
var callbackOne = function(req, res, next) {
  console.log('array 1');
  next();
};

var callbackTwo = function(req, res, next) {
  console.log('array 2');
  next();
};

var callbackThree = function(req, res, next) {
  console.log('array 3');
  res.send('Array');
};

router.get('/handlers/array', [callbackOne, callbackTwo, callbackThree]);
```

```shell.prettyprint
# 出力

array 1
array 2
array 3
```

<h3>途中でリダイレクトする</h3>

ログイン状態をチェックし、ログイン状態でなかったらログイン画面に飛ばすような処理の場合は、途中のコールバックから次のコールバックに渡さないようにしなければいけません。  
  
次のコードは途中でリダイレクトするような例です。  

```js.prettyprint
router.get('/handlers/login_check',
  function(req, res, next) {
    console.log('check');
    var loggedIn = false;
    if (loggedIn) {
      next();
    } else {
      res.redirect('/');
    }
  },
  function(req, res, next) {
    console.log('passed');
    res.send('Login check');
  }
);
```

<h2 id="reference">参考サイト</h2>

- [Express でのルーティング](https://expressjs.com/ja/guide/routing.html)
