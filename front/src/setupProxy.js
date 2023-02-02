const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware(
      '/api',
      {
        target: 'http://i8e208.p.ssafy.io/',
        changeOrigin: true,
        pathRewrite: {
            '^/api':''
        },
      }
    )
  );
  app.use(express.json());
  var cors = require('cors')
  app.use(cors());
}
// import * as express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// module.exports = (app:any) =>{
//     app.use(
//         createProxyMiddleware(
//             '/api',{
//                 target: 'http://i8e208.p.ssafy.io/api',      
//                 pathRewrite: {
//                     '^/api':''
//                 },
//                 changeOrigin: true,
//             }
//         )
//       );
//     app.listen(3000);
//     app.use(express.json());
//     var cors = require('cors');
//     app.use(cors());
//         }