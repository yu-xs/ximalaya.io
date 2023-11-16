const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})

const proxy = require('http-proxy-middleware');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://m.ximalaya.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },

        // 手动设置cookie
        onProxyReq(proxyReq) {
          proxyReq.setHeader('Origin', 'https://m.ximalaya.com');
          proxyReq.setHeader('Referer', 'https://m.ximalaya.com');
          proxyReq.setHeader('Cookie', '_xmLog=h5&bdd9f75c-8e23-4129-9314-479bffbf7d41&2.4.18-alpha.0; Hm_lvt_e2abff7f9ca8c2fa2da3ef27e36bbc27=1699513599,1699798974; trackType=H5; x-ats=ACM4YmQzZDIyZjRjYTA1OTM3yB7ob699PDZ4bXdlYl93d3c; Hm_lvt_4a7d8ec50cfd6af753c4f8aee3425070=1699513598,1700009691,1700125548; Hm_lpvt_4a7d8ec50cfd6af753c4f8aee3425070=1700125553; xm-page-viewid=ximalaya-mobile; x_xmly_traffic=utm_source%3A%26utm_medium%3A%26utm_campaign%3A%26utm_content%3A%26utm_term%3A%26utm_from%3A; impl=passport.ximalaya.com.m; fds_otp=5950734174722360942; 1&remember_me=y; 1&_token=482784134&100C4410140N56CA9348C445A12D52315F04FAB9129FAD1759F59CC5C08A55E86BE941DB64DA148M5B18C71A09D7EEF_; 1_l_flag=482784134&100C4410140N56CA9348C445A12D52315F04FAB9129FAD1759F59CC5C08A55E86BE941DB64DA148M5B18C71A09D7EEF__2023-11-1617:07:26; login_type=password_mobile; Hm_lpvt_e2abff7f9ca8c2fa2da3ef27e36bbc27=1700125646');
        },
        onProxyRes(proxyRes) {
          const cookies = proxyRes.headers['set-cookie'];
          if (cookies) {
            proxyRes.headers['set-cookie'] = cookies.map(cookie => {
              return cookie.replace(/; secure/gi, '');
            });
          }
        }
      }
    }
  }
};

