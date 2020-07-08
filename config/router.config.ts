export default [
  // 无用户验证页面
  {
    path: '/user',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', title: '登录', component: './user/Login' },
      { path: '/user/loginWithMobile', name: 'login with mobile', title: '手机登录', component: './user/LoginByMobile' },
      { path: '/user/register', name: 'register', title: '用户建档', component: './user/Register' },
      { component: './404' },
    ],
  },
  {
    path: '/consultation',
    component: '../layouts/BlankLayout',
    title: '在线咨询',
    routes: [
      {
        path: '/consultation',
        name: 'consultation home',
        title: '首页',
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
      {
        path: '/consultation/consulting-details',
        name: 'consulting details input',
        title: '我要咨询',
        component: './consultation/chats/ConsultingDetails',
      },
      {
        path: '/consultation/payment-page',
        name: 'payment-page',
        title: '订单支付',
        component: './consultation/chats/PaymentPage',
      },
      {
        path: '/consultation/chat/:id',
        name: 'chat view',
        title: '问诊详情',
        component: './consultation/chats/$id',
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
  { path: '/example', title: '组件示例', component: './example' },
  // user securit verification
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    // Routes: ['src/layouts/Authorized'],
    routes: [
      {
        path: '/',
        name: 'homepage',
        title: '首页',
        component: './home',
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
            component: './remote-service/order',
          },
          {
            path: '/orders/detail', // 考虑动态路由
            name: 'order detail',
            title: '订单详情',
            component: './remote-service/order/detail',
          },
          { component: './404' },
        ],
      },
      {
        path: '/perinatal',
        name: 'perinatal',
        title: '建档',
        routes: [
          {
            path: '/perinatal',
            redirect: '/perinatal/list',
          },
          {
            path: '/perinatal/list',
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
          {
            patn: '/packages/payment',
            name: 'package pay',
            title: '套餐支付',
            component: './remote-service/package/PackagePay',
          },
          { component: './404' },
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
            component: './remote-service/apply',
          },
          {
            path: '/apply/result',
            name: 'useable Apply',
            title: '判图完成',
            component: './remote-service/apply/Result',
          },
          {
            path: '/apply/payResult',
            name: 'pay result',
            title: '',
            // component: './remote-service/apply/payResult',
          },
          { component: './404' },
        ],
      },
      {
        path: '/signs',
        name: 'Sign management module',
        title: '体征管理',
        routes: [
          {
            path: '/signs',
            title: '判断设备绑定',
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
            path: '/signs/temperature/input',
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
        path: '/fetus-movement',
        name: 'fetal movement counting',
        title: '胎动计数',
        component: './tools/fetus-movement',
      },
      {
        path: '/reports',
        name: 'reports',
        title: '产检本',
        routes: [
          {
            path: '/reports',
            name: 'reports list',
            title: '列表',
            component: './reports/BBSList',
          },
          {
            path: '/reports/preview',
            name: 'preview',
            title: '预览',
            component: './reports/Preview',
          },
          { component: './404' },
        ],
      },
    ],
  },
  { component: './404' },
];
