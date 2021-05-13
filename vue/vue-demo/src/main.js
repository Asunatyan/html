import Vue from 'vue'
import App from './App.vue'

//全局注册主键
// import TodoItem from './components/TodoList.vue'
// Vue.component('todo-item',TodoItem)

Vue.config.productionTip = false
//入口函数
new Vue({
/*
render: function (createElement) {
     return createElement(App);
}
*/  
  render: h => h(App),//对应上面的import App

}).$mount('#app') 

/**
 * new Vue({
  render: h => h(App),
}).$mount('#app') 

等效

 var vm = new Vue({//vm的实例是全局的可以在控制台直接 vm.mssage = '需要修改的值'
            el: '#app',//指定一个动漫节点
            data: {//数据
 */
