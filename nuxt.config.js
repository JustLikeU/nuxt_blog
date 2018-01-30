module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '熊文刚的个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { name: 'keywords', content: '熊文刚,个人博客,技术成长,前端工程师,全栈工程师,程序猿,英雄联盟,S7,精灵宝可梦,猫奴,直男,天蝎座,TVB,单身狗'},
      { hid: 'description', name: 'description', content: '个人博客，展示自我的平台。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#333' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'axios',
      'markdown-it',
      'highlightjs'
    ]
  },
  // css样式重置
  css: [
    '~assets/sassCore/_reset.scss'
  ],
  // loader
  loaders: [
    {
      test: /\.scss$/,
      loader: 'sass-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 1048576
      }
    }
  ],
  plugins: [
    { src: '~plugins/vue-ripple-directive', ssr: false },
    { src: '~plugins/vue-fixed-directive', ssr: false },
    { src: '~plugins/event-bus', ssr: false },
    { src: '~plugins/vue-lazyload', ssr: false }
  ]
}
