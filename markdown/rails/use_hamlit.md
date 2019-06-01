# HTMLテンプレートHamlitを使う

Rails標準のHTMLテンプレートはERBが使われています。他にもHamlやSlimといったものがありますが、今回はHamlitというHTMLテンプレートを使う方法を説明します。HamlitはHamlの拡張でHamlをより高速にしたものです。記法はHamlと同様なのでHamlユーザーも利用しやすいでしょう。  
  
以下はHamlitの導入の内容になりますが、HamlやSlimもほぼ同様になると思います。詳しくは公式のドキュメントを参考ください。  

- [Haml](https://github.com/haml/haml)
- [Slim](https://github.com/slim-template/slim)

また、実装サンプルは[こちら](https://github.com/irisAsh/rails-todo-tutorial/tree/ver-use-hamlit)です。

<h2 id="hamlit-rails">hamlit-railsのインストール</h2>

[Hamlit](https://github.com/k0kubun/hamlit)のGemを直接インストールしても良いですが、`rails generate`でビューファイルを自動生成したり、既存のERBファイルをHaml形式に変換したりしたいので`hamlit-rails`のGemをインストールするようにします。  
Gemfileを編集して`bundle install`してください。  

```Gemfile.prettyprint
# Gemfile

gem 'hamlit-rails' # 追加
```

インストールが完了したら、既にあるERBのファイルをHamlのファイルに変換します。`bundle exec rake hamlit:erb2haml`を実行してください。  

```shell.prettyprint
$ bundle exec rake hamlit:erb2haml
```

これでHamlへの変換が完了すれば良いですが、下記のエラーが表示されることがあります。  

```shell.prettyprint
$ bundle exec rake hamlit:erb2haml
html2haml gem is not part of the bundle.
`rake hamlit:erb2haml` requires html2haml gem to convert erb files.

Please add html2haml gem temporarily and run `rake hamlit:erb2haml` again.
(You can remove html2haml gem after the conversion.)
```

エラーメッセージ通りに`html2haml`をインストールして再度変換作業をしましょう。変換作業後は不要なので削除してしまっても構いません。  

```Gemfile.prettyprint
# Gemfile

gem 'hamlit-rails'
gem 'html2haml' # 追加
```

```
$ bundle install
$ bundle exec rake hamlit:erb2haml

Generating .haml for app/views/layouts/application.html.erb...
Generating .haml for app/views/layouts/mailer.html.erb...
Generating .haml for app/views/layouts/mailer.text.erb...
Generating .haml for app/views/todos/index.html.erb...
Generating .haml for app/views/todos/edit.html.erb...
Generating .haml for app/views/todos/show.html.erb...
Generating .haml for app/views/todos/_form.html.erb...
Generating .haml for app/views/todos/new.html.erb...

Do you want to delete original .erb files? (y/n): y
Deleting original .erb files...
  app/views/layouts/application.html.erb
  app/views/layouts/mailer.html.erb
  app/views/layouts/mailer.text.erb
  app/views/todos/index.html.erb
  app/views/todos/edit.html.erb
  app/views/todos/show.html.erb
  app/views/todos/_form.html.erb
  app/views/todos/new.html.erb

Finished to convert erb files.
```

これで変換作業が完了しました。Railsを一度再起動してから画面を表示してみましょう。画面が正常に表示されればOKです。  

<h2 id="coding-haml">Hamlit(Haml)でコードを書く</h2>

前回作ったTodo一覧の画面を見てみましょう。`app/views/todos/index.html.haml`がTodo一覧画面のビューファイルです。  

```haml.prettyprint
# app/views/todos/index.html.haml

%p#notice= notice
%h1 Todos
%table
  %thead
    %tr
      %th Title
      %th Description
      %th Status
      %th Estimateddate
      %th{:colspan => "3"}
  %tbody
    - @todos.each do |todo|
      %tr
        %td= todo.title
        %td= todo.description
        %td= todo.status
        %td= todo.estimatedDate
        %td= link_to 'Show', todo
        %td= link_to 'Edit', edit_todo_path(todo)
        %td= link_to 'Destroy', todo, method: :delete, data: { confirm: 'Are you sure?' }
%br/
= link_to 'New Todo', new_todo_path
```

Haml記法ではHTMLタグは`%タグ名`になります。  
適当にタグをついて画面を更新してみてください。下記はpタグを追加している例です。  

```haml.prettyprint
# app/views/todos/index.html.haml

%p#notice= notice
%h1 Todos
# 追加
%p Todoの一覧です
%table
  %thead
    %tr
```

<img src="images/rails/use_hamlit/index-page.png" alt="一覧画面" title="一覧画面" style="max-height:400px;">

次のステップ：[画面作成の基本](https://irisash.github.io/rails/add_page/)
