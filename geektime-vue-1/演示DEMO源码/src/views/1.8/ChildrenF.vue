<template>
  <div class="border2">
    <h3 :style="{ color: theme1.color }">F 结点</h3>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    theme1: {//防止名字冲突
      from: "theme",//别名
      default: () => ({})
    }
  }
};
</script>
