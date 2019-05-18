# MariaDBの環境設定

MariaDBはMySQLから派生したオープンソースのリレーショナルデータベース管理システムです。LinuxOSでは標準のデータベースとして利用が広まっています。  

<h2 id="install">インストール</h2>

macOS環境でのHomebrewを使ったインストール方法を説明します。  
  
下記のコマンドを実行してください。  

```shell.prettyprint
$ brew update
$ brew install mariadb
A "/etc/my.cnf" from another install may interfere with a Homebrew-built
server starting up correctly.

MySQL is configured to only allow connections from localhost by default

To connect:
    mysql -uroot

To have launchd start mariadb now and restart at login:
  brew services start mariadb
Or, if you don't want/need a background service you can just run:
  mysql.server start
==> Summary
🍺  /usr/local/Cellar/mariadb/10.3.15: 658 files, 169.5MB
```

MariaDBのバージョンを表示してインストールされていることを確認します。  

```shell.prettyprint
$ mysql --version
mysql  Ver 15.1 Distrib 10.3.15-MariaDB, for osx10.14 (x86_64) using readline 5.1
```

<h2 id="running">起動</h2>

インストールが確認できたらMariaDBを起動しましょう。  

```shell.prettyprint
$ mysql.server start
Starting MariaDB
SUCCESS!
```

PCの起動時に自動でMariaDBを起動させたい場合はHomebrewのサービスを使って設定できます。  

```shell.prettyprint
$ brew services start mariadb
```

ルートユーザーでログインして起動を確認します。  

```shell.prettyprint
$ mysql -uroot
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 9
Server version: 10.3.15-MariaDB Homebrew

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> 
```

コンソールから出るときは`quit`コマンドを入力します。  

<h2 id="reference-link">参考サイト</h2>

[Installing MariaDB Server on macOS Using Homebrew](https://mariadb.com/kb/en/library/installing-mariadb-on-macos-using-homebrew/)
