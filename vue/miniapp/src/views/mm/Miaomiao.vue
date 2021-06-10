<template>
  <!-- :rowKey="(record,index)=>{return index}" -->
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

    <span slot="action" slot-scope="a,record">
      <router-link :to="{
        path:'/mm/botton',
        query:{userid: record.id}
      }">Go to Bar</router-link>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    dataIndex: "id",
    title: "id",
  },
  {
    title: "gender",
    dataIndex: "gender",
  },
  {
    title: "disable",
    dataIndex: "disable",
  },
  {
    title: "oneself",
    dataIndex: "oneself",
  },
  {
    title: "type",
    dataIndex: "type",
  },
  {
    title: "updateDate",
    dataIndex: "updateDate",
    scopedSlots: { customRender: "customTitle" },
  },
  {
    title: "Action",
    scopedSlots: { customRender: 'action' }, 
  },
];

const data = [];
import { getHomeMultidata } from "network/mm";
export default {
  data() {
    return {
      data,
      columns,
      pagination: {},
    };
  },
  methods: {
    customRow(record, index) {//设置行属性
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
    getHomeMultidata(size, current) {
      getHomeMultidata(size, current).then((res) => {
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
      console.log(pagination);
      this.getHomeMultidata(pagination.pageSize, pagination.current);
    },
  },
  mounted() {
    // 1.请求多个数据
    this.getHomeMultidata(10, 1);

    // 2.请求商品数据
  },
};
</script>
