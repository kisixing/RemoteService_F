/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:41:34
 * @Description: 套餐列表
 */

import React from 'react';
import Router from 'umi/router';
import { WingBlank } from 'antd-mobile';
import BackButton from '@/components/BackButton';
import { IconFont, Touchable } from '@/components/antd-mobile';
import styles from './index.less';

function Packages() {

  const onClick = () => {
    Router.push('/packages/detail');
  }
  return (
    <WingBlank className={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7].map(e => {
        return (
          <Touchable key={e} onPress={onClick}>
            <div className={styles.card}>
              <div className={styles.thumbnail}>
                <img src="/images/slice/pic.png" />
              </div>
              <div className={styles.content}>
                <div>{e}</div>
              </div>
            </div>
          </Touchable>
        );
      })}
      <BackButton />
    </WingBlank>
  );
}

export default Packages;
