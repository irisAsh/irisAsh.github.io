<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="BasicAuthMd"></div>
        <article-timestamp createdAt="2019/04/20" updatedAt="2019/04/20"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="BasicAuthMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import BasicAuthMd from '@/static/markdown/express/basic_auth.md'

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
    BasicAuthMd() {
      return BasicAuthMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.basic_auth.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.basic_auth.headerDescription
        }
      ]
    }
  }
}
</script>
