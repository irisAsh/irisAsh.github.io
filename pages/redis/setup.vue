<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="SetupMd"></div>
        <article-timestamp createdAt="2019/04/27" updatedAt="2019/04/27"/>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
    <table-content :articleMd="SetupMd"/>
  </div>
</template>

<script>
import ArticleTimestamp from '@/components/ArticleTimestamp'
import SideMenu from '@/components/SideMenu'
import TableContent from '@/components/TableContent'
import RedisMenu from '@/assets/json/redis_menu.json'
import SetupMd from '@/static/markdown/redis/setup.md'

export default {
  components: {
    ArticleTimestamp,
    SideMenu,
    TableContent
  },
  data: () => ({
    menuSections: Object.values(RedisMenu)
  }),
  computed: {
    SetupMd() {
      return SetupMd
    }
  },
  head: () => {
    return {
      title: RedisMenu.setup.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: RedisMenu.setup.headerDescription
        }
      ]
    }
  }
}
</script>
