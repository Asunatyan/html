<template>
  <!-- <div>这里是详情openid={{$route.query.openid}}</div> -->
  <!-- :rowKey="(record,index)=>{return index}" -->
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="id"
      :pagination="pagination"
      size="default"
      @change="handleTableChange"
      :customRow="customRow"
    >
      <template v-slot:name="slotProps">
        <a>{{ slotProps }}11111111111</a>
      </template>
      <!-- 
       下面的写法已经废弃了使用上面的写法  来获取子组件中才有的数据 

       子组件的定义类似小面这样的
       <span>
        <slot name="name" v-bind:data="data">
          {{ data.name }}
        </slot>
      </span>
       -->
      <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
      <span slot="customTitle" slot-scope="type"
        ><a-icon type="smile-o" /> {{ type }}</span
      >

      <span slot="action" slot-scope="a, record">
        <a-button type="primary" @click="showDrawer(record.id)"> Open </a-button>
        <!-- <router-link
        :to="{
          path: '/mm/bottle',
          query: { openid: record.openid },
        }"
        target="_blank"
      >
        Go to Bar
      </router-link> -->
      </span>
    </a-table>
    <BottleDetailDraw :isshow="isshow" :qid="qid"  @closeDrawer="closeDrawer" />
    <!-- <div>
    <a-back-top />
    Scroll down to see the bottom-right
    <strong style="color: rgba(64, 64, 64, 0.6)"> gray </strong>
    button.
  </div> -->
  </div>
  
</template>

<script>
const columns = [
  {
    dataIndex: "id",
    title: "id",
  },
  {
    dataIndex: "gender",
    title: "gender",
  },
  {
    title: "channel",
    dataIndex: "channel",
  },
  {
    title: "content",
    dataIndex: "content",
  },
  {
    title: "openid",
    dataIndex: "openid",
  },
  {
    title: "fromopenid",
    dataIndex: "fromopenid",
  },
  {
    title: "pid",
    dataIndex: "pid",
  },
  {
    title: "read",
    dataIndex: "read",
  },
  {
    title: "isopen",
    dataIndex: "isopen",
  },
  {
    title: "hadreply",
    dataIndex: "hadreply",
  },
  {
    title: "targetopenid",
    dataIndex: "targetopenid",
  },
  {
    title: "type",
    dataIndex: "type",
  },
  {
    title: "createdata",
    dataIndex: "createdata",
  },

  {
    title: "updateDate",
    dataIndex: "updateDate",
    scopedSlots: { customRender: "customTitle" },
  },
  {
    title: "Action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [];
import { getUserBottleList } from "network/mm";
import BottleDetailDraw from "./BottleDetailDraw";
export default {
  data() {
    return {
      data,
      columns,
      pagination: {},
      //subdata:false,
      // subdata:{
      //   visible:false,
      //   qid:123,
      // },
      isshow:false,
      qid:0
    }
  },
  components: {
    BottleDetailDraw,
  },
  methods: {
    showDrawer(id) {
      this.isshow = true;
      this.qid = id;
    },
    closeDrawer() {
      this.isshow = false;
    },
    customRow(record, index) {
      //设置行属性
      return {
        // 这个style就是我自定义的属性，也就是官方文档中的props
        style: {
          // 字体颜色
          color: record.remarkDesc
            ? record.remarkDesc.fontColor
            : "rgba(0, 0, 0, 0.65)",
          // 行背景色
          "background-color": record.remarkDesc
            ? record.remarkDesc.bgColor
            : "#ffffff",
          // 字体类型
          "font-family": record.remarkDesc
            ? record.remarkDesc.fontType
            : "Microsoft YaHei",
          // 下划线
          "text-decoration":
            record.remarkDesc && record.remarkDesc.underline
              ? "underline"
              : "unset",
          // 字体样式-斜体
          "font-style":
            record.remarkDesc && record.remarkDesc.italics ? "italic" : "unset",
          // 字体样式-斜体
          "font-weight":
            record.remarkDesc && record.remarkDesc.bold ? "bolder" : "unset",
        },
        on: {
          // 鼠标单击行
          click: (event) => {
            //event.srcElement.parentElement.style.background="red"
          },
        },
      };
    },
    getUserBottleList(openid, size, current) {
      getUserBottleList(openid, size, current).then((res) => {
        console.log(res);
        /* 为什么这样不行
            this.pagination.pageSize =  res.size//每页条数
           this.pagination.total = res.total//数据总数	
           this.pagination.current = res.current  //当前页数	
        */
        const pagination = { ...this.pagination };
        pagination.pageSize = res.size; //每页条数
        pagination.total = res.total; //数据总数
        pagination.current = res.current; //当前页数
        this.pagination = pagination;

        this.data = res.records;
      });
    },
    handleTableChange(pagination) {
      // console.log(pagination);
      this.getHomeMultidata(pagination.pageSize, pagination.current);
    },
  },
  mounted() {
    let openid = this.$route.query.openid;
    // 1.请求多个数据
    this.getUserBottleList(openid, 10, 1);

    // 2.请求商品数据
  },
  // updated (){
  //   console.log("detail -> updated");
  // }
};
</script>
