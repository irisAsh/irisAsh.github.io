(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{249:function(e,t,o){var content=o(253);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(11).default)("40aafe93",content,!0,{sourceMap:!1})},250:function(e,t,o){"use strict";var n={name:"SideMenu",props:["menuSections"],computed:{routePath:function(){return this.$route.path}}},r=o(9),component=Object(r.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("aside",{attrs:{id:"sidebar"}},e._l(e.menuSections,function(t){return o("section",{key:t.category},[o("div",{staticClass:"menu-overview"},[e._v(e._s(t.category))]),e._v(" "),e._l(t.menus,function(t){return o("div",{key:t.linkPath,staticClass:"menu-item"},[o("nuxt-link",{class:e.routePath==t.linkPath?"access-now":"",attrs:{to:t.linkPath}},[e._v("\n          "+e._s(t.title)+"\n        ")])],1)})],2)}),0)])},[],!1,null,null,null);t.a=component.exports},251:function(e,t){e.exports='<section><h1>Express入門（環境設定）</h1>\n<p>ここでは簡易なTODOアプリを作りながらNodeJSのWebアプリケーションフレームワーク <a href="https://expressjs.com/">Express</a> の使い方を学んでいきます。<br />\n<a href="https://github.com/irisAsh/express-todo-tutorial/tree/master">こちら</a>に完成済みのサンプルを置いておきます。サンプルは後記事の<a href="https://irisash.github.io/express/editrouting/">Expressのルーティングの設定</a>、<a href="https://irisash.github.io/express/mongodb/">ExpressでMongoDBを使う</a>の内容を含んでいます。</p>\n<p><strong>環境</strong></p>\n<ul>\n<li>NodeJS v8.15.0</li>\n<li>Express v4.16.0</li>\n</ul>\n<h2 id="setting">環境設定</h2>\n<p>プロジェクト作成から起動するまでの設定手順を説明していきます。</p>\n<h2 id="express-generator">express-generator のインストール</h2>\n<p>下記のコマンドで<code>express-generator</code>をグローバルインストールします。</p>\n<pre><code class="language-sh.prettyprint">$ yarn install express-generator -g\n</code></pre>\n<h2 id="init-project">プロジェクトの作成</h2>\n<p><code>express-generator</code>を使用すると簡単にWebアプリケーションプロジェクトを最小構成で生成できます。任意のフォルダで次のコマンドを実行してください。</p>\n<pre><code class="language-sh.prettyprint">$ express express-todo-tutorial --view=pug --git\n</code></pre>\n<p>実行すると<code>express-todo-tutorial</code>というフォルダが作成されます。このフォルダの中にWebアプリケーションを動かす最低限のファイルが用意されています。<br />\n先程実行した<code>express</code>コマンドでいくつかのオプションを使っているので説明しておきます。また、オプションにはここで使っていないものもあります。<code>express -h</code>を実行するとオプションの一覧が見れるので、興味があるものを使ってみてください。</p>\n<p><strong>--view=pug</strong></p>\n<p>このオプションは使用するテンプレートエンジンを指定します。ここでは <a href="https://pugjs.org/api/getting-started.html">Pug</a>(旧Jade) と呼ばれるテンプレートを指定しています。テンプレートエンジンは他にも色々あるので自分の好みにあったものを指定してください。</p>\n<p><strong>--git</strong></p>\n<p>このオプションをつけると<code>.gitignore</code>を最初に作成してくれます。最低限のGit管理外設定をしてくれるので、Git管理をする場合は指定しましょう。</p>\n<p>作成されたプロジェクトフォルダの初期構成は以下のようになっています。</p>\n<pre><code>.\n├── app.js\n├── bin\n│   └── www\n├── package.json\n├── public\n│   ├── images\n│   ├── javascripts\n│   └── stylesheets\n│       └── style.css\n├── routes\n│   ├── index.js\n│   └── users.js\n└── views\n    ├── error.pug\n    ├── index.pug\n    └── layout.pug\n</code></pre>\n<p>Webアプリケーションを作成したことがある方は大体の内容はわかるかと思います。初学者の方は作りながら説明していきますので、大まかで良いのでどのファイルがどこにあるかを覚えておけば良いでしょう。</p>\n<h2 id="running">起動確認</h2>\n<p>初期作成されたプロジェクトを起動して動作確認をしておきましょう。下記のコマンドで起動確認できます。プロジェクトフォルダ内に移動した後に<code>yarn install</code>でパッケージを取得しています。最後のコマンドが実際にExpressを起動するコマンドになります。</p>\n<pre><code>$ cd express-todo-tutorial\n$ yarn install\n$ DEBUG=express-todo-tutorial:* yarn start\n</code></pre>\n<p>コマンド実行後にブラウザから<a href="http://localhost:3000">http://localhost:3000</a>にアクセスしてみましょう。以下のように画面が表示されれば起動完了です。<br />\nまた、起動を終了するときは<code>Ctrl+c</code>で終了することができます。</p>\n<img src="images/express/gettingstarted/run-start.png" alt="起動確認" title="起動確認" style="max-height:400px;">\n<p>このままでも開発を進めることはできますが、ファイルを編集する度にサーバー停止・<code>yarn stat</code>実行をするのは手間になるので、<a href="https://github.com/remy/nodemon">nodemon</a> をインストールしておきましょう。<code>nodemon</code>を使うとファイル更新の度に自動でサーバーを再起動してくれます。</p>\n<pre><code>$ yarn add nodemon --dev\n</code></pre>\n<p>また、起動コマンドもスクリプトに定義しておきましょう。<code>package.json</code>に以下のようにスクリプトを追加します。</p>\n<pre><code class="language-json.prettyprint"># package.json\n  ...\n  &quot;scripts&quot;: {\n    &quot;start&quot;: &quot;node ./bin/www&quot;,\n    &quot;devstart&quot;: &quot;nodemon ./bin/www&quot;, # 追加\n    &quot;debugstart&quot;: &quot;DEBUG=express-todo-tutorial:* yarn run devstart&quot; # 追加\n  },\n</code></pre>\n<p>次のコマンドを実行して起動を確認しましょう。</p>\n<pre><code>$ yarn run debugstart\n</code></pre>\n<p><a href="http://localhost:3000">http://localhost:3000</a>で先程と同様に画面が表示されればOKです。<code>views/index.pug</code>を編集して<code>nodemon</code>の挙動を確認してみましょう。</p>\n<pre><code class="language-pug.prettyprint"># views/index.pug\n\nextends layout               \n                             \nblock content                \n  h1= title                  \n  p Welcome to #{title} !!!!!  # !!!!!を追加\n</code></pre>\n<p>サーバーが自動で再起動されて画面が変更されていることが確認できます。</p>\n</section>\n'},252:function(e,t,o){"use strict";var n=o(249);o.n(n).a},253:function(e,t,o){(e.exports=o(10)(!1)).push([e.i,".article-timestamp{margin-top:1.5rem;padding-top:.5rem;border-top:1px solid #aaa;color:#aaa;display:flex;flex-direction:row}.timestamp-container{display:flex;flex-direction:row;justify-content:center;align-items:center;padding-right:1rem}.timestamp-container i{margin-right:.4rem}",""])},254:function(e,t,o){"use strict";o(251);var n={name:"TableContent",props:["articleMd"],computed:{getInternalLinks:function(){if(!this||!this.$props||!this.$props.articleMd)return[];for(var e,t=/<h2 id="(.*)">(.*)<\/h2>/gm,o=[];null!=(e=t.exec(this.$props.articleMd));)e[1]&&e[2]&&o.push({id:e[1],title:e[2]});return o||[]}}},r=o(9),component=Object(r.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"table-content"}},[o("aside",{attrs:{id:"table-content-list"}},e._l(e.getInternalLinks,function(t){return o("div",{key:t.id,staticClass:"link-container"},[o("nuxt-link",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#"+t.id,expression:"'#' + internalLink.id"}],attrs:{to:""}},[e._v("\n        "+e._s(t.title)+"\n      ")])],1)}),0)])},[],!1,null,null,null);t.a=component.exports},255:function(e,t,o){"use strict";var n={name:"ArticleTimestamp",props:["createdAt","updatedAt"]},r=(o(252),o(9)),component=Object(r.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"article-timestamp"},[o("div",{staticClass:"timestamp-container"},[o("i",{staticClass:"far fa-clock"}),e._v(" "),o("p",[e._v(e._s(e.createdAt))])]),e._v(" "),o("div",{staticClass:"timestamp-container"},[o("i",{staticClass:"fas fa-clock"}),e._v(" "),o("p",[e._v(e._s(e.updatedAt))])])])},[],!1,null,null,null);t.a=component.exports},256:function(e){e.exports={tutorial:{category:"入門",iconClass:"fas fa-home",menus:{setup:{linkPath:"/rails/setup/",title:"環境設定",subTitle:"Gem / Bundle",menuIcon:"fas fa-home",headerTitle:"Ruby on Rails 5 の環境設定",headerDescription:"Ruby on Rails 5 の環境設定について説明します。ここでは、Rails new は使わずプロジェクト内でGemを管理してプロジェクトを作成します。また今後の記事では入門としてToDoアプリを作成しながら解説を進めていきます。"},use_mariadb:{linkPath:"/rails/use_mariadb/",title:"MariaDBを利用する",subTitle:"MariaDB",menuIcon:"fas fa-coins",headerTitle:"Ruby on RailsでMariaDBを利用する",headerDescription:"Railsプロジェクト作成直後にMariaDBを導入する手順を説明します。Rails初期設定ではSQLite3を利用するようになっていますが、プロジェクト規模が多くなる場合は関係性のあるデータベースを利用する方が良いです。"},scaffold:{linkPath:"/rails/scaffold/",title:"scaffoldを使う",subTitle:"rails generate scaffold",menuIcon:"fas fa-folder",headerTitle:"rails generate scaffoldを使ってページを追加する",headerDescription:"rails generate scaffoldを使って新規ページを追加してみます。scaffoldを使用するとコントローラー、ビュー、モデル等の必要とするファイルが全て自動生成されます。config/application.rbを編集して任意の単位で自動生成の拒否設定をすることもできます。"},use_hamlit:{linkPath:"/rails/use_hamlit/",title:"Hamlitを使う",subTitle:"hamlit-rails",menuIcon:"fas fa-crown",headerTitle:"HTMLテンプレートHamlitを使う",headerDescription:"Rails標準のHTMLテンプレートはERBが使われています。他にもHamlやSlimといったものがありますが、今回はHamlitというHTMLテンプレートを使う方法を説明します。HamlitはHamlの拡張でHamlをより高速にしたものです。記法はHamlと同様なのでHamlユーザーも利用しやすいでしょう。"},add_page:{linkPath:"/rails/add_page/",title:"画面作成の基本",subTitle:"rails generate controller",menuIcon:"far fa-newspaper",headerTitle:"Railsで新規画面を作成する基本な流れ",headerDescription:"Railsで新規画面を作成する基本的な流れを説明します。今回は自動生成を使います。rails generate controllerでビューとコントローラーの自動生成をし、適宜画面を編集し画面を作成していきます。"},use_devise:{linkPath:"/rails/use_devise/",title:"Deviseで認証を追加する",subTitle:"Devise",menuIcon:"fas fa-passport",headerTitle:"Deviseを利用して認証を追加する",headerDescription:"Deviseを使ってユーザー認証処理を追加して見ます。Deviseはサインアップやログインなど認証の処理を提供してくれる便利なGemです。Deviseは複雑で柔軟性はないですが多機能を提供しているので独自のカスタマイズがなければとても有効です。"}}},support_tool:{category:"開発支援ツール",iconClass:"fas fa-hands-helping",menus:{use_rubocop:{linkPath:"/rails/use_rubocop/",title:"RuboCopを使う",subTitle:"RuboCop",menuIcon:"fas fa-robot",headerTitle:"RuboCopを導入してコードを整理する",headerDescription:"RubocopはRubyコードのスタイルガイドに沿ってコード解析をしてくれるツールです。プロジェクトの開発で実装する人数が増えればソースコードの記述が統一されなくなっていきます。コード解析ツールを使えばスタイルガイドに順守していない場合に警告を表示して知らせてくれます。"}}}}},285:function(e,t){e.exports='<section><h1>rails generate scaffoldを使ってページを追加する</h1>\n<p>前回の<a href="https://irisash.github.io/rails/use_mariadb/">Ruby on RailsでMariaDBを利用する</a>でデータベースの設定ができました。今回はrails generate scaffoldを使って新規ページを追加してみます。<br />\n今回の実装内容は<a href="https://github.com/irisAsh/rails-todo-tutorial/tree/ver-scaffold">こちら</a>においておきますのでご参照ください。</p>\n<h2 id="scaffold">rails generate scaffold</h2>\n<p><code>rails generate scaffold</code>を実行するとコントローラー、ビュー、モデル等の必要とするファイルを全て自動生成することができます。<br />\n実際に動かした方がわかりやすいので実行してみましょう。</p>\n<p><code>rails generate scaffold モデル名 カラム名:カラムの型 ...</code>の形式でコマンド実行します。</p>\n<pre><code class="language-shell.prettyprint">$ bin/rails generate scaffold Todo title:string description:text status:integer estimatedDate:datetime\n      invoke  active_record\n      create    db/migrate/20190523123110_create_todos.rb\n      create    app/models/todo.rb\n      invoke  resource_route\n       route    resources :todos\n      invoke  scaffold_controller\n      create    app/controllers/todos_controller.rb\n      invoke    erb\n      create      app/views/todos\n      create      app/views/todos/index.html.erb\n      create      app/views/todos/edit.html.erb\n      create      app/views/todos/show.html.erb\n      create      app/views/todos/new.html.erb\n      create      app/views/todos/_form.html.erb\n      invoke    helper\n      create      app/helpers/todos_helper.rb\n      invoke    jbuilder\n      create      app/views/todos/index.json.jbuilder\n      create      app/views/todos/show.json.jbuilder\n      create      app/views/todos/_todo.json.jbuilder\n      invoke  assets\n      invoke    coffee\n      create      app/assets/javascripts/todos.coffee\n      invoke    scss\n      create      app/assets/stylesheets/todos.scss\n      invoke  scss\n      create    app/assets/stylesheets/scaffolds.scss\n</code></pre>\n<p>実行すると複数のファイルが作成されているのを確認できます。それぞれ下記の通りです。</p>\n<p><strong>アセット</strong></p>\n<p>JavascriptファイルやCSSファイルです。</p>\n<ul>\n<li><code>app/assets/javascripts/todos.coffee</code></li>\n<li><code>app/assets/stylesheets/scaffolds.scss</code></li>\n<li><code>app/assets/stylesheets/todos.scss</code></li>\n</ul>\n<p><strong>コントローラー</strong></p>\n<p>コントローラー層の処理を記述するファイルです。</p>\n<ul>\n<li><code>app/controllers/todos_controller.rb</code></li>\n</ul>\n<p><strong>ビュー</strong></p>\n<p>View層の処理を記述するファイルです。</p>\n<ul>\n<li><code>app/views/todos/_form.html.erb</code></li>\n<li><code>app/views/todos/edit.html.erb</code></li>\n<li><code>app/views/todos/index.html.erb</code></li>\n<li><code>app/views/todos/new.html.erb</code></li>\n<li><code>app/views/todos/show.html.erb</code></li>\n</ul>\n<p><strong>ヘルパー</strong></p>\n<p>View層で扱う共通処理を記述するファイルです。</p>\n<ul>\n<li><code>app/helpers/todos_helper.rb</code></li>\n</ul>\n<p><strong>モデル</strong></p>\n<p>モデル定義やモデル層の処理を記述するファイルです。</p>\n<ul>\n<li><code>app/models/todo.rb</code></li>\n</ul>\n<p><strong>マイグレーション</strong></p>\n<p>マイグレーションのファイルです。</p>\n<ul>\n<li><code>db/migrate/20190523124618_create_todos.rb</code></li>\n</ul>\n<p><strong>JSON</strong></p>\n<p>API用に値を返すためのJSON定義ファイルです。通常APIは別構成で作成すると思うので削除しても構いません。</p>\n<ul>\n<li><code>app/views/todos/index.json.jbuilder</code></li>\n<li><code>app/views/todos/show.json.jbuilder</code></li>\n<li><code>app/views/todos/_todo.json.jbuilder</code></li>\n</ul>\n<p><code>rails generate scaffold</code>で作成すると上記の全てのファイルが作成されますが、個別に必要な単位で自動生成することもできます。</p>\n<p><strong>rails generate controller</strong></p>\n<p>アセット、コントローラー、ビュー、ヘルパーを自動生成します。</p>\n<p><strong>rails generate model</strong></p>\n<p>モデル、マイグレーションを自動生成します。</p>\n<p><strong>rails generate migration</strong></p>\n<p>マイグレーションを自動生成します。</p>\n<p>他にもいくつか<code>rails generate</code>のコマンドはありますがよく利用するのは上記の３つです。また、<code>rails generate</code>を使わずに手動でファイルを作成しても問題はありません。機能の追加などで実装することになれば手動でファイルを作成することが多いでしょう。</p>\n<h2 id="setting-for-generators">自動生成の設定をする</h2>\n<p>設定によって<code>rails generate</code>で生成されるファイルを限定することができます。<br />\n設定ファイルは<code>config/application.rb</code>です。ファイル内の<code>config.generators</code>を編集することで自動生成ファイルを指定できます。</p>\n<p>ここではアセットとヘルパーを自動生成させないように設定します。</p>\n<pre><code class="language-ruby.prettyprint"># config/application.rb\n\nmodule RailsTodoTutorial\n  class Application &lt; Rails::Application\n    # Initialize configuration defaults for originally generated Rails version.\n    config.load_defaults 5.2\n\n    ...\n\n    # ここを追加\n    # Settings for generators\n    config.generators do |g|\n      g.stylesheets false       # 自動生成させない場合に false を設定します\n      g.javascripts false\n      g.helper false\n    end\n  end\nend\n</code></pre>\n<p>設定したら再度<code>rails generate scaffold</code>を実行してみてください。（先程実行していた場合は生成されたファイルを削除するか、<code>git clean</code>すれば<code>scaffold</code>実行前に戻せます。）<br />\nすると、自動生成不要の設定をした対象は作成されていないことが確認できます。</p>\n<pre><code class="language-shell.prettyprint">$ bin/rails generate scaffold Todo title:string description:text status:integer estimatedDate:datetime\n      invoke  active_record\n      create    db/migrate/20190523124618_create_todos.rb\n      create    app/models/todo.rb\n      invoke  resource_route\n       route    resources :todos\n      invoke  scaffold_controller\n      create    app/controllers/todos_controller.rb\n      invoke    erb\n      create      app/views/todos\n      create      app/views/todos/index.html.erb\n      create      app/views/todos/edit.html.erb\n      create      app/views/todos/show.html.erb\n      create      app/views/todos/new.html.erb\n      create      app/views/todos/_form.html.erb\n      invoke    jbuilder\n      create      app/views/todos/index.json.jbuilder\n      create      app/views/todos/show.json.jbuilder\n      create      app/views/todos/_todo.json.jbuilder\n      invoke  assets\n      invoke    coffee\n      invoke    scss\n</code></pre>\n<h2 id="run-migration">マイグレーションを実行する</h2>\n<p><code>scaffold</code>で自動生成されたファイルの中にモデルファイル(app/models配下)とマイグレーションファイル(db/migrate配下)があります。<br />\nモデルファイルはDBのテーブルを操作するためのファイルです。ここでテーブル単位の共通関数などを追加して実装していきます。<br />\nマイグレーションファイルはテーブル定義を登録・編集するためのファイルです。Railsの開発ではDBコンソール上でDDLを直接実行することはありません。このマイグレーションファイルを使ってテーブル定義を操作します。</p>\n<p><code>scaffold</code>で作成されたマイグレーションファイルの中身をみてください。</p>\n<pre><code class="language-ruby.prettyprint">#  db/migrate/20190523124618_create_todos.rb\n\nclass CreateTodos &lt; ActiveRecord::Migration[5.2]\n  def change\n    create_table :todos do |t|\n      t.string :title\n      t.text :description\n      t.integer :status\n      t.datetime :estimatedDate\n\n      t.timestamps\n    end\n  end\nend\n</code></pre>\n<p>マイグレーションファイルについてはまた詳しく説明しようと思いますので、ここでは簡単な説明をします。<br />\n<code>create_table :todos</code>はテーブル作成のメソッドです。これによりDBに<code>todos</code>というテーブルが作成されます。<br />\n<code>t.string :title</code>のようなコードはカラム定義を表しています。<code>t.カラム型 :カラム名</code>のようになっています。<code>t.timestamps</code>は<code>created_at</code>と<code>updated_at</code>のカラム定義です。これにより、Railsではこのカラムが自動で定義されるようになっています。</p>\n<h3>カラムに制約をつける</h3>\n<p>マイグレーション前にカラムの制約をつけるように設定しておきましょう。付与する制約は以下です。</p>\n<ul>\n<li>titleにNOT NULL制約を付与。</li>\n<li>statusにNOT NULL制約を付与、さらに初期値0が登録されるようにする。</li>\n</ul>\n<p><code>null: false</code>を<code>t.カラム型</code>の引数に追加すると、マイグレーション時にNOT NULL制約が付与されます。<br />\nまた<code>default: 値</code>を引数に追加すると初期値の設定ができます。</p>\n<pre><code class="language-ruby.prettyprint">class CreateTodos &lt; ActiveRecord::Migration[5.2]\n  def change\n    create_table :todos do |t|\n      t.string :title, null: false\n      t.text :description\n      t.integer :status, null: false, default: 0\n      t.datetime :estimatedDate\n\n      t.timestamps\n    end\n  end\nend\n</code></pre>\n<h3>マイグレーションの実行</h3>\n<p>マイグレーション実行は<code>bin/rails db:migrate</code>のコマンドでできます。</p>\n<pre><code class="language-shell.prettyprint">$ bin/rails db:migrate\n== 20190523124618 CreateTodos: migrating ======================================\n-- create_table(:todos)\n   -&gt; 0.0088s\n== 20190523124618 CreateTodos: migrated (0.0090s) =============================\n</code></pre>\n<p>実行すると<code>db/schema.rb</code>ファイルが作成されます。このファイルが実際にDBのテーブル定義を管理するファイルとなっています。</p>\n<pre><code class="language-ruby.prettyprint"># db/schema.rb\n\nActiveRecord::Schema.define(version: 2019_05_23_124618) do\n\n  create_table &quot;todos&quot;, options: &quot;ENGINE=InnoDB DEFAULT CHARSET=utf8&quot;, force: :cascade do |t|\n    t.string &quot;title&quot;, null: false\n    t.text &quot;description&quot;\n    t.integer &quot;status&quot;, default: 0, null: false\n    t.datetime &quot;estimatedDate&quot;\n    t.datetime &quot;created_at&quot;, null: false\n    t.datetime &quot;updated_at&quot;, null: false\n  end\n\nend\n</code></pre>\n<h2 id="confirm-new-page">新規画面を表示する</h2>\n<p>Railsでは特定の決まっているルーティングが用意されています。<br />\n<code>bin/rails route</code>で現在プロジェクトに定義されているルーティングの一覧が見れます。<br />\n<code>rails generate scaffold Todo</code>によって<code>/todos/</code>で始まるエンドポイントのルーティングが追加されています。</p>\n<pre><code class="language-shell.prettyprint">$ bin/rails route\n        Prefix Verb   URI Pattern                 Controller#Action\n        todos GET    /todos(.:format)            todos#index\n              POST   /todos(.:format)            todos#create\n      new_todo GET    /todos/new(.:format)        todos#new\n    edit_todo GET    /todos/:id/edit(.:format)   todos#edit\n          todo GET    /todos/:id(.:format)        todos#show\n              PATCH  /todos/:id(.:format)        todos#update\n              PUT    /todos/:id(.:format)        todos#update\n              DELETE /todos/:id(.:format)        todos#destroy\n</code></pre>\n<p>ルーティングの設定ファイルは<code>config/routes.rb</code>に記述されています。<code>scaffold</code>で<code>resources :todos</code>という行が追加されます。この<code>resources</code>が上記のエンドポイントを定義しています。</p>\n<pre><code class="language-ruby.prettyprint"># config/routes.rb\n\nRails.application.routes.draw do\n  resources :todos\nend\n</code></pre>\n<p>エンドポイントと処理の関係は次の通りです。</p>\n<table>\n<thead>\n<tr>\n<th>エンドポイント</th>\n<th>HTTPメソッド</th>\n<th>処理内容</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>/todos</code></td>\n<td>GET</td>\n<td>Todo一覧画面表示</td>\n</tr>\n<tr>\n<td><code>/todos</code></td>\n<td>POST</td>\n<td>Todo作成処理</td>\n</tr>\n<tr>\n<td><code>/todos/new</code></td>\n<td>GET</td>\n<td>Todo新規登録画面表示</td>\n</tr>\n<tr>\n<td><code>/todos/TodoのID/edit</code></td>\n<td>GET</td>\n<td>Todo編集画面表示</td>\n</tr>\n<tr>\n<td><code>/todos/TodoのID</code></td>\n<td>GET</td>\n<td>Todoの詳細画面表示</td>\n</tr>\n<tr>\n<td><code>/todos/TodoのID</code></td>\n<td>PATCH/PUT</td>\n<td>Todo編集処理</td>\n</tr>\n<tr>\n<td><code>/todos/TodoのID</code></td>\n<td>DELETE</td>\n<td>Todo削除処理</td>\n</tr>\n</tbody>\n</table>\n<p>では<code>bin/rails s</code>を実行して<a href="http://localhost:3000/todos">http://localhost:3000/todos</a>にアクセスしてみましょう。するとTodoの一覧画面が表示されます。</p>\n<img src="images/rails/scaffold/index-page.png" alt="Index画面" title="Index画面" style="max-height:400px;">\n<p>次に画面下の「New Todo」のリンクを押してみましょう。すると新規登録画面(<code>/todos/new</code>)へ飛びます。</p>\n<img src="images/rails/scaffold/new-page.png" alt="New画面" title="New画面" style="max-height:400px;">\n<p>適当に値を入力して「create todo」をしてみてください。するとTodoデータが１件登録されます。追加された後は詳細画面(<code>/todos/1</code>)へリダイレクトされます。</p>\n<img src="images/rails/scaffold/inputed-new-page.png" alt="入力後New画面" title="入力後New画面" style="max-height:400px;">\n<img src="images/rails/scaffold/show-page.png" alt="詳細画面" title="詳細画面" style="max-height:400px;">\n<p>Backからもう一度一覧画面に戻ると一覧にデータが１つ追加されていることが確認できます。</p>\n<img src="images/rails/scaffold/one-data.png" alt="登録後画面" title="登録後画面" style="max-height:400px;">\n<p>他にも「Edit」「Delete」で画面操作を試してみてください。上の表にあるエンドポイントが呼ばれそれぞれの処理が実行されることが確認できます。</p>\n<p>次のステップ：<a href="https://irisash.github.io/rails/use_hamlit/">Hamlitを使う</a></p>\n</section>\n'},306:function(e,t,o){"use strict";o.r(t);var n=o(255),r=o(250),d=o(254),l=o(256),c=o(285),h=o.n(c),m={components:{ArticleTimestamp:n.a,SideMenu:r.a,TableContent:d.a},data:function(){return{menuSections:l,datePublished:new Date(2019,5,2,22,0),dateModified:new Date(2019,5,2,22,0)}},computed:{ArticleMd:function(){return h.a}},head:function(){var e=l.tutorial.menus.scaffold,article=this.$createArticleStructuredData({headline:e.headerTitle,datePublished:this.$moment(this.datePublished).format(),dateModified:this.$moment(this.dateModified).format()}),t=this.$createBreadcrumbListStructuredData({itemList:[{name:"足跡はもう見えない",url:this.$constants.domain},{name:"Rails",url:this.$constants.domain+"rails/"},{name:e.headerTitle,url:this.$constants.domain+"rails/scaffold/"}]});return{title:e.headerTitle,meta:[{hid:"description",name:"description",content:e.headerDescription}],__dangerouslyDisableSanitizers:["script"],script:[article,t]}}},f=o(9),component=Object(f.a)(m,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"wrapper"}},[t("article",{attrs:{id:"main"}},[t("section",[t("div",{domProps:{innerHTML:this._s(this.ArticleMd)}}),this._v(" "),t("article-timestamp",{attrs:{createdAt:this.$moment(this.datePublished).format("l"),updatedAt:this.$moment(this.dateModified).format("l")}})],1)]),this._v(" "),t("side-menu",{attrs:{menuSections:this.menuSections}}),this._v(" "),t("table-content",{attrs:{articleMd:this.ArticleMd}})],1)},[],!1,null,null,null);t.default=component.exports}}]);