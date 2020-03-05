import request from '@/utils/request';

export async function getPackage() {
  return request('/api/servicepackages',{
    method: 'GET',
    getResponse: true
  })
};

// 获取套餐详情
export async function getPackageData() {
  return request('/api/products', {
    method: 'GET',
    getResponse: true
  })
};

// 修改套餐 - 仅在调试时使用
export async function setPackage(data:any) {
  return request('/api/servicepackages',{
    method: 'PUT',
    data,
    getResponse: true
  })
}
