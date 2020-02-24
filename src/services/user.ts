/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-07 23:24:32
 * @Description: 登录、绑定页面的services api
 */

import request from '@/utils/request';

// 测试接口
export async function testApi() {
  return request('/test/api/users');
}

export interface authParamsType {
  code: string;
}
/**
 * 用户oauth授权
 * 根据页面code换取openid和系统用户唯一id
 * @param params
 * true  --> { openid: code/openId }
 * false --> { id: '系统用户唯一id', name: '姓名',status<array>: [true,true,false], ...rest }
 */
export async function mpauth(params: authParamsType) {
  return request('/api/mpauth', {
    method: 'POST',
    data: params,
  });
}

export interface bindParamsType {
  mobile: string | number;
  captcha: string | number;
  idType?: string;
  idNo: string | number;
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
  id: string,
  openId: string
}
/**
 * 在已经建档的情况下，选择一次孕册信息就行操作
 * @param params object 孕册id、就诊卡号openId
 */
export async function bindUserMp(params: bindMpParamsType) {
  return request('/api/bindusermp', {
    method: 'POST',
    data: params,
  });
}

export interface addYcParamsType {
  userName: string,
  gesmoc: string,
  mobile: string,
  IDNo:string,
  openId: string
}
/**
 * 新建建档（孕册）
 * @param params object
 */
export async function addYc(params: addYcParamsType) {
  return request('/api/addyc', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取验证码
 * @param mobile
 */
export async function getCaptcha(mobile: string) {
  return request(`/api/captcha?mobile=${mobile}`);
}
