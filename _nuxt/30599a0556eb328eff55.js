(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{310:function(n,e,v){"use strict";v.r(e);var _=v(255),t=v(256),c=v(85),o={components:{ArticlePage:_.a,CodeBox:t.a},data:function(){return{menuSections:c,categoryName:"routing_view",articleName:"pug_reference",datePublished:new Date("2019/03/16 22:00:00 +0900"),dateModified:new Date("2019/12/29 20:00:00 +0900"),contents:[{id:"in-link-overview",title:"Pugの概要"},{id:"in-link-filename",title:"Pugのファイル名"},{id:"in-link-html-tag",title:"PugでHTMLタグを扱う"},{id:"in-link-inline",title:"Pugで文章を書く"},{id:"in-link-interpolation",title:"Pugで文字列補間する"},{id:"in-link-attribute",title:"Pugで属性を設定する"},{id:"in-link-comment",title:"Pugでコメントを書く"},{id:"in-link-loop",title:"Pugの繰り返し記法を使う"},{id:"in-link-code",title:"PugのBuffered Codeを使う"},{id:"in-link-case",title:"PugのCase構文を使う"},{id:"in-link-if",title:"PugのIF構文を使う"},{id:"in-link-mixin",title:"PugのMixinを使う"},{id:"in-link-includes",title:"PugのIncludesを使う"},{id:"in-link-extends",title:"PugのExtendsを使う"}]}}},d=v(12),component=Object(d.a)(o,(function(){var n=this,e=n.$createElement,v=n._self._c||e;return v("article-page",{attrs:{menuSections:n.menuSections,contents:n.contents,categoryName:n.categoryName,articleName:n.articleName,datePublished:n.datePublished,dateModified:n.dateModified}},[v("h1",[n._v("Pug(HTMLテンプレートエンジン)の書き方まとめ")]),n._v(" "),v("h2",{attrs:{id:"in-link-overview"}},[n._v("Pugの概要")]),n._v(" "),v("p",[n._v("\n      HTMLのテンプレートエンジンの１つ\n      "),v("a",{attrs:{href:"https://pugjs.org/api/getting-started.html",target:"_blank"}},[n._v("Pug")]),n._v("\n      (旧Jade)の書き方についてまとめてみました。Webアプリケーションフレームワーク\n      "),v("a",{attrs:{href:"https://expressjs.com/ja/",target:"_blank"}},[n._v("Express")]),n._v("\n      のプロジェクト作成コマンドでは現在はデフォルトでJadeをテンプレートエンジンとして使うようになっていますが、\n      今後JadeはPugに名称を変え移行されるようなのでPugに慣れておくのが良いでしょう。\n    ")]),n._v(" "),v("p",[n._v("\n      また、\n      "),v("a",{attrs:{href:"https://github.com/irisAsh/express-todo-tutorial/tree/master/views/pug",target:"_blank"}},[n._v("こちら")]),n._v("\n      にソースコードをまとめたものを置いておきます。\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-filename"}},[n._v("Pugのファイル名")]),n._v(" "),v("p",[n._v("Pugのファイルは拡張子"),v("code",[n._v(".pug")]),n._v("を使います。")]),n._v(" "),v("h2",{attrs:{id:"in-link-html-tag"}},[n._v("PugでHTMLタグを扱う")]),n._v(" "),v("p",[n._v("\n      Pugでは、HTMLタグは"),v("code",[n._v("<>")]),n._v("を省略した形で記述できます。\n      またタグの次の行で段落を１段落として記述するとそのタグで囲まれるようになります。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\nh1 HTMLタグ\ndiv\n  p パラグラフ\n  center センタリング\n  ul\n    li あ\n    li い\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n<h1>HTMLタグ</h1>\n<div>\n  <p>パラグラフ</p>\n  <center>センタリング</center>\n  <ul>\n    <li>あ</li>\n    <li>い</li>\n  </ul>\n</div>\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-inline"}},[n._v("Pugで文章を書く")]),n._v(" "),v("p",[n._v("\n      文章はタグの後に半角スペースを空けてから記述します。\n    ")]),n._v(" "),v("p",[n._v("\n      文章が長くなって改行したい場合は次の行の先頭にパイプ"),v("code",[n._v("|")]),n._v("をつけて続けて書くと、HTML表示は１行のままでコードとしての改行をすることができます。\n    ")]),n._v(" "),v("p",[n._v("\n      HTML文章を改行したい場合は"),v("code",[n._v("br")]),n._v("タグを使ってください。インライン要素のタグを使う時は改行して先頭にタグを記述してください。\n    ")]),n._v(" "),v("p",[n._v("\n      「タグ名＋ドット」を記述し、次の行を１段下げて書くとそのタグで囲まれるように描画されます。ヒアドキュメントのようにして文章を記述することができます。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\np この\n  | 文章は\n  em 全て\n  | 一行の\n  span 表示\n  | になります。\n  br\n  | 改行はbrを使います。\np.\n  また、「タグ名＋ドット」後の段落は、\n  そのタグによって囲まれます。\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n<p>\n  この文章は<em>全て</em>一行の<span>表示</span>になります。<br>改行はbrを使います。\n</p>\n\n<p>また、「タグ＋ドット」後の段落は、 そのタグによって囲まれます。</p>\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-interpolation"}},[n._v("Pugで文字列補間する")]),n._v(" "),v("p",[n._v("\n      Pugでは変数を定義し、その変数を使って文章を作成することができます。\n    ")]),n._v(" "),v("p",[v("code",[n._v("- var 変数名 = 値")]),n._v("という記述で変数を定義できます。\n      そして"),v("code",[n._v("#{")]),n._v("と"),v("code",[n._v("}")]),n._v("で変数を囲むことで定義した値を描画することができます。\n    ")]),n._v(" "),v("p",[n._v("\n      「タグ名＋ドット」の記法を使用している場合は、"),v("code",[n._v("#[")]),n._v("と"),v("code",[n._v("]")]),n._v("で囲まれた範囲でタグと変数の記述ができます。\n    ")]),n._v(" "),v("p",[n._v("\n      また、"),v("code",[n._v("#{}")]),n._v("内で"),v("code",[n._v("{")]),n._v(", "),v("code",[n._v("}")]),n._v("の文字を使いたい時があるかもしれません。\n      その場合は"),v("code",[n._v("'{'")]),n._v("や"),v("code",[n._v("'}'")]),n._v("のように"),v("code",[n._v("'")]),n._v("で囲うことでエスケープすることができます。\n    ")]),n._v(" "),v("p",[v("code",[n._v("#{}")]),n._v("自体を通常の文字として使いたい場合は"),v("code",[n._v("\\#{}")]),n._v("でエスケープできます。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\n- var name = 'Pug'\np 私の名前は#{name}です。\np.\n  私の名前は#[em #{name}]です。\np 私の名前は#{'{' + name + '}'}です。\np 私の名前は\\#{name}です。\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n<p>私の名前はPugです。</p>\n<p>私の名前は<em>Pug</em>です。</p>\n<p>私の名前は{Pug}です。</p>\n<p>私の名前は#{name}です。</p>\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-attribute"}},[n._v("Pugで属性を設定する")]),n._v(" "),v("p",[n._v("Pugでは"),v("code",[n._v('タグ名(属性名="")')]),n._v("と記述することでHTMLの属性を設定できます。")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v('\na(href="https://pugjs.org/api/getting-started.html" target="_blank")\n  | Pug公式サイト\n    ')]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v('\n<a href="https://pugjs.org/api/getting-started.html" target="_blank">Pug公式サイト</a>\n    ')]),n._v(" "),v("p",[v("code",[n._v("input")]),n._v("タグなどの真偽値を設定する場合は"),v("code",[n._v("属性名")]),n._v("のみを記載するか、"),v("code",[n._v("属性名=真偽値")]),n._v("の形式で書くことができます。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v('\ninput(type="checkbox" checked)\n| Pug\n|\ninput(type="checkbox" checked=true)\n| Jade\n|\ninput(type="checkbox" checked=false)\n| EJS\n    ')]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v('\n<input type="checkbox" checked="checked">Pug</input>\n<input type="checkbox" checked="checked">Jade</input>\n<input type="checkbox">EJS</input>\n    ')]),n._v(" "),v("h3",[n._v("style属性")]),n._v(" "),v("p",[n._v("\n      style属性を"),v("code",[n._v("{プロパティ: 値}")]),n._v("のようにオブジェクトの形式で記述できます。\n      プロパティ名にハイフン"),v("code",[n._v("-")]),n._v("がある場合は"),v("code",[n._v("'")]),n._v("で囲む必要があるので注意してください。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\np(style=\"color:white;background-color:black;\") 通常のHTMLでのStyle指定\np(style={color: 'red', 'background-color': 'yellow'}) Pugでオブジェクト形式でのStyle指定\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v('\n<p style="color:white;background-color:black;")>通常のHTMLでのStyle指定</p>\n<p style="color:red;background-color:yellow;")>Pugでオブジェクト形式でのStyle指定</p>\n    ')]),n._v(" "),v("h3",[n._v("class/id属性")]),n._v(" "),v("p",[n._v("\n      class属性、id属性も他と同様に指定することができますが、いくつか別の記法があります。\n    ")]),n._v(" "),v("p",[n._v("\n      class属性は配列の形式"),v("code",[n._v("class=['クラス名1', 'クラス名2', ...]")]),n._v("で記述することができます。\n    ")]),n._v(" "),v("p",[n._v("\n      条件によってclass属性を指定したい場合は、"),v("code",[n._v("class={クラス名: 条件式}")]),n._v("の形式で記述すると、条件が真の値の時のみclass属性が指定されるようになります。\n    ")]),n._v(" "),v("p",[n._v("\n      またCSS表記のように、"),v("code",[n._v(".クラス名")]),n._v("でclass属性を、"),v("code",[n._v("#ID名")]),n._v("でid属性を指定することができます。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\np(class=\"a1 a2\") 通常\np(class=['b1', 'b2']) 配列で指定\n- classNames = ['c1', 'c2']\np(class=classNames) 変数で指定\np.d1.d2 .class名で指定\np#e1 #id名で指定\n- var currentUrl = '/test'\np(class={f1: currentUrl === '/'}) 条件で指定\np(class={f1: currentUrl === '/test'}) 条件で指定\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v('\n<p class="a1 a2">通常</p>\n<p class="b1 b2">配列で指定</p>\n<p class="c1 c2">変数で指定</p>\n<p class="d1 d2">.class名で指定</p>\n<p id="e1">#id名で指定</p>\n<p>条件で指定</p>\n<p class="f1">条件で指定</p>\n    ')]),n._v(" "),v("h2",{attrs:{id:"in-link-comment"}},[n._v("Pugでコメントを書く")]),n._v(" "),v("p",[n._v("コメントには通常のHTMLコメントとHTMLには表示されないPugファイル内でのコメントの２種類があります。")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\n// この行はコメントです。\n  HTMLのコメントになります。\n//- このコメントはHTMLに表示されません。\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n\x3c!-- この行はコメントです。HTMLのコメントになります。 --\x3e\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-loop"}},[n._v("Pugの繰り返し記法を使う")]),n._v(" "),v("p",[n._v("\n      同様の処理を繰り返す場合や、配列内の中身を順に参照するなどプログラミングではお馴染みの繰り返し処理をPugでも扱うことができます。\n    ")]),n._v(" "),v("p",[v("code",[n._v("for")]),n._v("の記法はよくある繰り返し構文と変わりありません。\n      また、"),v("code",[n._v("each")]),n._v("を使えばJavascrptでの配列関数"),v("code",[n._v("forEach")]),n._v("のように配列の中身を順に参照することができます。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\n- for (var i = 0; i < 3; i++)\n  p #{i}\n- var arr = ['Pug', 'Jade', 'EJS']\neach el in arr\n  p #{el}\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n<p>0</p>\n<p>1</p>\n<p>2</p>\n<p>Pug</p>\n<p>Jade</p>\n<p>EJS</p>\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-code"}},[n._v("PugのBuffered Codeを使う")]),n._v(" "),v("p",[n._v("\n      Buffered Codeという記法で、Javascriptコードで値を評価してその返り値をHTMLに使用できます。\n      またBufferd Codeで文字列を使えばエスケープ文字は元のままの文字で扱うことができます。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\n- var name = 'Pug'\np= '私の名前は' + name + 'です。'\np= '<>の文字をエスケープしなくても表示できます。'\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n<p>私の名前はPugです。</p>\n<p><>の文字をエスケープしなくても表示できます。</p>\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-case"}},[n._v("PugのCase構文を使う")]),n._v(" "),v("p",[n._v("\n      Pugでは条件分岐を扱う場合の１つにCase構文を使って記述することができます。\n      この構文はJavascriptでのSwitch構文と同様のものです。\n    ")]),n._v(" "),v("p",[v("code",[n._v("when")]),n._v("句の書き方は２つで次の行に一段下げて記述するか、\n      もしくは"),v("code",[n._v("when: ")]),n._v("の後に続けて１行で書くことができます。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\n- var rank = 'first'\ncase rank\n  when 'first'\n    p １番目\n  when 'second': p ２番目\n  when 'third'\n    - break\n  when 'fourth'\n  when 'fifth'\n    p ４番目と５番目\n  default\n    p その他\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n\x3c!-- rank = 'frist' の時 --!>\n<p>１番目</p>\n\n\x3c!-- rank = 'second' の時 --!>\n<p>２番目</p>\n\n\x3c!-- rank = 'third' の時 --!>\n\x3c!-- 何も表示されません --\x3e\n\n\x3c!-- rank = 'fourth' の時 --!>\n<p>４番目と５番目</p>\n\n\x3c!-- rank = 'fifth' の時 --!>\n<p>４番目と５番目</p>\n\n\x3c!-- rank = 'sixth' の時 --!>\n<p>その他</p>\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-if"}},[n._v("PugのIF構文を使う")]),n._v(" "),v("p",[n._v("\n      Case構文の他にIF構文でも条件分岐をすることができます。\n      プログラミングによくあるIF構文と同様です。\n      またRubyで馴染みのあるUnless構文もあります。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\n- var num = 0\nif num === 0\n  p zero\nelse if num === 1\n  p one\nelse\n  p other\n- var condition = false\nunless condition\n p FALSEです\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n\x3c!-- num = 0 の時 --!>\n<p>zero</p>\n\n\x3c!-- num = 1 の時 --!>\n<p>one</p>\n\n\x3c!-- num = 2 の時 --!>\n<p>other</p>\n\n\x3c!-- condition = true の時 --!>\n\x3c!-- 何も表示されません --\x3e\n\n\x3c!-- condition = false の時 --!>\n<p>FALSEです</p>\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-mixin"}},[n._v("PugのMixinを使う")]),n._v(" "),v("p",[n._v("\n      PugではMixinを使うことができます。Mixinを使うと共通処理をメソッド化して呼び出すことができます。\n    ")]),n._v(" "),v("p",[v("code",[n._v("mixin Mixin名(変数,...)")]),n._v("で宣言しておくと、"),v("code",[n._v("+Mixin名(値,...)")]),n._v("で呼び出せます。\n    ")]),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",[n._v("\nmixin kao(left, right, color)\n  p(style='color:' + color) #{left} >【･ω･`三´･ω･】< #{right}\n+kao('Pug', 'Jade', 'blue')\n+kao('EJS', 'Handlebars', 'red')\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v('\n<p style="color:blue">Pug >【･ω･`三´･ω･】< Jade</p>\n<p style="color:red">EJS >【･ω･`三´･ω･】< Handlebars</p>\n    ')]),n._v(" "),v("h2",{attrs:{id:"in-link-includes"}},[n._v("PugのIncludesを使う")]),n._v(" "),v("p",[n._v("\n      複数のページで共通のレイアウトやスクリプトを使いたい場合は、PugのIncludesという機能を利用することで実現できます。\n    ")]),n._v(" "),v("p",[n._v("\n      メインのファイル"),v("code",[n._v("include_example.pug")]),n._v("を用意し下記のファイル構成で共通ファイルを作成します。\n    ")]),n._v(" "),v("p",[n._v("\n      この後で説明するExtendsの機能と共通化する点は同じですが、こちらは文字通りメインのPugファイルに共通ファイルと取り込んでいる形になります。\n    ")]),n._v(" "),v("code-box",[n._v("\n.\n├── include_example.pug\n└── includes\n    ├── common_css.css\n    ├── common_script.js\n    └── common_view.pug\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("code-box",{attrs:{fileName:"include_example.pug"}},[n._v("\ndoctype html\nhtml\n  head\n    style\n      include includes/common_css.css\n  body\n    h1 インクルード\n    div\n      include includes/common_view.pug\n      p.include-class CSSをインクルードしています\n      script\n        include includes/common_script.js\n    ")]),n._v(" "),v("p"),n._v(" "),v("code-box",{attrs:{fileName:"common_css.css"}},[n._v("\n.include-class\n{\n  color: red;\n}\n```\n\n```common_view.pug.prettyprint\n// common_view.pug\n\ndiv\n  p この箇所はインクルードされています\n    ")]),n._v(" "),v("p"),n._v(" "),v("code-box",{attrs:{fileName:"common_script.js"}},[n._v("\nconsole.log('JSファイルがインクルードされました');\n    ")]),n._v(" "),v("p",[v("code",[n._v("include_example.pug")]),n._v("がコンパイルされてできるHTMLは次のようになります。")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("code-box",[n._v("\n<html>\n<head>\n  <style>\n    .include-class\n    {\n      color: red;\n    }\n  </style>\n</head>\n<body>\n  <h1>インクルード</h1>\n  <div>\n    <div>\n      <p>この箇所はインクルードされています</p>\n    </div>\n    <p class=\"include-class\">CSSをインクルードしています</p>\n    <script>\n      console.log('JSファイルがインクルードされました');\n    <\/script>\n  </div>\n</body>\n</html>\n    ")]),n._v(" "),v("h2",{attrs:{id:"in-link-extends"}},[n._v("PugのExtendsを使う")]),n._v(" "),v("p",[n._v("\n      Extendsを使っても共通化することができます。\n      Exntendsの場合は共通の内容が書かれたテンプレートファイルに対して、各々個別の画面の内容を組み込む形になります。\n    ")]),n._v(" "),v("p",[n._v("\n      ファイル構成を下記のようにします。\n    ")]),n._v(" "),v("code-box",[n._v("\n├── template_example.pug\n├── templates\n│   └── layout.pug\n└── javascripts\n    ├── test_0.js\n    ├── test_1.js\n    ├── test_2.js\n    ├── test_3.js\n    └── test_4.js\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("Pug")]),n._v(" "),v("p",[n._v("\n      先ずはテンプレートファイルを用意します。\n      "),v("code",[n._v("block ブロック名")]),n._v("と記述した箇所が、後で個別の内容を置換する箇所となります。\n    ")]),n._v(" "),v("code-box",{attrs:{fileName:"templates/layout.pug"}},[n._v("\ndoctype html\nhtml\n  head\n    script(src='/javascripts/test_0.js')\n    block scripts\n      script(src='/javascripts/test_1.js')\n  body\n    h1 テンプレート\n    block content\n    ")]),n._v(" "),v("p"),n._v(" "),v("code-box",{attrs:{fileName:"javascripts/test_0.js"}},[n._v("\n// test_1.js, ..., test_4.jsも出力の値を変えただけの内容です\n\nconsole.log('Test: 0');\n    ")]),n._v(" "),v("p",[n._v("\n      使い方ですが"),v("code",[n._v("extends ファイル名")]),n._v("でまずテンプレートファイルを継承します。\n      あとはテンプレートのブロック箇所に対して置換するだけです。"),v("code",[n._v("block ブロック名")]),n._v("でブロック箇所を指定し次の行で組み込む内容を記述します。\n    ")]),n._v(" "),v("p",[n._v("\n      また、"),v("code",[n._v("block")]),n._v("には"),v("code",[n._v("append")]),n._v(", "),v("code",[n._v("prepend")]),n._v("を記述することでテンプレートに組み込む順番を指定できます。\n      "),v("code",[n._v("block append")]),n._v("でテンプレートの内容の後に、"),v("code",[n._v("block prepend")]),n._v("で前に組み込むことができます。\n    ")]),n._v(" "),v("code-box",{attrs:{fileName:"template_example.pug"}},[n._v("\nextends templates/layout\n\nblock append scripts\n  script(src='/javascripts/pug/test_3.js')\n\nblock prepend scripts\n  script(src='/javascripts/pug/test_2.js')\n\n//-\n  下記のコメントを外すとscriptsのブロックは上書きされます\n//-\n  block scripts\n    script(src='/javascripts/pug/test_4.js')\n\nblock content\n  p テンプレートを読み込んでます\n    ")]),n._v(" "),v("p"),n._v(" "),v("strong",[n._v("HTML")]),n._v(" "),v("p",[n._v("HTMLに変換後は次のようなコードになります。")]),n._v(" "),v("code-box",[n._v('\n<html>\n<head>\n  <script src="/javascripts/pug/test_0.js"><\/script>\n  <script src="/javascripts/pug/test_2.js"><\/script>\n  <script src="/javascripts/pug/test_1.js"><\/script>\n  <script src="/javascripts/pug/test_3.js"><\/script>\n</head>\n<body>\n  <h1>テンプレート</h1>\n  <p>テンプレートを読み込んでます</p>\n</body>\n</html>\n    ')])],1)}),[],!1,null,null,null);e.default=component.exports}}]);