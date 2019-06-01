# Deviseを利用して認証を追加する

これまで作ってきたTodoアプリにユーザー認証を入れてみます。Railsで認証を提供するGemではDeviseというGemが有名です。Deviseを採用することには色々と議論がありますが、セキュリティ面やそのコストを考えると基本的にはDeviseを利用するのが良いかと思います。  
  
今回のサンプルは[こちら](https://github.com/irisAsh/rails-todo-tutorial/tree/ver-use-devise)にあります。

<h2 id="setup-devise">Deviseの初期設定</h2>

下記のようにGemfileに追記してBundlerでインストールしてください。  

```Gemfile.prettyprint
gem 'devise' # 追加
```

`bundle install`でGemを追加したら、`bin/rails generate devise:install`を実行してDeviseの初期ファイルを生成してください。  

```shell.prettyprint
$ bin/rails generate devise:install
      create  config/initializers/devise.rb
      create  config/locales/devise.en.yml
===============================================================================

Some setup you must do manually if you haven't yet:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

       config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

     In production, :host should be set to the actual host of your application.

  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

       root to: "home#index"

  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

       <p class="notice"><%= notice %></p>
       <p class="alert"><%= alert %></p>

  4. You can copy Devise views (for customization) to your app by running:

       rails g devise:views

===============================================================================
```

実行結果に出力されているようにいくつか設定をする必要があります。  

### 1.config/environments/development.rb の編集

下記のように`config/environments/development.rb`に設定を追加してください。  

```shell.prettyprint
# config/environments/development.rb

...

config.action_mailer.perform_caching = false

# 追加
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

...
```

### 2.ルートパスの追加

[Railsで新規画面を作成する基本な流れ](https://irisash.github.io/rails/add_page/)で`welcome#index`を追加したのでこの場合は不要です。  

### 3.フラッシュメッセージの追加

`app/views/layouts/application.html.haml`にフラッシュメッセージを使いします。バリデーションエラーがあった時にメッセージが表示されるようになります。  

```haml.prettyprint
# app/views/layouts/application.html.haml

  %body
    # 追加
    .notice= notice
    .alert= alert
    = yield
```

### 4.Deviseのフォームをカスタマイズする

Deviseの標準フォームを自分好みにカスタマイズしたい場合の設定です。普通はカタマイズすると思うので実行して良いでしょう。  

```shell.prettyprint
$ bin/rails g devise:views
      invoke  Devise::Generators::SharedViewsGenerator
      create    app/views/devise/shared
      create    app/views/devise/shared/_error_messages.html.erb
      create    app/views/devise/shared/_links.html.erb
      invoke  form_for
      create    app/views/devise/confirmations
      create    app/views/devise/confirmations/new.html.erb
      create    app/views/devise/passwords
      create    app/views/devise/passwords/edit.html.erb
      create    app/views/devise/passwords/new.html.erb
      create    app/views/devise/registrations
      create    app/views/devise/registrations/edit.html.erb
      create    app/views/devise/registrations/new.html.erb
      create    app/views/devise/sessions
      create    app/views/devise/sessions/new.html.erb
      create    app/views/devise/unlocks
      create    app/views/devise/unlocks/new.html.erb
      invoke  erb
      create    app/views/devise/mailer
      create    app/views/devise/mailer/confirmation_instructions.html.erb
      create    app/views/devise/mailer/email_changed.html.erb
      create    app/views/devise/mailer/password_change.html.erb
      create    app/views/devise/mailer/reset_password_instructions.html.erb
      create    app/views/devise/mailer/unlock_instructions.html.erb
```

ビューファイルがたくさんできますが使用する時に見るのでここでは置いておきましょう。  
また自動生成されるビューはERBのテンプレートなるので、Haml(Hamlit)を利用する場合は、[HTMLテンプレートHamlitを使う](https://irisash.github.io/rails/use_hamlit/)の変換処理をしてください。

<h2 id="create-user">Userの作成</h2>

ユーザーのモデルとコントローラーを用意する必要があります。

### モデルの追加

[rails generate scaffoldを使ってページを追加する](https://irisash.github.io/rails/scaffold/)であったようにモデル追加にはマイグレーションファイルが必要となります。  
しかし、Deviseには認証にいつようなカラムを持ったUserモデルを作成するコマンドが用意されていますので、それを使ってマイグレーションを用意しましょう。  

```shell.prettyprint
$ bin/rails g devise User
      invoke  active_record
      create    db/migrate/20190526135251_devise_create_users.rb
      create    app/models/user.rb
      insert    app/models/user.rb
       route  devise_for :users
```

`bin/rails g devise User`を実行するとマイグレーションファイルとUserモデルのファイルが生成されます。  
`app/models/user.rb`にはDeviseの利用機能を設定するコードが記載されています。`devise :database_authenticatable, ...`がその箇所です。またコメントになっている`:confirmable, ...`も利用できる機能です。  
後で機能追加できますので、ここでは初期状態で設定されている機能のみ利用します。  

```ruby.prettyprint
# app/models/user.rb

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
```

マイグレーションファイルは利用機能に対して必要なカラムが生成されるようになっています。  
使用しない機能に対して必要なカラムはコメントアウトされています。  

```ruby.prettyprint
# db/migrate/20190527152733_devise_create_users.rb

# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      # t.integer  :sign_in_count, default: 0, null: false
      # t.datetime :current_sign_in_at
      # t.datetime :last_sign_in_at
      # t.string   :current_sign_in_ip
      # t.string   :last_sign_in_ip

      ## Confirmable
      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable

      ## Lockable
      # t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at


      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
```

また、同時にルーティングも追加されています。  

```ruby.prettyprint
Rails.application.routes.draw do
  devise_for :users # 追加されている
  root "welcome#index"
```

定義されているエンドポイントを確認してみるとDevise標準のものがいくつか追加されているのがわかります。  

```shell.prettyprint
$ bin/rails routes
                   Prefix Verb   URI Pattern                    Controller#Action
         new_user_session GET    /users/sign_in(.:format)       devise/sessions#new
             user_session POST   /users/sign_in(.:format)       devise/sessions#create
     destroy_user_session DELETE /users/sign_out(.:format)      devise/sessions#destroy
        new_user_password GET    /users/password/new(.:format)  devise/passwords#new
       edit_user_password GET    /users/password/edit(.:format) devise/passwords#edit
            user_password PATCH  /users/password(.:format)      devise/passwords#update
                          PUT    /users/password(.:format)      devise/passwords#update
                          POST   /users/password(.:format)      devise/passwords#create
 cancel_user_registration GET    /users/cancel(.:format)        devise/registrations#cancel
    new_user_registration GET    /users/sign_up(.:format)       devise/registrations#new
   edit_user_registration GET    /users/edit(.:format)          devise/registrations#edit
        user_registration PATCH  /users(.:format)               devise/registrations#update
                          PUT    /users(.:format)               devise/registrations#update
                          DELETE /users(.:format)               devise/registrations#destroy
                          POST   /users(.:format)               devise/registrations#create
```

それぞれのルーティングも使用する時に見てみましょう。とりあえずマイグレーションを実行します。  

```shell.prettyprint
$ bin/rails db:migrate
```

```ruby.prettyprint
# db/scheme.rb

  # 追加される
  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end
```

### コントローラーの追加

コントローラーも基本的にカスタマイズするので追加しましょう。Devise用にコントローラーを追加するコマンドもあります。  

```shell.prettyprint
$ bin/rails g devise:controllers users
      create  app/controllers/users/confirmations_controller.rb
      create  app/controllers/users/passwords_controller.rb
      create  app/controllers/users/registrations_controller.rb
      create  app/controllers/users/sessions_controller.rb
      create  app/controllers/users/unlocks_controller.rb
      create  app/controllers/users/omniauth_callbacks_controller.rb
===============================================================================

Some setup you must do manually if you haven't yet:

  Ensure you have overridden routes for generated controllers in your routes.rb.
  For example:

    Rails.application.routes.draw do
      devise_for :users, controllers: {
        sessions: 'users/sessions'
      }
    end

===============================================================================
```

ルーティングに対して作成したコントローラーが呼ばれるように設定する必要があると出力結果にありますが、実際に編集を加えていく段階で設定しましょう。  

<h2 id="sign-up">サインアップ処理の実装</h2>

Todo画面に認証チェックを入れて見ましょう。ログインしていない状態の場合はTodo画面を表示できましようにします。  
Deviseで認証チェックするには`authenticate_user!`を使います。Todoのコントローラー処理が走る前にこれを呼び出してチェックしておくと、ログインしていない場合にサインイン画面へリダイレクトしてくれます。  

```ruby.prettyprint
# app/controllers/todos_controller.rb

class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user! # 追加

  ...
```

<img src="images/rails/use_devise/default-devise-sign-in.png" alt="Devise初期サインイン画面" title="Devise初期サインイン画面" style="max-height:400px;">

サインインの画面も直す必要がありますが、ユーザー作成する必要があるのでまずはサインアップ画面を作成します。  
今は`/users/sign_up`にアクセスすると、Devise標準のアクション`devise/sessions#new`が呼ばれるようになっていますが、先程カスタマイズ用に追加したコントローラーが呼ばれるように修正しましょう。  

```ruby.prettyprint
# config/routes.rb

Rails.application.routes.draw do
  # 編集
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  ...
```

すると、`/users/sign_up`アクセス時に呼ばれるコントローラーが変わります。  

```shell.prettyprint
$ bin/rails routes
                   Prefix Verb   URI Pattern                    Controller#Action
         new_user_session GET    /users/sign_in(.:format)       devise/sessions#new
             user_session POST   /users/sign_in(.:format)       devise/sessions#create
     destroy_user_session DELETE /users/sign_out(.:format)      devise/sessions#destroy
        new_user_password GET    /users/password/new(.:format)  devise/passwords#new
       edit_user_password GET    /users/password/edit(.:format) devise/passwords#edit
            user_password PATCH  /users/password(.:format)      devise/passwords#update
                          PUT    /users/password(.:format)      devise/passwords#update
                          POST   /users/password(.:format)      devise/passwords#create
 cancel_user_registration GET    /users/cancel(.:format)        users/registrations#cancel
    new_user_registration GET    /users/sign_up(.:format)       users/registrations#new
   edit_user_registration GET    /users/edit(.:format)          users/registrations#edit
        user_registration PATCH  /users(.:format)               users/registrations#update
                          PUT    /users(.:format)               users/registrations#update
                          DELETE /users(.:format)               users/registrations#destroy
                          POST   /users(.:format)               users/registrations#create
```

最後にサインインした後の遷移先を指定しましょう。  
`app/controllers/users/registrations_controller.rb`にある`protected`と`after_sign_up_path_for`のコメントアウトを外して`after_sign_up_path_for`に遷移先のパスを追加します。ここではTodo一覧画面へ飛ばすようにしています。  

```ruby.prettyprint
# app/controllers/users/registrations_controller.rb

  ...

  # コメントアウトを消す
  protected
 
    ...
 
    # The path used after sign up.
    # コメントアウトを消す
    def after_sign_up_path_for(resource)
      todos_path
    end

    ...
```

`/user/sign_up`にアクセスし実際にメールアドレスとパスワードを入れてサインアップして見ましょう。認証が進んでTodo一覧画面が表示できれば成功です。  

<img src="images/rails/use_devise/sign-up.png" alt="サインアップ画面" title="サインアップ画面" style="max-height:400px;">

<h2 id="logout">ログイン/ログアウト処理</h2>

ログイン/ログアウトの機能を追加します。  
機能追加の前にログインしていない場合にサインアップとログインのリンクを、ログインしている場合にログアウトのリンクを画面上部に表示するようにします。`app/views/layouts/application.html.haml`を編集します。  

```haml.prettyprint
# app/views/layouts/application.html.haml

  %body
    - if user_signed_in?
      = link_to "ログアウト", destroy_user_session_path, method: :delete
    - else
      = link_to "サインアップ", new_user_registration_path
      = link_to "ログイン", new_user_session_path
    .notice= notice
    .alert= alert
```

`user_signed_in?`関数はDevise組み込みのメソッドでログイン状態かどうかを判別して、ログインしていると`true`の値を返してくれます。  
  
次にDevise標準のSessionControllerではなく、カスタマイズ用に用意したUser::SessionControllerを使うようにしましょう。  

```ruby.prettyprint
# config/routes.rb

Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "users/registrations",
    sessions: "users/sessions" # 追加
  }
```

最後にログイン/ログアウト後の遷移先を設定します。  
ログインは`after_sign_in_path_for`で、ログアウトは`after_sign_out_path_for`で遷移先のパスを返すように設定します。  
ここではログイン後にTodo一覧画面へ遷移し、ログアウト後にホーム画面へ遷移するようにしています。  

```ruby.prettyprint
# app/controllers/application_controller.rb

  # 下記を追加
  private
  
    def after_sign_in_path_for(resource)
      todos_path
    end
  
    def after_sign_out_path_for(resource_or_scope)
      root_path
    end
```

<h2 id="reference-links">参考サイト</h2>

- [Devise](https://github.com/plataformatec/devise)
- [How To: Redirect to a specific page on successful sign in, sign up, or sign out](https://github.com/plataformatec/devise/wiki/How-To:-Redirect-to-a-specific-page-on-successful-sign-in,-sign-up,-or-sign-out)
