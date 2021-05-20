import shop from '../../api/shop'
import { PRODUCTS } from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
//Action 提交的是 mutation，而不是直接变更状态。
//Action 可以包含任意异步操作。
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => {
      commit(PRODUCTS.SET_PRODUCTS, products)
    })
  }
}

// mutations 类型: { [type: string]: Function }
//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation  也就是说需要在这里定义方法才能修改store里面的状态
const mutations = { 
  
  /* 
  对象的一个方法
  例如const obj = {
  ["func"](a,b){
  }
  }等价于
  var obj={
  func:function(a,b){}
  }
  其中方括号内是个变量的形式更多见
  */

  //[setProducts](){}  => setProducts:function(state,products){}
  [PRODUCTS.SET_PRODUCTS](state, products) {
    state.all = products
  },
  //[decrementProductInventory](){}  => decrementProductInventory:function(state,{ id }){}
  [PRODUCTS.DECREMENT_PRODUCT_INVENTORY](state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  /* 
  通过添加 namespaced: true 的方式使其成为带命名空间的模块。
  当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：
  */
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}