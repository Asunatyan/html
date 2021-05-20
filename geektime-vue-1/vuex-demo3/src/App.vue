<template>
  <div id="app">
    <h1>购物车示例</h1>
    <p>账号: {{ email }}</p>
    <p>姓名:{{ name }}</p>
    <hr />
    <h2>产品</h2>
    <ProductList />
    <hr />
    <ShoppingCart /><!-- 使用组价 -->
  </div>
</template>

<script>
/* 
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量
*/
import { mapState } from "vuex";
import ProductList from "./components/ProductList.vue"; //通过 export 方式导出，在导入时要加{ }，export default 则不需要。
import ShoppingCart from "./components/ShoppingCart.vue"; //export default 向外暴露的成员，可以使用任意变量来接收。

/* 
 export default 中的 default 是对应的导出接口变量。

*/
export default {
  /* computed: {
    email () {
      return this.$store.state.userInfo.email
    }
  }, */
   computed: mapState({
    //从 store 实例中读取状态最简单的方法就是在计算属性 (opens new window)中返回某个状态：
    email: a => a.userInfo.email,
    email1: function (a) {
      return a.userInfo.email;
    },
    name: (a) => a.userInfo.name,
  }),
  components: { ProductList, ShoppingCart }, //组件
};
</script>
