<template>
  <div id="wrapper">
    <section id="main">
      <div v-html="testMd"></div>
    </section>
    <side-menu :menuSections="menuSections"/>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'
import testMd from './test.md'

export default {
  components: {
    SideMenu
  },
  computed: {
    testMd() {
      return testMd
    }
  }
}
</script>
