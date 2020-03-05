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
              // {
              //   path: '/perinatal',
              //   redirect: '/perinatal/list',
              // },
              {
                path: '/perinatal',
                name: 'perinatal list',
                title: '列表',
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
            path: '/orders',
            name: 'my order',
            title: '',
            routes: [
              {
                path: '/orders',
                name: 'order list',
                title: '我的订单',
                component: './remote-service/order/index',
              },
              {
                path: '/orders/detail', // 考虑动态路由
                name: 'order detail',
                title: '订单详情',
                component: './remote-service/order/detail',
              },
            ],
          },
          {
            path: '/packages',
            name: 'packages services',
            title: '',
            routes: [
              {
                path: '/packages',
                name: 'packages list',
                title: '套餐服务',
                component: './remote-service/package',
              },
              {
                path: '/packages/detail', // 考虑动态路由
                name: 'package detail',
                title: '套餐详情',
                component: './remote-service/package/Detail',
              },
            ],
          },
          {
            path: '/pay',
            name: 'pay',
            title: '支付页',
            component: './remote-service/pay/index'
          },
          {
            path: '/reports',
            name: 'reports',
            title: '产检报告',
            routes: [
              // {
              //   path: '/reports',
              //   redirect: '/reports/list',
              // },
              {
                path: '/reports',
                name: 'reports list',
                title: '列表',
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
            path: '/consultation',
            name: 'online consultation',
            title: '在线咨询',
            routes: [
              {
                path: '/consultation/',
                name: 'doctor list',
                title: '',
                component: './consultation/DoctorList',
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
            component: './webtest/index',
          },
        ],
      },
      { component: './404' },
    ],
  },
  { component: './404' },
];
