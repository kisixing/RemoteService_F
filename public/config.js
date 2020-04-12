/*
 * @Description: 表单配置文件
 * @Author: Zhong Jun
 * @Date: 2020-04-02 16:52:31
 */

const nowTimeStamp = Date.now();
const minDate = new Date(nowTimeStamp - 1000 * 60 * 60 * 24 * 365);
const maxDate = new Date(nowTimeStamp + 1e7);

let areas = [
  { code: '11', name: '北京市' },
  { code: '12', name: '天津市' },
  { code: '13', name: '河北省' },
  { code: '14', name: '山西省' },
  { code: '15', name: '内蒙古自治区' },
  { code: '21', name: '辽宁省' },
  { code: '22', name: '吉林省' },
  { code: '23', name: '黑龙江省' },
  { code: '31', name: '上海市' },
  { code: '32', name: '江苏省' },
  { code: '33', name: '浙江省' },
  { code: '34', name: '安徽省' },
  { code: '35', name: '福建省' },
  { code: '36', name: '江西省' },
  { code: '37', name: '山东省' },
  { code: '41', name: '河南省' },
  { code: '42', name: '湖北省' },
  { code: '43', name: '湖南省' },
  { code: '44', name: '广东省' },
  { code: '45', name: '广西壮族自治区' },
  { code: '46', name: '海南省' },
  { code: '50', name: '重庆市' },
  { code: '51', name: '四川省' },
  { code: '52', name: '贵州省' },
  { code: '53', name: '云南省' },
  { code: '54', name: '西藏自治区' },
  { code: '61', name: '陕西省' },
  { code: '62', name: '甘肃省' },
  { code: '63', name: '青海省' },
  { code: '64', name: '宁夏回族自治区' },
  { code: '65', name: '新疆维吾尔自治区' },
  { code: '71', name: '台湾地区' },
  { code: '81', name: '香港特别行政区' },
  { code: '82', name: '澳门特别行政区' },
  { code: '91', name: '国外' },
];
areas = areas.map(e => ({ label: e.name, value: e.name }));

// 民族
const ethnics = [
  '汉族',
  '壮族',
  '回族',
  '满族',
  '土家族',
  '瑶族',
  '苗族',
  '侗族',
  '畲族',
  '蒙古族',
  '藏族',
  '维吾尔族',
  '彝族',
  '布依族',
  '朝鲜族',
  '白族',
  '哈尼族',
  '哈萨克族',
  '傣族',
  '黎族',
  '傈僳族',
  '佤族',
  '高山族',
  '拉祜族',
  '水族',
  '东乡族',
  '纳西族',
  '景颇族',
  '柯尔克孜族',
  '土族',
  '达斡尔族',
  '仫佬族',
  '羌族',
  '布朗族',
  '撒拉族',
  '毛南族',
  '仡佬族',
  '锡伯族',
  '阿昌族',
  '普米族',
  '塔吉克族',
  '怒族',
  '乌孜别克族',
  '俄罗斯族',
  '鄂温克族',
  '德昂族',
  '保安族',
  '裕固族',
  '京族',
  '塔塔尔族',
  '独龙族',
  '鄂伦春族',
  '赫哲族',
  '门巴族',
  '珞巴族',
  '基诺族',
  '其他',
].map(e => ({ label: e, value: e }));

// 职业种类
const profession = [
  '国家公务员',
  '专业技术人员',
  '企业管理人员',
  '自由职业者',
  '工人',
  '现役军人',
  '个体经营者',
  '职员',
  '农民',
  '学生',
  '退（离）休人员',
  '其他',
].map(e => ({ label: e, value: e }));

// 婚姻状态
const maritalstatus = [
  { label: '已婚', value: 0 },
  { label: '未婚', value: 1 },
  { label: '离异', value: 2 },
  { label: '丧偶', value: 3 },
  { label: '再婚', value: 4 },
];

const illness = [
  '无',
  '妊娠糖尿病',
  '糖尿病',
  '高血压',
  '甲亢',
  'G6PD',
  '肝炎',
  '肺结核',
  '肾炎',
  '风湿',
  '贫血',
  '地中海贫血',
  '癫痫',
  '心脏病',
  '肝脏疾病',
  '肾脏疾病',
];

