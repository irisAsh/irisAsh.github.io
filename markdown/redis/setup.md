# Redisの環境設定

RedisはNoSQLと呼ばれるデータベースの１つで、データをキー・バリューの形で扱うインメモリデータベースです。メモリ上にデータを保存するのでRDBと比べて高速な処理ができます。ただし、RDBのようにテーブル構造の構成には不向きであり、またメモリ上にデータを格納するので再起動やシステムダウンなどがあるとデータを失います。（バックアップ機能を設定すれば永続的にデータを保存できます。）

<h2 id="install-redis">Redisのインストール</h2>

Macbook環境であれば[Homebrew](https://brew.sh/index_ja)を使うことで簡単にインストールすることができます。

```shell.prettyprint
$ brew install redis
```

下記のようにRedisのバージョンを確認できればインストール完了です。  

```shell.prettyprint
$ redis-server --version
Redis server v=5.0.4 sha=00000000:0 malloc=libc bits=64 build=d4ba11298acbb366
$ redis-cli --version
redis-cli 5.0.4
```

<h2 id="run-redis-server">Redisの起動</h2>

`redis-server /usr/local/etc/redis.conf`でRedisを起動することができます。`/usr/local/etc/redis.conf`はRedisの設定ファイルです。  
下記のようにコンソールに表示が出れば成功です。  
  
停止は`Ctrl-C`でできます。

```shell.prettyprint
$ redis-server /usr/local/etc/redis.conf

38357:C 27 Apr 2019 20:42:35.585 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
38357:C 27 Apr 2019 20:42:35.586 # Redis version=5.0.4, bits=64, commit=00000000, modified=0, pid=38357, just started
38357:C 27 Apr 2019 20:42:35.586 # Configuration loaded
38357:M 27 Apr 2019 20:42:35.587 * Increased maximum number of open files to 10032 (it was originally set to 2560).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 5.0.4 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 38357
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

38357:M 27 Apr 2019 20:42:35.593 # Server initialized
38357:M 27 Apr 2019 20:42:35.593 * Ready to accept connections
```

<h2 id="use-service">Redisの自動起動</h2>

`brew services`でMacの起動後に自動でRedisサーバーが起動するようにすることができます。

**起動**

```shell.prettyprint
$ brew services start redis
==> Successfully started `redis`
```

またサービスの停止と再起動は次のコマンドです。  
  
**停止**

```shell.prettyprint
$ brew services stop redis
```

**再起動**

```shell.prettyprint
$ brew services restart redis
```

<h2 id="redis-cli">Redisクライアントの起動</h2>

コンソールからRedisの操作をするには`redis-cli`でRedisクライアントを起動する必要があります。  
  
また、終了は`quit`でできます。  

```shell.prettyprint
$ redis-cli
127.0.0.1:6379>
127.0.0.1:6379> quit
```

<h2 id="get-set">データの登録と削除</h2>

簡単にですが、データの登録と削除方法を説明しておきます。  
  
データの登録は`set キー 値`でできます。また`get キー`でキーに登録した値を取得できます。  

```shell.prettyprint
$ redis-cli
127.0.0.1:6379> set hello 'world'
OK
127.0.0.1:6379> get hello
"world"
127.0.0.1:6379>
```

データの削除は`del キー`でできます。  

```shell.prettyprint
127.0.0.1:6379> del hello
(integer) 1
127.0.0.1:6379> get hello
(nil)
127.0.0.1:6379> 
```
