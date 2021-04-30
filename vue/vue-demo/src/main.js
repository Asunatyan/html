import Vue from 'vue'
import App from './App.vue'

//全局注册主键
// import TodoItem from './components/TodoList.vue'
// Vue.component('todo-item',TodoItem)

Vue.config.productionTip = false
//入口函数
new Vue({
  render: h => h(App),
}).$mount('#app')
