import request from '@/utils/request';

// 请求服务器 获取appid等信息
export async function wxpay(data: object) {
  console.log(data);
  return request.post('/api/servicepackages/wxpay',{data: data});
}
