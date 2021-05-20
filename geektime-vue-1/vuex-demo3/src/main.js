import Vue from 'vue'
import App from './App.vue'
import store from './store' 

Vue.config.productionTip = false
//这里没有使用vuex
new Vue({
  store,//  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  render: h => h(App),
}).$mount('#app')
