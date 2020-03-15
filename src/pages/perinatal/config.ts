/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-14 00:36:48
 * @Description:
 */

 const profession = [
   { label: '国家公务员', value: '国家公务员' },
   { label: '专业技术人员', value: '专业技术人员' },
   { label: '企业管理人员', value: '企业管理人员' },
   { label: '自由职业者', value: '自由职业者' },
   { label: '工人', value: '工人' },
   { label: '现役军人', value: '现役军人' },
   { label: '个体经营者', value: '个体经营者' },
   { label: '职员', value: '职员' },
   { label: '农民', value: '农民' },
   { label: '学生', value: '学生' },
   { label: '退（离）休人员', value: '退（离）休人员' },
   { label: '其他', value: '其他' },
 ];

 const status = [
   { label: '已婚', value: '已婚' },
   { label: '未婚', value: '未婚' },
   { label: '离异', value: '离异' },
   { label: '丧偶', value: '丧偶' },
 ];

 const illness = ['无', '异位妊娠', '葡萄糖等滋养细胞疾病', '胚胎停育', '胎儿畸形', '死胎', '死产', '不清楚'];

export const basic = {
  description: '基本信息',
  data: [
    {
      id: 'part-1',
      desc: '信息块1',
      children: [
        {
          id: 'username',
          label: '姓名',
          type: 'text-input',
          charactertype: 'text',
          required: true,
          placeholder: '请输入您的姓名',
        },
        {
          id: 'mobilephone',
          label: '手机号码',
          type: 'text-input',
          charactertype: 'phone',
          required: true,
        },
        {
          id: 'usermcno',
          label: '就诊卡号',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        },
        {
          id: 'yunci',
          label: '孕次',
          type: 'stepper-input',
          required: true,
          min: 0,
          max: 10,
        },
        {
          id: 'profession',
          label: '职业',
          type: 'picker',
          required: true,
          cols: 1,
          data: profession
        },
        {
          id: 'fmsj',
          label: '分娩时间',
          type: 'date-picker',
          required: true,
          mode: 'date', // 日期date,时间time,日期+时间datetime,年year,月month
          format: 'YYYY-MM-DD'
        },
        {
          id: 'remind',
          label: '开启消息提醒',
          type: 'switch',
          required: true,
        },
        {
          id: 'status',
          label: '婚姻状态',
          type: 'radio',
          required: true,
          data: status
        },
      ],
    },
    {
      id: 'part-2',
      desc: '信息块2',
      children: [
        {
          id: 'jibingshi1',
          label: '疾病史一',
          type: 'mix-picker',
          multiple: true,
          required: true,
          data: illness,
          // value: ['死胎', '死产', '其他疾病史一',]
        },
        {
          id: 'jibingshi2',
          label: '疾病史二',
          type: 'mix-picker',
          required: true,
          data: illness,
          // value: ['死胎', '其他疾病史二',]
        },
        {
          id: 'address',
          label: '居住地址',
          type: 'address-picker',
          required: true,
          // 街道数据库太大，暂时不用
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
        },
        {
          id: 'detailAddress',
          label: '详细居住地址',
          type: 'textarea-input',
          required: true,
        },
      ]
    },
    {
      id: 'part-3',
      desc: '信息块3',
      children: [
        {
          id: 'husername',
          label: '男方姓名',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'htelephone',
          label: '男方电话',
          type: 'text-input',
          charactertype: 'number',
          required: false,
        }
      ],
    },
  ],
};

export const pregnancy = {

};
