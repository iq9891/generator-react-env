import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.test.config.babel';

// 相当于通过本地node服务代理请求到了http://cnodejs.org/api
var proxy = [{
    path: '/api/*',
    target: 'https://cnodejs.org',
    host: 'cnodejs.org'
}];

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy
});

//将其他路由，全部返回index.html
server.app.get('*', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
});

server.listen(3001);
