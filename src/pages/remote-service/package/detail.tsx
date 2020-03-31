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
  const [images, setImages] = useState([]);

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
        const images = imageData() || [];
        setImages(images);
      }
    });
  }, []);

  /**
   * 拼接html富文本
   * @param {string} type 提取字段 note/introduction/specification
   */
  const concatText = (array = [], type: 'note' | 'introduction' | 'specification') => {
    let text = '';
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      // const eleText = `<div style="font-size: 28px; font-weight: 600; padding: 12px 0">${element.name}</div>${element[type]}`;
      const eleText = element[type];
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

  const gotoService = () => {
    Router.push({
      pathname: `/consultation/chat/${'联系客服'}`,
    });
  };

  const imageData = () => {
    const products = currentPackage && currentPackage.products ? currentPackage.products : [];
    let images = [];
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      const imgStr = element.picture;
      if (imgStr) {
        const imgArr = imgStr.split(',');
        images = [...images, ...imgArr];
      }
    }
    return images;
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Carousel infinite autoplay={true} className={styles.carousel}>
          {images &&
            images.length && images.map((e: any) => (
              <div key={e} className={styles.carousel}>
                <img
                  src={e}
                  alt={e}
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
          <div dangerouslySetInnerHTML={{ __html: concatText(currentPackage.products, 'note') }} />
          <div dangerouslySetInnerHTML={{ __html: concatText(currentPackage.products, 'introduction') }} />
          <div dangerouslySetInnerHTML={{ __html: concatText(currentPackage.products, 'specification') }} />
        </Tabs>
      </StickyContainer>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <span onClick={gotoService}>
            <IconFont type="serve" size="0.52rem" />
          </span>
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
