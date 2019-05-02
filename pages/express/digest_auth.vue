<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="DigestAuthMd"></div>
        <article-timestamp createdAt="2019/05/03" updatedAt="2019/05/03"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="DigestAuthMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import ExpressMenu from '@/assets/json/express_menu.json'
import DigestAuthMd from '@/static/markdown/express/digest_auth.md'

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
    DigestAuthMd() {
      return DigestAuthMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.digest_auth.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.digest_auth.headerDescription
        }
      ]
    }
  }
}
</script>
