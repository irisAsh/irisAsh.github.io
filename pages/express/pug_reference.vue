<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="PugReferenceMd"></div>
        <article-timestamp createdAt="2019/03/16" updatedAt="2019/03/17"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="PugReferenceMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import PugReferenceMd from '@/static/markdown/express/pug_reference.md'

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
    PugReferenceMd() {
      return PugReferenceMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.pug_reference.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.pug_reference.headerDescription
        }
      ]
    }
  }
}
</script>
