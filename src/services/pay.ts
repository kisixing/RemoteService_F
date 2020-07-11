import request from '@/utils/request';

// 请求服务器 获取appid等信息
export async function wxpay(data: object) {
  return request.post('/api/servicepackages/wxpay',{ data: data });
}

export async function webpay(data: object) {
  return request.post('/api/serviceorders/wxpay',{ data: data });
}

export async function alipay(data: object, headers?: any) {
  return request.post('/api/servicepackages/alipay',{ data: data, headers });
}
