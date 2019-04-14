<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="MongooseMd"></div>
        <article-timestamp createdAt="2019/04/07" updatedAt="2019/04/07"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="MongooseMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import MongooseMd from '@/static/markdown/express/mongoose.md'

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
    MongooseMd() {
      return MongooseMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.mongoose.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.mongoose.headerDescription
        }
      ]
    }
  }
}
</script>
