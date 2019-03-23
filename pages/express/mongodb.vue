<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="MongodbMd"></div>
        <article-timestamp createdAt="YYYY/MM/DD" updatedAt="YYYY/MM/DD"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="MongodbMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import MongodbMd from '@/static/markdown/express/mongodb.md'

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
    MongodbMd() {
      return MongodbMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.mongodb.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.mongodb.headerDescription
        }
      ]
    }
  }
}
</script>
