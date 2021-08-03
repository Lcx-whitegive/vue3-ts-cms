module.exports = {
  outputDir: './build',
  publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        global: '@/global',
        router: '@/router',
        service: '@/service',
        store: '@/store',
        views: '@/views',
        utils: '@/utils'
      }
    }
  }
}
