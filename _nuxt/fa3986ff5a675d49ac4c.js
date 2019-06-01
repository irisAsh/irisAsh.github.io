(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{249:function(e,t,n){var content=n(253);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(11).default)("40aafe93",content,!0,{sourceMap:!1})},250:function(e,t,n){"use strict";var r={name:"SideMenu",props:["menuSections"],computed:{routePath:function(){return this.$route.path}}},o=n(9),component=Object(o.a)(r,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("aside",{attrs:{id:"sidebar"}},e._l(e.menuSections,function(t){return n("section",{key:t.category},[n("div",{staticClass:"menu-overview"},[e._v(e._s(t.category))]),e._v(" "),e._l(t.menus,function(t){return n("div",{key:t.linkPath,staticClass:"menu-item"},[n("nuxt-link",{class:e.routePath==t.linkPath?"access-now":"",attrs:{to:t.linkPath}},[e._v("\n          "+e._s(t.title)+"\n        ")])],1)})],2)}),0)])},[],!1,null,null,null);t.a=component.exports},251:function(e,t){e.exports='<section><h1>Express入門（環境設定）</h1>\n<p>ここでは簡易なTODOアプリを作りながらNodeJSのWebアプリケーションフレームワーク <a href="https://expressjs.com/">Express</a> の使い方を学んでいきます。<br />\n<a href="https://github.com/irisAsh/express-todo-tutorial/tree/master">こちら</a>に完成済みのサンプルを置いておきます。サンプルは後記事の<a href="https://irisash.github.io/express/editrouting/">Expressのルーティングの設定</a>、<a href="https://irisash.github.io/express/mongodb/">ExpressでMongoDBを使う</a>の内容を含んでいます。</p>\n<p><strong>環境</strong></p>\n<ul>\n<li>NodeJS v8.15.0</li>\n<li>Express v4.16.0</li>\n</ul>\n<h2 id="setting">環境設定</h2>\n<p>プロジェクト作成から起動するまでの設定手順を説明していきます。</p>\n<h2 id="express-generator">express-generator のインストール</h2>\n<p>下記のコマンドで<code>express-generator</code>をグローバルインストールします。</p>\n<pre><code class="language-sh.prettyprint">$ yarn install express-generator -g\n</code></pre>\n<h2 id="init-project">プロジェクトの作成</h2>\n<p><code>express-generator</code>を使用すると簡単にWebアプリケーションプロジェクトを最小構成で生成できます。任意のフォルダで次のコマンドを実行してください。</p>\n<pre><code class="language-sh.prettyprint">$ express express-todo-tutorial --view=pug --git\n</code></pre>\n<p>実行すると<code>express-todo-tutorial</code>というフォルダが作成されます。このフォルダの中にWebアプリケーションを動かす最低限のファイルが用意されています。<br />\n先程実行した<code>express</code>コマンドでいくつかのオプションを使っているので説明しておきます。また、オプションにはここで使っていないものもあります。<code>express -h</code>を実行するとオプションの一覧が見れるので、興味があるものを使ってみてください。</p>\n<p><strong>--view=pug</strong></p>\n<p>このオプションは使用するテンプレートエンジンを指定します。ここでは <a href="https://pugjs.org/api/getting-started.html">Pug</a>(旧Jade) と呼ばれるテンプレートを指定しています。テンプレートエンジンは他にも色々あるので自分の好みにあったものを指定してください。</p>\n<p><strong>--git</strong></p>\n<p>このオプションをつけると<code>.gitignore</code>を最初に作成してくれます。最低限のGit管理外設定をしてくれるので、Git管理をする場合は指定しましょう。</p>\n<p>作成されたプロジェクトフォルダの初期構成は以下のようになっています。</p>\n<pre><code>.\n├── app.js\n├── bin\n│   └── www\n├── package.json\n├── public\n│   ├── images\n│   ├── javascripts\n│   └── stylesheets\n│       └── style.css\n├── routes\n│   ├── index.js\n│   └── users.js\n└── views\n    ├── error.pug\n    ├── index.pug\n    └── layout.pug\n</code></pre>\n<p>Webアプリケーションを作成したことがある方は大体の内容はわかるかと思います。初学者の方は作りながら説明していきますので、大まかで良いのでどのファイルがどこにあるかを覚えておけば良いでしょう。</p>\n<h2 id="running">起動確認</h2>\n<p>初期作成されたプロジェクトを起動して動作確認をしておきましょう。下記のコマンドで起動確認できます。プロジェクトフォルダ内に移動した後に<code>yarn install</code>でパッケージを取得しています。最後のコマンドが実際にExpressを起動するコマンドになります。</p>\n<pre><code>$ cd express-todo-tutorial\n$ yarn install\n$ DEBUG=express-todo-tutorial:* yarn start\n</code></pre>\n<p>コマンド実行後にブラウザから<a href="http://localhost:3000">http://localhost:3000</a>にアクセスしてみましょう。以下のように画面が表示されれば起動完了です。<br />\nまた、起動を終了するときは<code>Ctrl+c</code>で終了することができます。</p>\n<img src="images/express/gettingstarted/run-start.png" alt="起動確認" title="起動確認" style="max-height:400px;">\n<p>このままでも開発を進めることはできますが、ファイルを編集する度にサーバー停止・<code>yarn stat</code>実行をするのは手間になるので、<a href="https://github.com/remy/nodemon">nodemon</a> をインストールしておきましょう。<code>nodemon</code>を使うとファイル更新の度に自動でサーバーを再起動してくれます。</p>\n<pre><code>$ yarn add nodemon --dev\n</code></pre>\n<p>また、起動コマンドもスクリプトに定義しておきましょう。<code>package.json</code>に以下のようにスクリプトを追加します。</p>\n<pre><code class="language-json.prettyprint"># package.json\n  ...\n  &quot;scripts&quot;: {\n    &quot;start&quot;: &quot;node ./bin/www&quot;,\n    &quot;devstart&quot;: &quot;nodemon ./bin/www&quot;, # 追加\n    &quot;debugstart&quot;: &quot;DEBUG=express-todo-tutorial:* yarn run devstart&quot; # 追加\n  },\n</code></pre>\n<p>次のコマンドを実行して起動を確認しましょう。</p>\n<pre><code>$ yarn run debugstart\n</code></pre>\n<p><a href="http://localhost:3000">http://localhost:3000</a>で先程と同様に画面が表示されればOKです。<code>views/index.pug</code>を編集して<code>nodemon</code>の挙動を確認してみましょう。</p>\n<pre><code class="language-pug.prettyprint"># views/index.pug\n\nextends layout               \n                             \nblock content                \n  h1= title                  \n  p Welcome to #{title} !!!!!  # !!!!!を追加\n</code></pre>\n<p>サーバーが自動で再起動されて画面が変更されていることが確認できます。</p>\n</section>\n'},252:function(e,t,n){"use strict";var r=n(249);n.n(r).a},253:function(e,t,n){(e.exports=n(10)(!1)).push([e.i,".article-timestamp{margin-top:1.5rem;padding-top:.5rem;border-top:1px solid #aaa;color:#aaa;display:flex;flex-direction:row}.timestamp-container{display:flex;flex-direction:row;justify-content:center;align-items:center;padding-right:1rem}.timestamp-container i{margin-right:.4rem}",""])},254:function(e,t,n){"use strict";n(251);var r={name:"TableContent",props:["articleMd"],computed:{getInternalLinks:function(){if(!this||!this.$props||!this.$props.articleMd)return[];for(var e,t=/<h2 id="(.*)">(.*)<\/h2>/gm,n=[];null!=(e=t.exec(this.$props.articleMd));)e[1]&&e[2]&&n.push({id:e[1],title:e[2]});return n||[]}}},o=n(9),component=Object(o.a)(r,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"table-content"}},[n("aside",{attrs:{id:"table-content-list"}},e._l(e.getInternalLinks,function(t){return n("div",{key:t.id,staticClass:"link-container"},[n("nuxt-link",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#"+t.id,expression:"'#' + internalLink.id"}],attrs:{to:""}},[e._v("\n        "+e._s(t.title)+"\n      ")])],1)}),0)])},[],!1,null,null,null);t.a=component.exports},255:function(e,t,n){"use strict";var r={name:"ArticleTimestamp",props:["createdAt","updatedAt"]},o=(n(252),n(9)),component=Object(o.a)(r,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"article-timestamp"},[n("div",{staticClass:"timestamp-container"},[n("i",{staticClass:"far fa-clock"}),e._v(" "),n("p",[e._v(e._s(e.createdAt))])]),e._v(" "),n("div",{staticClass:"timestamp-container"},[n("i",{staticClass:"fas fa-clock"}),e._v(" "),n("p",[e._v(e._s(e.updatedAt))])])])},[],!1,null,null,null);t.a=component.exports},256:function(e){e.exports={tutorial:{category:"入門",iconClass:"fas fa-home",menus:{setup:{linkPath:"/rails/setup/",title:"環境設定",subTitle:"Gem / Bundle",menuIcon:"fas fa-home",headerTitle:"Ruby on Rails 5 の環境設定",headerDescription:"Ruby on Rails 5 の環境設定について説明します。ここでは、Rails new は使わずプロジェクト内でGemを管理してプロジェクトを作成します。また今後の記事では入門としてToDoアプリを作成しながら解説を進めていきます。"},use_mariadb:{linkPath:"/rails/use_mariadb/",title:"MariaDBを利用する",subTitle:"MariaDB",menuIcon:"fas fa-coins",headerTitle:"Ruby on RailsでMariaDBを利用する",headerDescription:"Railsプロジェクト作成直後にMariaDBを導入する手順を説明します。Rails初期設定ではSQLite3を利用するようになっていますが、プロジェクト規模が多くなる場合は関係性のあるデータベースを利用する方が良いです。"},scaffold:{linkPath:"/rails/scaffold/",title:"scaffoldを使う",subTitle:"rails generate scaffold",menuIcon:"fas fa-folder",headerTitle:"rails generate scaffoldを使ってページを追加する",headerDescription:"rails generate scaffoldを使って新規ページを追加してみます。scaffoldを使用するとコントローラー、ビュー、モデル等の必要とするファイルが全て自動生成されます。config/application.rbを編集して任意の単位で自動生成の拒否設定をすることもできます。"},use_hamlit:{linkPath:"/rails/use_hamlit/",title:"Hamlitを使う",subTitle:"hamlit-rails",menuIcon:"fas fa-crown",headerTitle:"HTMLテンプレートHamlitを使う",headerDescription:"Rails標準のHTMLテンプレートはERBが使われています。他にもHamlやSlimといったものがありますが、今回はHamlitというHTMLテンプレートを使う方法を説明します。HamlitはHamlの拡張でHamlをより高速にしたものです。記法はHamlと同様なのでHamlユーザーも利用しやすいでしょう。"},add_page:{linkPath:"/rails/add_page/",title:"画面作成の基本",subTitle:"rails generate controller",menuIcon:"far fa-newspaper",headerTitle:"Railsで新規画面を作成する基本な流れ",headerDescription:"Railsで新規画面を作成する基本的な流れを説明します。今回は自動生成を使います。rails generate controllerでビューとコントローラーの自動生成をし、適宜画面を編集し画面を作成していきます。"},use_devise:{linkPath:"/rails/use_devise/",title:"Deviseで認証を追加する",subTitle:"Devise",menuIcon:"fas fa-passport",headerTitle:"Deviseを利用して認証を追加する",headerDescription:"Deviseを使ってユーザー認証処理を追加して見ます。Deviseはサインアップやログインなど認証の処理を提供してくれる便利なGemです。Deviseは複雑で柔軟性はないですが多機能を提供しているので独自のカスタマイズがなければとても有効です。"}}},support_tool:{category:"開発支援ツール",iconClass:"fas fa-hands-helping",menus:{use_rubocop:{linkPath:"/rails/use_rubocop/",title:"RuboCopを使う",subTitle:"RuboCop",menuIcon:"fas fa-robot",headerTitle:"RuboCopを導入してコードを整理する",headerDescription:"RubocopはRubyコードのスタイルガイドに沿ってコード解析をしてくれるツールです。プロジェクトの開発で実装する人数が増えればソースコードの記述が統一されなくなっていきます。コード解析ツールを使えばスタイルガイドに順守していない場合に警告を表示して知らせてくれます。"}}}}},288:function(e,t){e.exports='<section><h1>HTMLテンプレートHamlitを使う</h1>\n<p>Rails標準のHTMLテンプレートはERBが使われています。他にもHamlやSlimといったものがありますが、今回はHamlitというHTMLテンプレートを使う方法を説明します。HamlitはHamlの拡張でHamlをより高速にしたものです。記法はHamlと同様なのでHamlユーザーも利用しやすいでしょう。</p>\n<p>以下はHamlitの導入の内容になりますが、HamlやSlimもほぼ同様になると思います。詳しくは公式のドキュメントを参考ください。</p>\n<ul>\n<li><a href="https://github.com/haml/haml">Haml</a></li>\n<li><a href="https://github.com/slim-template/slim">Slim</a></li>\n</ul>\n<p>また、実装サンプルは<a href="https://github.com/irisAsh/rails-todo-tutorial/tree/ver-use-hamlit">こちら</a>です。</p>\n<h2 id="hamlit-rails">hamlit-railsのインストール</h2>\n<p><a href="https://github.com/k0kubun/hamlit">Hamlit</a>のGemを直接インストールしても良いですが、<code>rails generate</code>でビューファイルを自動生成したり、既存のERBファイルをHaml形式に変換したりしたいので<code>hamlit-rails</code>のGemをインストールするようにします。<br />\nGemfileを編集して<code>bundle install</code>してください。</p>\n<pre><code class="language-Gemfile.prettyprint"># Gemfile\n\ngem \'hamlit-rails\' # 追加\n</code></pre>\n<p>インストールが完了したら、既にあるERBのファイルをHamlのファイルに変換します。<code>bundle exec rake hamlit:erb2haml</code>を実行してください。</p>\n<pre><code class="language-shell.prettyprint">$ bundle exec rake hamlit:erb2haml\n</code></pre>\n<p>これでHamlへの変換が完了すれば良いですが、下記のエラーが表示されることがあります。</p>\n<pre><code class="language-shell.prettyprint">$ bundle exec rake hamlit:erb2haml\nhtml2haml gem is not part of the bundle.\n`rake hamlit:erb2haml` requires html2haml gem to convert erb files.\n\nPlease add html2haml gem temporarily and run `rake hamlit:erb2haml` again.\n(You can remove html2haml gem after the conversion.)\n</code></pre>\n<p>エラーメッセージ通りに<code>html2haml</code>をインストールして再度変換作業をしましょう。変換作業後は不要なので削除してしまっても構いません。</p>\n<pre><code class="language-Gemfile.prettyprint"># Gemfile\n\ngem \'hamlit-rails\'\ngem \'html2haml\' # 追加\n</code></pre>\n<pre><code>$ bundle install\n$ bundle exec rake hamlit:erb2haml\n\nGenerating .haml for app/views/layouts/application.html.erb...\nGenerating .haml for app/views/layouts/mailer.html.erb...\nGenerating .haml for app/views/layouts/mailer.text.erb...\nGenerating .haml for app/views/todos/index.html.erb...\nGenerating .haml for app/views/todos/edit.html.erb...\nGenerating .haml for app/views/todos/show.html.erb...\nGenerating .haml for app/views/todos/_form.html.erb...\nGenerating .haml for app/views/todos/new.html.erb...\n\nDo you want to delete original .erb files? (y/n): y\nDeleting original .erb files...\n  app/views/layouts/application.html.erb\n  app/views/layouts/mailer.html.erb\n  app/views/layouts/mailer.text.erb\n  app/views/todos/index.html.erb\n  app/views/todos/edit.html.erb\n  app/views/todos/show.html.erb\n  app/views/todos/_form.html.erb\n  app/views/todos/new.html.erb\n\nFinished to convert erb files.\n</code></pre>\n<p>これで変換作業が完了しました。Railsを一度再起動してから画面を表示してみましょう。画面が正常に表示されればOKです。</p>\n<h2 id="coding-haml">Hamlit(Haml)でコードを書く</h2>\n<p>前回作ったTodo一覧の画面を見てみましょう。<code>app/views/todos/index.html.haml</code>がTodo一覧画面のビューファイルです。</p>\n<pre><code class="language-haml.prettyprint"># app/views/todos/index.html.haml\n\n%p#notice= notice\n%h1 Todos\n%table\n  %thead\n    %tr\n      %th Title\n      %th Description\n      %th Status\n      %th Estimateddate\n      %th{:colspan =&gt; &quot;3&quot;}\n  %tbody\n    - @todos.each do |todo|\n      %tr\n        %td= todo.title\n        %td= todo.description\n        %td= todo.status\n        %td= todo.estimatedDate\n        %td= link_to \'Show\', todo\n        %td= link_to \'Edit\', edit_todo_path(todo)\n        %td= link_to \'Destroy\', todo, method: :delete, data: { confirm: \'Are you sure?\' }\n%br/\n= link_to \'New Todo\', new_todo_path\n</code></pre>\n<p>Haml記法ではHTMLタグは<code>%タグ名</code>になります。<br />\n適当にタグをついて画面を更新してみてください。下記はpタグを追加している例です。</p>\n<pre><code class="language-haml.prettyprint"># app/views/todos/index.html.haml\n\n%p#notice= notice\n%h1 Todos\n# 追加\n%p Todoの一覧です\n%table\n  %thead\n    %tr\n</code></pre>\n<img src="images/rails/use_hamlit/index-page.png" alt="一覧画面" title="一覧画面" style="max-height:400px;">\n<p>次のステップ：<a href="https://irisash.github.io/rails/add_page/">画面作成の基本</a></p>\n</section>\n'},303:function(e,t,n){"use strict";n.r(t);var r=n(255),o=n(250),l=n(254),d=n(256),c=n(288),m=n.n(c),h={components:{ArticleTimestamp:r.a,SideMenu:o.a,TableContent:l.a},data:function(){return{menuSections:d,datePublished:new Date(2019,5,2,22,0),dateModified:new Date(2019,5,2,22,0)}},computed:{ArticleMd:function(){return m.a}},head:function(){var e=d.tutorial.menus.use_hamlit,article=this.$createArticleStructuredData({headline:e.headerTitle,datePublished:this.$moment(this.datePublished).format(),dateModified:this.$moment(this.dateModified).format()}),t=this.$createBreadcrumbListStructuredData({itemList:[{name:"足跡はもう見えない",url:this.$constants.domain},{name:"Rails",url:this.$constants.domain+"rails/"},{name:e.headerTitle,url:this.$constants.domain+"rails/use_hamlit/"}]});return{title:e.headerTitle,meta:[{hid:"description",name:"description",content:e.headerDescription}],__dangerouslyDisableSanitizers:["script"],script:[article,t]}}},f=n(9),component=Object(f.a)(h,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"wrapper"}},[t("article",{attrs:{id:"main"}},[t("section",[t("div",{domProps:{innerHTML:this._s(this.ArticleMd)}}),this._v(" "),t("article-timestamp",{attrs:{createdAt:this.$moment(this.datePublished).format("l"),updatedAt:this.$moment(this.dateModified).format("l")}})],1)]),this._v(" "),t("side-menu",{attrs:{menuSections:this.menuSections}}),this._v(" "),t("table-content",{attrs:{articleMd:this.ArticleMd}})],1)},[],!1,null,null,null);t.default=component.exports}}]);