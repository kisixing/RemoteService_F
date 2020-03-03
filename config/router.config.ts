export default [
  // 无用户验证页面
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
  // user securit verification
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
            path: '/perinatal',
            name: 'perinatal',
            title: '围产建档',
            routes: [
              {
                path: '/perinatal',
                redirect: '/perinatal/list',
              },
              {
                path: '/perinatal/list',
                name: 'perinatal list',
                title: '围产建档',
                component: './perinatal/MapList',
              },
              {
                path: '/perinatal/basic-info',
                name: 'basic Info',
                title: '基本信息',
                component: './perinatal/BasicInfo',
              },
              {
                path: '/perinatal/current-pregnancy',
                name: 'current pregnancy',
                title: '本孕信息',
                component: './perinatal/CurrentPregnancy',
              },
              {
                path: '/perinatal/pregnancy-history',
                name: 'pregnancy history',
                title: '孕产史信息',
                component: './perinatal/PregnancyHistory',
              },
            ],
          },
          {
            path: '/order',
            name: 'order',
            title: '套餐服务',
            routes: [
              {
                path: '/order',
                name: 'order',
                title: '套餐服务',
                component: './order/index',
              },
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
            path: '/reports',
            name: 'reports',
            title: '产检报告',
            routes: [
              {
                path: '/reports',
                redirect: '/reports/list',
              },
              {
                path: '/reports/list',
                name: 'reports list',
                title: '报告列表',
                component: './reports/BBSList',
              },
              {
                path: '/reports/preview',
                name: '预览',
                title: 'pdf预览',
                component: './reports/Preview',
              },
            ],
          },
          {
            path: '/weight',
            name: 'weight',
            title: '体重管理',
            routes: [
              {
                path: '/weight',
                redirect: '/weight/input',
              },
              {
                path: '/weight/input',
                name: 'weight input',
                title: '体重录入',
                component: './tools/weight/Input',
              },
              {
                path: '/weight/record',
                name: 'weight records',
                title: '体重记录',
                component: './tools/weight/Record',
              },
            ],
          },
          {
            path: '/webtest',
            name: 'webtest',
            title: 'h5支付',
            component: './webtest/index'
          }
        ],
      },
      { component: './404' },
    ],
  },
  { component: './404' },
];
