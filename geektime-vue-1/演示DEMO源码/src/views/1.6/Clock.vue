<template>
  <div>
    {{ log("5.render") }}
    {{ now }}
    <button @click="start = !start">{{ start ? "停止" : "开始" }}</button>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data: function() {
    console.log("2.data");
    this.moment = moment;
    this.log = window.console.log;
    return {
      now: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      start: false
    };
  },
  watch: {
    start(a,b) {//start: function(a,b) 
      console.log("start() 被监听到了","now",this.start,"old",a,"new",b);
      this.startClock();
    }
  },
  beforeCreate() {
    console.log("1.beforeCreate");
  },
  created() {
    console.log("3.created");
  },
  beforeMount() {
    console.log("4.beforeMount");
  },
  mounted() {
    console.log("6.mounted");
    this.startClock();
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy "+"---->"+this.clockInterval);
    clearInterval(this.clockInterval);
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    startClock() {
      clearInterval(this.clockInterval);
      console.log("this.start:"+this.start);
      if (this.start) {
        this.clockInterval = setInterval(() => {
          this.now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        }, 1000);
      }
    }
  }
};
</script>
