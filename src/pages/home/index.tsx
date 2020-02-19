import React, { useState, useEffect } from 'react';
import { Card, WingBlank } from 'antd-mobile';
import { connect } from 'dva';

import { WhiteSpace } from '@/components/antd-mobile';
import { ConnectState, ConnectProps } from '@/models/connect';
// import { formatMessage } from 'umi-plugin-locale';
import { ENTRANCE, TOOLS } from './config';

// 业务组件
import Banner from './Banner';
import Entrance from './Entrance';
import Notification from './Notification';
import AntenatalCare from './AntenatalCare';
import Tools from './Tools';
import NewsListView from './NewsListView';

import styles from './index.less';

function Home(props: any) {

  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'news/getPersonNews',
      payload: {
        gesweek: '22'
      }
    })
    return () => {};
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className="module">
        <Banner dataSource={props.currentUser} />
        <Entrance dataSource={ENTRANCE} />
        <Notification />
      </div>
      <WhiteSpace size="md" />
      <Card full>
        <Card.Header
          title={<span className={styles.cardTitle}>孕产工具</span>}
          thumb={require('../../assets/icons/tool.png')}
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
          title={<span className={styles.cardTitle}>今日知识</span>}
          thumb={require('../../assets/icons/knowledge.png')}
          thumbStyle={{ width: '.36rem' }}
          extra={<span className={styles.more}>更多</span>}
        />
        <Card.Body style={{ paddingTop: 0 }}>
          <NewsListView dataSource={props.news} />
        </Card.Body>
      </Card>
      {/* <WhiteSpace size="md" />
      <div className="module">
        <WingBlank style={{ paddingTop: '.15rem', paddingBottom: '.15rem' }}>
          <ul className={styles.list}>
            <li>
              To get started, edit <code>src/pages/index.js</code> and save to reload.
            </li>
            <li>
              <a href="https://umijs.org/guide/getting-started.html">
                {formatMessage({ id: 'index.start' })}
              </a>
            </li>
          </ul>
        </WingBlank>
      </div>
      <div style={{ padding: '.5rem' }}>
        <Button type="primary" shadow circular>BUTTON</Button>
      </div> */}
    </div>
  );
}

export default connect(({ loading, user, news }: ConnectState) => ({
  loading: loading,
  currentUser: user.currentUser,
  news: news.personal,
}))(Home);
