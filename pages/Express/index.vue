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

export default {
  components: {
    TopMenu
  },
  data: () => ({
    title: 'Express (NodeJS)',
    subTitle: 'NodeJSのWebアプリケーションフレームワークExpressを学びます',
    menuItems: [
      {
        linkPath: '/express/gettingstarted',
        title: 'はじめに / 環境構築',
        subTitle: 'express-generator',
        iconClass: 'fab fa-node-js'
      },
      {
        linkPath: '/vueprograming/basic/databinding',
        title: '基本構文',
        subTitle: 'データバインティング / 繰り返し / 制御構文 / イベントハンドリング',
        iconClass: 'fab fa-vuejs'
      },
      {
        linkPath: '/vueprograming/sample',
        title: 'サンプル集',
        subTitle: 'Vue で書いた簡単なウェブアプリ',
        iconClass: 'fab fa-vuejs'
      }
    ]
  })
}
</script>
