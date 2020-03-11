import request from '@/utils/request';

export async function getDoctors() {
  return request('/mock/api/consultation/doctors');
}

interface CommentProps { doctorId?: string, teamId?: string  }
export async function getComments(params: CommentProps) {
  return request('/mock/api/consultation/comments', {
    method: 'POST',
    data: params,
  });
}
