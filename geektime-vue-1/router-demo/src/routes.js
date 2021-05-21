import RouterDemo from './components/RouterDemo'
import RouterChildrenDemo from './components/RouterChildrenDemo'
import UnKnowPath from './components/UnKnowPath'

const routes = [
  { path: '/foo', component: RouterDemo, name: '1' },//匹配到/foo就会 渲染到 App.vue的<router-view></router-view>
  { path: '/bar', component: RouterDemo, name: '2' },
  // 当 /user/:id 匹配成功，
  // RouterDemo 会被渲染在 App 的 <router-view /> 中
  { path: '/user/:id', 
    component: RouterDemo, 
    name: '3',
    props: true,//是否需要将:id作为参数传递到RouterDemo(所有声明了props: ['id'])中
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // RouterChildrenDemo 会被渲染在 RouterDemo 的 <router-view/> 中
        path: 'profile',
        component: RouterChildrenDemo,
        name: '3-1'// name?: string, // 命名路由
      },
      {
        // 当 /user/:id/posts 匹配成功
        // RouterChildrenDemo 会被渲染在 RouterDemo 的 <router-view/> 中
        path: 'posts',
        component: RouterChildrenDemo
      }
    ]
  },
  { path: '/a', redirect: '/bar' },
  { path: '*', component: UnKnowPath, name: '404' }
]

export default routes