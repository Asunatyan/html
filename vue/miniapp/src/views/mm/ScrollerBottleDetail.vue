<template>
  <a-list>
    <RecycleScroller
      v-infinite-scroll="handleInfiniteOnLoad"
      class="demo-infinite-container"
      style="height: 800px"
      :items="data"
      :item-size="50"
      key-field="id"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
      size:40
      
    >
      <a-list-item 
      split="true"
      slot-scope="item"
      style="height:100px;fontSize:20"
      >
        <div v-if="item.index % 2 === 0" style="width:550px; background-color:red">
          {{ item.item.content }}
        </div>
        <div v-else style="width:550px; ">{{ item.item.content }}</div>
      </a-list-item>

      <div v-if="loading && !busy" class="demo-loading-container">
        <a-spin />
      </div>

      <!-- <a-list-item slot-scope="{ item }">
       <a-list-item-meta :description="item.content">
          <a slot="title" :href="item.content">{{ item.content }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
        <div>Content {{ item.index }}</div>
        <a-space align="start" v-if="item.index%2===0">
          {{item.content}}=={{item.index%2===0}}
        </a-space>
        <a-space align="end" v-else>
          {{item.content}}
        </a-space>
      </a-list-item> -->
    </RecycleScroller>
    <!-- <a-spin v-if="loading" class="demo-loading" /> -->
  </a-list>
</template>
<script>
import reqwest from "reqwest";
import infiniteScroll from "vue-infinite-scroll";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
const fakeDataUrl =
  "http://localhost:8080/api/bottleDetail/userBottleDetailList?size=20";
//const fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo';
export default {
  directives: { infiniteScroll },
  components: {
    RecycleScroller,
  },
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      total: 999,
      current: 0,
    };
  },
  props: {
    bottleDetailList: {},
    qid: 0,
  },
  beforeMount() {
    this.fetchData((res) => {
      this.data = res.records.map((item, index) => ({ ...item, index }));
      console.log("fetchData", this.data);
      this.current = res.current;
      this.total = res.total;
    });
  },
  methods: {
    fetchData(callback) {
      reqwest({
        url:
          fakeDataUrl + "&qid=" + this.qid + "&current=" + (this.current + 1),
        type: "json",
        method: "get",
        contentType: "application/json",
        success: (res) => {
          callback(res);
        },
      });
    },
    handleInfiniteOnLoad() {
      const data = this.data;
      this.loading = true;
      if (data.length > this.total) {
        this.$message.warning("Infinite List loaded all");
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData((res) => {
        this.data = data
          .concat(res.records)
          .map((item, index) => ({ ...item, index }));
        this.loading = false;
      });
    },
  },

  watch: {
    qid: function() {
      this.current = 0;
      console.log("current", this.current);
      this.fetchData((res) => {
        this.data = res.records.map((item, index) => ({ ...item, index }));
        this.current = res.current;
        this.total = res.total;
      });
    },
  },
};
</script>
<style>
.demo-loading {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
/* .demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
} */
/* .demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
} */
</style>
