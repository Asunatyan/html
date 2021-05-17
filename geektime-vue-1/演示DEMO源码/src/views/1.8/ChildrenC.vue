<template>
  <div class="border1">
    <h2>C 结点</h2>
    <ChildrenE />
    <ChildrenF />
  </div>
</template>
<script>
import ChildrenE from "./ChildrenE";
import ChildrenF from "./ChildrenF";
export default {
  components: {
    ChildrenE,
    ChildrenF
  }
  // provide() {//从下到上找到第一个provide()那么A上面的就会失效只有I节点变红,C节点变绿
  //   return {
  //     theme: {
  //       color: "green"
  //     }
  //   };
  // }
};
</script>
