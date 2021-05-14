<template>

  <div>
    这种方式获取组件的data对象,区别于vm.$data
    {{ $data }} 
    <br />
    <button @click="() => (a += 1)">a+1</button>
  </div>
</template>
<script>
export default {
/*   created:function(){
    console.log(vm.$data); 
    console.log($this.data);
    console.log($data);
    console.log();
  }, */
/*   当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。
  如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，
  每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。 */
  data: function() {
    return {
      a: 1,
      b: { c: 2, d: 3 },
      e: {
        f: {
          g: 4
        }
      },
      h: []
    };
  },
  watch: {
    a: function(val, oldVal) {
      this.b.c += 1;
      console.log("a->new: %s, old: %s", val, oldVal);
    },
    "b.c": function(val, oldVal) {
      this.b.d += 1;
      console.log("b.c-> new: %s, old: %s", val, oldVal);
    },
    "b.d": function(val, oldVal) {
      this.e.f.g += 1;
      console.log("b.d-> new: %s, old: %s", val, oldVal);
    },
    e: {
      handler: function(val, oldVal) {
        this.h.push("😄");
        console.log("e->new: %s, old: %s", val, oldVal);
      },
      deep: true
    },
    h(val, oldVal) {
      console.log("h->new: %s, old: %s", val, oldVal);
    }
  }
};
</script>
