<template>
  <nav class="navbar has-background-light">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma" width="112" height="28">
      </nuxt-link>
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
.navbar {
  margin-bottom: 20px;
}
.burger-font-icon i {
  font-size: 24px;
  height: 30px;
  margin: 16px 0 0 16px;
}
.js-icon {
  color: #f7df1e;
  font-size: 24px;
  padding-right: 8px;
}
.vuejs-icon {
  color: #194d33;
  font-size: 24px;
  padding-right: 8px;
}
</style>
