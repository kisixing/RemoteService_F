export default [
  // user // login
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', title: '登录', component: './user/Login' },
      { path: '/user/register', name: 'register', title: '用户建档', component: './user/Register' },
      { component: './404' },
    ],
  },
  {
    path: '/order',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/order', name: 'order', title: '套餐购买', component: './order/index' },
      {
        path: '/order/my-order',
        name: 'my order',
        title: '我的订单',
        component: './order/MyOrder',
      },
      {
        path: '/order/package-list',
        name: 'package list',
        title: '套餐列表',
        component: './order/Package',
      },
      { component: './404' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          // {
          //   path: '/',
          //   redirect: '/home',
          // },
          {
            path: '/',
            name: 'homepage',
            title: '首页',
            component: './home',
          },
          {
            path: '/perinatal-list',
            name: 'perinatal-list',
            title: '围产建档',
            component: './perinatal/FormList',
          },
        ],
      },
      { component: './404' },
    ],
  },
  { component: './404' },
];
