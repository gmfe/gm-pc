
<p align="center">
<h1 align="center">gm-pc</h1>
<div align="center">观麦新架构组件库，采用lerna分包管理，👉 <a target="_blank" href="https://gmfe.github.io/gm-pc-docs">预览地址</a></div>
</p>

<div align="center">


 [![NPM version][npm-image]][npm-url] ![NPM downloads][download-image]

[npm-image]: https://img.shields.io/npm/v/@gm-pc/react.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@gm-pc/react


[download-image]: https://img.shields.io/npm/dm/@gm-pc/react.svg?style=flat-square
[download-url]: https://npmjs.org/package/@gm-pc/react


</div>

## ⌨️ 本地开发

```
git clone git@github.com:gmfe/gm-pc.git
cd gm-pc
# 安装依赖
yarn

# 各个包的依赖安装
lerna bootstrap

# 项目启动
yarn start
```
打开浏览器访问 http://localhost:7000 

在每个文件夹下面的 `stories.tsx` 编写示例代码 

## ✨ 一些主要的packages

### @gm-pc/business

这里存放和业务强相关的组件

### @gm-pc/locales

处理多语言的

### @gm-pc/react

组件库

### @gm-pc/table-x

列表相关的

### @gm-pc/keyboard

键盘操作相关的


## 📦 发布

包发布到 GitLab Package Registry（项目级别）。

### 本地发布

```bash
# beta 预发布
yarn publish:beta

# alpha 预发布
yarn publish:alpha

# 正式发布
yarn publish:latest

# 自定义参数
yarn publish --tag rc --preid rc --bump prerelease
```

本地发布支持两种认证方式（二选一）：

**方式一：环境变量（推荐）**

```bash
cross-env NPM_AUTH_TOKEN=<your-token> yarn publish:beta
```

**方式二：.npmrc 文件**

在项目根目录 `.npmrc` 中配置：

```
@gm-pc:registry=https://code.guanmai.cn/api/v4/projects/695/packages/npm/
//code.guanmai.cn/api/v4/projects/695/packages/npm/:_authToken=<your-token>
```

Token 在 GitLab → Settings → Access Tokens 中创建，需勾选 `write_package_registry`。

### CI/CD 发布

推 tag 到 GitLab 自动触发 pipeline：

```bash
# 触发 beta 发布
git tag v1.29.1-beta.0
git push gitlab v1.29.1-beta.0

# 触发正式发布
git tag v1.29.1
git push gitlab v1.29.1
```

CI/CD 使用内置 `$CI_JOB_TOKEN` 认证，无需手动配置 token。

## 📥 安装

在其他项目中安装 `@gm-pc` 包，需在项目 `.npmrc` 中配置：

```
@gm-pc:registry=https://code.guanmai.cn/api/v4/projects/695/packages/npm/
//code.guanmai.cn/api/v4/projects/695/packages/npm/:_authToken=MVqiy5WJ5BRJUtn7dnjt
```

Token 需勾选 `read_package_registry` 权限。然后：

```bash
yarn add @gm-pc/react@beta
```

## 🔨 示例

```jsx
import { Button, Input } from '@gm-pc/react'
const App = () => (
  <>
    <Button type="primary">点击</Button>
    <Input />
  </>
);
```
