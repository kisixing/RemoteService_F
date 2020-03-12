import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';
import { Request, Response } from 'express';

const { Random } = mockjs;

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

function doctors(req: Request, res: Response) {
  const {
    query: { page, pageSize },
  } = req;
  return res.json(
    mockjs.mock({
      desc: '在线医生',
      'data|10': [
        {
          id: '@id',
          name: '@cname',
          'position|1': ['主治医师', '副主任医师', '主任医师', '住院医师'],
          answerRate: Random.integer(0, 100) + '%',
          favorableRate: Random.integer(0, 100) + '%',
          inquiries: Random.integer(0, 100) + '%',
          content: '@cparagraph(1, 5)', // Random.cparagraph()
          thumbnail: '@image(100 x 100, @color, @word)', // Random.image('100x100', Random.color(), 'mock.js'),
          time: () => Random.date() + ' ' + Random.time(),
          'price|1': ['30', '9.9', '99.9', '198', '1000.1', '10000'],
          'replytime|1': ['2', '2.5', '6', '6.5', '12'],
        },
      ],
    }),
  );
}

function comments(req: Request, res: Response) {
  return res.json(
    mockjs.mock({
      desc: '患者评论',
      'data|5': [
        {
          id: '@id',
          name: '@cname',
          thumbnail: '',
          'rate|1': [1, 2, 2.5, 3, 3.5, 4, 4.5, 5],
          comment: '@cparagraph(1, 5)',
          time: () => Random.date() + ' ' + Random.time(),
        },
      ],
    }),
  );
}

export default delay({
  'POST /mock/api/mpauth': mpauth,
  'GET /mock/api/consultation/doctors': doctors,
  'POST /mock/api/consultation/comments': comments,
});
