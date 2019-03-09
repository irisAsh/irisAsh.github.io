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
    menuItems: Object.values(ExpressMenu)
  }),
  head: () => {
    return {
      title: "Express NodeJS",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "ExpressはNodeJSの軽量・高速なWebアプリケーションフレームワークです。Expressを使えばWebサイトやAPIを簡単にかつ柔軟に作成することができます。"
        }
      ]
    }
  }
}
</script>
