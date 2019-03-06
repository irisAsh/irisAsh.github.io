<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="EditRoutingMd"></div>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'
import ExpressMenu from '@/assets/json/express_menu.json'
import EditRoutingMd from '@/static/markdown/express/edit_routing.md'

export default {
  components: {
    SideMenu
  },
  data: () => ({
    menuSections: ExpressMenu.menuItems
  }),
  computed: {
    EditRoutingMd() {
      return EditRoutingMd
    }
  }
}
</script>