// 证件类型
const IDType = [
  { label: '二代身份证', value: 0 },
  { label: '港澳台居民居住证', value: 4 },
  { label: '回乡证', value: 2 },
  { label: '台胞证', value: 3 },
  { label: '护照', value: 1 },
  { label: '其他', value: 5 },
];

const basic = {
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
          id: 'mobile',
          label: '手机号码',
          type: 'text-input',
          charactertype: 'phone',
          required: true,
        },
        {
          id: 'telephone',
          label: '固话',
          type: 'text-input',
          charactertype: 'tel',
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
          cols: 1,
          data: IDType,
          valueFormat: 'number',
        },
        {
          id: 'idNO',
          label: '证件号码',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'dob',
          label: '出生日期',
          type: 'date-picker',
          required: true,
          mode: 'date', // 日期date,时间time,日期+时间datetime,年year,月month
          format: 'YYYY-MM-DD', // 显示格式
          valueFormat: 'string', // 返回value值格式
          minDate: new Date(1970, 1, 1, 0, 0, 0),
          maxDate: new Date(),
        },
        {
          id: 'age',
          label: '年龄',
          type: 'text-input',
          charactertype: 'digit',
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
          required: true,
          cols: 1,
          data: areas,
          valueFormat: 'string', // string/array
        },
        {
          id: 'ethnic',
          label: '民族',
          type: 'picker',
          required: true,
          data: ethnics,
          cols: 1,
          valueFormat: 'string',
        },
        {
          id: 'occupation',
          label: '职业',
          type: 'picker',
          required: true,
          cols: 1,
          data: profession,
          valueFormat: 'string',
        },
        {
          id: 'maritalStatus',
          label: '婚姻状态',
          type: 'picker',
          cols: 1,
          required: true,
          data: maritalstatus,
          valueFormat: 'number',
        },
      ],
    },
    {
      id: 'part-3',
      desc: '男方基本信息',
      children: [
        {
          id: 'partnerName',
          label: '男方姓名',
          type: 'text-input',
          charactertype: 'text',
          required: true,
        },
        {
          id: 'partnerMobile',
          label: '男方电话',
          type: 'text-input',
          charactertype: 'phone',
          required: true,
        },
        {
          id: 'partnerIdType',
          label: '男方证件类型',
          type: 'picker',
          required: true,
          cols: 1,
          data: IDType,
          valueFormat: 'number',
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
          label: '男方出生日期',
          type: 'date-picker',
          required: true,
          mode: 'date',
          format: 'YYYY-MM-DD',
          minDate: new Date(1970, 1, 1, 0, 0, 0),
          maxDate: new Date(),
        },
        {
          id: 'partnerAge',
          label: '男方年龄',
          type: 'text-input',
          charactertype: 'digit',
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
          required: true,
          cols: 1,
          data: areas,
          valueFormat: 'string',
        },
        {
          id: 'partnerEthnic',
          label: '男方民族',
          type: 'picker',
          required: true,
          cols: 1,
          data: ethnics,
          valueFormat: 'string',
        },
        {
          id: 'partnerOccupation',
          label: '男方职业',
          type: 'picker',
          required: true,
          cols: 1,
          data: profession,
          valueFormat: 'string',
        },
      ],
    },
    {
      id: 'part-4',
      desc: '地址信息',
      children: [
        {
          id: 'permanentResidenceAddress',
          label: '户口地址',
          type: 'address-picker',
          valueFormat: 'string',
          required: true,
        },
        {
          id: 'permanentResidenceAddressDetail',
          label: '户口详细地址',
          type: 'textarea-input',
          required: true,
        },
        {
          id: 'residenceAddress',
          label: '居住地址',
          type: 'address-picker',
          valueFormat: 'string',
          required: true,
        },
        {
          id: 'residenceAddressDetail',
          label: '居住详细地址',
          type: 'textarea-input',
          required: true,
        },
        {
          id: 'postpartumAddress',
          label: '产休地址',
          type: 'textarea-input',
          required: true,
        },
      ],
    },
  ],
};

