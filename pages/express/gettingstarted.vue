<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="GettingStartedMd"></div>
        <article-timestamp createdAt="2019/03/09" updatedAt="2019/03/31"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="GettingStartedMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import GettingStartedMd from '@/static/markdown/express/getting_started.md'

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
    GettingStartedMd() {
      return GettingStartedMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.gettingstarted.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.gettingstarted.headerDescription
        }
      ]
    }
  }
}
</script>
