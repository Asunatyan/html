module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'layouts': '@/layouts'
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:20800", // test环境
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
