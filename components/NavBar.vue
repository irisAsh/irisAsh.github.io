<template>
  <nav class="navbar has-background-info">
    <div class="navbar-brand">
      <div class="navbar-burger burger burger-font-icon" @click="showNav = !showNav" :class="{'is-active': showNav}">
        <i class="fas fa-bars"/>
      </div>
    </div>
    <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active':showNav}">
      <div class="navbar-start">
        <nuxt-link class="navbar-item" to="/">
          Home
        </nuxt-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <i class="fab fa-js-square js-icon"/>
            JS
          </a>
          <div class="navbar-dropdown is-boxed">
            <nuxt-link v-for="item in items" :key="item.title" :to="item.url" class="navbar-item">
              <i class="fab vuejs-icon" v-bind:class="item.icon"/>
              {{ item.title }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    showNav: false,
    items: [
      { title: 'Express', icon: 'fa-node-js', url: '/express' },
      { title: 'Vue', icon: 'fa-vuejs', url: '/vueprograming' }
    ]
  })
}
</script>

<style>
.burger-font-icon i {
  font-size: 1.5rem;
  height: 1.5rem;
  margin: 1rem 0 0 1rem;
  color: white;
}
.js-icon {
  color: white;
  font-size: 1.5rem;
  padding-right: 0.5rem;
}
.vuejs-icon {
  color: white;
  font-size: 24px;
  padding-right: 8px;
}
</style>
