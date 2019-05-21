# MariaDB ユーザーと権限

MariaDBでのユーザー管理（ロール）と権限付与について説明していきます。環境構築後や入れ替え作業時くらいで頻繁に行う作業なので、忘れた時のメモとして活用ください。  

<h2 id="select-user">ユーザーの確認</h2>

管理されているユーザーは`mysql.user`に保存されています。  

```shell.prettyprint
MariaDB [(none)]> SELECT host,user,password FROM mysql.user;
+-----------+------+----------+
| host      | user | password |
+-----------+------+----------+
| localhost | root |          |
| 127.0.0.1 | root |          |
| ::1       | root |          |
| localhost |      |          |
+-----------+------+----------+
```

<h2 id="create-user">ユーザーの作成</h2>

ユーザーの作成コマンドです。大抵の場合はパスワードを付与してユーザーを作成することでしょう。パスワードは`IDENTIFIED BY 'パスワード'`で付与できます。またDBに保存される場合はパスワードの値はハッシュ化されて登録されるようになっています。  

```shell.prettyprint
MariaDB [(none)]> CREATE USER test_user@localhost IDENTIFIED BY 'test';

MariaDB [(none)]> SELECT host,user,password FROM mysql.user;
+-----------+-----------+-------------------------------------------+
| host      | user      | password                                  |
+-----------+-----------+-------------------------------------------+
| localhost | root      |                                           |
| 127.0.0.1 | root      |                                           |
| ::1       | root      |                                           |
| localhost |           |                                           |
| localhost | test_user | *94BDCEBE19083CE2A1F959FD02F964C7AF4CFC29 |
+-----------+-----------+-------------------------------------------+
```

<h2 id="drop-user">ユーザーの削除</h2>

`DROP USER`または`DROP USER IF EXISTS`でユーザーを削除できます。ユーザーが存在しない場合、`IF EXISTS`なしではコンソールにエラー表示され、`IF EXISTS`ありではエラーはNoteに書き込まれます。`SHOW WARNINGS`でNoteの内容を確認できます。  

ユーザーが存在する場合。

```shell.prettyprint
MariaDB [(none)]> DROP USER IF EXISTS test_user@localhost;

MariaDB [(none)]> SELECT host,user,password FROM mysql.user;
+-----------+------+----------+
| host      | user | password |
+-----------+------+----------+
| localhost | root |          |
| 127.0.0.1 | root |          |
| ::1       | root |          |
| localhost |      |          |
+-----------+------+----------+
```

ユーザーが存在しなかった場合。

```shell.prettyprint
MariaDB [(none)]> DROP USER IF EXISTS test_user;

MariaDB [(none)]> SHOW WARNINGS;
+-------+------+---------------------------------------------------+
| Level | Code | Message                                           |
+-------+------+---------------------------------------------------+
| Note  | 1974 | Can't drop user 'test_user'@'%'; it doesn't exist |
+-------+------+---------------------------------------------------+
```

<h2 id="replace-user">ユーザーの変更</h2>

ユーザー情報の変更は`ALTER USER`でできます。下記はユーザーのパスワードを変更しています。  

```shell.prettyprint
MariaDB [(none)]> ALTER USER test_user@localhost IDENTIFIED BY 'new_password';

MariaDB [(none)]> SELECT host,user,password FROM mysql.user;
+-----------+-----------+-------------------------------------------+
| host      | user      | password                                  |
+-----------+-----------+-------------------------------------------+
| localhost | root      |                                           |
| 127.0.0.1 | root      |                                           |
| ::1       | root      |                                           |
| localhost |           |                                           |
| localhost | test_user | *0913BF2E2CE20CE21BFB1961AF124D4920458E5F |
+-----------+-----------+-------------------------------------------+
```

`CREATE OR REPLACE USER`でユーザーを作り直すこともできます。ただし、下記の処理はパスワードを変更してユーザーを作り直していますが、変更前の権限など情報は初期の状態（権限なし）となってしまいます。`ALTER USER`であれば作り直しではないので、パスワードを変更されるだけでその他の情報はそのままです。  

```shell.prettyprint
MariaDB [(none)]> CREATE OR REPLACE USER test_user@localhost IDENTIFIED BY 'new_password';

MariaDB [(none)]> SELECT host,user,password FROM mysql.user;
+-----------+-----------+-------------------------------------------+
| host      | user      | password                                  |
+-----------+-----------+-------------------------------------------+
| localhost | root      |                                           |
| 127.0.0.1 | root      |                                           |
| ::1       | root      |                                           |
| localhost |           |                                           |
| localhost | test_user | *0913BF2E2CE20CE21BFB1961AF124D4920458E5F |
+-----------+-----------+-------------------------------------------+
```

<h2 id="login-user">ユーザーを指定してログイン</h2>

作成されたユーザーを指定してログインすることができます。`mysql -u ユーザー名`でログインができます。またパスワードを設定する場合は`-p`オプションをつけます。`-p`オプションをつけるとコマンド実行後にパスワードの確認が表示されます。もしワンライナーでログインしたい場合は`-p`の後にスペースなしでパスワードを付与すれば確認なしでログインできます。  

```shell.prettyprint
$ mysql -u test_user -p
Enter password:
```
```shell.prettyprint
$ mysql -u test_user -pパスワード
```

<h2 id="grant-user">ユーザーの権限の確認</h2>

ユーザーの権限は`SHOW GRANTS FOR`で確認できます。  

```shell.prettyprint
MariaDB [(none)]> SHOW GRANTS FOR test_user@localhost;
+------------------------------------------------------------------------------------------------------------------+
| Grants for test_user@localhost                                                                                   |
+------------------------------------------------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO 'test_user'@'localhost' IDENTIFIED BY PASSWORD '*0913BF2E2CE20CE21BFB1961AF124D4920458E5F' |
+------------------------------------------------------------------------------------------------------------------+
```

<h2 id="grant-user">権限の付与</h2>

権限は`GRANT 権限の種類 ON DB名.* TO ユーザー@ホスト`で付与できます。  
下記の処理は`test_user`に全権限を付与しています。権限の種類は[こちら](https://mariadb.com/kb/en/library/grant/#the-all-privileges-privilege)を参照ください。  

```shell.prettyprint
MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO test_user@localhost;

MariaDB [(none)]> SHOW GRANTS FOR test_user@localhost;
+---------------------------------------------------------------------------------------------------------------------------+
| Grants for test_user@localhost                                                                                            |
+---------------------------------------------------------------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'test_user'@'localhost' IDENTIFIED BY PASSWORD '*0913BF2E2CE20CE21BFB1961AF124D4920458E5F' |
+---------------------------------------------------------------------------------------------------------------------------+
```

DBを限定して権限を与える場合。  

```shell.prettyprint
MariaDB [(none)]> GRANT ALL PRIVILEGES ON dbname.* TO test_user@localhost;

MariaDB [(none)]> SHOW GRANTS FOR test_user@localhost;
+------------------------------------------------------------------------------------------------------------------+
| Grants for test_user@localhost                                                                                   |
+------------------------------------------------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO 'test_user'@'localhost' IDENTIFIED BY PASSWORD '*94BDCEBE19083CE2A1F959FD02F964C7AF4CFC29' |
| GRANT ALL PRIVILEGES ON `dbname`.* TO 'test_user'@'localhost'                                                    |
+------------------------------------------------------------------------------------------------------------------+
```

<h2 id="reference-link">参考サイト</h2>

[Account Management SQL Commands](https://mariadb.com/kb/en/library/account-management-sql-commands/)
