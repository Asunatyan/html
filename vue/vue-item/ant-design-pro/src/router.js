import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
//import RenderRouterView from "./components/RenderRouterView";
Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/user",
            //hideInMenu: true,
            //使用render函数代替组件的导入
            //component: RenderRouterView,
            component: {render:h=>h("router-view")},
            children: [
                {
                    path: "/user/login",
                    name: "login",
                    component: () =>
                        import(/* webpackChunkName: "user" */ "./views/User/Login")
                },
                {
                    path: "/user/register",
                    name: "register",
                    component: () =>
                        import(/* webpackChunkName: "user" */ "./views/User/Register")
                }
            ]
        },
        {
            path: "/",
            name: "home",
            component: Home
          },
          {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
              import(/* webpackChunkName: "about" */ "./views/About.vue")
          }
    ]
})
