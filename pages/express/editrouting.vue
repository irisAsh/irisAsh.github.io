<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="EditRoutingMd"></div>
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
import EditRoutingMd from '@/static/markdown/express/edit_routing.md'

export default {
  components: {
    SideMenu,
    ArticleTimestamp
  },
  data: () => ({
    menuSections: Object.values(ExpressMenu)
  }),
  computed: {
    EditRoutingMd() {
      return EditRoutingMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.editrouting.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.editrouting.headerDescription
        }
      ]
    }
  }
}
</script>
