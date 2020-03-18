import request from '@/utils/request';

export async function getServicePackage() {
  
}

// 获取孕妇购买订单
export async function getPackageOrders({pregnancyId}:{pregnancyId: string|number}) {
  return request(`/api/packageorders?pregnancyId.equals=${pregnancyId}`, {
    method:'GET',
    getResponse:true
  })
};

// 获取孕妇服务订单
export async function getServiceOrders({pregnancyId}: {pregnancyId: string|number}){
  return request(`/api/serviceorders?pregnancyId.equals=${pregnancyId}`,{
    method:'GET',
    getResponse:true
  })
}
