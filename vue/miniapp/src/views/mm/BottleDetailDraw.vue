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
      width="500"
    >
    <ScrollerBottleDetail :bottleDetailList="bottleDetailList"/>
      <!-- <ul>
        <li v-for="value in bottleDetailList">
          {{ value }}
        </li>
      </ul> -->

  <a-input-search
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />

      </v-for>
    </a-drawer>
  </div>
</template>
<script>
import { getUserBottleDetail } from "network/mm";
import ScrollerBottleDetail from "./ScrollerBottleDetail";
export default {
  data() {
    return {
      bottleDetailList: {},
    };
  },
  components: {
    ScrollerBottleDetail,
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
    onSearch(value) {
      console.log(value);
    },
  },
  watch:{
    qid:function(){
        console.log("computed qid",this.qid);
        getUserBottleDetail(this.qid, 20,0).then((res) => {
        console.log(res);
        this.bottleDetailList = res.records;
        console.log(this.bottleDetailList);
      });
    },
  }
};
</script>
