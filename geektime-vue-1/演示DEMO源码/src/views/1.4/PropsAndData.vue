<template>
  <div>
    <p>props.info: {{ info }}</p>
    <p>props.name: {{ name }}</p>
    <p>props.list: {{ list }}</p>
    <p>data.a: {{ a }}</p>
    <p>
      <button @click="handleBChange">change data.b</button>
    </p>
  </div>
</template>
<script>
export default {  //??????
  name: "PropsAndData",
  props: {//Prop 向子组件传递数据  就是这样传递数据<PropsAndData :name="name" :info="info" :list="list" />
    info: Object,
    name: String,
    list: Array
  },
  data: function () {//data (){} 相同
    return {
      a: "hello",
      b: "world"
    };
  },
  updated() {//生命周期  由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。 
    console.log("触发 PropsAndData updated");
  },
  methods: {
    handleBChange() {
      this.b = "vue" + Date.now();
      console.log("data.b 发生了变化，但是并没有触发组件更新", this.b);
    }
  }
};
</script>
