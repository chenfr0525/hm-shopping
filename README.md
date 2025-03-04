# hm-shopping

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##  项目知识点

1. 调整初始化目录

   1. 删除多余的文件
   2. 修改路由配置和App.vue
   3. 新增两个目录 api/utils
      - ap接口模块：发送ajax请求的接口模块
      - utils工具模块：自己封装的一些工具方法模块

2. 使用vant2组件库（vue2使用vant2，vue3使用vant4）

   - 安装vant-ui

   ```
   # Vue 3 项目，安装最新版 Vant：
   npm i vant -S

   # Vue 2 项目，安装 Vant 2：
   npm i vant@latest-v2 -S
   或yarn add vant@latest-v2
   ```

   - 在main.js中

   ```js
   import Vant from 'vant';
   import 'vant/lib/index.css';
   // 把vant中所有的组件都导入了
   Vue.use(Vant)
   ```

   - 即可使用

   ```jsx
   <van-button type="primary">主要按钮</van-button>
   <van-button type="info">信息按钮</van-button>
   ```

3. 按需导入

   - 安装vant-ui

   ```
   yarn add vant@latest-v2或npm i vant@latest-v2 -S
   ```

   - 安装一个插件

   ```jsd
   npm i babel-plugin-import -D或yarn add babel-plugin-import -D
   ```

   - 在`babel.config.js`中配置

   ```js
   module.exports = {
     presets: [
       '@vue/cli-plugin-babel/preset'
     ],
     plugins: [
       ['import', {
         libraryName: 'vant',
         libraryDirectory: 'es',
         style: true
       }, 'vant']
     ]
   }
   ```

   - 按需加载，在`main.js`

   ```js
   import { Button, Icon } from 'vant'

   Vue.use(Button)
   Vue.use(Icon)
   ```

   - `app.vue`中进行测试

   ```js
   <van-button type="primary">主要按钮</van-button>
   <van-button type="info">信息按钮</van-button>
   <van-button type="default">默认按钮</van-button>
   <van-button type="warning">警告按钮</van-button>
   <van-button type="danger">危险按钮</van-button>
   ```

   - 把引入组件的步骤抽离到单独的js文件中比如 `utils/vant-ui.js`

   ```js
   import { Button, Icon } from 'vant'

   Vue.use(Button)
   Vue.use(Icon)
   ```

   - main.js中进行导入

   ```js
   // 导入按需导入的配置文件
   import '@/utils/vant-ui'
   ```

4. 项目中的vw适配

   1. 官方说明（vant中的进阶用法）：https://vant-contrib.gitee.io/vant/v2/#/zh-CN/advanced-usage

   2. 安装插件

      ```js
      yarn add postcss-px-to-viewport@1.1.1 -D
      ```

   3. 项目根目录， 新建postcss的配置文件`postcss.config.js`

      ```jsx
      // postcss.config.js
      module.exports = {
        plugins: {
          'postcss-px-to-viewport': {
             // vw适配的标准屏的宽度iphoneX
            //设计图750，调成1倍=>适配375标准屏幕
            //设计图640，调成1倍=>适配320标准屏幕
            viewportWidth: 375,
          },
        },
      };
      ```

      viewportWidth:设计稿的视口宽度

      1. vant-ui中的组件就是按照375的视口宽度设计的
      2. 恰好面经项目中的设计稿也是按照375的视口宽度设计的，所以此时 我们只需要配置375就可以了
      3. px自动发转成vw

5. 路由配置

6. 新建  `styles/common.less` 重置默认样式

```less
// 重置默认样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// 文字溢出省略号
.text-ellipsis-2 {
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
```

7. main.js 中导入应用

```javascript
import '@/styles/common.less'
```

8. 接口文档：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/doc-2221080

   演示地址：http://cba.itlike.com/public/mweb/#/

   基地址：http://cba.itlike.com/public/index.php?s=/api/

   我们会使用 axios 来请求**后端接口**, 一般都会对 axios 进行**一些配置** (比如: 配置基础地址,请求响应拦截器等等)

   一般项目开发中, 都会对 axios 进行基本的**二次封装**, 单独封装到一个模块中, 便于使用

   **目标：将 axios 请求方法，封装到 request 模块**

   1. 安装 axios

   ```
   npm i axios
   ```

   1. 新建 `utils/request.js` 封装 axios 模块

      利用 axios.create 创建一个自定义的 axios 来使用

      http://www.axios-js.com/zh-cn/docs/#axios-create-config

   ```js
   /* 封装axios用于发送请求 */
   import axios from 'axios'

   // 创建一个新的axios实例
   const request = axios.create({
     baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
     timeout: 5000
   })

   // 添加请求拦截器
   request.interceptors.request.use(function (config) {
     // 在发送请求之前做些什么
     return config
   }, function (error) {
     // 对请求错误做些什么
     return Promise.reject(error)
   })

   // 添加响应拦截器
   request.interceptors.response.use(function (response) {
     // 对响应数据做点什么
     return response.data
   }, function (error) {
     // 对响应错误做点什么
     return Promise.reject(error)
   })

   export default request
   ```

   1. 获取图形验证码，请求测试

   ```js
   import request from '@/utils/request'
   export default {
     name: 'LoginPage',
     async created () {
       const res = await request.get('/captcha/image')
       console.log(res)
     }
   }
   ```

