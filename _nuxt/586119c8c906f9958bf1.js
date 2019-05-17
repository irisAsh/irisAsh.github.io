(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{246:function(e,n,t){var content=t(250);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(11).default)("40aafe93",content,!0,{sourceMap:!1})},247:function(e,n,t){"use strict";var r={name:"SideMenu",props:["menuSections"],computed:{routePath:function(){return this.$route.path}}},o=t(9),component=Object(o.a)(r,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("aside",{attrs:{id:"sidebar"}},e._l(e.menuSections,function(n){return t("section",{key:n.category},[t("div",{staticClass:"menu-overview"},[e._v(e._s(n.category))]),e._v(" "),e._l(n.menus,function(n){return t("div",{key:n.linkPath,staticClass:"menu-item"},[t("nuxt-link",{class:e.routePath==n.linkPath?"access-now":"",attrs:{to:n.linkPath}},[e._v("\n          "+e._s(n.title)+"\n        ")])],1)})],2)}),0)])},[],!1,null,null,null);n.a=component.exports},248:function(e,n){e.exports='<section><h1>Express入門（環境設定）</h1>\n<p>ここでは簡易なTODOアプリを作りながらNodeJSのWebアプリケーションフレームワーク <a href="https://expressjs.com/">Express</a> の使い方を学んでいきます。<br />\n<a href="https://github.com/irisAsh/express-todo-tutorial/tree/master">こちら</a>に完成済みのサンプルを置いておきます。サンプルは後記事の<a href="https://irisash.github.io/express/editrouting/">Expressのルーティングの設定</a>、<a href="https://irisash.github.io/express/mongodb/">ExpressでMongoDBを使う</a>の内容を含んでいます。</p>\n<p><strong>環境</strong></p>\n<ul>\n<li>NodeJS v8.15.0</li>\n<li>Express v4.16.0</li>\n</ul>\n<h2 id="setting">環境設定</h2>\n<p>プロジェクト作成から起動するまでの設定手順を説明していきます。</p>\n<h2 id="express-generator">express-generator のインストール</h2>\n<p>下記のコマンドで<code>express-generator</code>をグローバルインストールします。</p>\n<pre><code class="language-sh.prettyprint">$ yarn install express-generator -g\n</code></pre>\n<h2 id="init-project">プロジェクトの作成</h2>\n<p><code>express-generator</code>を使用すると簡単にWebアプリケーションプロジェクトを最小構成で生成できます。任意のフォルダで次のコマンドを実行してください。</p>\n<pre><code class="language-sh.prettyprint">$ express express-todo-tutorial --view=pug --git\n</code></pre>\n<p>実行すると<code>express-todo-tutorial</code>というフォルダが作成されます。このフォルダの中にWebアプリケーションを動かす最低限のファイルが用意されています。<br />\n先程実行した<code>express</code>コマンドでいくつかのオプションを使っているので説明しておきます。また、オプションにはここで使っていないものもあります。<code>express -h</code>を実行するとオプションの一覧が見れるので、興味があるものを使ってみてください。</p>\n<p><strong>--view=pug</strong></p>\n<p>このオプションは使用するテンプレートエンジンを指定します。ここでは <a href="https://pugjs.org/api/getting-started.html">Pug</a>(旧Jade) と呼ばれるテンプレートを指定しています。テンプレートエンジンは他にも色々あるので自分の好みにあったものを指定してください。</p>\n<p><strong>--git</strong></p>\n<p>このオプションをつけると<code>.gitignore</code>を最初に作成してくれます。最低限のGit管理外設定をしてくれるので、Git管理をする場合は指定しましょう。</p>\n<p>作成されたプロジェクトフォルダの初期構成は以下のようになっています。</p>\n<pre><code>.\n├── app.js\n├── bin\n│   └── www\n├── package.json\n├── public\n│   ├── images\n│   ├── javascripts\n│   └── stylesheets\n│       └── style.css\n├── routes\n│   ├── index.js\n│   └── users.js\n└── views\n    ├── error.pug\n    ├── index.pug\n    └── layout.pug\n</code></pre>\n<p>Webアプリケーションを作成したことがある方は大体の内容はわかるかと思います。初学者の方は作りながら説明していきますので、大まかで良いのでどのファイルがどこにあるかを覚えておけば良いでしょう。</p>\n<h2 id="running">起動確認</h2>\n<p>初期作成されたプロジェクトを起動して動作確認をしておきましょう。下記のコマンドで起動確認できます。プロジェクトフォルダ内に移動した後に<code>yarn install</code>でパッケージを取得しています。最後のコマンドが実際にExpressを起動するコマンドになります。</p>\n<pre><code>$ cd express-todo-tutorial\n$ yarn install\n$ DEBUG=express-todo-tutorial:* yarn start\n</code></pre>\n<p>コマンド実行後にブラウザから<a href="http://localhost:3000">http://localhost:3000</a>にアクセスしてみましょう。以下のように画面が表示されれば起動完了です。<br />\nまた、起動を終了するときは<code>Ctrl+c</code>で終了することができます。</p>\n<img src="images/express/gettingstarted/run-start.png" alt="起動確認" title="起動確認" style="max-height:400px;">\n<p>このままでも開発を進めることはできますが、ファイルを編集する度にサーバー停止・<code>yarn stat</code>実行をするのは手間になるので、<a href="https://github.com/remy/nodemon">nodemon</a> をインストールしておきましょう。<code>nodemon</code>を使うとファイル更新の度に自動でサーバーを再起動してくれます。</p>\n<pre><code>$ yarn add nodemon --dev\n</code></pre>\n<p>また、起動コマンドもスクリプトに定義しておきましょう。<code>package.json</code>に以下のようにスクリプトを追加します。</p>\n<pre><code class="language-json.prettyprint"># package.json\n  ...\n  &quot;scripts&quot;: {\n    &quot;start&quot;: &quot;node ./bin/www&quot;,\n    &quot;devstart&quot;: &quot;nodemon ./bin/www&quot;, # 追加\n    &quot;debugstart&quot;: &quot;DEBUG=express-todo-tutorial:* yarn run devstart&quot; # 追加\n  },\n</code></pre>\n<p>次のコマンドを実行して起動を確認しましょう。</p>\n<pre><code>$ yarn run debugstart\n</code></pre>\n<p><a href="http://localhost:3000">http://localhost:3000</a>で先程と同様に画面が表示されればOKです。<code>views/index.pug</code>を編集して<code>nodemon</code>の挙動を確認してみましょう。</p>\n<pre><code class="language-pug.prettyprint"># views/index.pug\n\nextends layout               \n                             \nblock content                \n  h1= title                  \n  p Welcome to #{title} !!!!!  # !!!!!を追加\n</code></pre>\n<p>サーバーが自動で再起動されて画面が変更されていることが確認できます。</p>\n</section>\n'},249:function(e,n,t){"use strict";var r=t(246);t.n(r).a},250:function(e,n,t){(e.exports=t(10)(!1)).push([e.i,".article-timestamp{margin-top:1.5rem;padding-top:.5rem;border-top:1px solid #aaa;color:#aaa;display:flex;flex-direction:row}.timestamp-container{display:flex;flex-direction:row;justify-content:center;align-items:center;padding-right:1rem}.timestamp-container i{margin-right:.4rem}",""])},251:function(e,n,t){"use strict";t(248);var r={name:"TableContent",props:["articleMd"],computed:{getInternalLinks:function(){if(!this||!this.$props||!this.$props.articleMd)return[];for(var e,n=/<h2 id="(.*)">(.*)<\/h2>/gm,t=[];null!=(e=n.exec(this.$props.articleMd));)e[1]&&e[2]&&t.push({id:e[1],title:e[2]});return t||[]}}},o=t(9),component=Object(o.a)(r,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"table-content"}},[t("aside",{attrs:{id:"table-content-list"}},e._l(e.getInternalLinks,function(n){return t("div",{key:n.id,staticClass:"link-container"},[t("nuxt-link",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#"+n.id,expression:"'#' + internalLink.id"}],attrs:{to:""}},[e._v("\n        "+e._s(n.title)+"\n      ")])],1)}),0)])},[],!1,null,null,null);n.a=component.exports},252:function(e,n,t){"use strict";var r={name:"ArticleTimestamp",props:["createdAt","updatedAt"]},o=(t(249),t(9)),component=Object(o.a)(r,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"article-timestamp"},[t("div",{staticClass:"timestamp-container"},[t("i",{staticClass:"far fa-clock"}),e._v(" "),t("p",[e._v(e._s(e.createdAt))])]),e._v(" "),t("div",{staticClass:"timestamp-container"},[t("i",{staticClass:"fas fa-clock"}),e._v(" "),t("p",[e._v(e._s(e.updatedAt))])])])},[],!1,null,null,null);n.a=component.exports},268:function(e,n){e.exports="<section><h1>ExpressでForm認証を実装する</h1>\n<p><a href=\"https://irisash.github.io/express/basic_auth/\">ExpressでBasic認証を実装する</a>や<a href=\"https://irisash.github.io/express/digest_auth/\">ExpressでDigest認証を実装する</a>でHTTPで定義される認証方式を実装しましたが、今回は多くのWebアプリケーションで利用されているForm認証を実装してみます。</p>\n<p>実装済みのサンプルは<a href=\"https://github.com/irisAsh/express-form-auth-tutorial\">こちら</a>においていますのでご参考ください。</p>\n<p>また、前提知識としてExpressでのセッション管理とMongoDB(Mongoose)の使い方が必要となります。各々の扱い方がわからない方は下記のリンクをご参考ください。</p>\n<ul>\n<li><a href=\"https://irisash.github.io/express/mongoose/\">Express入門（Mongooseの利用）</a></li>\n<li><a href=\"https://irisash.github.io/express/express_session/\">Expressでセッションを利用する</a></li>\n</ul>\n<h2 id=\"overview\">Form認証の流れ</h2>\n<p>Form認証の大まかな流れは下記の通りです。</p>\n<ul>\n<li>クライアントからユーザー名とパスワードが送信される</li>\n<li>ユーザー名とパスワードをDBに保存する<br />\nログイン時はユーザー名とパスワードに一致するデータをDBから取得）</li>\n<li>ユーザーの識別値（ユーザーIDなど）をセッションに保存しログイン状態にします</li>\n</ul>\n<p><strong>クライアントからユーザー名とパスワードが送信される</strong></p>\n<p>この時ユーザー名とパスワードは平文で送信されるので、通常はSSLで暗号化します。今回はSSLの実装はしないので、パスワードのハッシュ化を実装することで代替とします。</p>\n<p><strong>ユーザー名とパスワードをDBに保存する</strong></p>\n<p>パスワードはそのまま保存せずハッシュ化して保存するようにします。したがってデータを参照できる管理者側もパスワード自体はわからなくなります。もし、パスワードを忘れてしまった場合は新たに作り直すような機能が必要となります。</p>\n<p><strong>ユーザーの識別値（ユーザーIDなど）をセッションに保存しログイン状態にします</strong></p>\n<p>セキュリティ的にこのセッションには有効期限を付与しておく方が良いです。またアクセスする毎にセッションを発行し直すとセキュリティ面を強固にできます。</p>\n<h2 id=\"create-form\">Formの作成</h2>\n<p>まずはサインインを行うフォーム画面を作成します。</p>\n<img src=\"images/express/form_auth/home.png\" alt=\"Home画面\" title=\"Home画面\" style=\"max-height:400px;\">\n<img src=\"images/express/form_auth/signin.png\" alt=\"SignIn画面\" title=\"SignIn画面\" style=\"max-height:400px;\">\n<p>以下がサインイン画面のコードです。</p>\n<pre><code class=\"language-views/signin.pug.prettyprint\">// views/signin.pug\n\ndoctype html\nhtml\n  head\n    title= title\n    link(rel='stylesheet', href='/stylesheets/style.css')\n    script(src='https://cdnjs.cloudflare.com/ajax/libs/jsSHA/2.3.1/sha512.js')\n  body\n    h1= title\n\n    form(method='POST' action=/'signin')\n      div\n        label(for='username') username：\n        input#username(\n          type='text'\n          name='username'\n          required='true'\n        )\n      div\n        label(for='password') password：\n        input#password(\n          type='password'\n          name='password'\n          required='true'\n        )\n      div\n        input(type='submit' value='submit' onClick='return getHashAndSubmit();')\n\n    script.\n      var getHashAndSubmit = function() {\n        try {\n          var passwordSelctor = document.getElementById('password');\n          var shaObj = new jsSHA(&quot;SHA-512&quot;, &quot;TEXT&quot;)\n          shaObj.update(passwordSelctor.value)\n          var hash = shaObj.getHash(&quot;HEX&quot;)\n          passwordSelctor.value = hash\n          return true;\n        } catch (_e) {\n          return false;\n        }\n      }\n</code></pre>\n<p>フォーム自体は特に変わったところはありません。今回は送信時にパスワードをハッシュ化するようにしてみたので、その部分だけ説明します。</p>\n<p>CDNでハッシュ化のパッケージをインポートしています。使用したパッケージは<a href=\"https://cdnjs.com/libraries/jsSHA\">jsSHA</a>というパッケージです。<br />\njsSHAの使い方は<code>new jsSHA(&quot;SHA-512&quot;, &quot;TEXT&quot;)</code>で初期化します。第１引数にSHAアルゴリズムの種類、第２引数にハッシュ化対象の指定形式を設定します。次に初期化したオブジェクトの<code>update</code>関数でハッシュ化する値を指定し、<code>getHash</code>で実際にハッシュ値を取得します。</p>\n<p>このハッシュ化を使って、送信時にパスワードをハッシュ化した上でサーバーにリクエストをするようにしています。</p>\n<h2 id=\"signin\">サインイン</h2>\n<p>さて今回の主要部であるサインインの処理を実装します。クライアントから受け取ったユーザー名とパスワードをDBに保存するだけですが、パスワードはそのまま保存せずに受け取った値をさらにハッシュ化することでセキュリティを強固にできます。<br />\nそして各値を保存した後はユーザーの識別値をセッションに保存してユーザーがログインした状態にする必要があります。今回はMongoDBのIDをセッションに保存することでログイン状態を保つようにしていきます。<br />\nそれでは実際の処理を<code>routes/index.js</code>に組み込んでいきます。</p>\n<pre><code class=\"language-routes/index.js.prettyprint\">// routes/index.js\n\n// bcryptをインポート\nvar bcrypt = require('bcrypt');\nvar saltRounds = 10;\n...\n\nrouter.post('/signin', function(req, res, next) {\n  var { username, password } = req.body;\n  // bcrypt でハッシュ化してusernameとパスワードを保存\n  var salt = bcrypt.genSaltSync(saltRounds);\n  var hash = bcrypt.hashSync(password, salt);\n  User.create({\n    username,\n    password: hash\n  })\n  .then(function(result) {\n    // user_idをセッションに詰める\n    var session = req.session;\n    session.userId = result._id;\n    res.redirect('/users');\n  })\n  .catch(function(err) {\n    console.log(err);\n    next(err);\n  });\n});\n</code></pre>\n<p>ハッシュ化には<a href=\"https://github.com/kelektiv/node.bcrypt.js\">bcrypt</a>を使うことにします。bcryptはいくつかあるハッシュ化アルゴリズムの中でも、ソルト値・ストレッチング回数も考慮されて算出されるためとても便利です。<br />\nインストールは下記のコマンドを実行してください。</p>\n<pre><code class=\"language-shell.prettyprint\">$ yarn add bcrypt\n</code></pre>\n<p>使い方ですが、まず<code>bcrypt.genSaltSync(加工コスト)</code>でソルト値を取得します。加工コストは任意の数値で初期値は10です。<br />\n次に<code>bcrypt.hashSync(ハッシュ化対象, ソルト値)</code>で実際にハッシュ化された値が取得できます。<br />\n後はハッシュ化した値をユーザーデータに登録するだけです。</p>\n<p>登録後はセッションに登録したユーザーデータのIDを保存してユーザーページへリダイレクトしています。</p>\n<img src=\"images/express/form_auth/user.png\" alt=\"User画面\" title=\"User画面\" style=\"max-height:400px;\">\n<p><code>/users</code>の振る舞いは次のようになっています。</p>\n<pre><code class=\"language-routes/users.js.prettyprint\">// routes/users.js\n\nvar express = require('express');\nvar router = express.Router();\nvar User = require('../models/user');\n\n/* GET users listing. */\nrouter.get('/', function(req, res, next) {\n  var session = req.session;\n  if (!!session.userId) {\n    User.findOne({ _id: session.userId })\n    .then(function(result) {\n      if (!result) {\n        throw new Error('Userが見つかりません');\n      }\n      res.render('user/index', {\n        title: 'Success',\n        user: result\n      });\n    })\n    .catch(function(err) {\n      console.log(err);\n      next(err);\n    });\n  } else {\n    res.redirect('/');\n  }\n});\n\nmodule.exports = router;\n</code></pre>\n<p><code>/users</code>にアクセスするとまずセッションにIDが保存されているか確認するようになっています。IDが保存されていなければ、Home画面へリダイレクトします。<br />\nさらに保存されているIDと一致するユーザーデータを取得し、ユーザー情報を画面に描画するようになっています。</p>\n<h2 id=\"logout\">ログアウト</h2>\n<p>次はログアウトです。ユーザー画面にはログアウトのボタンをおいています。</p>\n<pre><code class=\"language-views/user/index.pug.prettyprint\">// views/user/index.pug\n\ndoctype html\nhtml\n  head\n    title= title\n    link(rel='stylesheet', href='/stylesheets/style.css')\n  body\n    h1= title\n\n    p.\n      username: #{user.username}\n\n    form(method='post' action='/logout')\n      input(type='submit' value='logout')\n</code></pre>\n<p>ボタンを押すと<code>/logout</code>へPOSTリクエストを送信します。サーバー側では保存されているセッションの値を削除しHome画面へリダイレクトしています。セッションの値を削除することでログイン状態がなくなり、再度<code>/users</code>へアクセスしようとするとHome画面へ飛ばされます。</p>\n<pre><code class=\"language-routes/index.js.prettyprint\">// routes/index.js\n\nrouter.post('/logout', function(req, res, next) {\n  var session = req.session;\n  session.userId = null;\n  res.redirect('/');\n});\n</code></pre>\n<h2 id=\"login\">ログイン</h2>\n<p>最後にログイン画面です。ログアウトした場合はセッションの有効期限が切れてログイン状態がなくなった場合にこの画面からログインできるようにします。</p>\n<p>画面はサインインと全く同様のため割愛します。Formの<code>action</code>だけ<code>/login</code>に変更するようにしてください。</p>\n<p>ログイン処理はクライアントから受け取ったユーザー名とパスワードを受け取りDBに保存されている値と照合して組み合わせが正しいか確認します。<br />\nまずはソースコードから。</p>\n<pre><code class=\"language-routes/index.js.prettyprint\">// routes/index.js\n\nrouter.post('/login', function(req, res, next) {\n  var { username, password } = req.body;\n  User.findOne({ username })\n  .then(function(result) {\n    if (!result) {\n      throw new Error('Userが見つかりません');\n    }\n    if (bcrypt.compareSync(password, result.password)) {\n      // user_idをセッションに詰める\n      var session = req.session;\n      session.userId = result._id;\n      res.redirect('/users');\n    } else {\n      res.redirect('/login');\n    }\n  })\n  .catch(function(err) {\n    console.log(err);\n    next(err);\n  });\n});\n</code></pre>\n<p>はじめに受け取ったユーザー名でユーザーデータを検索します。見つかったらユーザーデータのパスワードと送信されたパスワードが一致しているか確認します。この時DBに保存されているパスワードはハッシュ化されているので<code>bcrypt.compareSync(元の値, ハッシュ化された値</code>を使って検証します。<br />\nパスワードが一致している場合はセッションにユーザーデータのIDを保存してユーザー画面に遷移させます。</p>\n<p>以上でForm認証の実装は完了です。<br />\n実際にはセキュリティ面を考慮してSSLの暗号化などの工夫が必要でしょうが、Form認証の基本的な流れはここで説明した流れになります。また今回は自前でForm認証を実装しましたが、ライブラリを利用するのも良いでしょう。機会があれば当サイトでもライブラリを使った実装を紹介してみようと思います。</p>\n<h2 id=\"reference-links\">参考サイト</h2>\n<ul>\n<li><a href=\"https://qiita.com/toshiya/items/e7dcc7610b15884b167e\">Basic認証とフォームによる認証についてのまとめ - Qiita</a></li>\n<li><a href=\"http://webeg.info/php-course/step3-030/\">管理画面にフォーム型ログイン認証を実装する</a></li>\n</ul>\n</section>\n"},302:function(e,n,t){"use strict";t.r(n);var r=t(252),o=t(247),c=t(251),l=t(73),d=t(268),h=t.n(d),m={components:{ArticleTimestamp:r.a,SideMenu:o.a,TableContent:c.a},data:function(){return{menuSections:l}},computed:{FormAuthMd:function(){return h.a}},head:function(){var e=l.authentication.menus;return{title:e.form_auth.headerTitle,meta:[{hid:"description",name:"description",content:e.form_auth.headerDescription}]}}},x=t(9),component=Object(x.a)(m,function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"wrapper"}},[n("article",{attrs:{id:"main"}},[n("section",[n("div",{domProps:{innerHTML:this._s(this.FormAuthMd)}}),this._v(" "),n("article-timestamp",{attrs:{createdAt:"2019/05/07",updatedAt:"2019/05/07"}})],1)]),this._v(" "),n("side-menu",{attrs:{menuSections:this.menuSections}}),this._v(" "),n("table-content",{attrs:{articleMd:this.FormAuthMd}})],1)},[],!1,null,null,null);n.default=component.exports}}]);