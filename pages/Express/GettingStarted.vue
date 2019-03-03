<template>
  <div id="wrapper">
    <article id="main">
      <section>
        <div v-html="testMd"></div>
      </section>
    </article>
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
