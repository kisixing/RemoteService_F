/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-14 00:36:48
 * @Description:
 */

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
          placeholder: '请输入您的姓名'
        },
        {
          id: 'mobilephone',
          label: '手机号码',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'telephone',
          label: '固定电话',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'usermcno',
          label: '就诊卡号',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        }
      ]
    },
    {
      id: 'part-2',
      desc: '信息块2',
      children: [
        {
          id: 'telephone',
          label: '男方姓名',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'telephone',
          label: '男方电话',
          type: 'text-input',
          charactertype: 'number',
          required: false,
        },
        {
          id: 'telephone',
          label: '男方证件类型',
          type: 'text-input',
          required: true,
        },
        {
          id: 'telephone',
          label: '男方证件号码',
          type: 'text-input',
          charactertype: 'number',
          required: true,
        }
      ]
    }
  ]
};

export const pregnancy = {

};
