export const tabs = [
  { title: '体重', key: 'weight' },
  { title: '血压', key: 'blood-pressure' },
  { title: '血糖', key: 'blood-glucose' },
  { title: '血氧', key: 'blood-oxygen' },
  { title: '体温', key: 'temperature' },
];

// 血糖指标参数
const bloodGlucose = {
  EMPTY_MIN:3.9,EMPTY_MAX:6.1,
  EATING_MIN:3.9,EATING_MAX:7.8
}
// 血氧
const bloodOxygen = {
  NORMAL_MIN: 95,
  NORMAL_MAX: 100
}
// 血压
const bloodPressure = {
  SYS_MIN:90, SYS_MAX:139,
  DIA_MIN:50, DIA_MAX: 89
}
// 温度
const temperature = {
  NORMAL_MAX: 37, NORMAL_MIN: 36
}

const pulserate = {
  PULSE_MIN:60,PULSE_MAX:100
}

export const Range = {bloodGlucose,bloodOxygen,bloodPressure,temperature,pulserate}
