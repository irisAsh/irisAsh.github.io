# Pug(HTMLテンプレートエンジン)の書き方まとめ

<h2 id="overview">Pugの概要</h2>

HTMLのテンプレートエンジンの１つ[Pug](https://pugjs.org/api/getting-started.html)(旧Jade)の書き方についてまとめてみました。Webアプリケーションフレームワーク[Express](https://expressjs.com/ja/)のプロジェクト作成コマンドでは現在はデフォルトでJadeをテンプレートエンジンとして使うようになっていますが、今後JadeはPugに名称を変え移行されるようなのでPugに慣れておくのが良いでしょう。  

<h2 id="filename">Pugファイル</h2>

Pugのファイルは拡張子`.pug`を使います。

<h2 id="html-tag">PugでHTMLタグを扱う</h2>

Pugでは、HTMLタグは`<>`を省略した形で記述できます。またタグの次の行で段落を１段落として記述するとそのタグで囲まれるようになります。

**Pug**

```pug.prettyprint
h1 HTMLタグ
div
  p パラグラフ
  center センタリング
  ul
    li あ
    li い
```

**HTML**

```html
<h1>HTMLタグ</h1>
<div>
  <p>パラグラフ</p>
  <center>センタリング</center>
  <ul>
    <li>あ</li>
    <li>い</li>
</div>
```

<h2 id="inline">Pugで文章を書く</h2>

文章はタグの後に半角スペースを空けてから記述します。
文章が長くなって改行したい場合は次の行の先頭にパイプ`|`をつけて続けて書くと、HTML表示は１行のままでコードとしての改行をすることができます。
HTML文章を改行したい場合は`br`タグを使ってください。インライン要素のタグを使う時は改行して先頭にタグを記述してください。
「タグ名＋ドット」を記述し、次の行を１段下げて書くとそのタグで囲まれるように描画されます。ヒアドキュメントのようにして文章を記述することができます。

**Pug**

```pug.prettyprint
p この
  | 文章は
  em 全て
  | 一行の
  span 表示
  | になります。
  br
  | 改行はbrを使います。
p.
  また、「タグ名＋ドット」後の段落は、
  そのタグによって囲まれます。
```

**HTML**

```html
<p>
  この文章は<em>全て</em>一行の<span>表示</span>になります。<br>改行はbrを使います。
</p>

<p>また、「タグ＋ドット」後の段落は、 そのタグによって囲まれます。</p>
```

<h2 id="interpolation">Pugで文字列補間する</h2>

Pugでは変数を定義し、その変数を使って文章を作成することができます。`- var 変数名 = 値`という記述で変数を定義できます。そして`#{`と`}`で変数を囲むことで定義した値を描画することができます。
また、「タグ名＋ドット」内の場合は`#[`と`]`で囲まれた範囲でタグと変数の記述ができます。
`#{}`内で`{`, `}`の文字を使いたい時があるかもしれません。その場合は`'{'}`, `'}'`と`'`で囲うことでエスケープすることができます。また、`#{}`自体を通常の文字として使いたい場合は`\#{}`でエスケープできます。

**Pug**

```pug.prettyprint
- var name = 'Pug'
p 私の名前は#{name}です。
p.
  私の名前は#[em #{name}]です。
p 私の名前は#{'{' + name + '}'}です。
p 私の名前は\#{name}です。
```

**HTML**

```html
<p>私の名前はPugです。</p>
<p>私の名前は<em>Pug</em>です。</p>
<p>私の名前は{Pug}です。</p>
<p>私の名前は#{name}です。</p>
```

<h2 id="attribute">Pugで属性を設定する</h2>

Pugでは`タグ名(属性名="")`と記述することでHTMLの属性を設定できます。

**Pug**

```pug.prettyprint
a(href="https://pugjs.org/api/getting-started.html" target="_blank")
  | Pug公式サイト
```

**HTML**

```html
<a href="https://pugjs.org/api/getting-started.html" target="_blank">Pug公式サイト</a>
```

`input`タグなどの真偽値を設定する場合は`属性名`のみを記載するか、`属性名=真偽値`の形式で書くことができます。

**Pug**

```pug.prettyprint
input(type="checkbox" checked)
| Pug
|
input(type="checkbox" checked=true)
| Jade
|
input(type="checkbox" checked=false)
| EJS
```

**HTML**

```html
<input type="checkbox" checked="checked">Pug
<input type="checkbox" checked="checked">Jade
<input type="checkbox">EJS
```

### style属性

style属性を`{プロパティ: 値}`のようにオブジェクトの形式で記述できます。プロパティ名にハイフン`-`がある場合は`'`で囲む必要があるので注意してください。

**Pug**

```pug.prettyprint
p(style="color:white;background-color:black;") 通常のHTMLでのStyle指定
p(style={color: 'red', 'background-color': 'yellow'}) Pugでオブジェクト形式でのStyle指定
```

**HTML**

```html
<p style="color:white;background-color:black;")>通常のHTMLでのStyle指定</p>
<p style="color:red;background-color:yellow;")>Pugでオブジェクト形式でのStyle指定</p>
```

### class/id属性

class属性、id属性も他と同様に指定することができますが、いくつか別の記法があります。
class属性は配列の形式`class=['クラス名1', 'クラス名2', ...]`で記述することができます。条件によってclass属性を指定したい場合は`class={クラス名: 条件式}`の形式で記述すると、条件が真の値の時のみclass属性が指定されるようになります。
またCSS表記のように、`.クラス名`でclass属性を、`#ID名`でid属性を指定することができます。

**Pug**

```pug.prettyprint
p(class="a1 a2") 通常
p(class=['b1', 'b2']) 配列で指定
- classNames = ['c1', 'c2']
p(class=classNames) 変数で指定
p.d1.d2 .class名で指定
p#e1 #id名で指定
- var currentUrl = '/test'
p(class={f1: currentUrl === '/'}) 条件で指定
p(class={f1: currentUrl === '/test'}) 条件で指定
```

**HTML**

```html
<p class="a1 a2">通常</p>
<p class="b1 b2">配列で指定</p>
<p class="c1 c2">変数で指定</p>
<p class="d1 d2">.class名で指定</p>
<p id="e1">#id名で指定</p>
<p>条件で指定</p>
<p class="f1">条件で指定</p>
```

<h2 id="comment">Pugでコメントを書く</h2>

コメントには通常のHTMLコメントとHTMLには表示されないPugファイル内でのコメントの２種類があります。

**Pug**

```pug.prettyprint
// この行はコメントです。
  HTMLのコメントになります。
//- このコメントはHTMLに表示されません。
```

**HTML**

```html
<!-- この行はコメントです。HTMLのコメントになります。 -->
```

<h2 id="loop">Pugの繰り返し記法を使う</h2>

同様の処理を繰り返す場合や、配列内の中身を順に参照するなどプログラミングではお馴染みの繰り返し処理をPugでも扱うことができます。
`for`の記法はよくある繰り返し構文と変わりありません。また、`each`を使えばJavascrptでの配列関数`forEach`のように配列の中身を順に参照することができます。

**Pug**

```pug.prettyprint
- for (var i = 0; i < 3; i++)
  p #{i}
- var arr = ['Pug', 'Jade', 'EJS']
each el in arr
  p #{el}
```

**HTML**

```html
<p>0</p>
<p>1</p>
<p>2</p>
<p>Pug</p>
<p>Jade</p>
<p>EJS</p>
```

<h2 id="code">PugのBuffered Codeを使う</h2>

Buffered Codeという記法で、Javascriptコードで値を評価してその返り値をHTMLに使用できます。またBufferd Codeで文字列を使えばエスケープ文字は元のままの文字で扱うことができます。

**Pug**

```pug.prettyprint
- var name = 'Pug'
p= '私の名前は' + name + 'です。'
p= '<>の文字をエスケープしなくても表示できます。'
```

**HTML**

```html
<p>私の名前はPugです。</p>
<p><>の文字をエスケープしなくても表示できます。</p>
```

<h2 id="case">PugのCase構文を使う</h2>

Pugでは条件分岐を扱う場合の１つにCase構文を使って記述することができます。この構文はJavascriptでのSwitch構文と同様のものです。
`when`句の書き方は２つで次の行に一段下げて記述するか、もしくは`when: `の後に続けて１行で書くことができます。

**Pug**

```pug.prettyprint
- var rank = 'first'
case rank
  when 'first'
    p １番目
  when 'second': p ２番目
  when 'third'
    - break
  when 'fourth'
  when 'fifth'
    p ４番目と５番目
  default
    p その他
```

**HTML**

```html
<!-- rank = 'frist' の時 --!>
<p>１番目</p>

<!-- rank = 'second' の時 --!>
<p>２番目</p>

<!-- rank = 'third' の時 --!>
<!-- 何も表示されません -->

<!-- rank = 'fourth' の時 --!>
<p>４番目と５番目</p>

<!-- rank = 'fifth' の時 --!>
<p>４番目と５番目</p>

<!-- rank = 'sixth' の時 --!>
<p>その他</p>
```

<h2 id="if">PugのIF構文を使う</h2>

Case構文の他にIF構文でも条件分岐をすることができます。プログラミングによくあるIF構文と同様です。またRubyで馴染みのあるUnless構文もあります。

**Pug**

```pug.prettyprint
- var num = 0
if num === 0
  p zero
else if num === 1
  p one
else
  p other
- var condition = false
unless condition
 p FALSEです
```

**HTML**

```html
<!-- num = 0 の時 --!>
<p>zero</p>

<!-- num = 1 の時 --!>
<p>one</p>

<!-- num = 2 の時 --!>
<p>other</p>

<!-- condition = true の時 --!>
<!-- 何も表示されません -->

<!-- condition = false の時 --!>
<p>FALSEです</p>
```

<h2 id="mixin">PugのMixinを使う</h2>

PugではMixinを使うことができます。Mixinを使うと共通処理をメソッド化して呼び出すことができます。記法は`mixin Mixin名(変数,...)`で宣言して、呼び出しを`+Mixin名(値,...)`で行えます。

**Pug**

```pug.prettyprint
mixin kao(left, right, color)
  p(style='color:' + color) #{left} >【･ω･`三´･ω･】< #{right}
+kao('Pug', 'Jade', 'blue')    
+kao('EJS', 'Handlebars', 'red') 
```

**HTML**

```html
<p style="color:blue">Pug >;【･ω･`三´･ω･】<; Jade</p>
<p style="color:red">EJS >;【･ω･`三´･ω･】<; Handlebars</p>
```
