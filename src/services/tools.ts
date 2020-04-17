import request from '@/utils/request';

import { Moment } from 'moment';

// 查询目标记录数量
interface GetRecordProp{
  type: string,
  pregnancyId:number|string
}
export async function getRecordNum(entity: GetRecordProp) {
  return request(`/api/${entity.type}/count?pregnancyId.equals=${entity.pregnancyId}`,{
    method: 'GET',
    getResponse: true
  })
}
// 
export interface GetProp{
  pregnancyId: number|string,
  page?:number,
  size?:number,
  sort?:string
}

// 适用于 血糖 血氧 体温 POST
export interface SetProp{
  result: number,
  timestamp: Moment|string,
  pregnancy: {
    id: number
  },
  period?: number,
  // 血氧
  pulserate?: number,
  // 血糖
  insulin?: boolean|null,
  insulinnote?: number,
  exercise?: string,
  diet?: string,
  status?:number,
  id?: number,
  // 数据来源
  src?: number
}
// 血糖
export async function getBloodGlucose(entity: GetProp) {
  return request(`/api/blood-glucoses?pregnancyId.equals=${entity.pregnancyId}&page=${entity.page}&size=${entity.size}&sort=${entity.sort}`,{
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
export async function editBloodGlucose(data: SetProp) {
  return request(`/api/blood-glucoses`,{
    method: 'PUT',
    data,
    getResponse: true
  })
}

// 血氧
export async function getBloodOxygens(entity: GetProp) {
  return request(`/api/blood-oxygens?pregnancyId.equals=${entity.pregnancyId}&page=${entity.page}&size=${entity.size}&sort=${entity.sort}`,{
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
export async function editBloodOxygens(data: SetProp) {
  return request(`/api/blood-oxygens`,{
    method: 'PUT',
    data,
    getResponse: true
  })
}

// 体温
export async function getTemperatures(entity:GetProp) {
  return request(`/api/temperatures?pregnancyId.equals=${entity.pregnancyId}&page=${entity.page}&size=${entity.size}&sort=${entity.sort}`,{
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

export async function editTemperatures(data: SetProp) {
  return request(`/api/temperatures`,{
    method: 'PUT',
    data,
    getResponse: true
  })
}

// 血压
interface SetBloodPressuresProp{
  systolic: number, diastolic: number,
  timestamp: Moment,
  pregnancy: {
    id: number
  },
  pulserate?: number,
  status?:number,
  id?:number
}

export async function getBloodPressures(entity:GetProp) {
  return request(`/api/blood-pressures?pregnancyId.equals=${entity.pregnancyId}&page=${entity.page}&size=${entity.size}&sort=${entity.sort}`,{
    method: 'GET',
    getResponse: true
  })
}

export async function setBloodPressures(data: SetBloodPressuresProp) {
  return request(`/api/blood-pressures`,{
    method: 'POST',
    data,
    getResponse: true
  })
}
export async function editBloodPressures(data: SetBloodPressuresProp) {
  return request(`/api/blood-pressures`,{
    method: 'PUT',
    data,
    getResponse: true
  })
}

// 体重
export async function getWeight(entity:GetProp){
  return request(`/api/weights?pregnancyId.equals=${entity.pregnancyId}`,{
    method: 'GET',
    getResponse: true
  })
}
export async function setWeight(data: SetProp){
  return request(`/api/weights`,{
    method: 'POST',
    data,
    getResponse: true
  })
}
export async function editWeight(data: SetProp){
  return request(`/api/weights`,{
    method: "PUT",
    data,
    getResponse: true
  })
}

/**
 * 胎动
 */
export async function setFetusMovement(data: SetProp){
  return request(`/api/fetal-movements`,{
    method: "POST",
    data,
    getResponse: true
  })
}
