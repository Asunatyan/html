 <!--APP.vue  这个文件就是单文件组件了-->

<template>
  <div id="app">
    双向绑定
        <input v-model="message"> <!-- v-mode就是语法糖===> 等同于 --><input :value="message" @input="handleChange">
        {{message}} {{message + message}}
        <div :id="message"></div>
        <!-- <ul>
            <todo-item v-for="item in list" :title="item.title" :del="item.del"></todo-item>
        </ul> -->
        <todo-list>
          <!-- 自定义的元素需要绑定key值 :key="index"   Custom elements in iteration require 'v-bind:key' directives.eslint-plugin-vue -->
            <todo-item @delete="handleDelete" v-for="(item, index) in list" :key="index" :title="item.title" :del="item.del">
                <template v-slot:pre-icon="{value}">
                    <span>前置图标 {{value}}  在这里-------</span>
                </template>
            </todo-item>
        </todo-list>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import TodoItem from './components/TodoItem.vue' //导入单文件组件 这个组件只在App.vue中生效 ,如果需要全局都生效那么需要在main.js中进行注册
import TodoList from './components/TodoList.vue'

export default {
  name: 'app',
  components: {
    TodoItem,//注册组件
    TodoList
  },
  data() {//data:function(){},
    return {
      message: 'hello world',
      list: [{
          title: '课程1',
          del: false
      }, {
          title: '课程2',
          del: true
      }],
    }
  },
  methods: {
    handleChange(e) {
      this.message = e.target.value//触发事件input的value
    },
    handleDelete(val) {
        // eslint-disable-next-line no-console
        console.log('handleDelete', val)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
