/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-08 00:00:02
 * @Description: 函数工具
 */

import Router from 'umi/router';
import { Toast } from 'antd-mobile';
import { parse, stringify } from 'querystring';
import moment from 'moment';
// import pathRegexp from 'path-to-regexp';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function getPageKeyValue(key: string){
  const query = getPageQuery();
  return query[key];
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path: string) {
  return reg.test(path);
}

export function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type: string) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

/**
 *  获取 UUID
 *
 * @param len 长度
 * @param radix 基数
 * @returns {string}
 */
export function generateUUID(len: number, radix: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

/**
 * 日期获取，格式化、孕期相关计算
 */
export const KG = {
  getDate() {
    const nowTimeStamp = Date.now();
    const now = new Date(nowTimeStamp);
    const y: number = now.getFullYear();
    let m: number | string = now.getMonth() + 1;
    let d: number | string = now.getDate();
    if (m < 10) {
      m = '0' + '' + m;
    }
    if (d < 10) {
      d = '0' + '' + d;
    }
    return y + '-' + m + '-' + d;
  },

  /**
   *
   *
   * @param {string} date 字符串时间，2010-10-02
   * @returns
   */
  formatDate(date: string) {
    const arraydate = date.split("-");
    if (arraydate.length < 3) {
      return date
    }
    return arraydate[0] + "年" + arraydate[1] + "月" + arraydate[2] + "日";
  },

  /**
   * 计算今天距离预产期天数
   *
   * @param {string} edd 预产期
   * @returns
   */
  getGesdays(edd: string) {
    const now = new Date();
    const remainingTime = new Date(edd).getTime() - now.getTime();
    let days = 0;
    if (remainingTime > 0) {
      days = Math.floor(remainingTime / (24 * 3600 * 1000));
    }
    return days;
  },

  /**
   * 获取孕产期时间
   *
   * @param {string} lmp 末次月经日期
   * @returns {string}
   */
  getEdd(lmp: string) {
    if (!lmp) {
      return;
    }
    let timeStamp = new Date(lmp).getTime();
    timeStamp = timeStamp + 280 * 24 * 60 * 60 * 1000;
    // 标准孕期时间
    const gestationTime = new Date(timeStamp);
    const y = gestationTime.getFullYear();
    let m: number | string = gestationTime.getMonth() + 1;
    let d: number | string = gestationTime.getDate();
    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      // eslint-disable-next-line no-useless-concat
      d = '0' + d;
    }
    return y + '-' + m + '-' + d;
  },

  /**
   * 计算当天孕周
   *
   * @param {string} edd 孕产期
   * @returns {string}
   */
  getGesweek(edd: string) {
    if (!edd) {
      return;
    }
    const remainingTime = new Date(edd).getTime() - new Date().getTime();
    let yunzh = '';
    if (remainingTime > 0) {
      let days = 280 - Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      if (days > 0) {
        const week = Math.floor(days / 7);
        let day: number | string = Math.floor(days % 7);
        if (day === 0) {
          day = '周';
        } else {
          day = '+' + day;
        }
        yunzh = week + day;
      }
    } else {
      let days = Math.floor(Math.abs(remainingTime / (24 * 60 * 60 * 1000)));
      const week = Math.floor(days / 7);
      if (week >= 2) {
        yunzh = '42';
      } else {
        let day: number | string = Math.floor(days % 7);
        if (day === 0) {
          day = '';
        }
        yunzh = week + 40 + '+' + day;
      }
    }
    return yunzh;
  }
};

/**
 * 获取当前HTML的header信息
 *
 * @returns
 */
export function getHeaders() {
  var req = new XMLHttpRequest();
  req.open('GET', 'document.location.href', false);
  req.send(null);
  var headerArr = req.getAllResponseHeaders().split('\n');
  var headers = {};
  headerArr.forEach(item => {
    if(item !== '') {
    var index = item.indexOf(':');
      var key = item.slice(0,index);
      var value = item.slice(index+1).trim();
      headers[key] = value
    }
  })
  return headers
}

// 跳转
export function router(type: string) {
  if (!type) {
    Toast.info('暂未开通，敬请期待');
  } else if (type === '暂无消息') {
    Toast.info(type, 1);
  } else if (type.indexOf('http') > -1) {
    window.location.href = type;
  } else {
    Router.push(type)
  }
}
