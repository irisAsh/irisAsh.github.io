(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{247:function(e){e.exports=JSON.parse('{"tutorial":{"category":"入門","categoryLabel":"Rails","categoryPath":"/rails/","iconClass":"fas fa-home","menus":{"setup":{"linkPath":"/rails/setup/","title":"環境設定","subTitle":"Gem / Bundle","menuIcon":"fas fa-home","headerTitle":"Ruby on Rails 5 の環境設定","headerDescription":"Ruby on Rails 5 の環境設定について説明します。ここでは、Rails new は使わずプロジェクト内でGemを管理してプロジェクトを作成します。また今後の記事では入門としてToDoアプリを作成しながら解説を進めていきます。"},"use_mariadb":{"linkPath":"/rails/use_mariadb/","title":"MariaDBを利用する","subTitle":"MariaDB","menuIcon":"fas fa-coins","headerTitle":"Ruby on RailsでMariaDBを利用する","headerDescription":"Railsプロジェクト作成直後にMariaDBを導入する手順を説明します。Rails初期設定ではSQLite3を利用するようになっていますが、プロジェクト規模が多くなる場合は関係性のあるデータベースを利用する方が良いです。"},"scaffold":{"linkPath":"/rails/scaffold/","title":"scaffoldを使う","subTitle":"rails generate scaffold","menuIcon":"fas fa-folder","headerTitle":"rails generate scaffoldを使ってページを追加する","headerDescription":"rails generate scaffoldを使って新規ページを追加してみます。scaffoldを使用するとコントローラー、ビュー、モデル等の必要とするファイルが全て自動生成されます。config/application.rbを編集して任意の単位で自動生成の拒否設定をすることもできます。"},"use_hamlit":{"linkPath":"/rails/use_hamlit/","title":"Hamlitを使う","subTitle":"hamlit-rails","menuIcon":"fas fa-crown","headerTitle":"HTMLテンプレートHamlitを使う","headerDescription":"Rails標準のHTMLテンプレートはERBが使われています。他にもHamlやSlimといったものがありますが、今回はHamlitというHTMLテンプレートを使う方法を説明します。HamlitはHamlの拡張でHamlをより高速にしたものです。記法はHamlと同様なのでHamlユーザーも利用しやすいでしょう。"},"add_page":{"linkPath":"/rails/add_page/","title":"画面作成の基本","subTitle":"rails generate controller","menuIcon":"far fa-newspaper","headerTitle":"Railsで新規画面を作成する基本な流れ","headerDescription":"Railsで新規画面を作成する基本的な流れを説明します。今回は自動生成を使います。rails generate controllerでビューとコントローラーの自動生成をし、適宜画面を編集し画面を作成していきます。"},"use_devise":{"linkPath":"/rails/use_devise/","title":"Deviseで認証を追加する","subTitle":"Devise","menuIcon":"fas fa-passport","headerTitle":"Deviseを利用して認証を追加する","headerDescription":"Deviseを使ってユーザー認証処理を追加して見ます。Deviseはサインアップやログインなど認証の処理を提供してくれる便利なGemです。Deviseは複雑で柔軟性はないですが多機能を提供しているので独自のカスタマイズがなければとても有効です。"}}},"support_tool":{"category":"開発支援ツール","categoryLabel":"Rails","categoryPath":"/rails/","iconClass":"fas fa-hands-helping","menus":{"use_rubocop":{"linkPath":"/rails/use_rubocop/","title":"RuboCopを使う","subTitle":"RuboCop","menuIcon":"fas fa-robot","headerTitle":"RuboCopを導入してコードを整理する","headerDescription":"RubocopはRubyコードのスタイルガイドに沿ってコード解析をしてくれるツールです。プロジェクトの開発で実装する人数が増えればソースコードの記述が統一されなくなっていきます。コード解析ツールを使えばスタイルガイドに順守していない場合に警告を表示して知らせてくれます。"}}}}')},312:function(e,n,o){"use strict";o.r(n);var t=o(255),l=o(256),r=o(247),c={components:{ArticlePage:t.a,CodeBox:l.a},data:function(){return{menuSections:r,categoryName:"support_tool",articleName:"use_rubocop",datePublished:new Date("2019/6/2 22:00:00 +0900"),dateModified:new Date("2019/12/29 20:00:00 +0900"),contents:[{id:"in-link-install",title:"RuboCopのインストール"},{id:"in-link-clean-code",title:"RuboCopでコードを整理する"},{id:"in-link-reference-links",title:"参考サイト"}]}}},d=o(12),component=Object(d.a)(c,(function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("article-page",{attrs:{menuSections:e.menuSections,contents:e.contents,categoryName:e.categoryName,articleName:e.articleName,datePublished:e.datePublished,dateModified:e.dateModified}},[o("h1",[e._v("RuboCopを導入してコードを整理する")]),e._v(" "),o("div",{staticClass:"abstract"},[o("p",[o("a",{attrs:{href:"https://github.com/rubocop-hq/rubocop",target:"_blank"}},[e._v("Rubocop")]),e._v("\n        はRubyコードのスタイルガイドに沿ってコード解析をしてくれるツールです。\n        プロジェクトの開発で実装する人数が増えればソースコードの記述が統一されなくなっていきます。\n        コード解析ツールを使えばスタイルガイドに順守していない場合に警告を表示して知らせてくれます。\n      ")])]),e._v(" "),o("h2",{attrs:{id:"in-link-install"}},[e._v("RuboCopのインストール")]),e._v(" "),o("p",[e._v("BundlerでインストールするのでGemfileをインストールします。")]),e._v(" "),o("code-box",{attrs:{fileName:"Gemfile"}},[e._v("\ngroup :development do\n  ...\n  gem 'rubocop', require: false # 追加\nend\n    ")]),e._v(" "),o("p",[o("code",[e._v("bundle install")]),e._v("を実行すればインストールは完了です。")]),e._v(" "),o("h2",{attrs:{id:"in-link-clean-code"}},[e._v("RuboCopでコードを整理する")]),e._v(" "),o("p",[o("code",[e._v("bundle exec rubocop")]),e._v("でRubocopを起動できます。\n      オプション"),o("code",[e._v("-R")]),e._v("をつけるとRails用のチェックが入るようになります。\n    ")]),e._v(" "),o("code-box",[e._v("\n$ bundle exec rubocop -R\nInspecting 42 files\nCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC\n\nOffenses:\n\nconfig.ru:1:1: C: Style/FrozenStringLiteralComment: Missing magic comment # frozen_string_literal: true.\n# This file is used by Rack-based servers to start the application.\n\n...\n\n42 files inspected, 135 offenses detected\n    ")]),e._v(" "),o("p",[e._v("実行するとRubocopのチェックに引っかかった箇所のファイル名・行数・詳細と最後に警告の件数が出力されます。")]),e._v(" "),o("p",[e._v("\n      また、上記のコマンドではプロジェクト全体をチェックするようになっていますが、\n      コマンド実行時にチェック箇所を絞り込むこともできます。\n    ")]),e._v(" "),o("p",[e._v("下記では"),o("code",[e._v("app")]),e._v("フォルダだけRubocopのチェックをするようにしています。")]),e._v(" "),o("code-box",[e._v("\n$ bundle exec rubocop app -R\n    ")]),e._v(" "),o("p",[e._v("\n      また、設定ファイルを用意することでRubocopのチェック対象を指定することもできます。\n      プロジェクト配下に"),o("code",[e._v(".rubocop.yml")]),e._v("ファイルを作成し、下記のように編集してください。\n    ")]),e._v(" "),o("code-box",{attrs:{fileName:".rubocop.yml"}},[e._v("\nAllCops:\n  Exclude:\n    - 'node_modules/**/*'\n    - 'vendor/**/*'\n    - '.git/**/*'\n    - 'bin/*'\n    - 'config/**/*'\n    ")]),e._v(" "),o("p",[e._v("\n      設定後にRubocopを実行すると"),o("code",[e._v("Exclude")]),e._v("に入れたファイルの警告がなくなっていることが確認できます。\n    ")]),e._v(" "),o("p",[e._v("\n      また、設定ファイルは下記のように"),o("code",[e._v("-c")]),e._v("オプションを設定してファイル場所を指定できます。\n      プロジェクト配下であれば明示しなくても設定は反映されます。\n    ")]),e._v(" "),o("code-box",[e._v("\n$ bundle exec rubocop -c .rubocop.yml\n    ")]),e._v(" "),o("p",[e._v("\n      基本的にはRubocopが警告を表示した通りにファイルを修正していけば良いですが、\n      初期設定のルールが気に入らない場合は設定を変更して対処できます。\n      その場合は先程と同じように"),o("code",[e._v(".rubocop.yml")]),e._v("を編集します。\n    ")]),e._v(" "),o("p",[e._v("\n      下記の例では"),o("code",[e._v("Style/FrozenStringLiteralComment")]),e._v("というルールのチェックをしないようにしています。\n    ")]),e._v(" "),o("code-box",{attrs:{fileName:".rubocop.yml"}},[e._v("\nStyle/FrozenStringLiteralComment:\n  Enabled: false\n    ")]),e._v(" "),o("p",[e._v("\n      初期設定やルールの一覧については参考サイトのドキュメントや\n      "),o("code",[e._v("vendor/bundle/ruby/2.6.0/gems/rubocop-0.70.0/config/default.yml")]),e._v("\n      (vender/bundleにGemをインストールした場合のパスです)を確認して、\n      適宜好みのチェックルールに設定するのが良いでしょう。\n    ")]),e._v(" "),o("h2",{attrs:{id:"in-link-reference-links"}},[e._v("参考サイト")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"https://docs.rubocop.org/en/stable/",target:"_blank"}},[e._v("RuboCop Document")])])])],1)}),[],!1,null,null,null);n.default=component.exports}}]);