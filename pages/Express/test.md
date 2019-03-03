# はじめに / 環境設定

ここでは簡易なTODOアプリを作りながらNodeJSのWebアプリケーションフレームワーク [Express](https://expressjs.com/) の使い方を学んでいきます。  


**環境**

- NodeJS v8.15.0
- Express v4.16.0

## 環境設定

プロジェクト作成から起動するまでの設定手順を説明していきます。  

## express-generator のインストール

下記のコマンドで`express-generator`をグローバルインストールします。

```sh.prettyprint
$ yarn install express-generator -g
```

## プロジェクトの作成

`express-generator`を使用すると簡単にWebアプリケーションプロジェクトを最小構成で生成できます。任意のフォルダで次のコマンドを実行してください。  

```sh.prettyprint
$ express express-todo-tutorial --view=pug --git
```

実行すると`express-todo-tutorial`というフォルダが作成されます。このフォルダの中にWebアプリケーションを動かす最低限のファイルが用意されています。  
先程実行した`express`コマンドでいくつかのオプションを使っているので説明しておきます。また、オプションにはここで使っていないものもあります。`express -h`を実行するとオプションの一覧が見れるので、興味があるものを使ってみてください。  

**--view=pug**

このオプションは使用するテンプレートエンジンを指定します。ここでは [Pug](https://pugjs.org/api/getting-started.html)(旧Jade) と呼ばれるテンプレートを指定しています。テンプレートエンジンは他にも色々あるので自分の好みにあったものを指定してください。  

**--git**

このオプションをつけると`.gitignore`を最初に作成してくれます。最低限のGit管理外設定をしてくれるので、Git管理をする場合は指定しましょう。

作成されたプロジェクトフォルダの初期構成は以下のようになっています。

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

Webアプリケーションを作成したことがある方は大体の内容はわかるかと思います。初学者の方は作りながら説明していきますので、大まかで良いのでどのファイルがどこにあるかを覚えておけば良いでしょう。  

## 起動確認

初期作成されたプロジェクトを起動して動作確認をしておきましょう。下記のコマンドで起動確認できます。プロジェクトフォルダ内に移動した後に`yarn install`でパッケージを取得しています。最後のコマンドが実際にExpressを起動するコマンドになります。  

```
$ cd express-todo-tutorial
$ yarn install
$ DEBUG=express-todo-tutorial:* yarn start
```

コマンド実行後にブラウザから[http://localhost:3000](http://localhost:3000)にアクセスしてみましょう。以下のように画面が表示されれば起動完了です。  
また、起動を終了するときは`Ctrl+c`で終了することができます。  

<img src="images/express/gettingstarted/run-start.png" alt="起動確認" title="起動確認" style="max-height:400px;">

このままでも開発を進めることはできますが、ファイルを編集する度にサーバー停止・`yarn stat`実行をするのは手間になるので、[nodemon](https://github.com/remy/nodemon) をインストールしておきましょう。`nodemon`を使うとファイル更新の度に自動でサーバーを再起動してくれます。  

```
$ yarn add nodemon --dev
```

また、起動コマンドもスクリプトに定義しておきましょう。`package.json`に以下のようにスクリプトを追加します。  

```json.prettyprint
# package.json
  ...
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www", # 追加
    "debugstart": "DEBUG=express-todo-tutorial:* yarn run devstart" # 追加
  },
```

次のコマンドを実行して起動を確認しましょう。

```
$ yarn run debugstart
```

[http://localhost:3000](http://localhost:3000)で先程と同様に画面が表示されればOKです。`views/index.pug`を編集して`nodemon`の挙動を確認してみましょう。  
```pug.prettyprint
# views/index.pug

extends layout               
                             
block content                
  h1= title                  
  p Welcome to #{title} !!!!!  # !!!!!を追加
```

サーバーが自動で再起動されて画面が変更されていることが確認できます。
