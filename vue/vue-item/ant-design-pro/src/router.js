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
            hideInMenu: true,
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
            //meta: { authority: ["user", "admin"] },
            component: () =>
                import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),//访问/ 就会到这个组件
            children: [
                // dashboard
                {
                    path: "/",
                    redirect: "/dashboard/analysis"
                },
                {
                    path: "/dashboard",//访问dashboard不会 包含下面的analysis组件的
                    name: "dashboard",
                    meta: { icon: "dashboard", title: "仪表盘 hhhh" },
                    //但是如果我的父路由的组件没有布局或样式，仅仅只是显示子路由的组件内容，专门创建一个组件并标记，很浪费，我们可以采用component: { render: h => h("router-view") },的方式动态注册
                    component: { render: h => h("router-view") },
                    children: [
                        {
                            path: "/dashboard/analysis",//会包含下面的analysis组件的
                            name: "analysis",
                            meta: { title: "分析页我就是玩儿", aaa:"我就是玩儿" },
                            component: () =>
                                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")
                        }
                    ]
                },
                // form
                {
                    path: "/form",
                    name: "form",//有name就作为菜单去渲染
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
                            hideChildrenInMenu: true,//添加标识
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
            hideInMenu: true,
            component: NotFound
        }
    ]
})

//路由之前
router.beforeEach((to, from, next) => {
    console.log(to,from);
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