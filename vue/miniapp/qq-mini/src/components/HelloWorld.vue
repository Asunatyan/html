<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getUserid()">点击xxx</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    getUserid() {
      this.$http
        .get(
          "/qqstudyroom/hall/mid-382?openid=E1A998D59252D05CFBE18F15A5201111&channel=1&gender=2&timestamp=0&page=1"
        )
        .then(function (response) {
          console.log(response);
          let res = [];
          response.data.list.map((item) => {
            res=[...res,...item]//数组不会去重复
          });
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created: function () {
    const arry = [
      [
        { 2: "3", 1: "1" },
        { 3: "0", 5: "4" },
      ],
      [
        { 2: "1", 1: "1" },
        { 3: "1", 5: "1" },
      ],
      [
        { 2: "0", 1: "0" },
        { 3: "0", 6: "0" },
      ],
    ];
    /*       [
        { 5: "5", 6: "6" },
        { 8: "8", 7: "7" },
      ],

      [
        { 9: "9", 10: "10" },
        { 1: "1", a3: "a" },
      ],
      [
        { b1: "b1", a43: "a" },
        { 11: "11", a4: "a" },
      ],

      [
        { a2: "a2", a: "a" },
        { 2: "2", a: "a" },
      ], */

    //let data = a.map((item) => (res = [...res, ...item]));
    let data = {};
    arry.map((item) => {
        data={...data,...item}//对象回去重复
    });
    console.log(data);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
