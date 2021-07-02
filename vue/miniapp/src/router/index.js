import Vue from "vue";
import Router from "vue-router";
import NotFound from "../views/Exception/404";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
//import RenderRouterView from "../components/RenderRouterView";
Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            //meta: { authority: ["user", "admin"] },
            component: () =>
                import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),//访问/ 就会到这个组件
            children: [
                // dashboard
                {
                    path: "/",
                    redirect: "/mm/mm"
                },
                {
                    path: "/mm",//访问dashboard不会 包含下面的analysis组件的
                    name: "mm",
                    meta: { icon: "dashboard", title: "mm" },
                    //但是如果我的父路由的组件没有布局或样式，仅仅只是显示子路由的组件内容，专门创建一个组件并标记，很浪费，我们可以采用component: { render: h => h("router-view") },的方式动态注册
                    component: { render: h => h("router-view") },
                    children: [
                        {
                            path: "/mm/mm",//会包含下面的analysis组件的
                            name: "mm",
                            meta: { title: "mm1"},
                            component: () =>
                                import(/* webpackChunkName: "dashboard" */ "views/mm/Miaomiao")
                        },
                        {
                            path: "/mm/botton",//会包含下面的analysis组件的
                            name: "botton",
                            hideInMenu: true,
                            meta: { title: "botton"},
                            component: () =>
                                import(/* webpackChunkName: "dashboard" */ "views/mm/botton")
                        }
                    ]
                },
                // form
                {
                    path: "/form",
                    name: "form",//有name就作为菜单去渲染
                    component: { render: h => h("router-view") },
                    meta: { icon: "form", title: "小纸条" },
                    children: [
                        {
                            path: "/form/basic-form",
                            name: "basicform",
                            meta: { title: "小纸条一" },
                            component: () =>
                                import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm")
                        },
                        {
                            path: "/form/step-form",
                            name: "stepform",
                            meta: { title: "小纸条二" },
                            hideChildrenInMenu: true,//添加标识
                            component: () =>
                                import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
                            children: [
                                {
                                    path: "/form/step-form",
                                    redirect: "/form/step-form/info"
                                },
                                {
                                    path: "/form/step-form/info",
                                    name: "info",
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1")
                                },
                                {
                                    path: "/form/step-form/confirm",
                                    name: "confirm",
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2")
                                },
                                {
                                    path: "/form/step-form/result",
                                    name: "result",
                                    component: () =>
                                        import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3")
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