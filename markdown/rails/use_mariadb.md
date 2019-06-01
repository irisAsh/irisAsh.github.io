# Ruby on RailsでMariaDBを利用する

[環境設定](https://irisash.github.io/rails/setup/)でRailsプロジェクト作成をしました。今度はプロジェクト作成後にMariaDBを導入する手順を説明します。  
Rails初期設定ではSQLightを利用するようになっていますが、プロジェクト規模が多くなる場合は関係性のあるデータベースを利用する方が良いです。  
そこで今回はオープンソースのリレーショナルデータベースであるMariaDBを導入します。MariaDBはMySQLから派生したRDBSで互換性もあり、MySQLユーザーも親しみやすいと思います。  
  
MariaDBについての説明は[こちら](https://irisash.github.io/mariadb/)を参考にしてください。  
また、実装サンプルは[Github](https://github.com/irisAsh/rails-todo-tutorial/tree/ver-use-mariadb)においていますのでご参照ください。  

<h2 id="install-gem">MariaDB用のGem</h2>

Gemfileを開いてMariaDBのためのGemを追加します。デフォルトのSQLite3のGemは不要なので削除します。  

```Gemfile.prettyprint
# デフォルトのsqlite3は削除
# Use sqlite3 as the database for Active Record
#gem 'sqlite3'

gem 'mysql2'
```

Gemfile編集後はBundlerでインストールします。  

```shell.prettyprint
$ bundle install
```

<h2 id="settings">MariaDBの設定</h2>

Railsではデータベースの設定は`config/database.yml`で記載するようになっています。  

```config/database.yml.prettyprint
# config/database.yml

default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  timeout: 5000
  username: rails_todo_tutorial_user
  password: test
  socket: /tmp/mysql.sock

development:
  <<: *default
  database: rails_todo_tutorial_development

test:
  <<: *default
  database: rails_todo_tutorial_test

production:
  <<: *default
  database: rails_todo_tutorial_production
```

`default: &default`にネストして記述することで共通の設定を持ち回せるようになっています。利用する際は`<<: *default`と記述すると参照できます。  

### adapter

`adapter`には利用するデータベースを指定します。MariaDBの場合は`mysql2`です。  

### encoding

文字コードを指定します。通常は`utf8`になるでしょう。  

### pool

コネクションプールの数を設定します。  

### timeout

接続のタイムアウトの時間を設定します。単位はミリ秒。  

### socket

MariaDBのソケットファイルの位置を指定します。通常はなくても問題ないです。設定でソケットファイルの場所を変更している場合は必要です。  

### username

データベースに接続する際のユーザー名です。  
管理者ユーザー`root`であれば不要ですが、`root`以外の場合は予めMariaDBコンソールから作成しておく必要があります。  
  
ユーザーの作成方法は[MariaDBのユーザーと権限](https://irisash.github.io/mariadb/user_and_authority/)をご参照ください。  

### password

データベースに接続するユーザーのパスワードです　。  
本番環境の場合はソースコードに記載せず環境変数に持たせるなどの工夫が必要です。  

### database

作成するデータベースの名前です。  

### host

データベースのアクセス先です。  

<h2 id="create-database">データベースを作成する</h2>

先程設定した内容でデータベースを作成します。  

```shell.prettyprint
$ bin/rails db:create
Created database 'rails_todo_tutorial_development'
Created database 'rails_todo_tutorial_test'
```

これでデータベースが作成されました。実際にMariaDBのコンソールからみると`config/database.yml`のユーザー所有で設定した名称のデータベースが作成されていることが確認できます。  
  
  
次のステップ：[scaffoldを使う](https://irisash.github.io/rails/scaffold/)

<h2 id="reference-links">参考サイト</h2>

[3.16.2 Configuring a MySQL or MariaDB Database](https://guides.rubyonrails.org/configuring.html#configuring-a-mysql-or-mariadb-database)
