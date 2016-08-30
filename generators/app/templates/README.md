# react 环境

这个项目是用[<%= generatorName %>](https://github.com/iq9891/generator-react-env) version <%= version %> 构建的


### 先决条件(mac)

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^5.10.1, npm ^3.8.3
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [cnpm](https://npm.taobao.org/) (`npm i -g cnpm --registry=https://registry.npm.taobao.org`)
- [webpack](https://webpack.github.io/) (`cnpm i -g webpack`)
- 安装Java , `brew cask install java`

### 开发(mac)

1. 运行 `sudo cnpm i` 安装node依赖包。

2. 运行 `npm run dev` 开始本地开发服务器(用于本地开发)。打开[http://localhost:3000](http://localhost:3000)

3. 运行 `npm run test` 开始本地测试服务器(用于本地提供测试)，打开[http://localhost:3001](http://localhost:3001)

### 构建生产版本

运行  `npm run dist` 在react-env中生成pro的react-env文件夹
