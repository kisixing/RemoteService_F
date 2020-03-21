/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 套餐详情
 */

import React,{ ReactNode, useState, useEffect } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import moment from 'moment';
import { Tabs, Carousel } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { Tag, Button, IconFont } from '@/components/antd-mobile';

import { ConnectState } from '@/models/connect';
import styles from './Detail.less';

interface TAB {title: string|ReactNode}

const tabs:Array<TAB> = [
  {title: '套餐详情'},
  {title: '设备介绍'},
  {title: '设备规格'},
];
const format = 'YYYY-MM-DD'

function Details({ dispatch, location, pregnancyId, currentPackage }: any) {
  const [products, setProducts] = useState([]);

  const confirm = () => {
    // 可以动态路由携带信息
    Router.push({
      pathname: '/packages/payment',
      query: {
        pregnancyId,
        packageId: currentPackage.id,
      },
    });
  };

  useEffect(() => {
    const {
      query: { id },
    } = location;
    dispatch({
      type: 'remoteService/getPackage',
      payload: id,
    }).then((res: any) => {
      if (res && res.id) {
        setProducts(res.products);
      }
    });
  }, []);

  /**
   * 拼接html富文本
   * @param {string} type 提取字段 note/introduction/specification
   */
  const concatText = (array: any[], type: 'note' | 'introduction' | 'specification') => {
    let text = '';
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const eleText = `<div style="font-size: 28px; font-weight: 600; padding: 12px 0">${element.name}</div>${element[type]}`;
      text = text + eleText;
    }
    return text;
  };

  function renderTabBar(props: any) {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} animated={true} />
          </div>
        )}
      </Sticky>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Carousel infinite autoplay={true} className={styles.carousel}>
          {products &&
            products.map((val: any) => (
              <div key={val} className={styles.carousel}>
                <img
                  src={val.picture}
                  alt={val.name}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              </div>
            ))}
        </Carousel>
        <div className={styles.text}>
          <div className={styles.name}>
            <span>{currentPackage.name}</span>
            <Tag bgcolor="#D9F0F8" color="#3FB6DC">
              单胎
            </Tag>
          </div>
          <div className={styles.indate}>
            有效期：
            {currentPackage.validdate
              ? `${moment().format(format)} ~ ${moment()
                  .add(currentPackage.validdate, 'days')
                  .format(format)}，${currentPackage.validdate} 天`
              : null}
          </div>
        </div>
      </div>
      <StickyContainer className={styles.tabs}>
        <Tabs
          tabs={tabs}
          swipeable={false}
          animated={true}
          renderTabBar={renderTabBar}
          tabBarUnderlineStyle={{
            height: '5px',
            backgroundColor: '#FFCC4A',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: concatText(products, 'note') }} />
          <div dangerouslySetInnerHTML={{ __html: concatText(products, 'introduction') }} />
          <div dangerouslySetInnerHTML={{ __html: concatText(products, 'specification') }} />
        </Tabs>
      </StickyContainer>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <IconFont type="serve" size="0.64rem" />
          <span className={styles.price}>
            <IconFont type="fl-renminbi" size="0.32rem" />
            <span>{currentPackage.price}</span>
          </span>
        </div>
        <Button inline type="primary" onClick={confirm}>
          购买
        </Button>
      </div>
    </div>
  );
}


export default connect(({ global, remoteService }: ConnectState) => ({
  pregnancyId: global.currentPregnancy.id,
  currentPackage: remoteService.currentPackage,
}))(Details);
