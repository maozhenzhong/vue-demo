# Vue后台管理系统

### 目录

+ [项目简介](#introduction)
+ [技术支持](#dependencies)
+ [目录结构](#tableOfContents)
+ [项目开发](#development)
+ [项目发布](#production)

<span id="introduction"></span>
### 项目简介

Vue后台管理系统是一个基于 [Vue.js](https://github.com/vuejs/vue) 和[Element](http://element.eleme.io/) 开发的SPA(single page web application)后台管理项目。

<span id="dependencies"></span>
### 技术支持

在开发本后台管理系统需要安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/) 。同时还需要安装 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/)、[axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element)等。本项目开发时候虚拟数据是[Mock.js](https://github.com/nuysoft/Mock)数据。

<span id="tableOfContents"></span>
### 目录结构

```bash
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                   // 所有请求
│   ├── assets                // 主题 字体等静态资源
│   ├── components           // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filters                 // 全局 filter
│   ├── lang                  // 国际化 language
│   ├── mock                 // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                 // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                // 公用vendor
│   ├── views                 // view
│   ├── App.vue               // 入口页面
│   ├── main.js               // 入口 加载组件 初始化等
│   └── permission.js         // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce             // 富文本
├── .babelrc                  // babel-loader 配置
├── eslintrc.js                 // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json              // package.json
```

<span id="development"></span>
### 项目开发

```bash

# 安装依赖
npm install
   
# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

<span id="production"></span>
### 项目发布

```bash

# 构建单元测试
npm run unit

# 构建生产环境
npm run build
```

