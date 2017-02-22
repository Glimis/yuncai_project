import  webpack from 'webpack'
import  webpackDevMiddleware from 'webpack-dev-middleware'
import  webpackHotMiddleware from 'webpack-hot-middleware'
import  webpackDevConfig from './webpack.config.js'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
// import {cs,port} from './config'
// //控制器/路由
// import controllers from './controllers/index';
// import models from './models/index';
var  app = express();
 
// app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/dist'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieSession(cs));

// //设置跨域访问
// app.all('*', function(req, res, next) {
//     //跨域范围,配合读取cookie,必须指明域
//     // res.header("Access-Control-Allow-Origin",config.fe);
//     //处理请求
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     //处理post
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     // 允许读取跨域cookie
//     res.header("Access-Control-Allow-Credentials", 'true');
//     next();
// });
// //初始化模型,丢到全局M中,不用再引用

// global.M={};
// //模型注入
// models(app);
// //路由注入
// controllers(app)


// // 监听端口
// var server=app.listen(port, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log('app listening at http://%s:%s', host, port);
// });



var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

var port=3000;
var server=app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});