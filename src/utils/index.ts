
/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-08 00:00:02
 * @Description: 函数工具
 */

import Router from 'umi/router';
import { Toast } from 'antd-mobile';
import { parse, stringify } from 'querystring';
import moment, { Moment } from 'moment';
// import pathRegexp from 'path-to-regexp';

// 其他
export { default as KG } from "./KG";
export { default as checkIdCard } from "./checkIdCard";

export function isWeixin() {
  return /micromessenger/.test(navigator.userAgent.toLowerCase());
}

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function getPageKeyValue(key: string) {
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
export function generateUUID(len: number, radix?: number) {
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
 * 获取当前HTML的header信息
 *
 * @returns
 */
export function getHeaders() {
  var req = new XMLHttpRequest();
  req.open('GET', document.location.href, false);
  req.send(null);
  var headerArr = req.getAllResponseHeaders().split('\n');
  var headers = {};
  headerArr.forEach(item => {
    if (item !== '') {
      var index = item.indexOf(':');
      var key = item.slice(0, index);
      var value = item.slice(index + 1).trim();
      headers[key] = value
    }
  })
  return headers
}

// 跳转
export function router(type: string) {
  if (!type) {
    Toast.info('暂未开通，敬请期待', 2);
  } else if (type === '暂无消息') {
    Toast.info(type, 1);
  } else if (type.indexOf('http') > -1) {
    window.location.href = type;
  } else {
    Router.push(type)
  }
}

/**
 * 对日期字符串进行排序
 * @param arr 需要排序的数组
 * @params key 排序的字段，若为空，则代表数组内元素为datestring
 * 入参形式
 */


export function sortDate<T>(arr: Array<T> | Set<T>, key: string = ""): Array<T> | false {
  let formatArr: Array<any> = [];
  try {
    if (key !== "") {
      arr.forEach((v: T) => formatArr.push(Object.assign({ _sortDate: moment(v[key]) }, v)));
    } else {
      arr.forEach((v: T) => formatArr.push({ _sortDate: moment(v), originalData: v }));
    }
  } catch (e) {
    console.error('对象或对象下字段不可使用moment转换');
    return false;
  }
  // 排序使用 Moment.isAfter 冒泡
  const len = formatArr.length;
  let temp;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (formatArr[i]['_sortDate'].isAfter(formatArr[j]['_sortDate'])) {
        temp = formatArr[i];
        formatArr[i] = formatArr[j];
        formatArr[j] = temp;
      }
    }
  }
  if (key !== "") {
    return formatArr.map((v) => { delete v['_sortDate']; return v });
  } else {
    return formatArr.map((v) => v.originalData);
  }
}
