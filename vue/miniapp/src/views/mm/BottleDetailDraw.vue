<template>
  <div>
    {{ isshow }}
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="isshow"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <ul>
        <li v-for="value in bottleDetailList">
          {{ value }}
        </li>
      </ul>
      </v-for>
    </a-drawer>
  </div>
</template>
<script>
import { getUserBottleDetail } from "network/mm";

export default {
  data() {
    return {
      bottleDetailList: {},
    };
  },
  props: {
    isshow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    qid: {
      type: Number ,
      default() {
        return 123;
      },
    },
    // subdata: {
    //   type: Object,
    //   default:{
    //     visible:false,
    //     qid:123
    //   },
    // },
  },
  methods: {
    afterVisibleChange(val) {
      console.log("afterVisibleChange,val=",val);
    },
    onClose() {
      console.log("onClose");
      this.$emit("closeDrawer", false);
    },
  },
  watch:{
    qid:function(){
        console.log("computed qid",this.qid);
        getUserBottleDetail(this.qid, 0,10).then((res) => {
        console.log(res);
        debugger
        this.bottleDetailList = res;
        console.log(this.bottleDetailList);
      });
    },
  }
};
</script>
