<template>
<!-- :rowKey="(record,index)=>{return index}" -->
  <a-table :columns="columns" :data-source="data" rowKey="dataIndex">
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
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="
          tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
        "
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical" />
      <a>Delete</a>
      <a-divider type="vertical" />
      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
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
  },
  {
    title: "Action",
    dataIndex: "Action",
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
import { getHomeMultidata } from "network/home"
export default {
  data() {
    return {
      data,
      columns,
    };
  },
  methods:{
    getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.data = res.records;
          console.log(this.data);
        })
      }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
  },
};
</script>
