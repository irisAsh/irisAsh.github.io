<template>
  <div class="site">
    <nav-bar/>
    <div class="siteContent">
      <nuxt class="has-text-centered"/>
    </div>
    <footer-bar/>
  </div>
</template>

<script>
import FooterBar from '~/components/FooterBar.vue'
import NavBar from '~/components/NavBar.vue'

export default {
  components: {
    FooterBar,
    NavBar
  }
}
</script>

<style>
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.siteContent {
  flex: 1;
}
</style>

