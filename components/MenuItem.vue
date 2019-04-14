<template>
  <div id="menu-box">
    <nuxt-link :to="linkPath">
      <div class="menu-item-container">
        <div class="menu-icon-area">
          <i :class="iconClass"/>
        </div>
        <div class="menu-text-area">
          <h2 class="menu-title">{{ title }}</h2>
          <p class="menu-sub-title">{{ subTitle }}</p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['linkPath', 'title', 'subTitle', 'iconClass']
}
</script>