const pregnancy = {
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
          min: 1,
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
      ],
    },
    {
      id: 'part-2',
      desc: '信息块2',
      children: [
        {
          id: 'lmp',
          label: '末次月经',
          type: 'date-picker',
          required: true,
          disabled: true,
          mode: 'date', // 日期date,时间time,日期+时间datetime,年year,月month
          format: 'YYYY-MM-DD',
          minDate: minDate,
          maxDate: maxDate,
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
          format: 'YYYY-MM-DD',
        },
        {
          id: 'sureEdd',
          label: '修订预产期',
          type: 'date-picker',
          required: true,
          mode: 'date',
          format: 'YYYY-MM-DD',
        },
      ],
    },
    {
      id: 'part-3',
      desc: '信息块3',
      children: [
        {
          id: 'pregnancyWeight',
          label: '孕前体重',
          type: 'text-input',
          suffix: 'kg',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'weight',
          label: '现在体重',
          type: 'text-input',
          suffix: 'kg',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'height',
          label: '身高',
          type: 'text-input',
          suffix: 'cm',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'systolicPressure',
          label: '收缩压',
          type: 'text-input',
          suffix: 'mmHg',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'diastolicPressure',
          label: '舒张压',
          type: 'text-input',
          suffix: 'mmHg',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'pulse',
          label: '脉搏',
          type: 'text-input',
          suffix: '次/分',
          charactertype: 'digit',
          required: true,
        },
      ],
    },
    {
      id: 'MenstrualHistory',
      desc: '月经史',
      children: [
        {
          id: 'menarche',
          label: '初潮',
          type: 'text-input',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'menstrualCycle',
          label: '月经周期',
          type: 'text-input',
          suffix: '天',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'menstrualPeriod',
          label: '月经持续',
          type: 'text-input',
          suffix: '天',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'menstrualVolume', // radio-input
          label: '经量',
          type: 'radio',
          charactertype: 'string',
          required: true,
          options: ['多', '中', '少'].map(e => ({ label: e, value: e })),
        },
        {
          id: 'dysmenorrhea&dysmenorrheaNote',
          label: '是否痛经&痛经说明',
          type: 'radio-input',
          // value: { dysmenorrhea: true, dysmenorrheaNote: 'note' },
          props: [
            {
              id: 'dysmenorrhea',
              label: '是否痛经',
              required: true,
              options: [
                { label: '是', value: true },
                { label: '否', value: false },
              ],
            },
            {
              id: 'dysmenorrheaNote',
              label: '痛经说明',
              required: true,
              charactertype: 'text',
            },
          ],
        },
      ],
    },
    {
      id: 'PersonalProfile',
      desc: '个人情况',
      children: [
        {
          id: 'smoke&smokeNote',
          label: '嗜好-烟&烟量',
          type: 'radio-input',
          props: [
            {
              id: 'smoke',
              label: '嗜好-烟',
              required: true,
              options: [
                { label: '有', value: true },
                { label: '无', value: false },
              ],
            },
            {
              id: 'smokeNote',
              label: '烟量',
              required: true,
              charactertype: 'digit',
              suffix: '支/天',
            },
          ],
        },
        {
          id: 'alcohol&alcoholNote',
          label: '嗜好-酒&酒量',
          type: 'picker-input',
          props: [
            {
              id: 'alcohol',
              label: '嗜好-酒',
              type: 'mix-picker',
              valueFormat: 'string',
              placeholder: '请选择酒的种类',
              required: true,
              options: ['无', '白酒', '啤酒', '葡萄酒', '药酒'].map(e => ({ label: e, value: e })),
            },
            {
              id: 'alcoholNote',
              label: '酒量',
              type: 'text-input',
              required: true,
              charactertype: 'digit',
              suffix: '毫升/天',
            },
          ],
        },
        {
          id: 'ABO',
          label: 'ABO血型',
          type: 'radio',
          required: true,
          options: [
            { label: 'A型', value: 'A' },
            { label: 'B型', value: 'B' },
            { label: 'AB型', value: 'AB' },
            { label: 'O型', value: 'O' },
          ],
        },
        {
          id: 'RH',
          label: 'Rh血型',
          type: 'radio',
          required: true,
          options: [
            { label: '阳性', value: 1 },
            { label: '阴性', value: 0 },
          ],
        },
        {
          id: 'radioactivity&radioactivityNote',
          label: '接触放射性物质&放射性物质名称',
          type: 'picker-input',
          props: [
            {
              id: 'radioactivity',
              label: '接触放射性物质',
              type: 'radio',
              required: true,
              options: [
                { label: '是', value: true },
                { label: '否', value: false },
              ],
            },
            {
              id: 'radioactivityNote',
              label: '放射性物质名称',
              type: 'text-input',
              required: true,
              charactertype: 'text',
            },
          ],
        },
        {
          id: 'medicine&medicineNote',
          label: '近期是否吃药&药物名称',
          type: 'picker-input',
          props: [
            {
              id: 'medicine',
              label: '近期是否吃药',
              type: 'radio',
              required: true,
              options: [
                { label: '是', value: true },
                { label: '否', value: false },
              ],
            },
            {
              id: 'medicineNote',
              label: '药物名称',
              type: 'text-input',
              required: true,
              charactertype: 'text',
            },
          ],
        },
      ],
    },
    {
      id: 'PartnerProfile',
      desc: '丈夫情况',
      children: [
        {
          id: 'maritalYears',
          label: '结婚年数',
          suffix: '年',
          type: 'text-input',
          charactertype: 'digit',
          required: true,
        },
        {
          id: 'nearRelation',
          label: '是否近亲',
          type: 'radio',
          required: true,
          options: [
            { label: '是', value: true },
            { label: '否', value: false },
          ],
        },
        {
          id: 'partnerSmoke&partnerSmokeNote',
          label: '男方嗜好-烟&男方烟量',
          type: 'picker-input',
          props: [
            {
              id: 'partnerSmoke',
              label: '男方嗜好-烟',
              type: 'radio',
              required: true,
              options: [
                { label: '有', value: true },
                { label: '无', value: false },
              ],
            },
            {
              id: 'partnerSmokeNote',
              label: '男方烟量',
              type: 'text-input',
              required: true,
              charactertype: 'digit',
            },
          ],
        },
        {
          id: 'partnerAlcohol&partnerAlcoholNote',
          label: '男方嗜好-酒&男方饮酒量',
          type: 'picker-input',
          props: [
            {
              id: 'partnerAlcohol',
              label: '男方嗜好-烟',
              type: 'mix-picker',
              valueFormat: 'string',
              required: true,
              options: ['无', '白酒', '啤酒', '葡萄酒', '药酒'].map(e => ({ label: e, value: e })),
            },
            {
              id: 'partnerAlcoholNote',
              label: '男方饮酒量',
              type: 'text-input',
              required: true,
              charactertype: 'digit',
              suffix: '毫升/天',
            },
          ],
        },
        {
          id: 'partnerABO',
          label: '男方血型',
          type: 'radio',
          required: true,
          options: [
            { label: 'A型', value: 'A' },
            { label: 'B型', value: 'B' },
            { label: 'AB型', value: 'AB' },
            { label: 'O型', value: 'O' },
          ],
        },
        {
          id: 'partnerDisease',
          label: '男方疾病史',
          type: 'mix-picker',
          multiple: true,
          required: true,
          options: [
            '无',
            '高血压',
            '糖尿病',
            '心脏病',
            '肝脏疾病',
            '肾脏疾病',
            '脑梗',
            '脑出血',
            '癌症',
            '哮喘',
            '肺结核',
            '甲亢',
            '过敏性疾病',
            '癫痫病',
            '风湿',
            '贫血',
            '地中海贫血',
            '癫痫',
            '血友病',
            '高度近视',
          ].map(e => ({ label: e, value: e })),
        },
      ],
    },
    {
      id: 'part-6',
      desc: '疾病史、手术史、个人史、家族史',
      children: [
        {
          id: 'diseaseHistory',
          label: '疾病史',
          type: 'multiple-picker',
          required: true,
          disabled: false,
          options: [
            { label: '高血压', value: 'hypertension' },
            { label: '肾病', value: 'nephropathy' },
            { label: '呼吸系统疾病', value: 'respiratoryDisease' },
            { label: '胃病', value: 'gastroDisease' },
            { label: '肝病', value: 'hepaticDisease' },
            { label: '癫痫', value: 'epilepsy' },
            { label: '心脏病', value: 'cardiacDisease' },
            { label: '内分泌病', value: 'endocrineDisease' },
            { label: '甲状腺', value: 'thyroidDisease' },
            { label: '血液病', value: 'hematopathy' },
            { label: '心理疾病', value: 'mentalDisease' },
            { label: '糖尿病', value: 'diabetes' },
            { label: '其他', value: 'other' },
          ],
        },
        {
          id: 'allergyHistory',
          label: '过敏史',
          type: 'multiple-picker',
          required: true,
          options: [
            { label: '青霉素', value: 'penicillin' },
            { label: '头孢', value: 'cephalosporin' },
            { label: '磺胺类', value: 'sulfa' },
            { label: '酒精', value: 'alcohol' },
            { label: '食物', value: 'food' },
            { label: '其他', value: 'other' },
          ],
        },
        {
          id: 'familyHistory',
          label: '家庭史',
          type: 'multiple-picker',
          required: true,
          options: [
            { label: '高血压', value: 'hypertension' },
            { label: '肾病', value: 'nephropathy' },
            { label: '呼吸系统疾病', value: 'respiratoryDisease' },
            { label: '胃病', value: 'gastroDisease' },
            { label: '肝病', value: 'hepaticDisease' },
            { label: '癫痫', value: 'epilepsy' },
            { label: '心脏病', value: 'cardiacDisease' },
            { label: '内分泌病', value: 'endocrineDisease' },
            { label: '甲状腺', value: 'thyroidDisease' },
            { label: '血液病', value: 'hematopathy' },
            { label: '心理疾病', value: 'mentalDisease' },
            { label: '糖尿病', value: 'diabetes' },
            { label: '其他', value: 'other' },
          ],
        },
        {
          id: 'procedureHistory',
          label: '手术史',
          type: 'multiple-picker',
          required: true,
          options: [
            { label: '子宫手术', value: 'uterus' },
            { label: '卵巢手术', value: 'ovaries' },
            { label: '甲状腺手术', value: 'thyroid' },
            { label: '其他', value: 'other' },
          ],
        },
      ],
    },
  ],
};

