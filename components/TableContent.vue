<template>
  <div id="table-content" >
    <aside id="table-content-list">
      <div v-for="internalLink in getInternalLinks" :key="internalLink.id" class='link-container'>
        <nuxt-link v-scroll-to="'#' + internalLink.id" to>
          {{ internalLink.title }}
        </nuxt-link>
      </div>
    </aside>
  </div>
</template>

<script>
import GettingStartedMd from '@/static/markdown/express/getting_started.md'

export default {
  name: 'TableContent',
  props: ['articleMd'],
  computed: {
    getInternalLinks () {
      if (!this || !this.$props || !this.$props.articleMd) {
        return [];
      }
      const h2Reg = /<h2 id="(.*)">(.*)<\/h2>/mg;
      const internalLinks = [];
      let m;
      while ((m = h2Reg.exec(this.$props.articleMd)) != null) {
        if (!!m[1] && !!m[2]) {
          internalLinks.push({ id: m[1], title: m[2] });
        }
      }
      return internalLinks || [];
    }
  }
}
</script>
