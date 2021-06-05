<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- :theme="navTheme"  :xxx就是v-model:的缩写数据绑定 -->
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <!-- 用来接受 router的 component: () =>
                                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis") -->
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
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
      collapsed: false,
    };
  },
  computed: {
    navTheme: function () {
      return this.$route.query.navTheme || "dark";//通过route获取地址栏上面的qurey参数
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  },
};
</script>
<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 25px;
}

.trigger :hover {
  background: #eeeeee;
}

.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden; /* overflow 属性规定当内容溢出元素框时发生的事情。 hidden	内容会被修剪，并且其余内容是不可见的。 */
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>>