import React, { useState, useEffect } from 'react';
import { Card } from 'antd-mobile';
import { connect } from 'dva';
// import { formatMessage } from 'umi-plugin-locale';

import { WhiteSpace, IconFont } from '@/components/antd-mobile';
import Footer from '@/components/Footer';
import { ConnectState, ConnectProps } from '@/models/connect';
import { router } from '@/utils/utils';
import { ENTRANCE, TOOLS } from './config';

// 业务组件
import Banner from './Banner';
import Entrance from './Entrance';
import Notification from './Notification';
import AntenatalCare from './AntenatalCare';
import Tools from './Tools';
import NewsListView from './NewsListView';

import styles from './index.less';

interface IProps {
  dispatch: any
  loading: any
  news: Array<any>
  currentPregnancy: {
    name: string
    lmp: string
    edd: string
    gestationalWeek: string
    hospital: string
     [propName: string]: any;
  }
}

function Home(props: IProps) {
  const { dispatch, currentPregnancy, news, loading } = props;

  useEffect(() => {
    dispatch({
      type: 'news/getPersonNews',
      payload: {
        gesweek: '22'
      }
    });
    return () => {};
  }, [])

  const bannerProps = {
    name: currentPregnancy.name,
    lmp: currentPregnancy.lmp,
    edd: currentPregnancy.edd,
    gesweek: currentPregnancy.gestationalWeek,
    hospital: currentPregnancy.hospital,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className="module">
          <Banner dataSource={bannerProps} />
          <Entrance dataSource={ENTRANCE} />
          <Notification />
        </div>
        <WhiteSpace size="md" />
        <Card full>
          <Card.Header
            title={
              <div  className={styles.cardTitle}>
                <IconFont type="1" />
                <span>孕产工具</span>
              </div>
            }
            // thumb={require('../../assets/icons/tool.png')}
            thumbStyle={{ width: '.32rem', marginBottom: '.02rem' }}
          />
          <Card.Body>
            <AntenatalCare />
            <Tools dataSource={TOOLS} />
          </Card.Body>
        </Card>
        <WhiteSpace size="md" />
        <Card full>
          <Card.Header
            title={
              <div  className={styles.cardTitle}>
                <IconFont type="zhishiku" />
                <span>今日知识</span>
              </div>
            }
            // thumb={require('../../assets/icons/knowledge.png')}
            thumbStyle={{ width: '.36rem' }}
            extra={<span className={styles.more} onClick={() => router('/school')}>更多</span>}
          />
          <Card.Body style={{ paddingTop: 0 }}>
            <NewsListView dataSource={news} loading={loading.effects['news/getPersonNews']} />
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default connect(({ loading, global, news }: ConnectState) => ({
  loading: loading,
  currentPregnancy: global.currentPregnancy,
  news: news.personal,
}))(Home);
