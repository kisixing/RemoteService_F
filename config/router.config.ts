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
  { path: '/example', title: '组件示例', component: './example' },
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
                component: './remote-service/package/index',
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
            path: '/apply',
            name: 'Apply',
            title: '胎监判图',
            routes: [
              {
                path: '/apply',
                name: 'Apply',
                title: '胎监判图',
                component: './remote-service/Apply',
              },
              {
                path: '/apply/useable',
                name: 'useable Apply',
                title: '可用胎监判图',
                // component: './remote-service/Apply'
              },
              {
                path: '/apply/unuseable',
                name: 'useable Apply',
                title: '过期胎监判图',
                // component: './remote-service/Apply'
              },
            ],
          },
          {
            path: '/pay',
            name: 'pay',
            title: '支付页',
            component: './remote-service/pay/index',
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
                path: '/consultation',
                name: 'consultation home',
                title: ' ',
                component: './consultation',
              },
              {
                path: '/consultation/doctor',
                name: 'doctor list',
                title: '专家咨询', // 在线复诊
                component: './consultation/doctors/List',
              },
              {
                path: '/consultation/doctor/:id',
                name: 'doctor detail',
                title: '专家详情', // 在线复诊
                component: './consultation/doctors/Detail',
              },
              {
                path: '/consultation/team/:id',
                name: 'doctor team',
                title: '团队',
                component: './consultation/team',
              },
            ],
          },
          {
            path: '/signs',
            name: 'signs',
            title: '体征管理',
            routes: [
              {
                path: '/signs',
                title: '',
                component: './tools/signs',
              },
              {
                path: '/signs/input',
                title: '录入',
                component: './tools/signs/InputTabBar',
              },
              {
                path: '/signs/record',
                title: '记录',
                component: './tools/signs/RecordsTabBar',
              },
              // 以下不常用，确保有单独的路由，便于后续扩展
              {
                path: '/signs/weight/input',
                name: 'weight input',
                title: '体重录入',
                component: './tools/weight/Input',
              },
              {
                path: '/signs/weight/record',
                name: 'weight records',
                title: '体重记录',
                component: './tools/weight/Record',
              },
              {
                path: '/signs/blood-pressure/input',
                name: 'blood pressure',
                title: '血压录入',
                component: './tools/blood-pressure/Input',
              },
              {
                path: '/signs/blood-pressure/record',
                name: 'blood pressure',
                title: '血压记录',
                component: './tools/blood-pressure/Record',
              },
              {
                path: '/signs/blood-glucose/input',
                name: 'blood-glucose input',
                title: '血糖录入',
                component: './tools/blood-glucose/Input',
              },
              {
                path: '/signs/blood-glucose/record',
                name: 'blood-glucose record',
                title: '血糖记录',
                component: './tools/blood-glucose/Record',
              },
              {
                path: '/signs/blood-oxygen/input',
                name: 'blood-oxygen input',
                title: '血氧录入',
                component: './tools/blood-oxygen/Input',
              },
              {
                path: '/signs/blood-oxygen/record',
                name: 'blood pressure',
                title: '血氧记录',
                component: './tools/blood-oxygen/Record',
              },
              {
                path: '/signs/blood-glucose/input',
                name: 'temperature input',
                title: '体温录入',
                component: './tools/temperature/Input',
              },
              {
                path: '/signs/temperature/record',
                name: 'temperature',
                title: '体温记录',
                component: './tools/temperature/Record',
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
