/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-10 20:49:20
 * @Description: banner组件
 * @注意事项:
 * 1.孕周取值，根据末次月经计算孕周
 * 2.banner背景图
 */

import * as React from 'react';

import styles from './Banner.less';

interface IProps {
  dataSource: any
  className?: string
}
export default (props: IProps) => {
  const {
    dataSource: { thumbnail = 'default', name, gesweek, hospital },
  } = props;
  return (
    <div className={styles.banner}>
      <div className={styles.innerBanner}>
        <img alt="banner" src={require(`../../assets/baby/${thumbnail}.png`)} />
        <div className={styles.userinfo}>
          <div className={styles.name}>{name}</div>
          <div className={styles.gesweek}>{gesweek}</div>
          <div className={styles.hospital}>{hospital}</div>
        </div>
      </div>
    </div>
  );
}
