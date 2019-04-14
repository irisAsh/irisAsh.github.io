<template>
  <div>
    <section id="express-header">
      <header>
        <h1 class="title">
          Express
        </h1>
      </header>
      <p class="subtitle">
        Node.jsのためのWebアプリケーションフレームワーク
      </p>
      <div class="editor-container">
        <div class="editor">
          <div class="line-number">
            <p>
              1
            </p>
            <p>
              2
            </p>
            <p>
              3
            </p>
            <p>
              4
            </p>
            <p>
              5
            </p>
            <p>
              6
            </p>
          </div>
          <div class="code-area">
            <p class="code-line line-1">
              <span class="reserved">var</span> express = 
              <span class="reserved">require</span>(
              <span class="string">'express' </span>);
            </p>
            <p class="code-line line-2">
              <span class="reserved">var</span> app =
              <span class="function">express</span>();
            </p>
            <p class="blank-p">_</p>
            <p class="code-line line-3">
              app.
              <span class="function">get</span>(
              <span class="string">'/'</span>, 
              <span class="reserved">function</span>(req, res) {
              <span class="reserved">return</span> res.<span class="function">send</span>(
              <span class="string">'Hello World!' </span>) });
            </p>
            <p class="blank-p">_</p>
            <p class="code-line line-4">
              app.
              <span class="function">listen</span>(3000, 
              <span class="reserved">function</span>() { console.<span class="function">log</span>(
              <span class="string">'Listening on port 3000!' </span>) });
            </p>
          </div>
        </div>
      </div>
    </section>
    <top-menu
      :title="title"
      :subTitle="subTitle"
      :menuItems="menuItems"
    />
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu'
import ExpressMenu from '@/assets/json/express_menu.json'

export default {
  components: {
    TopMenu
  },
  data: () => ({
    menuItems: Object.values(ExpressMenu)
  }),
  head: () => {
    return {
      title: "Express NodeJS",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "ExpressはNodeJSの軽量・高速なWebアプリケーションフレームワークです。Expressを使えばWebサイトやAPIを簡単にかつ柔軟に作成することができます。"
        }
      ]
    }
  }
}
</script>
