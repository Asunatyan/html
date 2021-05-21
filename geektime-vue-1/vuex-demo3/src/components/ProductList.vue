<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        加入购物车
      </button>
    </li>

<hr>
    <button
        @click="testMethodCommit()">
        {{test}}  -----AAAAAAAAAA
      </button>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({//如果不适用mapstate那么每个state就要用this.&store.state.状态
    products: state => state.products.all,
    test : state=>state.cart.test  //要用state.命名空间.state
  }),
  // computed: {
  //   products(){
  //     return this.$store.state.products.all
  //   }
  // },
/* 
你在组件中使用 this.$store.dispatch('xxx') 分发 action，
或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
*/

  //Action 通过 store.dispatch 方法触发：
  //mapActions(namespace?: string, map: Array<string> | Object<string | function>): Object
  methods: 

    //单个写法 去掉methods的{}
    mapActions('cart', [//我猜猜cart是命名空间
    'addProductToCart',"testMethodCommit"
    ])
    //多个写法
    //...mapActions('cart', [//我猜猜cart是命名空间
    // 将 命名空间为cart的 `this.addProductToCart()` 映射为 `this.$store.dispatch('addProductToCart')`
    //'addProductToCart',
    //"increment"
    //])
  ,
  // methods: {
  //   addProductToCart(product){
  //     this.$store.dispatch('cart/addProductToCart', product)
  //   }
  // },
  created () {//初始化产品  Action 提交的是 mutation，而不是直接变更状态。
     this.$store.dispatch('products/getAllProducts')//命名空间的名字也就是模块名/模块下对应的方法名
  }
}
</script>
