/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-28 20:45:57
 * @Description: 有关孕期各种计算
 */

export default {
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
