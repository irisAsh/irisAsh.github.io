<template>
  <div id="wrapper">
    <section id="main">
      <h2>データバインディング</h2>
      <div>
        <h3>データバインディング</h3>
	<div id="dataBinding">
	  <h4>テキスト</h4>
	  <script src="https://gist-it.appspot.com/github/irisAsh/vue-cdn-tutorial/blob/master/basic/main.js"></script>
	  <p>variable: {{ variable }}</p>
	  <h4>属性</h4>
	  <p v-bind:class="className">クラス属性を変数で設定してます</p>
	  <p :class="otherClassName">"v-bind"は省略できます</p>
	  <h4>Javascript式</h4>
	  <p>大丈夫ですか？: {{ okey ? 'はい' : 'いいえ' }}</p>
	  <p :class="colorName + '-text'">クラス属性に式を使ってます</p>
	</div>
      </div>
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
            linkPath: '/vueprograming/basic/databinding',
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
