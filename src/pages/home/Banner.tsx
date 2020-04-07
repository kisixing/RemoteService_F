/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-10 20:49:20
 * @Description: banner组件
 * @注意事项:
 * 1.孕周取值，根据末次月经计算孕周
 * 2.banner背景图
 */

import * as React from 'react';
import { KG } from '@/utils';
import styles from './Banner.less';

interface IProps {
  dataSource: any
  className?: string
}
export default (props: IProps) => {
  const {
    dataSource: { name, hospital, adjustedEdd, edd, lmp, gestationalWeek },
  } = props;
  // 无法取到预产期时，ps:末次月经时间一定存在 ps: 修订预产期 || 孕产期 || 根据末次月经计算的孕产期
  let EDD = adjustedEdd || edd || KG.getEdd(lmp);
  // 孕周 ps: 孕周 || 计算的孕周
  const gesweek = gestationalWeek || KG.getGesweek(EDD);
  // 距离预产期天数
  const days = KG.getGesdays(EDD);
  // banner背景图
  const bannerbg = (gesweek: string) => {
    // gesweek的格式存在可能 1. ’20+1‘ 2. ’20周+1天‘
    if (!gesweek) {
      return 'M0'
    }
    let week: number = parseInt(gesweek);
    if (week < 0) return 'M0';
    if (week < 4) return 'M1';
    if (week < 6) return 'M2';
    if (week < 12) return 'M3';
    if (week < 16) return 'M4';
    if (week < 20) return 'M4';
    if (week < 24) return 'M5';
    if (week < 28) return 'M6';
    if (week < 32) return 'M7';
    if (week < 33) return 'M7-1';
    if (week < 35) return 'M8';
    if (week < 36) return 'M8-1';
    if (week < 37) return 'M9';
    if (week <= 38) return 'M9-1';
    if (week >= 39) return 'M10';
  }
  return (
    <div className={styles.banner}>
      <div className={styles.innerBanner}>
        <img alt="banner" src={`./images/banner/${bannerbg(gesweek)}.png`} />
        <div className={styles.userinfo}>
          <div className={styles.name}>{name}</div>
          <div className={styles.gesweek}>孕 {gesweek} 周</div>
          <div className={styles.gext}>
            <div>距预产期 {EDD}</div>
            <div>还有 {days} 天</div>
          </div>

          <div className={styles.hospital}>{hospital}</div>
        </div>
      </div>
    </div>
  );
}
