<template>
  <div>
    <aside id="sidebar" class="">
      <section v-for="menuSection in menuSections" :key="menuSection.linkPath">
        <nuxt-link :to="menuSection.linkPath" :class="routePath == menuSection.linkPath ? 'access-now' : ''">
          {{ menuSection.title }}
        </nuxt-link>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: ['menuSections'],
  computed: {
    routePath () {
      return this.$route.path
    },
  }
}
</script>
