<template>
  <div>
    <aside id="sidebar" class="">
      <section v-for="menuSection in menuSections" :key="menuSection.label">
        <div class="js-menu-label">
          <p class="sidebar-menu-label">
            {{ menuSection.label }}
          </p>
          <ul class="sidebar-menu-list js-menu-list" v-for="menuItem in menuSection.menuList" :key="menuItem.title">
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
