<template>
  <div>
      <Header></Header>
      <SiderMenu></SiderMenu>
      <router-view></router-view>
      <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer"
import Header from "./Header"
import SiderMenu from "./SiderMenu"

export default {
    components:{//注册组件
        Footer,
        Header,
        SiderMenu,
    }

}
</script>

<style>

</style>