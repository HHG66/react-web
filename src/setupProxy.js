/*
 * @Author: HHG
 * @Date: 2022-12-17 22:52:51
 * @LastEditTime: 2022-12-18 02:08:27
 * @LastEditors: 韩宏广
 * @FilePath: /个人财务/web/src/setupProxy.js
 * @文件说明: 
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://hq.sinajs.cn",
      headers: {
        'Referer': "http://finance.sina.com.cn"
      },
      changeOrigin: true,
      // changeOrigin: false,
      pathRewrite: {
        // 去掉接口中的 /api 前缀
        // '^/getfundinfo': ''
        '^/api': ''
      }
    })
  );
}
