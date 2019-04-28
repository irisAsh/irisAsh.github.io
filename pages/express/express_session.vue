<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="ExpressSessionMd"></div>
        <article-timestamp createdAt="2019/04/27" updatedAt="2019/04/28"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="ExpressSessionMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import ExpressSessionMd from '@/static/markdown/express/express_session.md'

export default {
  components: {
    ArticleTimestamp,
    SideMenu,
    TableContent
  },
  data: () => ({
    menuSections: Object.values(ExpressMenu)
  }),
  computed: {
    ExpressSessionMd() {
      return ExpressSessionMd
    }
  },
  head: () => {
    return {
      title: 'Expressでセッションを利用する',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'express-sessionを利用したExpressでのセッション管理を説明します。セッションの保存先はデフォルトではメモリになっていますが、拡張パッケージを利用することでRedisやMongoDBに変更することもできます。'
        }
      ]
    }
  }
}
</script>
