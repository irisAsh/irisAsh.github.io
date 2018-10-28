<template>
  <div>
    <aside id="sidebar" class="menu">
      <section v-for="menuSection in menuSections" :key="menuSection.label">
        <div class="js-menu-label">
          <p class="menu-label">
            {{ menuSection.label }}
          </p>
          <ul class="menu-list js-menu-list" v-for="menuItem in menuSection.menuList" :key="menuItem.title">
            <li>
              <nuxt-link :to="menuItem.linkPath">
                {{ menuItem.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: ['menuSections'],
  mounted() {
    var $menuLabels = document.getElementsByClassName('js-menu-label')
    if ($menuLabels.length > 0) {
      Array.prototype.forEach.call($menuLabels, (element) => {
        element.addEventListener('click', (event) => {
          element.classList.toggle('js-menu-showable')
        })
      })
    }
  }
}
</script>

<style>
.js-menu-list
{
  display: none;
}
.js-menu-label .menu-label
{
  margin: 1em 0;
}
.js-menu-showable .js-menu-list
{
  display: block;
}

</style>
