export interface PACKAGE_LIST_ITEM {
  key:  string,
  name: string,
  host: string,
  price: number,
  marking?: string,
  picUrl: string
};
export const PACKAGE_LIST:Array<PACKAGE_LIST_ITEM> = [
  {key: "0001", name: "本孕期胎监套餐", host: "复旦大学附属妇产科医院", price: 5000, marking: "单胎", picUrl: require('../../assets/order/packagepic1.png')},
  {key: "0002", name: "本孕期胎监套餐", host: "复旦大学附属妇产科医院", price: 5000, marking: "多胎", picUrl: require('../../assets/order/packagepic1.png')},
  {key: "0003", name: "胎监1个月套餐", host: "复旦大学附属妇产科医院", price: 2000, marking: "多胎" ,picUrl: require('../../assets/order/packagepic2.png')},
  {key: "0004", name: "在线咨询服务", host: "复旦大学附属妇产科医院", price: 200, marking: "", picUrl: require('../../assets/order/packagepic0.png')},
];

interface PACKAGE_DETAIL_OBJ {
  serviceName: string, count: string, remark: string, icon:string
}

interface CHARACTER_OBJ {
  title: string, icon: string, description: string
}
interface PROCESS {
  title: string, description: string
}


export interface PACKAGE_CONTENT {
  key: string, name: string, host: string, price: number, marking?: string,picUrl: string
  packageDetail: Array<PACKAGE_DETAIL_OBJ>,
  introduction:{
    character: Array<CHARACTER_OBJ>,
    process: Array<PROCESS>,
    deviceDescription: string
  }
}

export const packageContent:Array<PACKAGE_CONTENT> = [
  {
    key: "0001",
    name: "本孕期胎监套餐",
    host: "复旦大学附属妇产科医院",
    price: 5000,
    marking: "单胎",
    picUrl: require('../../assets/order/packagepic1.png'),
    packageDetail: [
      {serviceName: '胎监判断服务', count: '6次', remark: '', icon:''},
      {serviceName: '民用版单胎胎心监护设备', count: '1个', remark: '租用', icon:''},
      {serviceName: '民用版单胎胎心监护设备', count: '1个', remark: '租用', icon:''},
      {serviceName: '民用版单胎胎心监护设备', count: '1个', remark: '租用', icon:''}
    ],
    introduction: {
      character: [
        {title: '居家轻松监护', icon: '', description: '随时随地|穿戴方便|操作简洁'},
        {title: '穿戴舒适简便', icon: '', description: '人性化设计|柔软舒适'},
        {title: '不发射超声波', icon: '', description: '摒弃超声多普勒|给予可靠监护'},
      ],
      process: [
        {title: '搭配设备', description: '使用固定带上的硅胶卡件固定胎心率探头和宫缩探头.固定带环绕腰腹部一周,于右侧固定好并调节长度以探头紧密贴合皮肤为宜'},
        {title: '启动设备 开始监护', description: '打开设备电源开关,打开手机蓝牙,连接设备后,开始监测'},
        {title: '胎心监测', description: '监护过程中，如有异常情况，支持立即停止/调节音量'},
        {title: '监测完成  咨询专家', description: '监测完成后,点击医生判断即可提交报告给医生,判读完成提醒,在历史记录页或我的问诊中查询医生判读结果'}
      ],
      deviceDescription: '指示灯闪烁时，可显示如下主机工作状态： 启动成功（绿和蓝灯闪烁） 监测中（绿灯向同一个方向循环滚动） 正在充电（橙灯常亮） 充电完成（绿灯常亮） 电池电量低（橙灯闪烁） 蓝牙未连接（蓝色闪烁）'
    }
  },
]
