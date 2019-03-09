<template>
  <div id="wrapper">
    <section id="main">
      <h2>環境構築</h2>
      <h3>CDNを利用する</h3>
      <p>
        CDN経由でVueJSのファイルを読み込んで利用することができます。
        手軽に利用できるので手早く導入したい時などの場合にCDNを利用すると良いと思います。
        導入方法は以下のscriptタグをHTMLファイルに記述するだけです。
      </p>
      <pre>
        <code>
          &lt;script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"&gt;&lt;/script&gt;
        </code>
      </pre>
      <div>
        <pre>
          <code>
            {{ test }}
          </code>
        </pre>
      </div>
    </section>
    <side-menu :menuSections="menuSections"/>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'

export default {
  components: {
    SideMenu
  },
  data: () => ({
    test: `
      <!DOCTYPE html>
        <html lang="ja">
        <body>
          <div id="app">
            <-- ここに記述する -->
          </div>
          <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"><\/script>
          <script src="main.js"><\/script>
        </body>
      </html>
    `
  })
}
</script>
