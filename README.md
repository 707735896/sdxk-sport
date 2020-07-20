## 环境准备

安装node 安装cnpm, npm install -g cnpm (全局安装)

``` bash
cnpm install
```

## 开发环境

``` bash
npm run dev
```

## 正式环境

``` bash
npm run build
```

## 打包
### 内网打包
 1. `router.js` `mode` 使用 `history` 模式

 2. `webpack.prod.condig.js` 中的 `publicPath` 改为 `/`

 3. 打包之后把 `public` 文件夹中的 `jcpfree.js` 打印控件js 复制到 `dist` 文件夹下，并修改 `index.html` 文件中引用路径为 `/jcpfree.js`

### 教育局打包
  1. `router.js` `mode` 注释掉

  2. `webpack.prod.condig.js` 中的 `publicPath` 改为 `/dist/`

  3. `service/Urls.js` 接口地址 使用 `host = window.location.hostname + ':' + window.location.port; //  教育局地址 ===域名`

  4. 打包之后把 `public` 文件夹中的 `jcpfree.js` 打印控件js 复制到 `dist` 文件夹下，并修改 `index.html` 文件中引用路径为 `/dist/jcpfree.js`






