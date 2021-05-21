import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//import Antd from "ant-design-vue";
//import 'ant-design-vue/dist/antd.css';//引入样式
//import 'ant-design-vue/dist/antd.less';//引入样式全部

import Button from "ant-design-vue/lib/button";
import 'ant-design-vue/lib/button/style';//引入样式部分


Vue.config.productionTip = false;
Vue.use(Button)
new Vue({
  router,
  store,
  Button,
  render: (h) => h(App),
}).$mount("#app");
