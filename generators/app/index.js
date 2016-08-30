'use strict';
//https://segmentfault.com/a/1190000004896264
//cmd 命令
// 1. sudo npm link //本地安装你的generator
// 2. npm config set registry https://registry.npm.taobao.org //设置淘宝镜像
// 3. sudo npm unpublish generator-react-env --force //将包从npm平台下架(发布24小时之内管用)
// 4. npm version patch 先更新一版，不运行这个，不会再npmjs网站上更新，也不会变成最后版本，只是单纯的发布一个新版
// 4. sudo npm publish //发布到npm平台
// 5. 在npm平台更新的方法就是先下架再上传新版(package中更改version)
// 6. 发布之前先将npm镜像还原(npm config set registry http://registry.npmjs.org)，然后登陆npm(npm login)

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const generatorName = 'generator-react-env';

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.red(generatorName) + ' generator!'
    ));
    var oldYo = this.config.getAll();

    if (Object.keys(oldYo).length === 0 && oldYo.constructor === Object) {//如果存在.yo-rc.json文件
      var prompts = [
          {
            type: 'input',
            name: 'projectName',
            message: 'Please input project name (reactApp):',
            default: 'reactApp'
          },{
            type: 'input',
            name: 'projectDesc',
            message: 'Please input project description (reactApp is a web application):',
            default: 'reactApp is a web application'
          },{
            type: 'input',
            name: 'projectVersion',
            message: 'Please input project version (1.0.0):',
            default: '1.0.0'
          },{
            type: 'input',
            name: 'projectMain',
            message: 'Please input project main (index.js):',
            default: 'index.js'
          }
      ];

      return this.prompt(prompts).then(function (props) {
        // 读取用户信息
        this.props = props;
      }.bind(this));
    }else {
      this.props = oldYo;
    }

  },
  configuring: function () {//保存设置
    this.config.set(this.props);
    this.config.save();
  },

  writing: function () {

    //拷贝根目录
    this.fs.copy(
      this.sourceRoot(),
      '.'
    );

    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    try {
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    } catch (e) {
      this.fs.copy(
        this.templatePath('.npmignore'),
        this.destinationPath('.gitignore')
      );
    }

    //读取json文件
    var pkg = JSON.parse(this.fs.read(this.templatePath('../../../package.json')));

    delete pkg.author;
    delete pkg.homepage;
    delete pkg.files;
    delete pkg.eslintConfig;
    delete pkg.repository;

    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.main = this.props.projectMain;
    pkg.scripts =  {
      "dev": "babel-node server.dev.js --presets es2015,stage-2",
      "test": "babel-node server.test.js --presets es2015,stage-2",
      "dist": "webpack --progress --colors -p",
      "watch": "webpack --watch"
    };
    pkg.keywords = pkg.keywords;
    pkg.dependencies =  {
      "flex.css": "1.0.1",
      "get-next-page": "1.0.0",
      "github-markdown-css": "^2.4.0",
      "normalize.css": "^4.1.1",
      "obj-merged": "^1.0.5",
      "react": "^15.0.1",
      "react-dom": "^15.0.1",
      "react-redux": "^4.4.5",
      "react-router": "^2.3.0",
      "redux": "^3.5.2",
      "redux-thunk": "^2.1.0"
    };
    pkg.devDependencies = {
      "autoprefixer": "^6.4.0",
      "babel-cli": "^6.11.4",
      "babel-core": "^6.13.2",
      "babel-loader": "^6.2.4",
      "babel-plugin-transform-class-properties": "^6.11.5",
      "babel-plugin-transform-runtime": "^6.12.0",
      "babel-preset-es2015": "^6.13.2",
      "babel-preset-react": "^6.5.0",
      "babel-preset-stage-2": "^6.13.0",
      "babel-register": "^6.11.6",
      "body-parser": "^1.15.1",
      "classnames": "^2.2.5",
      "copy-webpack-plugin": "^3.0.1",
      "css-loader": "^0.23.1",
      "extract-text-webpack-plugin": "^1.0.1",
      "file-loader": "^0.9.0",
      "html-webpack-plugin": "^2.22.0",
      "jsx-loader": "^0.13.2",
      "node-sass": "^3.8.0",
      "postcss-custom-properties": "^5.0.1",
      "postcss-loader": "^0.10.1",
      "request": "^2.72.0",
      "sass-loader": "^4.0.0",
      "string-replace-loader": "^1.0.3",
      "style-loader": "^0.13.1",
      "url-loader": "^0.5.7",
      "webpack": "^1.13.0",
      "webpack-dev-server": "^1.14.1",
      "webpack-replace": "^1.0.0"
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));

    this.fs.write(this.destinationPath('README.md'), readmeTpl({
      generatorName: generatorName,
      appName: this.props.projectName,
      version: pkg.version
    }));



  }
});
