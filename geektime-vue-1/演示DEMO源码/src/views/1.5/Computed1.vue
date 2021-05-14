<template>
  <div>
    计算属性vs 监听器
    <hr>
    {{ fullName }}

    <div>firstName: <input v-model="firstName" /></div>
    <div>lastName: <input v-model="lastName" /></div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      firstName: "Foo2",
      lastName: "Bar2"
    };
  },
  computed: {
    fullName: function() {
      return this.firstName + " " + this.lastName; //fullName 修改fullName
    }
  },
  watch: {
    fullName: function(val, oldVal) {//监听 fullName
      console.log("new: %s, old: %s", val, oldVal);
    }
  }
};
</script>
