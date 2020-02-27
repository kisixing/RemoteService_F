import request from '@/utils/request';

export async function getPackage() {
  return request('/api/servicepackages',{
    method: 'GET',
    getResponse: true
  })
};

export async function getPackageData() {
  return request('/api/products', {
    method: 'GET',
    getResponse: true
  })
};

export async function setPackage(data:any) {
  return request('/api/servicepackages',{
    method: 'PUT',
    data,
    getResponse: true
  })
}
