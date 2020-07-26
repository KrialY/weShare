'use strict'
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
const multerObj = multer({dest: 'static/upload'});
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const dbConfig = require('./route/databaseConfig');
const appData = require('../data.json');
const typeimgs = appData['typeimgs'];
const recommend = appData['recommend'];

let keys = [];
for (let i = 0; i < 10000; i++) {
  keys.push('signed_'+Math.random());
}
let db = null;
setInterval(() => {
  const fs = require('fs');
  const mysql = require('mysql');
  let deletImgPath = '';
  let deletImgPath2 = '';
  if (db === null) {
    db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});
  }

  db.query(`SELECT src FROM imgs_tab WHERE status=2`, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      db.query(`DELETE FROM imgs_tab WHERE status=2`, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          for (let i = 0; i < data.length; i++) {
            deletImgPath = 'static/upload/' + data[i].src;
            deletImgPath2 = 'static/upload/1024-' + data[i].src;
            fs.unlink(deletImgPath, function () {
              console.log('删除成功');
            });
            fs.unlink(deletImgPath2, function () {
              console.log('删除成功');
            });
          }
        }
      });
    }
  });
}, 1000 * 60 * 60 * 24);



const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before (app) {
      app.use(multerObj.any()),
      app.use(cookieParser()),
      app.use(cookieSession({
        name: 'user_id',
        keys: keys,
        maxAge: 60 * 60 * 1000
      })),
      app.use(bodyParser.urlencoded()),
      app.get('/api/typeimgs',(req,res) => {
        res.send(typeimgs[req.query.act]);
      }),
      app.get('/api/recommend',(req,res) => {
        res.send(recommend);
      }),
      app.use('/api/getFans',require('./route/getFans')()),
      app.use('/api/modifyBarrage',require('./route/modifyBarrage')()),
      app.use('/api/alterFollower',require('./route/alterFollower')()),
      app.use('/api/getStrangerInfo',require('./route/getStrangerInfo')()),
      app.use('/api/login',require('./route/login')()),
      app.use('/api/getUnpassedPic',require('./route/getUpassedPic')()),
      app.use('/api/alterUserInfo',require('./route/alterUserInfo')()),
      app.use('/api/imgupload',require('./route/upload')()),
      app.use('/api/getTypes',require('./route/types')()),
      app.use('/api/getTypeImgs',require('./route/typeImgs')()),
      app.use('/api/getRecommend',require('./route/recommend')()),
      app.use('/api/getLike',require('./route/like')()),
      app.use('/api/getCollect',require('./route/collect')()),
      app.use('/api/getUpload',require('./route/myupload')()),
      app.use('/api/modifyLike',require('./route/modifyLike')()),
      app.use('/api/modifyCollect',require('./route/modifyCollect')()),
      app.use('/api/download',require('./route/download')())
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
