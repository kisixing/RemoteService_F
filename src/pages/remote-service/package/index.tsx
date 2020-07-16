/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:41:34
 * @Description: 套餐列表
 */

import React, { useEffect } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { WingBlank } from 'antd-mobile';
import { Touchable, Tag, IconFont } from '@/components/antd-mobile';

import { ConnectState } from '@/models/connect';
import { PackageListItem } from './interface';

import styles from './index.less';

interface PackageProps {
  packages: Array<PackageListItem>;
  dispatch: Dispatch;
}

function Packages({ dispatch, packages }: PackageProps) {
  const onClick = (item: any) => {
    const id = item.id;
    Router.push({
      pathname: '/packages/detail',
      query: { id },
    });
  };

  // 获取所有套餐列表
  useEffect(() => {
    dispatch({ type: 'remoteService/getPackages' });
  }, []);

  return (
    <WingBlank className={styles.container}>
      {packages &&
        packages.length > 0 &&
        packages.map((item: PackageListItem) => {
          return (
            <Touchable key={item.id}>
              <div className={styles.card} onClick={() => onClick(item)}>
                <div className={styles.thumbnail}>
                  <img
                    src={
                      item.picture ||
                      require(`../../../assets/icons/pic_${Math.floor(Math.random() * 3 + 1)}.png`)
                    }
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.first}>
                    <div className={styles.name}>{item.name}</div>
                    <Tag size="middle" color="#632F00" bgcolor="#FDB81D">
                      单胎
                    </Tag>
                  </div>
                  <div className={styles.second}>
                    <div>
                      <div className={styles.price}>￥{item.price}</div>
                      <div className={styles.device}>含设备</div>
                    </div>
                    <div className={styles.detail}>
                      <span>查看详情</span>
                      <IconFont type="dropdown" size=".4rem" />
                    </div>
                  </div>
                </div>
              </div>
            </Touchable>
          );
        })}
    </WingBlank>
  );
}

export default connect(({ remoteService }: ConnectState) => ({
  packages: remoteService.packages,
}))(Packages);
