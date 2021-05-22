import Vue from "vue";
import Router from "vue-router";
import NotFound from "./views/Exception/404";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
//import RenderRouterView from "./components/RenderRouterView";
Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/user",
            //hideInMenu: true,
            //使用render函数代替组件的导入
            //component: RenderRouterView,
            //component: {render:h=>h("router-view")},
            component: () =>//异步加载
                import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
            children: [
                {
                    path: "user",
                    redirect: "/user/login",//访问user重定向到这个页面
                },
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
            meta: { authority: ["user", "admin"] },
            component: () =>
                import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
            children: [
                // dashboard
                {
                    path: "/",
                    redirect: "/dashboard/analysis"
                },
                {
                    path: "/dashboard",//访问dashboard不会 包含下面的analysis组件的
                    name: "dashboard",
                    meta: { icon: "dashboard", title: "仪表盘" },
                    component: { render: h => h("router-view") },
                    children: [
                        {
                            path: "/dashboard/analysis",//会包含下面的analysis组件的
                            name: "analysis",
                            meta: { title: "分析页" },
                            component: () =>
                                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")
                        }
                    ]
                },
                // form
                {
                    path: "/form",
                    name: "form",
                    component: { render: h => h("router-view") },
                    meta: { icon: "form", title: "表单", authority: ["admin"] },
                    children: [
                        {
                            path: "/form/basic-form",
                            name: "basicform",
                            meta: { title: "基础表单" },
                            component: () =>
                                import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
                        },
                        {
                            path: "/form/step-form",
                            name: "stepform",
                            hideChildrenInMenu: true,
                            meta: { title: "分布表单" },
                            component: () =>
                                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
                            children: [
                                {
                                    path: "/form/step-form",
                                    redirect: "/form/step-form/info"
                                },
                                {
                                    path: "/form/step-form/info",
                                    name: "info",
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1")
                                },
                                {
                                    path: "/form/step-form/confirm",
                                    name: "confirm",
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2")
                                },
                                {
                                    path: "/form/step-form/result",
                                    name: "result",
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3")
                                }
                            ]
                        }
                    ]
                },

            ]
        },
        {
            path: "*",
            name: "404",
            component: NotFound
        }
    ]
})

//路由之前
router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {//如果切换的页面是同一个就不需要有进度条了
        NProgress.start();
    }
    next();
})

//路由之后
router.afterEach(() => {
    NProgress.done();
})

export default router