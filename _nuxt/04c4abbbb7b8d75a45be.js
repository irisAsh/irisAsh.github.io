(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{256:function(e){e.exports={tutorial:{category:"入門",iconClass:"fas fa-home",menus:{setup:{linkPath:"/rails/setup/",title:"環境設定",subTitle:"Gem / Bundle",menuIcon:"fas fa-home",headerTitle:"Ruby on Rails 5 の環境設定",headerDescription:"Ruby on Rails 5 の環境設定について説明します。ここでは、Rails new は使わずプロジェクト内でGemを管理してプロジェクトを作成します。また今後の記事では入門としてToDoアプリを作成しながら解説を進めていきます。"},use_mariadb:{linkPath:"/rails/use_mariadb/",title:"MariaDBを利用する",subTitle:"MariaDB",menuIcon:"fas fa-coins",headerTitle:"Ruby on RailsでMariaDBを利用する",headerDescription:"Railsプロジェクト作成直後にMariaDBを導入する手順を説明します。Rails初期設定ではSQLite3を利用するようになっていますが、プロジェクト規模が多くなる場合は関係性のあるデータベースを利用する方が良いです。"},scaffold:{linkPath:"/rails/scaffold/",title:"scaffoldを使う",subTitle:"rails generate scaffold",menuIcon:"fas fa-folder",headerTitle:"rails generate scaffoldを使ってページを追加する",headerDescription:"rails generate scaffoldを使って新規ページを追加してみます。scaffoldを使用するとコントローラー、ビュー、モデル等の必要とするファイルが全て自動生成されます。config/application.rbを編集して任意の単位で自動生成の拒否設定をすることもできます。"},use_hamlit:{linkPath:"/rails/use_hamlit/",title:"Hamlitを使う",subTitle:"hamlit-rails",menuIcon:"fas fa-crown",headerTitle:"HTMLテンプレートHamlitを使う",headerDescription:"Rails標準のHTMLテンプレートはERBが使われています。他にもHamlやSlimといったものがありますが、今回はHamlitというHTMLテンプレートを使う方法を説明します。HamlitはHamlの拡張でHamlをより高速にしたものです。記法はHamlと同様なのでHamlユーザーも利用しやすいでしょう。"},add_page:{linkPath:"/rails/add_page/",title:"画面作成の基本",subTitle:"rails generate controller",menuIcon:"far fa-newspaper",headerTitle:"Railsで新規画面を作成する基本な流れ",headerDescription:"Railsで新規画面を作成する基本的な流れを説明します。今回は自動生成を使います。rails generate controllerでビューとコントローラーの自動生成をし、適宜画面を編集し画面を作成していきます。"},use_devise:{linkPath:"/rails/use_devise/",title:"Deviseで認証を追加する",subTitle:"Devise",menuIcon:"fas fa-passport",headerTitle:"Deviseを利用して認証を追加する",headerDescription:"Deviseを使ってユーザー認証処理を追加して見ます。Deviseはサインアップやログインなど認証の処理を提供してくれる便利なGemです。Deviseは複雑で柔軟性はないですが多機能を提供しているので独自のカスタマイズがなければとても有効です。"}}},support_tool:{category:"開発支援ツール",iconClass:"fas fa-hands-helping",menus:{use_rubocop:{linkPath:"/rails/use_rubocop/",title:"RuboCopを使う",subTitle:"RuboCop",menuIcon:"fas fa-robot",headerTitle:"RuboCopを導入してコードを整理する",headerDescription:"RubocopはRubyコードのスタイルガイドに沿ってコード解析をしてくれるツールです。プロジェクトの開発で実装する人数が増えればソースコードの記述が統一されなくなっていきます。コード解析ツールを使えばスタイルガイドに順守していない場合に警告を表示して知らせてくれます。"}}}}},257:function(e,t,n){"use strict";var l={name:"TopMenu",props:["menuItems"]},r=n(9),component=Object(r.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"top-menu"}},[n("article",{staticClass:"container"},e._l(e.menuItems,function(t){return n("section",{key:t.category,staticClass:"category-container"},[n("div",{staticClass:"category-overview"},[n("i",{class:t.iconClass}),e._v(" "),n("h2",[e._v(e._s(t.category))])]),e._v(" "),n("div",{staticClass:"menu-container"},e._l(t.menus,function(menu){return n("nuxt-link",{key:menu.title,attrs:{to:menu.linkPath}},[n("i",{class:menu.menuIcon}),e._v(" "),n("div",[n("h3",[e._v(e._s(menu.title))]),e._v(" "),n("p",[e._v(e._s(menu.subTitle))])])])}),1)])}),0)])},[],!1,null,null,null);t.a=component.exports},258:function(e,t,n){var l=n(5),r=n(259)(!1);l(l.S,"Object",{values:function(e){return r(e)}})},259:function(e,t,n){var l=n(21),r=n(22),o=n(34).f;e.exports=function(e){return function(t){for(var n,c=r(t),f=l(c),m=f.length,i=0,h=[];m>i;)o.call(c,n=f[i++])&&h.push(e?[n,c[n]]:c[n]);return h}}},330:function(e,t,n){"use strict";n.r(t);n(20),n(258);var l=n(257),r=n(256),o={components:{TopMenu:l.a},data:function(){return{menuItems:Object.values(r)}},head:function(){return{title:"Ruby on Railsの解説",meta:[{hid:"description",name:"description",content:"Ruby on Rails 5 はRuby言語で書かれた最もよく利用されるWebアプリケーションフレームワークです。RailsはフルスタックなフレームワークでMVCモデルのWebアプリケーションを手軽に作成することができます。"}]}}},c=n(9),component=Object(c.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[this._m(0),this._v(" "),t("top-menu",{attrs:{menuItems:this.menuItems}})],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("section",{attrs:{id:"express-header"}},[t("header",[t("h1",{staticClass:"title"},[this._v("\n        Ruby on Rails\n      ")])]),this._v(" "),t("p",{staticClass:"subtitle"},[this._v("\n      最も有名なRubyのフルスタックWebアプリケーション\n    ")])])}],!1,null,null,null);t.default=component.exports}}]);