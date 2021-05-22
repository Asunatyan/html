import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//import Antd from "ant-design-vue";
//import 'ant-design-vue/dist/antd.css';//引入样式
//import 'ant-design-vue/dist/antd.less';//引入样式全部

import {Button,Layout,Icon,Drawer,Radio} from "ant-design-vue";

Vue.config.productionTip = false;


Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
