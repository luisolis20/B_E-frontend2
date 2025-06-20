const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/b_e/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://190.15.134.90/b_e',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});