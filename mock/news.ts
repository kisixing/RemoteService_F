/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-18 20:36:55
 * @Description: 宣教、文章、视频推送、今日知识、孕妇学校
 */

import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';
import { Request, Response } from 'express';

const { Random } = mockjs;

export default delay({
  'GET /api/news/personal': (req: Request, res: Response) => {
    return res.json(mockjs.mock({
      'desc': '个性化推送',
      'data|5': [
        {
          'id': '@id',
          'type|1': ['article', 'video'],
          'likenums|0-100': 1,
          'isLike|1-2': true,
          'viewnums|40-500': 1,
          'url|1': ['https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png', 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png', 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png', '', ''],
          'title': '@ctitle',
          'brief': '@cparagraph(1, 5)', // Random.cparagraph()
          'thumbnail': Random.image('100x74', '#e8e8e8', '#FFF', 'Mock.js'),
          'createTime': "@datetime",//随机生成日期时间 Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
        }
      ],
    }));
  },
  'GET /api/news/article': (req: Request, res: Response) => {
    const { query: { page, pageSize } } = req;
    return res.json(mockjs.mock({
      'desc': '文本内容',
      'data|10': [
        {
          'id': '@id',
          'type': 'article',
          'title': '@ctitle',
          'likenums|0-100': 1, // 喜欢人数
          'isLike|1-3': true, // 是否喜欢
          'viewnums|40-500': 1, // 点击数
          'url|1': ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582041541280&di=fae792cf18c6f89630ed97e752895465&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_ls%2F0%2F11309029938_294195%2F0.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582041562752&di=7e64ff115648fa1c62df41e2d7d4cf40&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170429%2F988e11a37f2841f7b4c3edba5c35a616_th.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582041590253&di=b5a262c003794156fe7ca3c8dd5c21c5&imgtype=0&src=http%3A%2F%2F00imgmini.eastday.com%2Fmobile%2F20200207%2F20200207123743_0ec992dddcc4134534cbe1ae22783b2c_3_mwpm_03201609.jpg', ''],
          'brief': '@cparagraph(1, 5)', // Random.cparagraph()
          'thumbnail': Random.image('100x74', '#e8e8e8', '#FFF', 'Image'),
          'createTime': Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
        }
      ],
    }));
  },

  'GET /api/news/video': (req: Request, res: Response) => {
    return res.json(mockjs.mock({
      'desc': '视频内容',
      'data|2': [
        {
          'id': '@id',
          'type': 'video',
          'title': '@ctitle',
          'likenums|0-100': 1, // 喜欢人数
          'isLike|1-3': true, // 是否喜欢
          'viewnums|40-500': 1, // 点击数
          'url|1': ['http://www.w3school.com.cn/example/html5/mov_bbb.mp4', 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', ''], // video地址
          'brief': '@cparagraph(1, 5)', // Random.cparagraph()
          'thumbnail': Random.image('100x74', '#e8e8e8', '#FFF', 'Image'),
          'createTime': Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
        }
      ],
    }));
  }
}, 1000)
