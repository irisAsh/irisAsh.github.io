<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="ThirdPatyMd"></div>
        <article-timestamp createdAt="2019/04/27" updatedAt="2019/04/27"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="ThirdPatyMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import ThirdPatyMd from '@/static/markdown/express/third_party.md'

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
    ThirdPatyMd() {
      return ThirdPatyMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.third_party.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.third_party.headerDescription
        }
      ]
    }
  }
}
</script>
