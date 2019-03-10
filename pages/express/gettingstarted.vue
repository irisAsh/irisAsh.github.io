<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="GettingStartedMd"></div>
        <article-timestamp createdAt="2019/03/09" updatedAt="2019/03/09"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import ExpressMenu from '@/assets/json/express_menu.json'
import GettingStartedMd from '@/static/markdown/express/getting_started.md'

export default {
  components: {
    SideMenu,
    ArticleTimestamp
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
