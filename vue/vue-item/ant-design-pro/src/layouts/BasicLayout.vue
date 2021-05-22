<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- 
        trigger	自定义 trigger，设置为 null 时隐藏 trigger
        collapsed	当前收起状态
         -->
      <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <div class="logo" />
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <!-- icon -->
          <a-icon  
              class="trigger" 
              :type="!collapsed? 'menu-fold' :'menu-unfold'"
              @click="collapsed=!collapsed" >
          </a-icon>
          <Header />
          
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer></SettingDrawer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  }
};
</script>
<style scoped>
.trigger {
    padding: 0 20px;
    line-height: 64px;
    font-size: 25px;
}

.trigger :hover{
  background: #eeeeee;
}
</style>>