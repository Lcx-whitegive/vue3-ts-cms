module.exports = {
  outputDir: './build',
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        global: '@/global',
        router: '@/router',
        service: '@/service',
        store: '@/store',
        views: '@/views'
      }
    }
  }
}
