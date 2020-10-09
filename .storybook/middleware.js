const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function expressMiddleware (router) {
  router.use('/merchandise', createProxyMiddleware({
    target: 'http://projectx.test.guanmai.cn:8811/',
    changeOrigin: true,
  }))
  router.use('/enterprise', createProxyMiddleware({
    target: 'http://projectx.test.guanmai.cn:8811/',
    changeOrigin: true,
  }))
  router.use('/secret', createProxyMiddleware({
    target: 'http://projectx.test.guanmai.cn:8811/',
    changeOrigin: true,
  }))
}
