<template>
  <div>
    methods调用函数需要带括号。
    computed调用函数不需要带括号。
    
    computed是属性调用，而methods是函数调用
    <p>Reversed message1: reversedMessage12"{{ reversedMessage12 }}"</p>
    <p>Reversed message2: reversedMessage2()"{{ reversedMessage2() }}"</p> 
    <p>{{ now }}</p>
    <!--v-on 的缩写 @ -->
    <button @click="() => $forceUpdate()">forceUpdate</button>
    <br />
    <input v-model="message" /><!--双向绑定-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "hello vue"//return 里面的数据才会进入vue的监控
    };
  },
  computed: {
    // 计算属性的 getter
    //只有属性值发生变化的时候才会执行
    reversedMessage12: function() {
      console.log("执行reversedMessage1");
       return this.message
        .split("")
        .reverse()
        .join("");  
    },
    now: function() {
      return Date.now();
    }
  },
  methods: {
    reversedMessage2: function() {
      console.log("执行reversedMessage2");
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>
