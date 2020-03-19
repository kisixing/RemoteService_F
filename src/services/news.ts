/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-18 21:18:25
 * @Description: 宣教、随访api
 */

import request from '@/utils/request';
import { stringify } from 'querystring';

export interface newsParamsType {
  type: string
  query: {
    page: number
    pageSize: number
  }
}
// type: string, query: newsParamsType
export async function getNews({ type, query }: newsParamsType) {
  return request(`/mock/api/news/${type}`, {
    data: query,
  });
}
