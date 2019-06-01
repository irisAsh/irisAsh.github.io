# rails generate scaffoldを使ってページを追加する

前回の[Ruby on RailsでMariaDBを利用する](https://irisash.github.io/rails/use_mariadb/)でデータベースの設定ができました。今回はrails generate scaffoldを使って新規ページを追加してみます。  
今回の実装内容は[こちら](https://github.com/irisAsh/rails-todo-tutorial/tree/ver-scaffold)においておきますのでご参照ください。  

<h2 id="scaffold">rails generate scaffold</h2>

`rails generate scaffold`を実行するとコントローラー、ビュー、モデル等の必要とするファイルを全て自動生成することができます。  
実際に動かした方がわかりやすいので実行してみましょう。  
  
`rails generate scaffold モデル名 カラム名:カラムの型 ...`の形式でコマンド実行します。  

```shell.prettyprint
$ bin/rails generate scaffold Todo title:string description:text status:integer estimatedDate:datetime
      invoke  active_record
      create    db/migrate/20190523123110_create_todos.rb
      create    app/models/todo.rb
      invoke  resource_route
       route    resources :todos
      invoke  scaffold_controller
      create    app/controllers/todos_controller.rb
      invoke    erb
      create      app/views/todos
      create      app/views/todos/index.html.erb
      create      app/views/todos/edit.html.erb
      create      app/views/todos/show.html.erb
      create      app/views/todos/new.html.erb
      create      app/views/todos/_form.html.erb
      invoke    helper
      create      app/helpers/todos_helper.rb
      invoke    jbuilder
      create      app/views/todos/index.json.jbuilder
      create      app/views/todos/show.json.jbuilder
      create      app/views/todos/_todo.json.jbuilder
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/todos.coffee
      invoke    scss
      create      app/assets/stylesheets/todos.scss
      invoke  scss
      create    app/assets/stylesheets/scaffolds.scss
```

実行すると複数のファイルが作成されているのを確認できます。それぞれ下記の通りです。  

**アセット**

JavascriptファイルやCSSファイルです。  

- `app/assets/javascripts/todos.coffee`
- `app/assets/stylesheets/scaffolds.scss`
- `app/assets/stylesheets/todos.scss`

**コントローラー**

コントローラー層の処理を記述するファイルです。  

- `app/controllers/todos_controller.rb`

**ビュー**

View層の処理を記述するファイルです。  

- `app/views/todos/_form.html.erb`
- `app/views/todos/edit.html.erb`
- `app/views/todos/index.html.erb`
- `app/views/todos/new.html.erb`
- `app/views/todos/show.html.erb`

**ヘルパー**

View層で扱う共通処理を記述するファイルです。  

- `app/helpers/todos_helper.rb`

**モデル**

モデル定義やモデル層の処理を記述するファイルです。  

- `app/models/todo.rb`

**マイグレーション**

マイグレーションのファイルです。  

- `db/migrate/20190523124618_create_todos.rb`

**JSON**

API用に値を返すためのJSON定義ファイルです。通常APIは別構成で作成すると思うので削除しても構いません。  

- `app/views/todos/index.json.jbuilder`
- `app/views/todos/show.json.jbuilder`
- `app/views/todos/_todo.json.jbuilder`

`rails generate scaffold`で作成すると上記の全てのファイルが作成されますが、個別に必要な単位で自動生成することもできます。  

**rails generate controller**

アセット、コントローラー、ビュー、ヘルパーを自動生成します。  

**rails generate model**

モデル、マイグレーションを自動生成します。  

**rails generate migration**

マイグレーションを自動生成します。  

他にもいくつか`rails generate`のコマンドはありますがよく利用するのは上記の３つです。また、`rails generate`を使わずに手動でファイルを作成しても問題はありません。機能の追加などで実装することになれば手動でファイルを作成することが多いでしょう。  

<h2 id="setting-for-generators">自動生成の設定をする</h2>

設定によって`rails generate`で生成されるファイルを限定することができます。  
設定ファイルは`config/application.rb`です。ファイル内の`config.generators`を編集することで自動生成ファイルを指定できます。  
  
ここではアセットとヘルパーを自動生成させないように設定します。  

```ruby.prettyprint
# config/application.rb

module RailsTodoTutorial
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    ...

    # ここを追加
    # Settings for generators
    config.generators do |g|
      g.stylesheets false       # 自動生成させない場合に false を設定します
      g.javascripts false
      g.helper false
    end
  end
end
```

設定したら再度`rails generate scaffold`を実行してみてください。（先程実行していた場合は生成されたファイルを削除するか、`git clean`すれば`scaffold`実行前に戻せます。）  
すると、自動生成不要の設定をした対象は作成されていないことが確認できます。  

```shell.prettyprint
$ bin/rails generate scaffold Todo title:string description:text status:integer estimatedDate:datetime
      invoke  active_record
      create    db/migrate/20190523124618_create_todos.rb
      create    app/models/todo.rb
      invoke  resource_route
       route    resources :todos
      invoke  scaffold_controller
      create    app/controllers/todos_controller.rb
      invoke    erb
      create      app/views/todos
      create      app/views/todos/index.html.erb
      create      app/views/todos/edit.html.erb
      create      app/views/todos/show.html.erb
      create      app/views/todos/new.html.erb
      create      app/views/todos/_form.html.erb
      invoke    jbuilder
      create      app/views/todos/index.json.jbuilder
      create      app/views/todos/show.json.jbuilder
      create      app/views/todos/_todo.json.jbuilder
      invoke  assets
      invoke    coffee
      invoke    scss
```

<h2 id="run-migration">マイグレーションを実行する</h2>

`scaffold`で自動生成されたファイルの中にモデルファイル(app/models配下)とマイグレーションファイル(db/migrate配下)があります。  
モデルファイルはDBのテーブルを操作するためのファイルです。ここでテーブル単位の共通関数などを追加して実装していきます。  
マイグレーションファイルはテーブル定義を登録・編集するためのファイルです。Railsの開発ではDBコンソール上でDDLを直接実行することはありません。このマイグレーションファイルを使ってテーブル定義を操作します。  
  
`scaffold`で作成されたマイグレーションファイルの中身をみてください。  

```ruby.prettyprint
#  db/migrate/20190523124618_create_todos.rb

class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.integer :status
      t.datetime :estimatedDate

      t.timestamps
    end
  end
end
```

マイグレーションファイルについてはまた詳しく説明しようと思いますので、ここでは簡単な説明をします。  
`create_table :todos`はテーブル作成のメソッドです。これによりDBに`todos`というテーブルが作成されます。  
`t.string :title`のようなコードはカラム定義を表しています。`t.カラム型 :カラム名`のようになっています。`t.timestamps`は`created_at`と`updated_at`のカラム定義です。これにより、Railsではこのカラムが自動で定義されるようになっています。  

### カラムに制約をつける

マイグレーション前にカラムの制約をつけるように設定しておきましょう。付与する制約は以下です。  

- titleにNOT NULL制約を付与。
- statusにNOT NULL制約を付与、さらに初期値0が登録されるようにする。

`null: false`を`t.カラム型`の引数に追加すると、マイグレーション時にNOT NULL制約が付与されます。  
また`default: 値`を引数に追加すると初期値の設定ができます。  

```ruby.prettyprint
class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.text :description
      t.integer :status, null: false, default: 0
      t.datetime :estimatedDate

      t.timestamps
    end
  end
end
```

### マイグレーションの実行

マイグレーション実行は`bin/rails db:migrate`のコマンドでできます。  

```shell.prettyprint
$ bin/rails db:migrate
== 20190523124618 CreateTodos: migrating ======================================
-- create_table(:todos)
   -> 0.0088s
== 20190523124618 CreateTodos: migrated (0.0090s) =============================
```

実行すると`db/schema.rb`ファイルが作成されます。このファイルが実際にDBのテーブル定義を管理するファイルとなっています。

```ruby.prettyprint
# db/schema.rb

ActiveRecord::Schema.define(version: 2019_05_23_124618) do

  create_table "todos", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.integer "status", default: 0, null: false
    t.datetime "estimatedDate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
```

<h2 id="confirm-new-page">新規画面を表示する</h2>

Railsでは特定の決まっているルーティングが用意されています。  
`bin/rails route`で現在プロジェクトに定義されているルーティングの一覧が見れます。  
`rails generate scaffold Todo`によって`/todos/`で始まるエンドポイントのルーティングが追加されています。  

```shell.prettyprint
$ bin/rails route
        Prefix Verb   URI Pattern                 Controller#Action
        todos GET    /todos(.:format)            todos#index
              POST   /todos(.:format)            todos#create
      new_todo GET    /todos/new(.:format)        todos#new
    edit_todo GET    /todos/:id/edit(.:format)   todos#edit
          todo GET    /todos/:id(.:format)        todos#show
              PATCH  /todos/:id(.:format)        todos#update
              PUT    /todos/:id(.:format)        todos#update
              DELETE /todos/:id(.:format)        todos#destroy
```

ルーティングの設定ファイルは`config/routes.rb`に記述されています。`scaffold`で`resources :todos`という行が追加されます。この`resources`が上記のエンドポイントを定義しています。  

```ruby.prettyprint
# config/routes.rb

Rails.application.routes.draw do
  resources :todos
end
```

エンドポイントと処理の関係は次の通りです。  

| エンドポイント | HTTPメソッド | 処理内容 |
| - | - | - |
| `/todos` | GET | Todo一覧画面表示 |
| `/todos` | POST | Todo作成処理 |
| `/todos/new` | GET | Todo新規登録画面表示 |
| `/todos/TodoのID/edit` | GET | Todo編集画面表示 |
| `/todos/TodoのID` | GET | Todoの詳細画面表示 |
| `/todos/TodoのID` | PATCH/PUT | Todo編集処理 |
| `/todos/TodoのID` | DELETE | Todo削除処理 |

では`bin/rails s`を実行して[http://localhost:3000/todos](http://localhost:3000/todos)にアクセスしてみましょう。するとTodoの一覧画面が表示されます。  

<img src="images/rails/scaffold/index-page.png" alt="Index画面" title="Index画面" style="max-height:400px;">

次に画面下の「New Todo」のリンクを押してみましょう。すると新規登録画面(`/todos/new`)へ飛びます。  

<img src="images/rails/scaffold/new-page.png" alt="New画面" title="New画面" style="max-height:400px;">

適当に値を入力して「create todo」をしてみてください。するとTodoデータが１件登録されます。追加された後は詳細画面(`/todos/1`)へリダイレクトされます。  

<img src="images/rails/scaffold/inputed-new-page.png" alt="入力後New画面" title="入力後New画面" style="max-height:400px;">

<img src="images/rails/scaffold/show-page.png" alt="詳細画面" title="詳細画面" style="max-height:400px;">

Backからもう一度一覧画面に戻ると一覧にデータが１つ追加されていることが確認できます。  

<img src="images/rails/scaffold/one-data.png" alt="登録後画面" title="登録後画面" style="max-height:400px;">

他にも「Edit」「Delete」で画面操作を試してみてください。上の表にあるエンドポイントが呼ばれそれぞれの処理が実行されることが確認できます。  
  
  
次のステップ：[Hamlitを使う](https://irisash.github.io/rails/use_hamlit/)
