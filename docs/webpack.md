# 项目初始化

## 1. 起手安装

### 1.1 package.json(npm init -y)

定义了项目模块,主要属性有

1. name: 包名
2. version: 包的版本号
3. author：包的作者
4. dependencies: 生产环节依赖包列表
5. devDependencies: 开发环境依赖包列表

### 1.2 tsconfig.json(tsc --init)

指定了用来编译这个项目的根文件和编译选项.

1. target: 编译后的 es 版本.
2. module: 指定的模块代码生产方式.

### 1.3 webpck 相关开发工具

1. webpack
2. webpack-cli: 用于在命令行中运行 webpack
3. webpack-dev-server: 开发服务器,通常用于本地开发

### 1.4 react 相关

1. react、@types/react
2. react-dom、@types/react-dom

### 1.5 css module

1. awesome-typescript-loader

## 2. 项目启动

### 2.1 webpack 属性

1. entry: 入口
2. output: 出口
3. module: 处理非 js 文件
   -- 3.1 rules
   -- test: 文件名规则
   -- use: 使用的 loader,支持链式传递,将处理后的文件链式传递
4. plugins: 插件,用于处理 loder 无法实现的其他事情
5. resolve: 路径相关
   --extensions: 使得引入文件名不需要扩展名
   --plugins: 插件类

### 2.2 入口与出口

1. entry: src/index.tsx
2. output: dist/[name].js

### 2.3 ts/tsx 文件处理

1. ts-loader
2. tsconfig: compilerOptions 中添加`"jsx": "react"`.(awesome-typescript-loader 目前无法兼容 ts3)

## 3. 提升开发体验

### 3.1 支持 sass

1. node-sass
2. sass-loader
3. css-loader
4. style-loader

### 3.2 支持 css module(相当于给 css 添加作用域)

1. typings-for-css-modules-loader(报错, css-loader@1.0.1)
2. todo: sass 文件引用问题.`@import './styles/var.sass' => @import 'var.sass`

### 3.3 支持装饰器

函数式组件不能使用支持装饰器.

### 3.4 支持 alias

1. tsconfig-paths-webpack-plugin
2. tsconfig 中设置 alias

### 3.5 构建缓存

缓存目标

1. 编译出的 js
2. 编译出的 css

## 4. 整理项目结构及安装相关库

### 4.1 webpack.config.js 拆分

### 4.2 集成 Ant

1. ts-import-plugin: 根据文档配置
2. cache-loader 可能会导致报错,因为缓存没变,但编译后的其他变量名变了.

### 4.3 集成 unstate

todo

### 4.4 集成 utils

todo

### 4.5 集成 react-hot-loader

todo

### 4.6 集成 svg-component/images 等

todo

### 4.7 集成 react-router、axios

todo

## 5. 项目打包

### 5.1 打包命令

### 5.2 文件夹清理

### 5.3 css 分离

### 5.4 代码分片、按需加载

### 5.5 代码压缩

## 6. 项目规范

### 6.1 eslint

### 6.2 stylelint

### 6.3 npm 检测

### 6.4 代码格式化

### 6.5 pre-commit

## 问题

### node_modules 出现 0 字节的文件夹,导致无法安装某些包
