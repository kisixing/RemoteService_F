import mockjs from 'mockjs';
import { Request, Response } from 'express';

/**
 *
 * @param req
 * @param res
 */
function mpauth(req: Request, res: Response) {
  const { code } = req.body;
  const dataSource = [
    { id: '20191001001', name: '李师师', gesweek: '2019-10-01' },
    { id: '20191001002', name: '赵飞燕', gesweek: '2019-10-01' },
    { id: '20191001003', name: '甄姬', gesweek: '2019-10-01' }
  ];
  const currentUser = dataSource.filter((e: any) => e.id === code)[0];
  if (currentUser) {
    return res.send({...currentUser});
  }
  return res.send({ openid: code });
}

export default {
  'POST /api/mpauth': mpauth,
};
