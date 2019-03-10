module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '足跡はもう見えない',
    titleTemplate: '%s | 足跡はもう見えない',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'このサイトは技術向上を目的としたサイトです。システム開発の技術は日々凄まじいスピードで進化しています。新しい技術においてかれないようにしなければいけません。昨日より一歩でも前に進むよう日々精進が必要です。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=desert' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  css: [
    { src: '~/assets/main.scss', lang: 'scss' },
    '@fortawesome/fontawesome-free-webfonts',
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config) {
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    }
  },
  /*
   * Router configuration
   */
  router: {
    base: '/'
  },
  /*
   * Modlue configuration
   */
  modules: [
    '@nuxtjs/markdownit',
    ['@nuxtjs/sitemap']
  ],
  /*
   * markdownit modlue configuration
   */
  markdownit: {
    preset: 'default',
    injected: true, 
    breaks: true, 
    html: true, 
    linkify: true,
    typography: true, 
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; }
  },
  /*
   * Sitemap configuration
   */
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://irisash.com',
    generate: true,
    exclude: []
  },
  /*
   * Plugins configuration
   */
  plugins: [
    '~/plugins/vue-scrollto'
  ]
}

