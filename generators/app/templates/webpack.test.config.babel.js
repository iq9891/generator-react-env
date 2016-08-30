import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import stringReplaceLoader from 'string-replace-loader';//替换链接
import autoprefixer from 'autoprefixer';

let publicPath = ''; //服务器路径
let path = `${__dirname}/dist/`;

let plugins = [];

//路径替换
let urlTest = [
   { search: 'http://192.168.1.123', replace: 'http://192.168.1.99' }
];

plugins.push(new ExtractTextPlugin('[name].css')); //css单独打包

plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    filename: `${path}/index.html`, //生成的html存放路径，相对于 path
    template: './src/template/index.html', //html模板路径
    hash: true,    //为静态资源生成hash值
}));

module.exports = {
    entry: {
        app: './src/App', //编译的入口文件
    },
    output: {
        publicPath, //编译好的文件，在服务器的路径
        path, //编译到当前目录
        filename: '[name].js' //编译后的文件名字
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel?presets=es2015'
            }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            }, {
                test: /\.scss/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|png|jpg|jpeg|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file?name=[name].[ext]'
            }, {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
            }, {
                test: /\.(jsx|js)(\?|$)/,
                loader: 'string-replace',
                query: {
                  multiple: urlTest
                }
              }
        ]
    },
    postcss: [autoprefixer],
    plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    }
};
