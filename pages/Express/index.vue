<template>
  <div>
    <top-menu
      :title="title"
      :subTitle="subTitle"
      :menuItems="menuItems"
    />
  </div>
</template>

<script>
import TopMenu from '@/components/TopMenu'
import ExpressMenu from '@/assets/json/express_menu.json'

export default {
  components: {
    TopMenu
  },
  data: () => ({
    title: 'Express (NodeJS)',
    subTitle: 'NodeJSのWebアプリケーションフレームワークExpressを学びます',
    menuItems: ExpressMenu.menuItems
  })
}
</script>
