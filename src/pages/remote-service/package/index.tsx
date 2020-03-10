/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:41:34
 * @Description: 套餐列表
 */

import React,{useEffect} from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { WingBlank, Tag } from 'antd-mobile';
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
                <div className={styles.first}>
                  <div className={styles.name}><b>{item.name}</b></div>
                  <Tag className={styles.marking}>单胎</Tag>
                </div>
                <div className={styles.second}>
                  <div className={styles.price}>￥<b>{item.price}</b></div>
                  <div className={styles.device}>·含设备</div>
                  <div className={styles.detail}>
                    <span>查看详情</span> 
                    <img src={require('@/assets/icons/icon_wc_next_1@2x.png')} alt=""/>
                  </div>
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