9. api接口模块：将请求封装成方法，统一存放到api模块，与页面分离（按需导入，必有return）

10. Toast轻提示：阅读vant文档

   1. https://vant-contrib.gitee.io/vant/v2/#/zh-CN/toast

      两种使用方式

      1. 导入调用 ( **组件内** 或 **非组件中均可** ) 

      ```jsx
      import { Toast } from 'vant';
      Toast('提示内容');
      ```

      2. 通过this直接调用 ( **组件内 **)

      main.js 注册绑定到原型

      ```js
      import { Toast } from 'vant';
      Vue.use(Toast)
      ```

      ```jsx
      this.$toast('提示内容')
      ```

11. 响应拦截器统一处理错误提示

   响应拦截器是咱们拿到数据的 **第一个** “数据流转站”，可以在里面统一处理错误，只要不是 200 默认给提示，抛出错误

   `utils/request.js`

   ```jsx
   import { Toast } from 'vant'

   ...

   // 添加响应拦截器
   request.interceptors.response.use(function (response) {
     const res = response.data
     if (res.status !== 200) {
       Toast(res.message)
       return Promise.reject(res.message)
     }
     // 对响应数据做点什么
     return res
   }, function (error) {
     // 对响应错误做点什么
     return Promise.reject(error)
   })
   ```

12. 将用户信息存入Vuex，并将Vuex持久化处理

13. 添加请求loading效果

   1. 请求时，打开 loading

   ```jsx
   // 添加请求拦截器
   request.interceptors.request.use(function (config) {
     // 在发送请求之前做些什么
     Toast.loading({
       message: '请求中...',
       forbidClick: true,
       loadingType: 'spinner',
       duration: 0
     })
     return config
   }, function (error) {
     // 对请求错误做些什么
     return Promise.reject(error)
   })
   ```

   2. 响应时，关闭 loading

   ```jsx
   // 添加响应拦截器
   request.interceptors.response.use(function (response) {
     const res = response.data
     if (res.status !== 200) {
       Toast(res.message)
       return Promise.reject(res.message)
     } else {
       // 清除 loading 中的效果
       Toast.clear()
     }
     // 对响应数据做点什么
     return res
   }, function (error) {
     // 对响应错误做点什么
     return Promise.reject(error)
   })
   ```

14. 页面访问拦截：基于全局前置守卫，进行页面访问拦截处理

   ~~~javascript
   router.before((to,from,next)=>{
     1.t0往哪里去，到哪去的路由信息对象
     2.from从哪里来，从哪来的路由信息对象
     3.next()是否放行：next（）调用，就是放行，next（路径）拦截到某个路径页面
   })
   ~~~

15. 项目打包优化

   ​vue脚手架只是开发过程中，协助开发的工具，当真正开发完了 => 脚手架不参与上线

参与上线的是 => 打包后的源代码

打包：

- 将多个文件压缩合并成一个文件
- 语法降级
- less sass ts 语法解析, 解析成css
- ....

打包后，可以生成，浏览器能够直接运行的网页 => 就是需要上线的源码！

(1) 打包命令

vue脚手架工具已经提供了打包命令，直接使用即可。

    npm run build

在项目的根目录会自动创建一个文件夹dist,dist中的文件就是打包后的文件，只需要放到服务器中即可。

(2) 配置publicPath

    module.exports = {
      // 设置获取.js,.css文件时，是以相对地址为基准的。
      // https://cli.vuejs.org/zh/config/#publicpath
      publicPath: './'
    }

(3) 路由懒加载

路由懒加载 & 异步组件， 不会一上来就将所有的组件都加载，而是访问到对应的路由了，才加载解析这个路由对应的所有组件

官网链接：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E4%BD%BF%E7%94%A8-webpack

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

    const ProDetail = () => import('@/views/prodetail')
    const Pay = () => import('@/views/pay')
    const MyOrder = () => import('@/views/myorder')


