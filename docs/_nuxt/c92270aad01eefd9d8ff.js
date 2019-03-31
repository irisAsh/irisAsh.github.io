(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{246:function(t,e,n){var content=n(252);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("40aafe93",content,!0,{sourceMap:!1})},247:function(t,e,n){"use strict";var o={name:"SideMenu",props:["menuSections"],computed:{routePath:function(){return this.$route.path}}},r=n(9),component=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("aside",{attrs:{id:"sidebar"}},t._l(t.menuSections,function(e){return n("section",{key:e.linkPath},[n("nuxt-link",{class:t.routePath==e.linkPath?"access-now":"",attrs:{to:e.linkPath}},[t._v("\n        "+t._s(e.title)+"\n      ")])],1)}),0)])},[],!1,null,null,null);e.a=component.exports},248:function(t,e,n){var o=n(5),r=n(249)(!1);o(o.S,"Object",{values:function(t){return r(t)}})},249:function(t,e,n){var o=n(21),r=n(22),c=n(33).f;t.exports=function(t){return function(e){for(var n,l=r(e),d=o(l),h=d.length,i=0,m=[];h>i;)c.call(l,n=d[i++])&&m.push(t?[n,l[n]]:l[n]);return m}}},250:function(t,e){t.exports='<section><h1>Express入門（環境設定）</h1>\n<p>ここでは簡易なTODOアプリを作りながらNodeJSのWebアプリケーションフレームワーク <a href="https://expressjs.com/">Express</a> の使い方を学んでいきます。<br />\n<a href="https://github.com/irisAsh/express-todo-tutorial/tree/master">こちら</a>に完成済みのサンプルを置いておきます。サンプルは後記事の<a href="https://irisash.com/express/editrouting/">Expressのルーティングの設定</a>、<a href="https://irisash.com/express/mongodb/">ExpressでMongoDBを使う</a>の内容を含んでいます。</p>\n<p><strong>環境</strong></p>\n<ul>\n<li>NodeJS v8.15.0</li>\n<li>Express v4.16.0</li>\n</ul>\n<h2 id="setting">環境設定</h2>\n<p>プロジェクト作成から起動するまでの設定手順を説明していきます。</p>\n<h2 id="express-generator">express-generator のインストール</h2>\n<p>下記のコマンドで<code>express-generator</code>をグローバルインストールします。</p>\n<pre><code class="language-sh.prettyprint">$ yarn install express-generator -g\n</code></pre>\n<h2 id="init-project">プロジェクトの作成</h2>\n<p><code>express-generator</code>を使用すると簡単にWebアプリケーションプロジェクトを最小構成で生成できます。任意のフォルダで次のコマンドを実行してください。</p>\n<pre><code class="language-sh.prettyprint">$ express express-todo-tutorial --view=pug --git\n</code></pre>\n<p>実行すると<code>express-todo-tutorial</code>というフォルダが作成されます。このフォルダの中にWebアプリケーションを動かす最低限のファイルが用意されています。<br />\n先程実行した<code>express</code>コマンドでいくつかのオプションを使っているので説明しておきます。また、オプションにはここで使っていないものもあります。<code>express -h</code>を実行するとオプションの一覧が見れるので、興味があるものを使ってみてください。</p>\n<p><strong>--view=pug</strong></p>\n<p>このオプションは使用するテンプレートエンジンを指定します。ここでは <a href="https://pugjs.org/api/getting-started.html">Pug</a>(旧Jade) と呼ばれるテンプレートを指定しています。テンプレートエンジンは他にも色々あるので自分の好みにあったものを指定してください。</p>\n<p><strong>--git</strong></p>\n<p>このオプションをつけると<code>.gitignore</code>を最初に作成してくれます。最低限のGit管理外設定をしてくれるので、Git管理をする場合は指定しましょう。</p>\n<p>作成されたプロジェクトフォルダの初期構成は以下のようになっています。</p>\n<pre><code>.\n├── app.js\n├── bin\n│   └── www\n├── package.json\n├── public\n│   ├── images\n│   ├── javascripts\n│   └── stylesheets\n│       └── style.css\n├── routes\n│   ├── index.js\n│   └── users.js\n└── views\n    ├── error.pug\n    ├── index.pug\n    └── layout.pug\n</code></pre>\n<p>Webアプリケーションを作成したことがある方は大体の内容はわかるかと思います。初学者の方は作りながら説明していきますので、大まかで良いのでどのファイルがどこにあるかを覚えておけば良いでしょう。</p>\n<h2 id="running">起動確認</h2>\n<p>初期作成されたプロジェクトを起動して動作確認をしておきましょう。下記のコマンドで起動確認できます。プロジェクトフォルダ内に移動した後に<code>yarn install</code>でパッケージを取得しています。最後のコマンドが実際にExpressを起動するコマンドになります。</p>\n<pre><code>$ cd express-todo-tutorial\n$ yarn install\n$ DEBUG=express-todo-tutorial:* yarn start\n</code></pre>\n<p>コマンド実行後にブラウザから<a href="http://localhost:3000">http://localhost:3000</a>にアクセスしてみましょう。以下のように画面が表示されれば起動完了です。<br />\nまた、起動を終了するときは<code>Ctrl+c</code>で終了することができます。</p>\n<img src="images/express/gettingstarted/run-start.png" alt="起動確認" title="起動確認" style="max-height:400px;">\n<p>このままでも開発を進めることはできますが、ファイルを編集する度にサーバー停止・<code>yarn stat</code>実行をするのは手間になるので、<a href="https://github.com/remy/nodemon">nodemon</a> をインストールしておきましょう。<code>nodemon</code>を使うとファイル更新の度に自動でサーバーを再起動してくれます。</p>\n<pre><code>$ yarn add nodemon --dev\n</code></pre>\n<p>また、起動コマンドもスクリプトに定義しておきましょう。<code>package.json</code>に以下のようにスクリプトを追加します。</p>\n<pre><code class="language-json.prettyprint"># package.json\n  ...\n  &quot;scripts&quot;: {\n    &quot;start&quot;: &quot;node ./bin/www&quot;,\n    &quot;devstart&quot;: &quot;nodemon ./bin/www&quot;, # 追加\n    &quot;debugstart&quot;: &quot;DEBUG=express-todo-tutorial:* yarn run devstart&quot; # 追加\n  },\n</code></pre>\n<p>次のコマンドを実行して起動を確認しましょう。</p>\n<pre><code>$ yarn run debugstart\n</code></pre>\n<p><a href="http://localhost:3000">http://localhost:3000</a>で先程と同様に画面が表示されればOKです。<code>views/index.pug</code>を編集して<code>nodemon</code>の挙動を確認してみましょう。</p>\n<pre><code class="language-pug.prettyprint"># views/index.pug\n\nextends layout               \n                             \nblock content                \n  h1= title                  \n  p Welcome to #{title} !!!!!  # !!!!!を追加\n</code></pre>\n<p>サーバーが自動で再起動されて画面が変更されていることが確認できます。</p>\n</section>\n'},251:function(t,e,n){"use strict";var o=n(246);n.n(o).a},252:function(t,e,n){(t.exports=n(10)(!1)).push([t.i,".article-timestamp{margin-top:1.5rem;padding-top:.5rem;border-top:1px solid #aaa;color:#aaa;display:flex;flex-direction:row}.timestamp-container{display:flex;flex-direction:row;justify-content:center;align-items:center;padding-right:1rem}.timestamp-container i{margin-right:.4rem}",""])},253:function(t,e,n){"use strict";var o={name:"ArticleTimestamp",props:["createdAt","updatedAt"]},r=(n(251),n(9)),component=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-timestamp"},[n("div",{staticClass:"timestamp-container"},[n("i",{staticClass:"far fa-clock"}),t._v(" "),n("p",[t._v(t._s(t.createdAt))])]),t._v(" "),n("div",{staticClass:"timestamp-container"},[n("i",{staticClass:"fas fa-clock"}),t._v(" "),n("p",[t._v(t._s(t.updatedAt))])])])},[],!1,null,null,null);e.a=component.exports},254:function(t,e,n){"use strict";n(250);var o={name:"TableContent",props:["articleMd"],computed:{getInternalLinks:function(){if(!this||!this.$props||!this.$props.articleMd)return[];for(var t,e=/<h2 id="(.*)">(.*)<\/h2>/gm,n=[];null!=(t=e.exec(this.$props.articleMd));)t[1]&&t[2]&&n.push({id:t[1],title:t[2]});return n||[]}}},r=n(9),component=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"table-content"}},[n("aside",{attrs:{id:"table-content-list"}},t._l(t.getInternalLinks,function(e){return n("div",{key:e.id,staticClass:"link-container"},[n("nuxt-link",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#"+e.id,expression:"'#' + internalLink.id"}],attrs:{to:""}},[t._v("\n        "+t._s(e.title)+"\n      ")])],1)}),0)])},[],!1,null,null,null);e.a=component.exports},262:function(t,e){t.exports="<section><h1>Pug(HTMLテンプレートエンジン)の書き方まとめ</h1>\n<h2 id=\"overview\">Pugの概要</h2>\n<p>HTMLのテンプレートエンジンの１つ<a href=\"https://pugjs.org/api/getting-started.html\">Pug</a>(旧Jade)の書き方についてまとめてみました。Webアプリケーションフレームワーク<a href=\"https://expressjs.com/ja/\">Express</a>のプロジェクト作成コマンドでは現在はデフォルトでJadeをテンプレートエンジンとして使うようになっていますが、今後JadeはPugに名称を変え移行されるようなのでPugに慣れておくのが良いでしょう。</p>\n<p>また、<a href=\"https://github.com/irisAsh/express-todo-tutorial/tree/master/views/pug\">こちら</a>にソースコードをまとめたものを置いておきます。</p>\n<h2 id=\"filename\">Pugファイル</h2>\n<p>Pugのファイルは拡張子<code>.pug</code>を使います。</p>\n<h2 id=\"html-tag\">PugでHTMLタグを扱う</h2>\n<p>Pugでは、HTMLタグは<code>&lt;&gt;</code>を省略した形で記述できます。またタグの次の行で段落を１段落として記述するとそのタグで囲まれるようになります。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">h1 HTMLタグ\ndiv\n  p パラグラフ\n  center センタリング\n  ul\n    li あ\n    li い\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;h1&gt;HTMLタグ&lt;/h1&gt;\n&lt;div&gt;\n  &lt;p&gt;パラグラフ&lt;/p&gt;\n  &lt;center&gt;センタリング&lt;/center&gt;\n  &lt;ul&gt;\n    &lt;li&gt;あ&lt;/li&gt;\n    &lt;li&gt;い&lt;/li&gt;\n&lt;/div&gt;\n</code></pre>\n<h2 id=\"inline\">Pugで文章を書く</h2>\n<p>文章はタグの後に半角スペースを空けてから記述します。<br />\n文章が長くなって改行したい場合は次の行の先頭にパイプ<code>|</code>をつけて続けて書くと、HTML表示は１行のままでコードとしての改行をすることができます。<br />\nHTML文章を改行したい場合は<code>br</code>タグを使ってください。インライン要素のタグを使う時は改行して先頭にタグを記述してください。<br />\n「タグ名＋ドット」を記述し、次の行を１段下げて書くとそのタグで囲まれるように描画されます。ヒアドキュメントのようにして文章を記述することができます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">p この\n  | 文章は\n  em 全て\n  | 一行の\n  span 表示\n  | になります。\n  br\n  | 改行はbrを使います。\np.\n  また、「タグ名＋ドット」後の段落は、\n  そのタグによって囲まれます。\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;p&gt;\n  この文章は&lt;em&gt;全て&lt;/em&gt;一行の&lt;span&gt;表示&lt;/span&gt;になります。&lt;br&gt;改行はbrを使います。\n&lt;/p&gt;\n\n&lt;p&gt;また、「タグ＋ドット」後の段落は、 そのタグによって囲まれます。&lt;/p&gt;\n</code></pre>\n<h2 id=\"interpolation\">Pugで文字列補間する</h2>\n<p>Pugでは変数を定義し、その変数を使って文章を作成することができます。<code>- var 変数名 = 値</code>という記述で変数を定義できます。そして<code>#{</code>と<code>}</code>で変数を囲むことで定義した値を描画することができます。<br />\nまた、「タグ名＋ドット」内の場合は<code>#[</code>と<code>]</code>で囲まれた範囲でタグと変数の記述ができます。<br />\n<code>#{}</code>内で<code>{</code>, <code>}</code>の文字を使いたい時があるかもしれません。その場合は<code>'{'}</code>, <code>'}'</code>と<code>'</code>で囲うことでエスケープすることができます。また、<code>#{}</code>自体を通常の文字として使いたい場合は<code>\\#{}</code>でエスケープできます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">- var name = 'Pug'\np 私の名前は#{name}です。\np.\n  私の名前は#[em #{name}]です。\np 私の名前は#{'{' + name + '}'}です。\np 私の名前は\\#{name}です。\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;p&gt;私の名前はPugです。&lt;/p&gt;\n&lt;p&gt;私の名前は&lt;em&gt;Pug&lt;/em&gt;です。&lt;/p&gt;\n&lt;p&gt;私の名前は{Pug}です。&lt;/p&gt;\n&lt;p&gt;私の名前は#{name}です。&lt;/p&gt;\n</code></pre>\n<h2 id=\"attribute\">Pugで属性を設定する</h2>\n<p>Pugでは<code>タグ名(属性名=&quot;&quot;)</code>と記述することでHTMLの属性を設定できます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">a(href=&quot;https://pugjs.org/api/getting-started.html&quot; target=&quot;_blank&quot;)\n  | Pug公式サイト\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;a href=&quot;https://pugjs.org/api/getting-started.html&quot; target=&quot;_blank&quot;&gt;Pug公式サイト&lt;/a&gt;\n</code></pre>\n<p><code>input</code>タグなどの真偽値を設定する場合は<code>属性名</code>のみを記載するか、<code>属性名=真偽値</code>の形式で書くことができます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">input(type=&quot;checkbox&quot; checked)\n| Pug\n|\ninput(type=&quot;checkbox&quot; checked=true)\n| Jade\n|\ninput(type=&quot;checkbox&quot; checked=false)\n| EJS\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;input type=&quot;checkbox&quot; checked=&quot;checked&quot;&gt;Pug\n&lt;input type=&quot;checkbox&quot; checked=&quot;checked&quot;&gt;Jade\n&lt;input type=&quot;checkbox&quot;&gt;EJS\n</code></pre>\n<h3>style属性</h3>\n<p>style属性を<code>{プロパティ: 値}</code>のようにオブジェクトの形式で記述できます。プロパティ名にハイフン<code>-</code>がある場合は<code>'</code>で囲む必要があるので注意してください。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">p(style=&quot;color:white;background-color:black;&quot;) 通常のHTMLでのStyle指定\np(style={color: 'red', 'background-color': 'yellow'}) Pugでオブジェクト形式でのStyle指定\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;p style=&quot;color:white;background-color:black;&quot;)&gt;通常のHTMLでのStyle指定&lt;/p&gt;\n&lt;p style=&quot;color:red;background-color:yellow;&quot;)&gt;Pugでオブジェクト形式でのStyle指定&lt;/p&gt;\n</code></pre>\n<h3>class/id属性</h3>\n<p>class属性、id属性も他と同様に指定することができますが、いくつか別の記法があります。<br />\nclass属性は配列の形式<code>class=['クラス名1', 'クラス名2', ...]</code>で記述することができます。条件によってclass属性を指定したい場合は<code>class={クラス名: 条件式}</code>の形式で記述すると、条件が真の値の時のみclass属性が指定されるようになります。<br />\nまたCSS表記のように、<code>.クラス名</code>でclass属性を、<code>#ID名</code>でid属性を指定することができます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">p(class=&quot;a1 a2&quot;) 通常\np(class=['b1', 'b2']) 配列で指定\n- classNames = ['c1', 'c2']\np(class=classNames) 変数で指定\np.d1.d2 .class名で指定\np#e1 #id名で指定\n- var currentUrl = '/test'\np(class={f1: currentUrl === '/'}) 条件で指定\np(class={f1: currentUrl === '/test'}) 条件で指定\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;p class=&quot;a1 a2&quot;&gt;通常&lt;/p&gt;\n&lt;p class=&quot;b1 b2&quot;&gt;配列で指定&lt;/p&gt;\n&lt;p class=&quot;c1 c2&quot;&gt;変数で指定&lt;/p&gt;\n&lt;p class=&quot;d1 d2&quot;&gt;.class名で指定&lt;/p&gt;\n&lt;p id=&quot;e1&quot;&gt;#id名で指定&lt;/p&gt;\n&lt;p&gt;条件で指定&lt;/p&gt;\n&lt;p class=&quot;f1&quot;&gt;条件で指定&lt;/p&gt;\n</code></pre>\n<h2 id=\"comment\">Pugでコメントを書く</h2>\n<p>コメントには通常のHTMLコメントとHTMLには表示されないPugファイル内でのコメントの２種類があります。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">// この行はコメントです。\n  HTMLのコメントになります。\n//- このコメントはHTMLに表示されません。\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;!-- この行はコメントです。HTMLのコメントになります。 --&gt;\n</code></pre>\n<h2 id=\"loop\">Pugの繰り返し記法を使う</h2>\n<p>同様の処理を繰り返す場合や、配列内の中身を順に参照するなどプログラミングではお馴染みの繰り返し処理をPugでも扱うことができます。<br />\n<code>for</code>の記法はよくある繰り返し構文と変わりありません。また、<code>each</code>を使えばJavascrptでの配列関数<code>forEach</code>のように配列の中身を順に参照することができます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">- for (var i = 0; i &lt; 3; i++)\n  p #{i}\n- var arr = ['Pug', 'Jade', 'EJS']\neach el in arr\n  p #{el}\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;p&gt;0&lt;/p&gt;\n&lt;p&gt;1&lt;/p&gt;\n&lt;p&gt;2&lt;/p&gt;\n&lt;p&gt;Pug&lt;/p&gt;\n&lt;p&gt;Jade&lt;/p&gt;\n&lt;p&gt;EJS&lt;/p&gt;\n</code></pre>\n<h2 id=\"code\">PugのBuffered Codeを使う</h2>\n<p>Buffered Codeという記法で、Javascriptコードで値を評価してその返り値をHTMLに使用できます。またBufferd Codeで文字列を使えばエスケープ文字は元のままの文字で扱うことができます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">- var name = 'Pug'\np= '私の名前は' + name + 'です。'\np= '&lt;&gt;の文字をエスケープしなくても表示できます。'\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;p&gt;私の名前はPugです。&lt;/p&gt;\n&lt;p&gt;&lt;&gt;の文字をエスケープしなくても表示できます。&lt;/p&gt;\n</code></pre>\n<h2 id=\"case\">PugのCase構文を使う</h2>\n<p>Pugでは条件分岐を扱う場合の１つにCase構文を使って記述することができます。この構文はJavascriptでのSwitch構文と同様のものです。<br />\n<code>when</code>句の書き方は２つで次の行に一段下げて記述するか、もしくは<code>when:</code>の後に続けて１行で書くことができます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">- var rank = 'first'\ncase rank\n  when 'first'\n    p １番目\n  when 'second': p ２番目\n  when 'third'\n    - break\n  when 'fourth'\n  when 'fifth'\n    p ４番目と５番目\n  default\n    p その他\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;!-- rank = 'frist' の時 --!&gt;\n&lt;p&gt;１番目&lt;/p&gt;\n\n&lt;!-- rank = 'second' の時 --!&gt;\n&lt;p&gt;２番目&lt;/p&gt;\n\n&lt;!-- rank = 'third' の時 --!&gt;\n&lt;!-- 何も表示されません --&gt;\n\n&lt;!-- rank = 'fourth' の時 --!&gt;\n&lt;p&gt;４番目と５番目&lt;/p&gt;\n\n&lt;!-- rank = 'fifth' の時 --!&gt;\n&lt;p&gt;４番目と５番目&lt;/p&gt;\n\n&lt;!-- rank = 'sixth' の時 --!&gt;\n&lt;p&gt;その他&lt;/p&gt;\n</code></pre>\n<h2 id=\"if\">PugのIF構文を使う</h2>\n<p>Case構文の他にIF構文でも条件分岐をすることができます。プログラミングによくあるIF構文と同様です。またRubyで馴染みのあるUnless構文もあります。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">- var num = 0\nif num === 0\n  p zero\nelse if num === 1\n  p one\nelse\n  p other\n- var condition = false\nunless condition\n p FALSEです\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;!-- num = 0 の時 --!&gt;\n&lt;p&gt;zero&lt;/p&gt;\n\n&lt;!-- num = 1 の時 --!&gt;\n&lt;p&gt;one&lt;/p&gt;\n\n&lt;!-- num = 2 の時 --!&gt;\n&lt;p&gt;other&lt;/p&gt;\n\n&lt;!-- condition = true の時 --!&gt;\n&lt;!-- 何も表示されません --&gt;\n\n&lt;!-- condition = false の時 --!&gt;\n&lt;p&gt;FALSEです&lt;/p&gt;\n</code></pre>\n<h2 id=\"mixin\">PugのMixinを使う</h2>\n<p>PugではMixinを使うことができます。Mixinを使うと共通処理をメソッド化して呼び出すことができます。記法は<code>mixin Mixin名(変数,...)</code>で宣言して、呼び出しを<code>+Mixin名(値,...)</code>で行えます。</p>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">mixin kao(left, right, color)\n  p(style='color:' + color) #{left} &gt;【･ω･`三´･ω･】&lt; #{right}\n+kao('Pug', 'Jade', 'blue')    \n+kao('EJS', 'Handlebars', 'red') \n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;p style=&quot;color:blue&quot;&gt;Pug &gt;;【･ω･`三´･ω･】&lt;; Jade&lt;/p&gt;\n&lt;p style=&quot;color:red&quot;&gt;EJS &gt;;【･ω･`三´･ω･】&lt;; Handlebars&lt;/p&gt;\n</code></pre>\n<h2 id=\"includes\">PugのIncludesを使う</h2>\n<p>複数のページで共通のレイアウトやスクリプトを使いたい場合は、PugのIncludesという機能を利用することで実現できます。<br />\nメインのファイル<code>include_example.pug</code>を用意し下記のファイル構成で共通ファイルを作成します。<br />\nこの後で説明するExtendsの機能と共通化する点は同じですが、こちらは文字通りメインのPugファイルに共通ファイルと取り込んでいる形になります。</p>\n<pre><code>.\n├── include_example.pug\n└── includes\n    ├── common_css.css\n    ├── common_script.js\n    └── common_view.pug\n</code></pre>\n<p><strong>Pug</strong></p>\n<pre><code class=\"language-pug.prettyprint\">// include_example.pug\n\ndoctype html\nhtml\n  head\n    style\n      include includes/common_css.css\n  body\n    h1 インクルード\n    div\n      include includes/common_view.pug\n      p.include-class CSSをインクルードしています\n      script\n        include includes/common_script.js\n</code></pre>\n<pre><code class=\"language-common_css.css.prettyprint\">// common_css.css\n\n.include-class\n{\n  color: red; \n}\n</code></pre>\n<pre><code class=\"language-common_view.pug.prettyprint\">// common_view.pug\n\ndiv\n  p この箇所はインクルードされています\n</code></pre>\n<pre><code class=\"language-common_script.js.prettyprint\">// common_script.js\n\nconsole.log('JSファイルがインクルードされました');\n</code></pre>\n<p><code>include_example.pug</code>がコンパイルされてできるHTMLは次のようになります。</p>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;html&gt;\n&lt;head&gt;\n  &lt;style&gt;\n    .include-class\n    {\n      color: red;\n    }\n  &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1&gt;インクルード&lt;/h1&gt;\n  &lt;div&gt;\n    &lt;div&gt;\n      &lt;p&gt;この箇所はインクルードされています&lt;/p&gt;\n    &lt;/div&gt;\n    &lt;p class=&quot;include-class&quot;&gt;CSSをインクルードしています&lt;/p&gt;\n    &lt;script&gt;\n      console.log('JSファイルがインクルードされました');\n    &lt;/script&gt;\n  &lt;/div&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n<h2 id=\"extends\">PugのExtendsを使う</h2>\n<p>Extendsを使っても共通化することができます。Exntendsの場合は共通の内容が書かれたテンプレートファイルに対して、各々個別の画面の内容を組み込む形になります。<br />\nファイル構成を下記のようにします。</p>\n<pre><code>├── template_example.pug\n├── templates\n│   └── layout.pug\n└── javascripts\n    ├── test_0.js\n    ├── test_1.js\n    ├── test_2.js\n    ├── test_3.js\n    └── test_4.js\n</code></pre>\n<p><strong>Pug</strong></p>\n<p>先ずはテンプレートファイルを用意します。<br />\n<code>block ブロック名</code>と記述した箇所が、後で個別の内容を置換する箇所となります。</p>\n<pre><code class=\"language-templates/layout.pug.prettyprint\">// templates/layout.pug\n\ndoctype html\nhtml\n  head\n    script(src='/javascripts/test_0.js')\n    block scripts\n      script(src='/javascripts/test_1.js')\n  body\n    h1 テンプレート\n    block content\n</code></pre>\n<pre><code class=\"language-javascripts/test_0.js.prettyprint\">// javascripts/test_0.js\n// test_1.js, ..., test_4.jsも出力の値を変えただけの内容です\n\nconsole.log('Test: 0');\n</code></pre>\n<p>使い方ですが<code>extends ファイル名</code>でまずテンプレートファイルを継承します。あとはテンプレートのブロック箇所に対して置換するだけです。<code>block ブロック名</code>でブロック箇所を指定し次の行で組み込む内容を記述します。<br />\nまた、<code>block</code>には<code>append</code>, <code>prepend</code>を記述することでテンプレートに組み込む順番を指定できます。<code>block append</code>でテンプレートの内容の後に、<code>block prepend</code>で前に組み込むことができます。</p>\n<pre><code class=\"language-template_example.pug.prettyprint\">// template_example.pug\n\nextends templates/layout\n\nblock append scripts\n  script(src='/javascripts/pug/test_3.js')\n\nblock prepend scripts\n  script(src='/javascripts/pug/test_2.js')\n\n//-\n  下記のコメントを外すとscriptsのブロックは上書きされます\n//-\n  block scripts\n    script(src='/javascripts/pug/test_4.js')\n\nblock content\n  p テンプレートを読み込んでます\n</code></pre>\n<p><strong>HTML</strong></p>\n<pre><code class=\"language-html\">&lt;html&gt;\n&lt;head&gt;\n  &lt;script src=&quot;/javascripts/pug/test_0.js&quot;&gt;&lt;/script&gt;\n  &lt;script src=&quot;/javascripts/pug/test_2.js&quot;&gt;&lt;/script&gt;\n  &lt;script src=&quot;/javascripts/pug/test_1.js&quot;&gt;&lt;/script&gt;\n  &lt;script src=&quot;/javascripts/pug/test_3.js&quot;&gt;&lt;/script&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1&gt;テンプレート&lt;/h1&gt;\n  &lt;p&gt;テンプレートを読み込んでます&lt;/p&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n</section>\n"},273:function(t,e,n){"use strict";n.r(e);n(20),n(248);var o=n(253),r=n(247),c=n(254),l=n(73),d=n(262),h=n.n(d),m={components:{ArticleTimestamp:o.a,SideMenu:r.a,TableContent:c.a},data:function(){return{menuSections:Object.values(l)}},computed:{PugReferenceMd:function(){return h.a}},head:function(){return{title:l.pug_reference.headerTitle,meta:[{hid:"description",name:"description",content:l.pug_reference.headerDescription}]}}},f=n(9),component=Object(f.a)(m,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"wrapper"}},[e("article",{attrs:{id:"main"}},[e("section",[e("div",{domProps:{innerHTML:this._s(this.PugReferenceMd)}}),this._v(" "),e("article-timestamp",{attrs:{createdAt:"2019/03/16",updatedAt:"2019/03/31"}})],1)]),this._v(" "),e("side-menu",{attrs:{menuSections:this.menuSections}}),this._v(" "),e("table-content",{attrs:{articleMd:this.PugReferenceMd}})],1)},[],!1,null,null,null);e.default=component.exports}}]);