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
        <menu-item
          linkPath="/vueprograming/basic"
          title="基本構文"
          subTitle="データバインティング / 繰り返し / 制御構文 / イベントハンドリング"
          iconClass="fab fa-vuejs"
        />
        <menu-item
          linkPath="/vueprograming/sample"
          title="サンプル集"
          subTitle="Vue で書いた簡単なウェブアプリ"
          iconClass="fab fa-vuejs"
        />
      </div>
    </section>
  </div>
</template>

<script>
import MenuItem from '@/components/MenuItem'

export default {
  components: {
    MenuItem
  }
}
</script>

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
