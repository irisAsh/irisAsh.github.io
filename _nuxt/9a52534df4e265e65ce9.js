(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{257:function(t,e,n){"use strict";var r={name:"TopMenu",props:["menuItems"]},c=n(9),component=Object(c.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"top-menu"}},[n("article",{staticClass:"container"},t._l(t.menuItems,function(e){return n("section",{key:e.category,staticClass:"category-container"},[n("div",{staticClass:"category-overview"},[n("i",{class:e.iconClass}),t._v(" "),n("h2",[t._v(t._s(e.category))])]),t._v(" "),n("div",{staticClass:"menu-container"},t._l(e.menus,function(menu){return n("nuxt-link",{key:menu.title,attrs:{to:menu.linkPath}},[n("i",{class:menu.menuIcon}),t._v(" "),n("div",[n("h3",[t._v(t._s(menu.title))]),t._v(" "),n("p",[t._v(t._s(menu.subTitle))])])])}),1)])}),0)])},[],!1,null,null,null);e.a=component.exports},258:function(t,e,n){var r=n(5),c=n(259)(!1);r(r.S,"Object",{values:function(t){return c(t)}})},259:function(t,e,n){var r=n(21),c=n(22),o=n(34).f;t.exports=function(t){return function(e){for(var n,l=c(e),h=r(l),d=h.length,i=0,m=[];d>i;)o.call(l,n=h[i++])&&m.push(t?[n,l[n]]:l[n]);return m}}},260:function(t){t.exports={tutorial:{category:"入門",iconClass:"fas fa-coins",menus:{setup:{linkPath:"/mariadb/setup/",title:"環境設定",subTitle:"MariaDB",menuIcon:"fas fa-coins",headerTitle:"MariaDBの環境設定",headerDescription:"MariaDBはMySQLから派生したオープンソースのリレーショナルデータベース管理システムです。LinuxOSでは標準のデータベースとして利用が広まっています。ここではMacOSでMariaDBを利用するための方法を説明します。"},user_and_authority:{linkPath:"/mariadb/user_and_authority/",title:"ユーザー管理と権限",subTitle:"CREATE USER / GRANT",menuIcon:"far fa-user-circle",headerTitle:"MariaDBのユーザー管理と権限",headerDescription:"MariaDBでのユーザー管理（ロール）と権限付与について説明していきます。環境構築後や入れ替え作業時くらいで頻繁に行う作業なので、忘れた時のメモとして活用ください。"},databases:{linkPath:"/mariadb/databases/",title:"データベースの作成",subTitle:"CREATE DATABASES",menuIcon:"fas fa-database",headerTitle:"MariaDBのデータベースの作成",headerDescription:"MariaDBでのデータベース作成について説明していきます。データベースの作成も頻繁に行う作業ではないのでメモとして活用ください。"}}}}},325:function(t,e,n){"use strict";n.r(e);n(20),n(258);var r=n(257),c=n(260),o={components:{TopMenu:r.a},data:function(){return{menuItems:Object.values(c)}},head:function(){return{title:"MariaDB解説",meta:[{hid:"description",name:"description",content:"MariaDBはMySQLから派生したオープンソースのリレーショナルデータベース管理システムです。MySQLと互換性があり、MySQL利用者も容易に乗り換えをすることができます。多くのLinuxではMiriaDBが標準のデータベースとなっています。"}]}}},l=n(9),component=Object(l.a)(o,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this._m(0),this._v(" "),e("top-menu",{attrs:{menuItems:this.menuItems}})],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{attrs:{id:"express-header"}},[e("header",[e("h1",{staticClass:"title"},[this._v("\n        MariaDB\n      ")])]),this._v(" "),e("p",{staticClass:"subtitle"},[this._v("\n      MySQL派生のオープンソースのRDBMS\n    ")])])}],!1,null,null,null);e.default=component.exports}}]);