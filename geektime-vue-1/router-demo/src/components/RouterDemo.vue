<template>
  <div>
    <router-link to="/foo">Go to Foo</router-link>
    <br/>
    <router-link to="/user/12">Go to /user/12</router-link>
    <br/>
    <router-link to="/user/12/profile">Go to /user/12/profile</router-link>
    <br/>
    <router-link to="/other">Go to 404</router-link>
    <br/>
    <router-link to="/a">Go to a 重定向到 bar</router-link>
    <br/>
    <a href="#/foo">Go to Foo</a>
    <br/>
    <!-- 在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。
         点击 <router-link :to="..."> 等同于调用 router.push(...)。

      这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
     -->
    <button @click="$router.push('foo')">Go to Foo</button> 
    <p>id: {{id}}</p>
    <p>{{routerInfo}}</p>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    routerInfo() {
      const { fullPath, path, name, params, query, meta } = this.$route
      return {
        fullPath,//字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。
         path, name, 
         params,//一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。
          query,//一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象。
           meta
      }
    }
  }
}
</script>

