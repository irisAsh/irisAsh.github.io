<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="LinkMd"></div>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'
import ExpressMenu from '@/assets/json/express_menu.json'
import LinkMd from '@/static/markdown/express/links.md'

export default {
  components: {
    SideMenu
  },
  data: () => ({
    menuSections: Object.values(ExpressMenu)
  }),
  computed: {
    LinkMd() {
      return LinkMd
    }
  },
  head: () => {
    return {
      title: ExpressMenu.links.headerTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ExpressMenu.links.headerDescription
        }
      ]
    }
  }
}
</script>
