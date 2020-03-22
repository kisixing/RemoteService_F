/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-14 00:36:48
 * @Description:
 */

// 普通数组转对象数组 如['国家公务员'] --> [{ label: '国家公务员', value: '国家公务员' }]
const arrayToObject = (data: string[]) => {
  return { label: data, value: data };
}

// 职业种类
const profession = arrayToObject(['国家公务员', '专业技术人员', '企业管理人员', '自由职业者', '工人', '现役军人', '个体经营者', '职员', '农民', '学生', '退（离）休人员', '其他']);

// 婚姻状态
const maritalstatus = arrayToObject(['已婚', '未婚', '离异', '丧偶']);

// 证件类型
const IDType = [
  { label: '二代身份证', value: '0' },
  { label: '港澳台居民居住证', value: '4'},
  { label: '回乡证', value: '2'},
  { label: '台胞证', value: '3'},
  { label: '护照', value: '1'},
  { label: '其他', value: '5' },
];

const illness = ['无', '异位妊娠', '葡萄糖等滋养细胞疾病', '胚胎停育', '胎儿畸形', '死胎', '死产', '不清楚'];

export const basic = {
  description: '基本信息',
  data: [
    {
      id: 'part-1',
      desc: '孕妇个人基本信息1',
      children: [
        {
          id: 'name',
          label: '姓名',
          type: 'text-input',
          charactertype: 'text',
          required: true,
          placeholder: '请输入您的姓名',
        },
        {
          id: 'telephone',
          label: '手机号码',
          type: 'text-input',
          charactertype: 'phone',
          required: true,
        },
        {
          id: 'workPhone',
          label: '固话',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'cardNO',
          label: '就诊卡号',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'zhunshengNO',
          label: '准生证号',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
      ],
    },
    {
      id: 'part-2',
      desc: '孕妇个人基本信息2',
      children: [
        {
          id: 'idType',
          label: '证件类型',
          type: 'picker',
          required: true,
          data: IDType
        },
        {
          id: 'idNO',
          label: '证件号码',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'bob',
          label: '生日',
          type: 'date-picker',
          required: true,
          mode: 'date', // 日期date,时间time,日期+时间datetime,年year,月month
          format: 'YYYY-MM-DD'
        },
        {
          id: 'age',
          label: '年龄',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
        {
          id: 'nationality',
          label: '国籍',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'nativeplace',
          label: '籍贯',
          type: 'picker',
          addressPicker: true,
          required: true,
          cols: 2,
        },
        {
          id: 'ethnic',
          label: '民族',
          type: 'picker',
          required: true,
          data: IDType
        },
        {
          id: 'occupation',
          label: '职业',
          type: 'picker',
          required: true,
          cols: 1,
          data: profession
        },
        {
          id: 'maritalStatus',
          label: '婚姻状态',
          type: 'radio-picker',
          required: true,
          data: maritalstatus
        },
      ]
    },
    {
      id: 'part-3',
      desc: '伴侣基本信息',
      children: [
        {
          id: 'partnerName',
          label: '男方姓名',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'partnerTelephone',
          label: '男方电话',
          type: 'text-input',
          charactertype: 'phone',
          required: false,
        },
        {
          id: 'partnerIdType',
          label: '男方证件类型',
          type: 'picker',
          required: true,
          data: IDType
        },
        {
          id: 'partnerIdNO',
          label: '男方证件号码',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'partnerDob',
          label: '男方生日',
          type: 'date-picker',
          required: true,
          mode: 'date',
          format: 'YYYY-MM-DD'
        },
        {
          id: 'partnerAage',
          label: '男方年龄',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
        {
          id: 'partnerNationality',
          label: '男方国籍',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'partnerNativeplace',
          label: '男方籍贯',
          type: 'picker',
          addressPicker: true,
          required: true,
          cols: 2,
        },
        {
          id: 'partnerEthnic',
          label: '男方民族',
          type: 'picker',
          required: true,
          data: IDType
        },
        {
          id: 'partnerOccupation',
          label: '男方职业',
          type: 'picker',
          required: true,
          cols: 1,
          data: profession
        },
      ]
    },
    {
      id: 'part-4',
      desc: '地址信息',
      children: [
        {
          id: 'registeredAddress',
          label: '户口地址',
          type: 'address-picker',
          required: true,
        },
        {
          id: 'registeredAddressDetail',
          label: '详细户口地址',
          type: 'textarea-input',
          required: true,
        },
        {
          id: 'residenceAddress',
          label: '居住地址',
          type: 'address-picker',
          required: true,
        },
        {
          id: 'residenceAddressDetail',
          label: '详细居住地址',
          type: 'textarea-input',
          required: true,
        },
        {
          id: 'postpartumAddress',
          label: '产休地址',
          type: 'textarea-input',
          required: true,
        },
      ]
    },
  ],
};

export const pregnancy = {
  description: '本孕信息',
  data: [
    {
      id: 'part-1',
      desc: '信息块1',
      children: [
        {
          id: 'gravidity',
          label: '孕次',
          type: 'stepper-input',
          required: true,
          min: 0,
          max: 10,
        },
        {
          id: 'parity',
          label: '产次',
          type: 'stepper-input',
          required: true,
          min: 0,
          max: 10,
        },
        {
          id: 'lmp',
          label: '末次月经',
          type: 'date-picker',
          required: true,
          mode: 'date', // 日期date,时间time,日期+时间datetime,年year,月month
          format: 'YYYY-MM-DD'
        },
        {
          id: 'gestationalWeek',
          label: '孕周',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'edd',
          label: '预产期',
          type: 'date-picker',
          required: true,
          mode: 'date',
          format: 'YYYY-MM-DD'
        },
        {
          id: 'sureEdd',
          label: '修订预产期',
          type: 'date-picker',
          required: true,
          mode: 'date',
          format: 'YYYY-MM-DD'
        },
      ]
    },
    {
      id: 'part-1',
      desc: '信息块1',
      children: [
        {
          id: 'pregnancyWeight',
          label: '孕前体重',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
        {
          id: 'weight',
          label: '现在体重',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
        {
          id: 'height',
          label: '身高',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
        {
          id: 'systolicPressure',
          label: '收缩压',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
        {
          id: ' diastolicPressure',
          label: '舒张压',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
        {
          id: 'pulse',
          label: '脉搏',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
      ]
    },
    {
      id: 'part-1',
      desc: '信息块1',
      children: [
        {
          id: 'jibingshi1',
          label: '疾病史一',
          type: 'mix-picker',
          multiple: true,
          required: true,
          data: illness,
        },
        {
          id: 'jibingshi2',
          label: '疾病史二',
          type: 'mix-picker',
          required: true,
          data: illness,
        },
        {
          id: 'address',
          label: '居住地址',
          type: 'address-picker',
          required: true,
        },
        {
          id: 'address1',
          label: '省市区',
          type: 'picker',
          addressPicker: true,
          required: true,
          cols: 3,
        },
        {
          id: 'address2',
          label: '省市',
          type: 'picker',
          addressPicker: true,
          required: true,
          cols: 2,
        }
      ]
    },
    {
      id: 'part-2',
      desc: '信息块2',
      children: [
        {
          id: 'remind',
          label: '开启消息提醒',
          type: 'switch',
          required: true,
        },
      ],
    },
  ]
};
