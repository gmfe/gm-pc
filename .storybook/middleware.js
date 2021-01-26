const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function expressMiddleware (router) {
  router.use('/ceres', createProxyMiddleware({
    target: 'https://x.guanmai.cn/',
    changeOrigin: true,
  }))
}
