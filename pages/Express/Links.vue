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
    menuSections: ExpressMenu.menuItems
  }),
  computed: {
    LinkMd() {
      return LinkMd
    }
  }
}
</script>
