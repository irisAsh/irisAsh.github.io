# Railsで新規画面を作成する基本な流れ

Railsで新規画面を作成する基本的な流れを説明します。今回は自動生成を使います。rails generate controllerでビューとコントローラーの自動生成をし、適宜画面を編集し画面を作成していきます。  
  
今回実装のサンプルは[Github](https://github.com/irisAsh/rails-todo-tutorial/tree/ver-add-page)においていますのでご参考ください。  

<h2 id="add-page">画面の追加</h2>

画面の追加には、ルーティングの追加、コントローラーの追加、ビューの追加が必要となります。`rails generate controller`を使うとこの３つの操作を自動でしてくれます。  

```shell.prettyprint
$ bin/rails g controller Welcome index
      create  app/controllers/welcome_controller.rb
       route  get 'welcome/index'
      invoke  haml
      create    app/views/welcome
      create    app/views/welcome/index.html.haml
      invoke  assets
      invoke    coffee
      invoke    scss
```

まずルーティングを見てみると`get 'welcome/index'`が追加されています。  
これは`/welcome/index`のGETレスポンスを追加した意味になります。これを追加するとWelcomeControllerとコントローラー内に`index`アクション（`def index`と宣言させるメソッドです）が必要になり、また`index.html.haml`のビューファイルが必要になります。  

```ruby.prettyprint
# config/routes.rb

Rails.application.routes.draw do
  get 'welcome/index' # 追加される
  resources :todos
end
```

続いて、ビューとコントローラーです。  

```haml.prettyprint
# app/views/welcome/index.html.haml

%h1 Welcome#index
%p Find me in app/views/welcome/index.html.haml
```

```ruby.prettyprint
# app/controllers/welcome_controller.rb

class WelcomeController < ApplicationController
  def index
  end
end
```

ビューには`/welcome/index`に表示されている内容が書かれています。コントローラーには今は`index`アクションの処理は何も書かれていません。  

<h2 id="edit-page">画面の編集</h2>

最初に、ルートパス(`http://localhost:3000/`)で`/welcome/index`と同じ画面が表示されるようにしておきましょう。  

```ruby.prettyprint
Rails.application.routes.draw do
  root "welcome#index" # 追加
  get "welcome/index"
  resources :todos
end
```

`root "コントローラ名/アクション名"`でルートパスを任意のアクション処理に割り当てることができます。  

<img src="images/rails/add_page/welcome-index.png" alt="ルート画面" title="ルート画面" style="max-height:400px;">

次に画面を編集してみましょう。下記のようにコードを編集してルートパスにアクセスしてみてください。  

```haml.prettyprint
# app/views/welcome/index.html.haml

%h1 Todoアプリ
%p= "残りタスク：1個"
= link_to "一覧へ", todos_path
```

<img src="images/rails/add_page/show-task-count.png" alt="Todo件数表示" title="Todo件数表示" style="max-height:400px;">

`link_to`というメソッドはRailsでよく使われるメソッドでaタグを生成してくれるメソッドです。第１引数にリンクの文字列、第２引数にリンク先のパスを指定します。  
`todos_path`は_pathヘルパーというRailsのメソッドでルーティングに定義されているパスを生成してくれます。  
`bin/rails routes`で表示されるPrefixの文字に_pathをつけたメソッドが用意される_pathヘルパーとなります。  

```shell.prettyprint
$ bin/rails routes
         Prefix Verb   URI Pattern                 Controller#Action
           root GET    /                           welcome#index
  welcome_index GET    /welcome/index(.:format)    welcome#index
          todos GET    /todos(.:format)            todos#index
                POST   /todos(.:format)            todos#create
       new_todo GET    /todos/new(.:format)        todos#new
      edit_todo GET    /todos/:id/edit(.:format)   todos#edit
           todo GET    /todos/:id(.:format)        todos#show
                PATCH  /todos/:id(.:format)        todos#update
                PUT    /todos/:id(.:format)        todos#update
                DELETE /todos/:id(.:format)        todos#destroy
```

さて、コントローラーも編集してみましょう。コントローラーで定義した値をビュー側へ受け渡すようにしてみます。これにはコントローラー側でインスタンス変数を用意する必要があります。  
すると、コントローラー側で宣言したインスタンス変数はビュー側で利用できるようになります。  

```ruby.prettyprint
# app/controllers/welcome_controller.rb

class WelcomeController < ApplicationController
  def index
    @remaining_count = 1
  end
end
```

```haml.prettyprint
# app/views/welcome/index.html.haml

%h1 Todoアプリ
%p= "残りタスク：#{@remaining_count}個"
= link_to "一覧へ", todos_path
```

最後に少しだけデータベースとのアクセス処理を追加してみましょう。  

```ruby.prettyprint
# app/controllers/welcome_controller.rb

class WelcomeController < ApplicationController
  def index
    @remaining_count = Todo.all.count
  end
end
```

`@remaining_count = Todo.all.count`としました。これは`モデル名.all`で該当モデルの全データを取得し、さらに`モデル名.all.count`として全データの件数を取るようにしています。(Todoモデルは[scaffoldを使う](https://irisash.github.io/rails/scaffold/)で作成したのでそちらを参考）  
試しにTodoを作成してみてください。件数がTodoデータの件数になることが確認できるはずです。  
  
  
次のステップ：[Deviseを利用して認証を追加する](https://irisash.github.io/rails/use_devise/)

<h2 id="reference-links">参考サイト</h2>

- [Rails のルーティング](https://railsguides.jp/routing.html)
