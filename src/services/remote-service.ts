import request from '@/utils/request';

export async function getDoctors() {
  return request('/mock/api/consultation/doctors');
}

interface CommentProps {
  doctorId?: string;
  teamId?: string;
}
export async function getComments(params: CommentProps) {
  return request('/mock/api/consultation/comments', {
    method: 'POST',
    data: params,
  });
}

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
  return request(
    `/api/packageorders?deviceId.specified=true&state.equals=2&pregnancyId.equals=${id}`,
  );
}

export async function getApplyPrice(type: string) {
  return request(`/api/ctgapplyfees?type.equals=${type}`);
}

export async function getPackages() {
  return request('/api/servicepackages');
};

export async function getPackage(id: string | number) {
  return request(`/api/servicepackages/${id}`);
};

/**
 * 获取产品详情
 * @param {string} id 产品id
 */
export async function getProduct(id: string) {
  return request(`/api/products/${id}`);
}

/**
 * 微信支付
 *
 * @export
 * @param {object} params
 * @returns
 */
export async function wechatPay(params: object) {
  return request('/api/servicepackages/wxpay', {
    method: 'POST',
    data: { ...params },
  });
}
