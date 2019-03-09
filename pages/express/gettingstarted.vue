<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="GettingStartedMd"></div>
      </section>
    </article>
    <side-menu :menuSections="menuSections"/>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'
import ExpressMenu from '@/assets/json/express_menu.json'
import GettingStartedMd from '@/static/markdown/express/getting_started.md'

export default {
  components: {
    SideMenu
  },
  data: () => ({
    menuSections: ExpressMenu.menuItems
  }),
  computed: {
    GettingStartedMd() {
      return GettingStartedMd
    }
  }
}
</script>
