# RuboCopを導入してコードを整理する

[Rubocop](https://github.com/rubocop-hq/rubocop)はRubyコードのスタイルガイドに沿ってコード解析をしてくれるツールです。プロジェクトの開発で実装する人数が増えればソースコードの記述が統一されなくなっていきます。コード解析ツールを使えばスタイルガイドに順守していない場合に警告を表示して知らせてくれます。  

<h2 id="install">RuboCopのインストール</h2>

BundlerでインストールするのでGemfileをインストールします。  

```Gemfile.prettyprint
# Gemfile

group :development do
  ...
  gem 'rubocop', require: false # 追加
end
```

`bundle install`を実行すればインストールは完了です。  

<h2 id="clean-code">RuboCopでコードを整理する</h2>

`bundle exec rubocop`でRubocopを起動できます。オプション`-R`をつけるとRails用のチェックが入るようになります。  

```shell.prettyprint
$ bundle exec rubocop -R
Inspecting 42 files
CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC

Offenses:

config.ru:1:1: C: Style/FrozenStringLiteralComment: Missing magic comment # frozen_string_literal: true.
# This file is used by Rack-based servers to start the application.

...

42 files inspected, 135 offenses detected
```

実行するとRubocopのチェックに引っかかった箇所のファイル名・行数・詳細と最後に警告の件数が出力されます。  
  
また、上記のコマンドではプロジェクト全体をチェックするようになっていますが、コマンド実行時にチェック箇所を絞り込むこともできます。  
下記では`app`フォルダだけRubocopのチェックをするようにしています。  

```shell.prettyprint
$ bundle exec rubocop app -R
```

また、設定ファイルを用意することでRubocopのチェック対象を指定することもできます。  
プロジェクト配下に`.rubocop.yml`ファイルを作成し、下記のように編集してください。  

```yml.prettyprint
# .rubocop.yml

AllCops:
  Exclude:
    - 'node_modules/**/*'
    - 'vendor/**/*'
    - '.git/**/*'
    - 'bin/*'
    - 'config/**/*'
```

設定後にRubocopを実行すると`Exclude`に入れたファイルの警告がなくなっていることが確認できます。  
また、設定ファイルは下記のように`-c`オプションを設定してファイル場所を指定できます。プロジェクト配下であれば明示しなくても設定は反映されます。  

```shell.prettyprint
$ bundle exec rubocop -c .rubocop.yml
```

基本的にはRubocopが警告を表示した通りにファイルを修正していけば良いですが、初期設定のルールが気に入らない場合は設定を変更して対処できます。  
その場合は先程と同じように`.rubocop.yml`を編集します。下記の例では`Style/FrozenStringLiteralComment`というルールのチェックをしないようにしています。  

```shell.prettyprint
.rubocop.yml
Style/FrozenStringLiteralComment:
  Enabled: false
```

初期設定やルールの一覧については参考サイトのドキュメントや`vendor/bundle/ruby/2.6.0/gems/rubocop-0.70.0/config/default.yml`(vender/bundleにGemをインストールした場合のパスです)を確認して、適宜好みのチェックルールに設定するのが良いでしょう。  

<h2 id="reference-links">参考サイト</h2>

- [RuboCop Document](https://docs.rubocop.org/en/stable/)
