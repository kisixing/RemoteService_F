/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:41:34
 * @Description: 套餐列表
 */

import React,{useEffect} from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { WingBlank } from 'antd-mobile';
import BackButton from '@/components/BackButton';
import { Touchable } from '@/components/antd-mobile';

import { ConnectState } from '@/models/connect';
import { PackageListItem } from './interface';

import styles from './index.less';

interface PackageProps{
  packageList: Array<PackageListItem>,
  dispatch: Dispatch
}

function Packages(props: PackageProps) {

  const onClick = (id: number|string):void => {
    props.dispatch({type: 'combo/setPackageId', payload: id});
    Router.push('/packages/detail');
  }

  // 获取套餐列表
  useEffect(() => {props.dispatch({type: 'combo/getPackage'})},[]);
  return (
    <WingBlank className={styles.container}>
      {props.packageList.map((item: PackageListItem) => {
        return (
          <Touchable key={item.id} onPress={() => onClick(item.id)}>
            <div className={styles.card}>
              <div className={styles.thumbnail}>
                <img src="/images/slice/pic.png" />
              </div>
              <div className={styles.content}>
                <div>
                  <div><b>{item.name}</b></div>
                  <div className={styles.marking}>单胎</div>
                </div>
                <div>
                  <div>￥<b>{item.price}</b></div>
                  <div><small>·含设备</small></div>
                  <div>查看详情></div>
                </div>
              </div>
            </div>
          </Touchable>
        );
      })}
      <BackButton />
    </WingBlank>
  );
}

export default connect(({combo}: ConnectState) => ({
  packageList: combo.packageList
}))(Packages);
