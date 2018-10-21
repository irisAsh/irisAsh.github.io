<template>
  <div>
    <section class="header has-background-info">
      <header>
        <h1 class="title has-text-white">
          Vue programing
        </h1>
      </header>
      <h2 class="subtitle has-text-white">
        Javascript のフレームワークの１つ Vue.js を学ぶ
      </h2>
    </section>
    <section class="container">
      <div class="menu-list">
        <nuxt-link to="/vueprograming/basic" class="menu-box">
          <h3>基本構文</h3>
          <p>データバインティング/繰り返し/制御構文/イベントハンドリング</p>
        </nuxt-link>
        <nuxt-link to="/vueprograming/basic" class="menu-box">
          <h3>基本構文</h3>
          <p>データバインティング/繰り返し/制御構文/イベントハンドリング</p>
        </nuxt-link>
        <nuxt-link to="/vueprograming/sample" class="menu-box">
          <h3>サンプル集</h3>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<style>
.header {
  padding: 20px 0px;
}

.title {
  font-family: "HoeflerText-BlackItalic", "Cochin-BoldItalic", "Snell Roundhand", sans-serif;
  display: block;
  font-weight: 100;
  font-size: 50px;
  letter-spacing: 1px;
  padding: 10px 0px;
}

.subtitle {
  font-family: "HoeflerText-BlackItalic", "Cochin-BoldItalic", "Snell Roundhand", sans-serif;
  font-weight: 80;
  font-size: 20px;
  word-spacing: 5px;
  padding: 10px 0px;
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
}
.menu-box {
  width: 50%;
}
</style>
