import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)//使用vuex
export default new Vuex.Store({
  state: {//从 store 实例中读取状态最简单的方法就是在计算属性 (opens new window)中返回某个状态：
    userInfo: {
      email: "xxxxxx@qq.com",
      name: "zs"
    }
  },
  modules: {
    cart,
    products
  },
})