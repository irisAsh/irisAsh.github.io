<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="CssPreprocessorMd"></div>
        <article-timestamp createdAt="2019/04/14" updatedAt="2019/04/14"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="CssPreprocessorMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import CssPreprocessorMd from '@/static/markdown/express/css_preprocessor.md'

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
    CssPreprocessorMd() {
      return CssPreprocessorMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.css_preprocessor.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.css_preprocessor.headerDescription
        }
      ]
    }
  }
}
</script>
