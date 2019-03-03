<template>
  <div id="top-menu">
    <section class="header">
      <header>
        <h1 class="title has-text-white">
          {{ title }}
        </h1>
      </header>
      <h2 class="subtitle has-text-white">
        {{ subTitle }}
      </h2>
    </section>
    <article class="container">
      <section>
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
  props: ['title', 'subTitle', 'menuItems'],
  components: {
    MenuItem
  }
}
</script>