const history = {
  description: '孕产史信息',
  data: [
    {
      id: 'part-6',
      desc: 'part-6',
      children: [
        {
          id: 'gravidityindex',
          label: '孕次',
          type: 'stepper-input',
          required: true,
          min: 1,
          max: 10,
        },
        {
          id: 'deliveryTime',
          label: '妊娠终止时间',
          type: 'date-picker',
          required: true,
          mode: 'date',
          format: 'YYYY-MM-DD',
        },
        {
          id: 'complication',
          label: '并发症',
          type: 'mix-picker',
          multiple: true,
          required: true,
          options: [
            '无',
            '妊娠期高血压',
            '妊娠期糖尿病',
            '前置胎盘',
            '巨大儿',
            '妊娠期肝内胆汁淤积症',
            '不记得',
          ].map(e => ({ label: e, value: e })),
        },
        {
          id: 'isBirth',
          label: '是否分娩',
          type: 'radio',
          required: true,
          options: [
            { label: '是', value: true },
            { label: '否', value: false },
          ],
        },
        {
          id: 'hospital',
          label: '分娩医院',
          type: 'text-input',
          charactertype: 'text',
          required: true,
          hide: true,
        },
        {
          id: 'gestationalWeek',
          label: '分娩孕周',
          type: 'text-input',
          charactertype: 'text',
          required: true,
          hide: true,
        },
        {
          id: 'fetalcount',
          label: '胎数',
          type: 'stepper-input',
          required: true,
          min: 1,
          max: 6,
          hide: true,
        },
        {
          id: 'abortion',
          label: '流产方式',
          type: 'picker',
          required: true,
          hide: true,
          cols: 1,
          data: ['自然', '人工', '引产', '生化', '胎停'].map(e => ({ label: e, value: e })),
        },
        {
          id: 'currettage',
          label: '清宫',
          type: 'radio',
          required: true,
          hide: true,
          options: [
            { label: '有', value: true },
            { label: '无', value: false },
          ],
        },
        {
          id: 'unhealth',
          label: '不良生育史',
          type: 'picker',
          required: true,
          hide: true,
          cols: 1,
          data: [
            '异位妊娠',
            '葡萄糖等滋养细胞疾病',
            '胚胎停育',
            '胎儿畸形',
            '死胎',
            '死产',
            '不清楚',
          ].map(e => ({ label: e, value: e })),
        },
        {
          id: 'deliveryWay',
          label: '分娩方式',
          type: 'picker',
          required: true,
          hide: true,
          cols: 1,
          data: ['顺产', '剖宫产', '吸引', '钳产', '臀助产'].map(e => ({ label: e, value: e })),
        },
        {
          id: 'puerperalFever',
          label: '产溽热',
          type: 'radio',
          required: true,
          hide: true,
          options: [
            { label: '有', value: true },
            { label: '无', value: false },
          ],
        },
        {
          id: 'hemorrhage',
          label: '产后出血',
          type: 'radio',
          required: true,
          hide: true,
          options: [
            { label: '有', value: true },
            { label: '无', value: false },
          ],
        },
        {
          id: 'fetus',
          label: '胎儿信息',
          type: 'fetus',
          required: true,
          hide: true,
          data: [
            {
              id: 'childGender',
              label: '胎儿性别',
              type: 'radio',
              required: true,
              options: [
                { label: '男', value: 0 },
                { label: '女', value: 1 },
              ],
            },
            {
              id: 'neonateWeight',
              label: '新生儿体重',
              suffix: 'kg',
              type: 'text-input',
              charactertype: 'digit',
              required: true,
            },
            {
              id: 'childLiving',
              label: '新生儿当前状况',
              type: 'radio',
              required: true,
              options: [
                { label: '健在', value: 1 },
                { label: '死亡', value: 0 },
              ],
            },
            {
              id: 'childDeathNote',
              label: '死亡原因',
              type: 'text-input',
              charactertype: 'text',
              required: true,
              hide: true,
            },
          ],
        },
      ],
    },
  ],
};

