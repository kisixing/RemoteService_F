/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-08 15:19:29
 * @Description: 基本
 */

import request from '@/utils/request';

export interface newsParamsType {
  page: number
  pageSize: number
}
export async function getNews(type: string, query: newsParamsType) {
  return request(`/api/news/${type}`, {
    data: query,
  });
}



