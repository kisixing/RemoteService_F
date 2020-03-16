import request from '@/utils/request';

import moment,{ Moment } from 'moment';

// 适用于 血糖 血氧 体温
interface SetProp{
  result: number,
  timestamp: Moment,
  pregnancy: {
    id: number
  }
}
// 血糖
export async function getBloodGlucose({pregnancyId}: {pregnancyId:string|number}) {
  return request(`/api/blood-glucoses?pregnancyId.equal=${pregnancyId}`,{
    method: 'GET',
    getResponse: true
  })
}
export async function setBloodGlucose(data: SetProp) {
  return request(`/api/blood-glucoses`,{
    method: 'POST',
    data,
    getResponse: true
  })
}

// 血氧
export async function getBloodOxygens({pregnancyId}: {pregnancyId:string|number}) {
  return request(`/api/blood-oxygens?pregnancyId.equal=${pregnancyId}`,{
    method: 'GET',
    getResponse: true
  })
}

export async function setBloodOxygens(data: SetProp) {
  return request(`/api/blood-oxygens`,{
    method: 'POST',
    data,
    getResponse: true
  })
}

// 体温
export async function getTemperatures({pregnancyId}: {pregnancyId:string|number}) {
  return request(`/api/temperatures?pregnancyId.equal=${pregnancyId}`,{
    method: 'GET',
    getResponse: true
  })
}

export async function setTemperatures(data: SetProp) {
  return request(`/api/temperatures`,{
    method: 'POST',
    data,
    getResponse: true
  })
}

interface SetBloodPressuresProp{
  systolic: number, diastolic: number,
  timestamp: Moment,
  pregnancyId: {
    id: number
  }
}

export async function getBloodPressures({pregnancyId}: {pregnancyId:string|number}) {
  return request(`api/blood-pressures?pregnancyId.equal=${pregnancyId}`,{
    method: 'GET',
    getResponse: true
  })
}

export async function setBloodPressures(data: SetBloodPressuresProp) {
  return request(`api/blood-pressures`,{
    method: 'POST',
    data,
    getResponse: true
  })
}