const ENTRANCE = [
  {
    key: '1',
    label: '围产档案',
    icon: 'i1.png',
    route: '/perinatal',
    color: 'linear-gradient(-45deg, #FFBFD9 0%, #FF6B70 100%)',
  },
  {
    key: '4',
    label: '套餐服务',
    icon: 'i7.png',
    route: '',
    color: 'linear-gradient(-45deg, #FFBA8D 0%, #FF7D34 100%)',
  },
  {
    key: '3',
    label: '远程监护',
    icon: 'i8.png',
    route: '/packages',
    color: 'linear-gradient(-45deg, #3BF7FF 0%, #00B9FF 100%)',
  },
  {
    key: '88',
    label: '我的订单',
    icon: 'i4.png',
    route: '/orders',
    color: '',
  },
  {
    key: '8',
    label: '在线咨询',
    icon: 'i3.png',
    route: '/consultation',
    color: '',
  },
  {
    key: '5',
    label: '产检本',
    icon: 'i6.png',
    route: '/reports/preview', // '/reports',
    color: 'linear-gradient(-45deg, #FFC4EF 0%, #FF445B 100%)',
  },
  {
    key: '6',
    label: '孕妇学校',
    icon: 'i5.png',
    route: '', // '/school?type=article',
    color: 'linear-gradient(-45deg, #FFC4EF 0%, #FF445B 100%)',
  },
  {
    key: '7',
    label: '随访记录',
    icon: 'i1.png',
    route: '',
    color: 'linear-gradient(-45deg, #FFC4EF 0%, #FF445B 100%)',
  },
  {
    key: '2',
    label: '产检记录',
    icon: 'i2.png',
    route: '',
    color: 'linear-gradient(-45deg, #FFD52B 0%, #FFA002 100%)',
  },
];

