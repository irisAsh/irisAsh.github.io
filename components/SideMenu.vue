<template>
  <div>
    <aside id="sidebar" class="">
      <section v-for="menuSection in menuSections" :key="menuSection.linkPath">
        <div class="js-menu-label">
          <nuxt-link :to="menuSection.linkPath">
            {{ menuSection.title }}
          </nuxt-link>
        </div>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: ['menuSections']
}
</script>

<style>
.js-menu-list
{
  display: none;
}
.sidebar-menu-label
{
  margin: 1em 0;
}
.sidebar-menu-list li
{
  width: 100%;
}
.sidebar-menu-list li a
{
  display: block;
  color: #3d3d3d;
  padding: .5em .75em;
  text-decoration: none;
  border-radius: 2px;
  overflow-wrap: break-word;
}
.sidebar-menu-list a:hover
{
  background-color: #f5f5f5;
  color: #363636
}
.js-menu-showable .js-menu-list
{
  display: flex;
}

</style>
