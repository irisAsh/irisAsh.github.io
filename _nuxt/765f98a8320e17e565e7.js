(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{247:function(t,n,e){var l=e(5),r=e(248)(!1);l(l.S,"Object",{values:function(t){return r(t)}})},248:function(t,n,e){var l=e(21),r=e(22),c=e(33).f;t.exports=function(t){return function(n){for(var e,v=r(n),_=l(v),o=_.length,i=0,d=[];o>i;)c.call(v,e=_[i++])&&d.push(t?[e,v[e]]:v[e]);return d}}},255:function(t,n,e){"use strict";var l={name:"MenuItem",props:["linkPath","title","subTitle","iconClass"]},r=e(9),c={name:"TopMenu",props:["menuItems"],components:{MenuItem:Object(r.a)(l,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"menu-box"}},[e("nuxt-link",{attrs:{to:t.linkPath}},[e("div",{staticClass:"menu-item-container"},[e("div",{staticClass:"menu-icon-area"},[e("i",{class:t.iconClass})]),t._v(" "),e("div",{staticClass:"menu-text-area"},[e("h2",{staticClass:"menu-title"},[t._v(t._s(t.title))]),t._v(" "),e("p",{staticClass:"menu-sub-title"},[t._v(t._s(t.subTitle))])])])])],1)},[],!1,null,null,null).exports}},v=Object(r.a)(c,function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"top-menu"}},[n("article",{staticClass:"container"},[n("section",{staticClass:"menu-list-container"},[n("div",{staticClass:"menu-list"},this._l(this.menuItems,function(t){return n("menu-item",{key:t.title,attrs:{linkPath:t.linkPath,title:t.title,subTitle:t.subTitle,iconClass:t.iconClass}})}),1)])])])},[],!1,null,null,null);n.a=v.exports},282:function(t,n,e){"use strict";e.r(n);e(20),e(247);var l=e(255),r=e(73),c={components:{TopMenu:l.a},data:function(){return{menuItems:Object.values(r)}},head:function(){return{title:"Express NodeJS",meta:[{hid:"description",name:"description",content:"ExpressはNodeJSの軽量・高速なWebアプリケーションフレームワークです。Expressを使えばWebサイトやAPIを簡単にかつ柔軟に作成することができます。"}]}}},v=e(9),component=Object(v.a)(c,function(){var t=this.$createElement,n=this._self._c||t;return n("div",[this._m(0),this._v(" "),n("top-menu",{attrs:{title:this.title,subTitle:this.subTitle,menuItems:this.menuItems}})],1)},[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("section",{attrs:{id:"express-header"}},[e("header",[e("h1",{staticClass:"title"},[t._v("\n        Express\n      ")])]),t._v(" "),e("p",{staticClass:"subtitle"},[t._v("\n      Node.jsのためのWebアプリケーションフレームワーク\n    ")]),t._v(" "),e("div",{staticClass:"editor-container"},[e("div",{staticClass:"editor"},[e("div",{staticClass:"line-number"},[e("p",[t._v("\n            1\n          ")]),t._v(" "),e("p",[t._v("\n            2\n          ")]),t._v(" "),e("p",[t._v("\n            3\n          ")]),t._v(" "),e("p",[t._v("\n            4\n          ")]),t._v(" "),e("p",[t._v("\n            5\n          ")]),t._v(" "),e("p",[t._v("\n            6\n          ")])]),t._v(" "),e("div",{staticClass:"code-area"},[e("p",{staticClass:"code-line line-1"},[e("span",{staticClass:"reserved"},[t._v("var")]),t._v(" express = \n            "),e("span",{staticClass:"reserved"},[t._v("require")]),t._v("(\n            "),e("span",{staticClass:"string"},[t._v("'express' ")]),t._v(");\n          ")]),t._v(" "),e("p",{staticClass:"code-line line-2"},[e("span",{staticClass:"reserved"},[t._v("var")]),t._v(" app =\n            "),e("span",{staticClass:"function"},[t._v("express")]),t._v("();\n          ")]),t._v(" "),e("p",{staticClass:"blank-p"},[t._v("_")]),t._v(" "),e("p",{staticClass:"code-line line-3"},[t._v("\n            app.\n            "),e("span",{staticClass:"function"},[t._v("get")]),t._v("(\n            "),e("span",{staticClass:"string"},[t._v("'/'")]),t._v(", \n            "),e("span",{staticClass:"reserved"},[t._v("function")]),t._v("(req, res) {\n            "),e("span",{staticClass:"reserved"},[t._v("return")]),t._v(" res."),e("span",{staticClass:"function"},[t._v("send")]),t._v("(\n            "),e("span",{staticClass:"string"},[t._v("'Hello World!' ")]),t._v(") });\n          ")]),t._v(" "),e("p",{staticClass:"blank-p"},[t._v("_")]),t._v(" "),e("p",{staticClass:"code-line line-4"},[t._v("\n            app.\n            "),e("span",{staticClass:"function"},[t._v("listen")]),t._v("(3000, \n            "),e("span",{staticClass:"reserved"},[t._v("function")]),t._v("() { console."),e("span",{staticClass:"function"},[t._v("log")]),t._v("(\n            "),e("span",{staticClass:"string"},[t._v("'Listening on port 3000!' ")]),t._v(") });\n          ")])])])])])}],!1,null,null,null);n.default=component.exports}}]);