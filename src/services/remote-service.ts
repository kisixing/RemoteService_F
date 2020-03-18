import request from '@/utils/request';

/**
 *
 * 判图接口
 * @export
 * @param {object} params - body参数 { pregnancyid, packageorderid, visitid }
 * @returns
 */
export async function CTGApply(params: object) {
  return request('/api/serviceorders/ctg-apply', {
    method: 'POST',
    data: params,
  });
}

export async function getPackageOrders(id: string) {
  return request(`/api/packageorders?deviceId.specified=true&pregnancyId.equals=${id}`);
}

export async function getApplyPrice(type: string) {
  return request(`/api/ctgapplyfees?type.equals=${type}`);
}
