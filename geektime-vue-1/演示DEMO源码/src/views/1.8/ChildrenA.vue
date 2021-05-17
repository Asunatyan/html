<template>
  <div class="border">
    <h1>A 结点</h1>
    <button @click="() => changeColor()">改变color</button>
    <ChildrenB />
    <ChildrenC />
    <ChildrenD />
  </div>
</template>
<script>
import ChildrenB from "./ChildrenB";
import ChildrenC from "./ChildrenC";
import ChildrenD from "./ChildrenD";
export default {
  components: {
    ChildrenB,
    ChildrenC,
    ChildrenD
  },
  provide() {//A节点提供一个color属性
    return {
      theme: {
        color: this.color// Provide提供的数据默认都不是响应式的 这个官方文档有说明 可以在文档中直接搜索provide这个关键字
      }
    };
  },
  // provide() {
  //   return {
  //     theme: this //提供this 当前的属性都会过去
  //   };
  // },
  data() {
    return {
      color: "blue"
    };
  },
  methods: {
    changeColor(color) {
      if (color) {
        this.color = color;
      } else {
        this.color = this.color === "blue" ? "red" : "blue";
      }
    }
  }
};
</script>
