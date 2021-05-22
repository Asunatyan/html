<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"

      :visible="visible"
      width="300px"
    >
      <template v-slot:handle><!-- 插槽 -->
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <div>
          <h2>整体风格定制</h2>
          <a-radio-group 
             :value="$route.query.navTheme || 'dark'"
             @change="e => handleSettingChange('navTheme', e.target.value)"
          >
            <!-- :value="$route.query.navTheme || 'dark'" //从路由中取值 娶不到默认dark
            @change="e => handleSettingChange('navTheme', e.target.value)"//将改变的值同步到路由上面
             -->
            <a-radio value="dark">黑色</a-radio>
            <a-radio value="light">白色</a-radio>
          </a-radio-group>
          <h2>导航模式</h2>
          <a-radio-group 
             :value="$route.query.navLayout || 'left'"
             @change="e => handleSettingChange('navLayout', e.target.value)"
           >
            <a-radio value="left">左侧</a-radio>
            <a-radio value="top">顶部</a-radio>
          </a-radio-group>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
     /*  navTheme: "dark",
      navLayout: "left" */
    };
  },
   methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {//将改变的值同步到路由上面
   /* 
    一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象。
   */
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  } 
};
</script>
<style scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
