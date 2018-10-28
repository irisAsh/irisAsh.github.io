<template>
  <div id="wrapper">
    <section id="main">
      <h2>基本構文</h2>
    </section>
    <side-menu :menuSections="menuSections"/>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'

export default {
  components: {
    SideMenu
  },
  data: () => ({
    menuSections: [
      {
        label: '基本構文',
        menuList: [
          {
            title: 'データバインディング',
            linkPath: ''
          },
          {
            title: '繰り返し',
            linkPath: ''
          },
          {
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            linkPath: ''
          },
        ]
      }
    ]
  })
}
</script>
