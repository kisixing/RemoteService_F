export default [
  // user // login
  {
    path: '/user',
    component: '../layouts/BlankLayout',
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
  {
    path: '/school',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/school', name: 'school', title: '孕妇学校', component: './school/TabBar' },
      {
        path: '/school/video',
        name: 'video',
        title: '视频',
        component: './school/Video',
      },
      {
        path: '/school/article',
        name: 'article',
        title: '文章',
        component: './school/Article',
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
            component: './perinatal/MapList',
          },
          {
            path: '/perinatal-list/basic-info',
            name: 'basic Info',
            title: '基本信息',
            component: './perinatal/BasicInfo',
          },
          {
            path: '/perinatal-list/current-pregnancy',
            name: 'current pregnancy',
            title: '本孕信息',
            component: './perinatal/CurrentPregnancy',
          },
          {
            path: '/perinatal-list/pregnancy-history',
            name: 'pregnancy-history',
            title: '孕产史信息',
            component: './perinatal/PregnancyHistory',
          },
        ],
      },
      { component: './404' },
    ],
  },
  { component: './404' },
];
