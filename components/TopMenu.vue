<template>
  <div id="top-menu">
    <article class="container">
      <section class="menu-list-container">
        <div class="menu-list">
          <menu-item
            v-for="menuItem in menuItems"
            :key="menuItem.title"
            :linkPath="menuItem.linkPath"
            :title="menuItem.title"
            :subTitle="menuItem.subTitle"
            :iconClass="menuItem.iconClass"
          />
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import MenuItem from '@/components/MenuItem'

export default {
  name: 'TopMenu',
  props: ['menuItems'],
  components: {
    MenuItem
  }
}
</script>
