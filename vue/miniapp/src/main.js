import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//import Antd from "ant-design-vue";
//import 'ant-design-vue/dist/antd.css';//引入样式
//import 'ant-design-vue/dist/antd.less';//引入样式全部
import {Button,Layout,Icon,Drawer,Radio,Menu,Table,Tag,Divider,Pagination,Input,List,Spin,Avatar} from "ant-design-vue";

Vue.config.productionTip = false;


Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(List);
Vue.use(Spin);
Vue.use(Avatar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
