# MariaDBのデータベース作成

MariaDBでのデータベース作成について説明していきます。開発環境では環境を綺麗にするためにデータベースの削除・作成はするかもしてませんが、基本的にデータベースの作成も頻繁に行う作業ではないのでメモとして活用ください。

<h2 id="show-database">データベースの一覧確認</h2>

現在作成されているデータベース一覧の確認方法です。  

```shell.prettyprint
MariaDB [(none)]> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
```

<h2 id="create-database">データベースの作成</h2>

データベースの作成は`CREATE DATABASE データベース名`で実行できます。  

```shell.prettyprint
MariaDB [(none)]> CREATE DATABASE tutorial;

MariaDB [(none)]> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| tutorial           |
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
```

データベースの所有者は`CREATE DATABASE`を実行したユーザーになります。別ユーザーでもデータベースを管理できるようにするためには、そのユーザーに権限の付与をしてください。（参考：[MariaDBのユーザー管理と権限付与](https://irisash.github.io/mariadb/user_and_authority/)）  
  
また、データベースの所有は次のコマンドで確認できます。  

```shell.prettyprint
MariaDB [(none)]> SELECT host,db,user FROM mysql.db;
+-----------+----------+-----------+
| host      | db       | user      |
+-----------+----------+-----------+
| %         | test     |           |
| localhost | tutorial | test_user |
+-----------+----------+-----------+
```

<h2 id="drop-database">データベースの削除</h2>

データベースの作成は`DROP DATABASE データベース名`で実行できます。  

```shell.prettyprint
MariaDB [(none)]> DROP DATABASE tutorial;

MariaDB [(none)]> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
```

<h2 id="use-database">データベースに接続する</h2>

作成したデータベースに接続するには`USE データベース名`を使います。  

```shell.prettyprint
MariaDB [(none)]> USE tutorial
Database changed
MariaDB [tutorial]> 
```

また、MariaDBコンソールにログインする際に直接データベースに接続することができます。  

```shell.prettyprint
$ mysql -u ユーザー名 データベース名 -p
```

<h2 id="reference-links">参考サイト</h2>

- [mysql Command-line Client](https://mariadb.com/kb/en/library/mysql-command-line-client/)
- [USE DATABASE](https://mariadb.com/kb/en/library/use/)
