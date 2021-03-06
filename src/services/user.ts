/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-07 23:24:32
 * @Description: 登录、绑定页面的services api
 */

import request from '@/utils/request';

// 测试接口
export async function testApi() {
  return request('/test/api/users', {
    getResponse: true,
  });
}

export interface authParamsType {
  code: string
}
/**
 * 用户oauth授权
 * 根据页面code换取openid和系统用户唯一id
 * @param params
 * true  --> { openid: code/openId }
 * false --> { id: '系统用户唯一id', name: '姓名',status<array>: [true,true,false], ...rest }
 */
export async function mpauth(params: authParamsType) {
  return request('/api/mplogin', {
    method: 'POST',
    headers: {
      Authorization: '',
    },
    getResponse: true,
    data: params,
  });
}

export interface bindParamsType {
  mobile: string | number
  captcha: string | number
  idType?: string
  idNo: string | number
}

/**
 * 登录页 查询
 * 根据证件IDNo获取该孕妇在该医院所有的孕次记录<array>
 * @param params object 返回edd最近的一条记录prengnancy记录
 */
export async function bindUser(params: bindParamsType) {
  return request('/api/mpbind', {
    method: 'POST',
    data: params,
  });
}

export interface bindMpParamsType {
  id: string
  openId: string
}
/**
 * 在已经建档的情况下，选择一次孕册信息就行操作
 * @param params object 孕册id、就诊卡号openId
 */
export async function bindUserMp(params: bindMpParamsType) {
  return request('/api/pregnancies', {
    method: 'PUT',
    data: params,
  });
}

/**
 * 获取验证码
 * @param mobile
 */
export async function getCaptcha(params: object) {
  return request('/api/captcha', {
    method: 'POST',
    data: params,
  });
}

export interface newYcParamsType {
  userName: string
  gesmoc: string
  mobile: string
  IDNo:string
  openId: string
}
/**
 * 新建建档（孕册）
 * @param params object
 */
export async function newPregnancy(params: newYcParamsType) {
  return request('/api/pregnancies', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取孕册信息
 *
 * @export
 * @param {(string | number)} id 孕册id
 * @returns 孕册所有信息
 */
export async function getPregnancy(id: string | number) {
  return request(`/api/pregnancies/${id}`);
}

/**
 * 保存孕册信息
 *
 * @export
 * @param {*} params 孕册参数
 * @returns
 */
export async function updatePregnancy(params: any) {
  return request('/api/pregnancies', {
    method: 'PUT',
    data: params,
  });
}
