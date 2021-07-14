<template>
  <a-list>
     <RecycleScroller
      v-infinite-scroll="handleInfiniteOnLoad"
      style="height: 400px"
      :items="data"
      :item-size="73"
      key-field="id"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list-item slot-scope="{ item }">
        <a-list-item-meta :description="item.content">
          <a slot="title" :href="item.content">{{ item.content }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
        <div>Content {{ item.index }}</div>
      </a-list-item>
    </RecycleScroller>
    <a-spin v-if="loading" class="demo-loading" />
  </a-list> 

  <!-- <ul>
        <li v-for="value in bottleDetailList">
          {{ value }}
        </li>
      </ul>  -->
</template>
<script>
import reqwest from 'reqwest';
import infiniteScroll from 'vue-infinite-scroll';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
const fakeDataUrl = 'http://localhost:8080/api/bottleDetail/userBottleDetailList?qid=1&size=200&current=0';
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
    };
  },
  props: {
    bottleDetailList: {}
  },
  beforeMount() {
    this.fetchData(res => {
      this.data = res.records.map((item, index) => ({ ...item, index }));
      console.log("fetchData",this.data);
    });
  },
  methods: {
    fetchData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: res => {
          callback(res);
        },
      });
    },
    handleInfiniteOnLoad() {
      const data = this.data;
      this.loading = true;
      if (data.length > 100) {
        this.$message.warning('Infinite List loaded all');
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData(res => {
        this.data = data.concat(res.results).map((item, index) => ({ ...item, index }));
        this.loading = false;
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
</style>
