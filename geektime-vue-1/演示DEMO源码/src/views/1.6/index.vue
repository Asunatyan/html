<template>
  <div>
    <a-tabs>
      <a-tab-pane key="clock" tab="时钟">
        <button @click="destroyClock = !destroyClock"><!-- 点击之后destroyClock变成true  -->
          {{ destroyClock ? "加载时钟" : "销毁时钟" }}
        </button>
        <Clock v-if="!destroyClock" /><!-- 上面的点击导致这里是 ture 然后不显示出来就被框架销毁了 -->
      </a-tab-pane>


      <a-tab-pane key="Functional" tab="函数式组件">
        <Functional :name="name" :test="test"/>
        <hr>
        <TempVar
          :var1="`hello ${name}`"
          :var2="destroyClock ? 'hello vue' : 'hello world'"
        >
        <!-- 貌似是上面的两个var1 var2 通过render 变成了两个参数value -->
          <template v-slot="{ var1, var2 }">
            {{ var1 }}
            {{ var2 }}
          </template>
        </TempVar>
         <!-- 这里的var1 和var2 就变成了临时变量-->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Clock from "./Clock";
import Functional from "./Functional";
import TempVar from "./TempVar";
export default {
  components: {
    Clock,
    Functional,
    TempVar
  },
  data() {
    return {
      destroyClock: false,
      name: "vue1",
      test: "test"
    };
  }
};
</script>
