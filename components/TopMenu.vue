<template>
  <div>
    <section class="header has-background-info">
      <header>
        <h1 class="title has-text-white">
          {{ title }}
        </h1>
      </header>
      <h2 class="subtitle has-text-white">
        {{ subTitle }}
      </h2>
    </section>
    <section class="container">
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

<style>
.header {
  padding: 20px 0px;
}

.title {
  font-family: "HoeflerText-BlackItalic", "Cochin-BoldItalic", "Snell Roundhand", sans-serif;
  display: block;
  font-weight: 100;
  font-size: 50px;
  letter-spacing: 1px;
  padding: 10px 0px;
}

.subtitle {
  font-family: "HoeflerText-BlackItalic", "Cochin-BoldItalic", "Snell Roundhand", sans-serif;
  font-weight: 80;
  font-size: 20px;
  word-spacing: 5px;
  padding: 10px 0px;
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
}
.menu-box {
  width: 50%;
}
</style>
