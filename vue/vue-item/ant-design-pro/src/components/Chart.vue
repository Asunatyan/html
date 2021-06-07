<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";

/* 监听元素的变化
当我们切换左侧菜单展示效果的时候，右侧内容会对应变宽，但此时的echarts并不能执行自适应效果，
这是因为切换菜单展示效果并没有触发window.onresize，所以为解决类似此问题，我们可使用element-resize-detector  */
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();//调用 renderChart()
    addListener(this.$refs.chartDom, this.resize);//
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      /*  
      <div ref="chartDom"></div>
      echarts.init(this.$refs.chartDom)
      <div id="main"></div>
      等同于echarts.init(document.getElementById('main') */

      /* 
      this.chart 是为了能过咋当前组件的其他方法中拿到chart这个属性 1
      */
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style></style>

