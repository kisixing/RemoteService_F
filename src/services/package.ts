import request from '@/utils/request';

export async function getPackage() {
  return request('/api/servicepackages',{
    method: 'GET',
    getResponse: true
  })
};
