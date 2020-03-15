import request from '@/utils/request';

import moment from 'moment';

export async function getBloodGlucose({pregnancyId}: {pregnancyId:string}) {
  return request(`/api/blood-glucoses`,{
    method: 'POST',
    data: {pregnancyId: pregnancyId},
    getResponse: true
  })
}
