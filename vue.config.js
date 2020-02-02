module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/webgl-sandbox/' : '/',
  chainWebpack: config => {
    config.module.rule('glsl')
      .test(/.glsl$/)
      .use('webpack-glsl-loader')
      .loader('webpack-glsl-loader')
      .end()
  }
}
