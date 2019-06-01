# Ruby on Rails 5 の環境設定

Ruby on Rails 5 の環境設定について説明します。ここでは、Rails new は使わずプロジェクト内でGemを管理してプロジェクトを作成します。  
また今後の記事では入門としてToDoアプリを作成しながら解説を進めていきます。  
  
今回の実装のサンプルは[こちら](https://github.com/irisAsh/rails-todo-tutorial/tree/ver-setup)です。  

<h2 id="rails-install">Railsのインストール</h2>

Rubyでは機能提供するライブラリのことをGemと呼びます。WebアプリケーションフレームワークであるRailsもGemの１つになります。Ruby環境が用意されていれば`gem install gem名`でGemをインストールできます。  
また複数のGemインストールをプロジェクト単位でまとめて実行するためにBundlerというGemを利用します。Bundlerを利用すれば複数のGemインストールができるようになるだけでなくそれぞれのGemの依存関係も管理してくれるので非常に便利です。  
  
下記でBundlerをインストールできます。  

```shell.prettyprint
$ gem install bundler
```

Bundlerの使い方ですが、まずはプロジェクトのルートディレクトリで、`bundle init`を実行しGemfileを作成します。

```shell.prettyprint
$ mkdir rails-todo-tutorial
$ cd rails-todo-tutorial
$ bundle init
Writing new Gemfile to /******/rails-todo-tutorial/Gemfile
```

作成されたGemfileを開き、`gem "rails"`が書かれた行をコメントアウトします。  

```Gemfile.prettyprint
# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

gem "rails" # ここのコメントアウトを外す
```

Gemfileに書かれたGemをBundlerでインストールします。  
`--path プロジェクト配下のフォルダ`のオプションを追加することで指定したフォルダにGemをインストールするようにできます。このようにすることでグローバルにインストールされてGemとプロジェクトでインストールされたGemが混在することを防ぐことができます。また次回以降のインストールの際は`--path`オプションは不要です。  

```shell.prettyprint
$ bundle install --path vendor/bundle
```

これでRailsのインストールは完了です。  

<h2 id="rails-project">Railsプロジェクトの作成</h2>

Railsのインストールが完了したので、あとはプロジェクトを作成するだけです。下記を実行するとRailsプロジェクトに必要なファイルが自動生成されます。  

```shell.prettyprint
$ bundle exec rails new . --skip-bundle --skip-test
...
    conflict  Gemfile
Overwrite /****/todo-rails/rails-todo-tutorial/Gemfile? (enter "h" for help) [Ynaqdhm] Y
...
```

途中でGemfileを再生成するか尋ねられるので「Y」とタイプしてGemfileを上書きしてください。  
  
`bundle exec`を指定するとBunderでインストールしたプロジェクト配下のGemを使うようになります。  
`rails new .`でコマンドを実行しているディレクトリにファイルを自動生成します。  
残りのオプションについても説明しておきます。  
  
- `--skip-bundle`: プロジェクト生成後に`bundle install`を実行しないようにします。
- `--skip-test`: テストファイルおよび付随するファイルを作成しないようにします。

通常はプロジェクトを作成した後、Gemfileを編集し利用するGemを指定してからBunderでインストールします。  
今回は特に変更はしないのでそのまま`bundle install`してしまいます。  

```shell.prettyprint
$ bundle install
```

<h2 id="rails-starting">Railsアプリの起動</h2>

Railsアプリの起動します。起動は`bin/rails s`を実行するだけです。`bin/rails`でプロジェクトのRailsコマンドであることを指定しています。  

```shell.prettyprint
$ bin/rails s
=> Booting Puma
=> Rails 5.2.3 application starting in development 
=> Run `rails server -h` for more startup options
Puma starting in single mode...
* Version 3.12.1 (ruby 2.6.3-p62), codename: Llamas in Pajamas
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://localhost:3000
```

<img src="images/rails/setup/run-rails.png" alt="起動画面" title="起動画面" style="max-height:400px;">

また、Railsの停止は`bin/raisl s`で起動したコンソールで「Ctrl + C」と打つとできます。  

  
  
次のステップ：[MariaDBを利用する](https://irisash.github.io/rails/use_mariadb/)

<h2 id="reference-links">参考リンク</h2>

- [Ruby on Rails ガイド](https://railsguides.jp/)
- [Railsチュートリアル](https://railstutorial.jp/chapters/beginning?version=5.1)
