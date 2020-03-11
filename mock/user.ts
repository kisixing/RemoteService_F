import { Request, Response } from 'express';

/**
 *
 * @param req
 * @param res
 */
function mpauth(req: Request, res: Response) {
  const { code } = req.body;
  const dataSource = [
    {
      id: '20191001001',
      name: '李师师',
      gesweek: '2019-10-01',
      hospital: '广州妇幼保健医院',
      thumbnail: 'M3',
    },
    {
      id: '20191001002',
      name: '赵飞燕',
      gesweek: '2019-10-01',
      hospital: '省妇幼保健医院',
      thumbnail: 'M4',
    },
    {
      id: '20191001003',
      name: '甄姬',
      gesweek: '2019-10-01',
      hospital: '中山大学附属第一医院',
      thumbnail: 'M5',
    },
  ];
  const currentUser = dataSource.filter((e: any) => e.id === code)[0];
  if (currentUser) {
    return res.send({...currentUser});
  }
  return res.send({ openid: code });
}

function getCaptcha(req: Request, res: Response) {
  return res.json('xxx-xxx');
}

export default {
  'POST /mock/api/mpauth': mpauth,
  'POST /mock/api/captcha': getCaptcha,
};