const TOOLS = [
  {
    key: '0',
    label: '体征管理',
    icon: 'i000.png',
    route: '/signs',
  },
  {
    key: '1',
    label: '体重管理',
    icon: 'i001.png',
    route: '/signs/weight/input',
  },
  // {
  //   key: '2',
  //   label: '血糖管理',
  //   icon: 'i002.png',
  //   route: '',
  // },
  // {
  //   key: '3',
  //   label: '血压管理',
  //   icon: 'i007.png',
  //   route: '',
  // },
  {
    key: '4',
    label: '胎动计数',
    icon: 'i003.png',
    route: '/fetusmovement',
  },
  {
    key: '5',
    label: '我的收藏',
    icon: 'i004.png',
    route: '',
  },
  {
    key: '6',
    label: '我的提醒',
    icon: 'i005.png',
    route: '',
  },
  // {
  //   key: '7',
  //   label: '其他',
  //   icon: 'i006.png',
  //   route: '',
  // },
  // {
  //   key: '8',
  //   label: '其他',
  //   icon: 'i008.png',
  //   route: '/example',
  // },
];

window.configuration = {
  basic: basic,
  pregnancy: pregnancy,
  history: history,
  // 主入口
  mains: ENTRANCE,
  // 工具栏入口
  tools: TOOLS,
  // 建档时是否进行顺序控制
  sequentialControl: false,
  // 孕产史是否根据本孕信息的孕次数量自动生成列表
  autoMapPregnancyHistory: false,
};
