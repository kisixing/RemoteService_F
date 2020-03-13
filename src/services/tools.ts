import request from '@/utils/request';

export async function getBloodGlucose({pregnancyId}: {pregnancyId:string}) {
  return request(`/api/blood-glucoses`,{
    method: 'POST',
    data: {pregnancyId: pregnancyId},
    getResponse: true
  })
}
