import request from '@/utils/request';

export async function getServicePackage() {
  
}

// 获取孕妇订单
export async function getServiceOrders({pregnancyId}:{pregnancyId: string}) {
  return request(`/api/serviceorders?pregnancyId.equals=${pregnancyId}`, {
    method: 'GET',
    getResponse: true
  })
};
