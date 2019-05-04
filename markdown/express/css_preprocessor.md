# ExpressでCSSプリプロセッサを利用する

ここではExpressでCSSプリプロセッサを導入します。CSSプリプロセッサはCSSメタ言語とも呼ばれCSSを記述するための言語です。このメタ言語を使うことによってどういったメリットがあるかと言いますと、CSSコード内で変数を定義して利用したり、少ないコードで記述できたり、構造的にコードを記述できたりします。  
  
CSSプリプロセッサにはいくつか種類がありますが、今回はLess, Sass/Scss, Stylusを説明します。  

<h2 id="less-overview">Lessについて</h2>

[Less](http://lesscss.org/)はLeaner CSSの略で、Javascript製のCSSメタ言語です。現在のところ他のメタ言語と比べて[Github](https://github.com/less/less.js)は一番多くなっています。しかし、現在は利用は減少傾向にありSassの利用が多くなっています。  
Lessの記法はCSS記法にかなり近いので、既存のCSSコードをLessコードとして利用することができます。また、Lessファイルは拡張子`.less`です。  

<h2 id="less-generate">プロジェクト生成時にLessを導入する</h2>

`express-generator`でプロジェクトを作成する際に、Lessを利用するように設定することができます。  
下記のようにプロジェクトを作成します。  

```shell.prettyprint
$ express --css=less プロジェクト名
```

<h2 id="less-including">開発途中でLessを導入する</h2>

既に生成済みのプロジェクトにLessを導入してみます。手元に既に作成済みのプロジェクトがない場合は[こちら](https://github.com/irisAsh/express-todo-tutorial/tree/initial-template)にサンプルプロジェクトがあるので利用してください。  

先ずはExpressでLessファイルをコンパイルするためのモジュール[less-middleware](https://github.com/emberfeather/less.js-middleware)をインストールします。  

```shell.prettyprint
$ yarn add less-middleware
```

`less-middleware`をコードに組み込みます。下記のように`app.js`を編集してみましょう。  

```app.js.prettyprint
// app.js
省略
...
var logger = require('morgan');
var lessMiddleware = require('less-middleware'); // 追加
...

...
app.use(lessMiddleware(path.join(__dirname, 'public'))); // 追加
app.use(express.static(path.join(__dirname, 'public')));
```

後は`public/stylesheets/`以下のCSSファイルを`.less`に拡張子を変えて適宜Lessの記法に変更するだけです。  
Less導入後のサンプルは[こちら](https://github.com/irisAsh/express-todo-tutorial/tree/tutorial-ver-less)です。  

<h2 id="sass-overview">Sass/Scssについて</h2>

[Sass](https://sass-lang.com/)はSyntactically Awesome Style Sheetsの略で、Ruby製のCSSメタ言語です。元々はRubyでの実装ですが、現在は他言語の実装も用意されています。現在Sassは最も多く利用されているようで、Sassを利用したCSSフレームワークもあります。  
Expressで利用する場合は[node-sass](https://github.com/sass/node-sass)（実際にはその拡張[node-sass-middleware](https://github.com/sass/node-sass-middleware)）を使って組み込むことができます。  
またScssはSassの別構文でCSS記法に近い形で記述することができる。Sassの場合は`.sass`の拡張子を、Scssの場合は`.scss`の拡張子を使います。  

<h2 id="sass-generate">プロジェクト生成時にSassを導入する</h2>

Less同様で`express-generator`でプロジェクトを作成する際に、Sassを利用するように設定することができます。  
下記のようにプロジェクトを作成します。  

```shell.prettyprint
$ express --css=sass プロジェクト名
```

<h2 id="change-scss">SassをScssに切り替える</h2>

Scss記法を使うためには、プロジェクト生成でSassを指定した後に設定をScss用に変更する必要があります。  

**ファイル拡張子の変更する**

ファイルの拡張子は`.scss`に変えてください。  

```shell.prettyprint
$ mv public/stylesheets/style.sass public/stylesheets/style.scss
```

**構文設定を変更する**

`node-sass-middleware`の構文設定を変更します。デフォルトでは設定はapp.jsに記述されています。  
`node-saas-middleware`の`indentedSyntax`を`true`にするとSass、`false`にするとScssに設定が変更できます。  

```app.js.prettyprint
// app.js
省略
...
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // falseにするとScssになります
  sourceMap: true
}));
```

後はファイルのSass記法をScss記法へ書き換えるだけです。  

<h2 id="sass-including">開発途中でSassを導入する</h2>

次に生成済みのプロジェクトにSassを導入します。先程と同様既存プロジェクトがない場合はサンプルプロジェクトは[こちら](https://github.com/irisAsh/express-todo-tutorial/tree/initial-template)をご利用ください。  

先程説明した通りExpressでSassを利用するには[node-sass-middleware](https://github.com/sass/node-sass-middleware)を利用します。  

```shell.prettyprint
$ yarn add node-sass-middleware
```

`app.js`でSassのコンパイル実装を追加します。  

```app.js.prettyprint
// app.js
省略
...
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware'); // 追加
...

...
// 追加
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
```

`public/stylesheets/`以下のCSSファイルの拡張子を`.sass`に変更してください。Scss利用の場合は先程の通り`indentedSyntax`を`false`にし拡張子を`.scss`にしてください。  
Sass導入後のサンプルは[こちら](https://github.com/irisAsh/express-todo-tutorial/tree/tutorial-ver-sass)です。  

<h2 id="stylus-overview">Stylusについて</h2>

[Stylus](http://stylus-lang.com/)はNode.js環境で利用できるCSSメタ言語です。LessやSassより後に作られた言語で、両方の記法を使うことができ、拡張機能も他に比べて豊富です。またJavascriptコードのような記法で変数定義や制御構文を記述することが出来ます。  
ただ現在のところは他の言語に比べて[github](https://github.com/stylus/stylus/)のスターが少なく、参考記事なども少ないです。  
ファイルの拡張子は`.styl`を使います。  

<h2 id="stylus-generate">プロジェクト生成時にStylusを導入する</h2>

他同様で`express-generator`でプロジェクトを作成する際に設定することができます。  
下記のようにプロジェクトを作成します。  

```shell.prettyprint
$ express --css=stylus プロジェクト名
```

<h2 id="stylus-including">開発途中でStylusを導入する</h2>

さて生成済みのプロジェクトにStylusを導入します。サンプルプロジェクトは[こちら](https://github.com/irisAsh/express-todo-tutorial/tree/initial-template)をご利用ください。  

StylusはNode.js環境で利用できるので、他のようにミドルウェアではなく[stylus](https://github.com/stylus/stylus/)そのままのインストールになります。  

```shell.prettyprint
$ yarn add stylus
```

Stylusコンパルのために`app.js`を編集しましょう。  

```app.js.prettyprint
// app.js
省略
...
var logger = require('morgan');
var stylus = require('stylus'); // 追加
...

...
app.use(stylus.middleware(path.join(__dirname, 'public'))); // 追加
app.use(express.static(path.join(__dirname, 'public')));
```

最後に`public/stylesheets/`以下のCSSファイルを`.styl`に拡張子を変更してください。  
Stylus導入後のサンプルは[こちら](https://github.com/irisAsh/express-todo-tutorial/tree/tutorial-ver-stylus)です。  
