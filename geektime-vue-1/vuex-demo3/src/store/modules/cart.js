import shop from '../../api/shop'
import { CART, PRODUCTS } from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null,
  test: 1
}

// getters
//有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：
//如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。
//Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
//就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

//理解成一些封装的方法可以放回state中的某些属性 就相当于java中获取属性额方法把,通过getter可以获取state中的某些status
const getters = {//调用就是 store.getters.属性 
  /* 
  state,       // 如果在模块中定义则为模块的局部状态
  getters,     // 等同于 store.getters
  rootState    // 等同于 store.state
  rootGetters  // 所有 getters
  */
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      //查询出商品的id的产品
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      //总价格
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit(CART.SET_CHECKOUT_STATUS, null)//使用commit调用 Mutation中的方法
    // empty cart
    commit(CART.SET_CART_ITEMS, { items: [] })
    shop.buyProducts(
      products,
      () => commit(CART.SET_CHECKOUT_STATUS, 'successful'),
      () => {
        commit(CART.SET_CHECKOUT_STATUS, 'failed')
        // rollback to the cart saved before sending the request
        commit(CART.SET_CART_ITEMS, { items: savedCartItems })
      }
    )
  },
/* 
{
  state,      // 等同于 `store.state`，若在模块中则为局部状态
  rootState,  // 等同于 `store.state`，只存在于模块中
  commit,     // 等同于 `store.commit`
  dispatch,   // 等同于 `store.dispatch`
  getters,    // 等同于 `store.getters`
  rootGetters // 等同于 `store.getters`，只存在于模块中
}
*/
  addProductToCart ({ state, commit }, product) {
    commit(CART.SET_CHECKOUT_STATUS, null)
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id })
      } else {
        commit(CART.INCREMENT_ITEM_QUANTITY, cartItem)
      }
      // remove 1 item from stock
      commit(`products/${PRODUCTS.DECREMENT_PRODUCT_INVENTORY}`, { id: product.id }, { root: true })
    }
  },

  testMethodCommit ({commit}){
    commit('testMethod')
  }
  
}

// mutations
const mutations = {
  [CART.PUSH_PRODUCT_TO_CART] (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },

  [CART.INCREMENT_ITEM_QUANTITY] (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  [CART.SET_CART_ITEMS] (state, { items }) {
    state.items = items
  },

  [CART.SET_CHECKOUT_STATUS] (state, status) {
    state.checkoutStatus = status
  },
  ['testMethod'](){
    state.test = 2
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
