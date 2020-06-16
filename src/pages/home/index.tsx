import React, { useEffect } from 'react';
import { Card } from 'antd-mobile';
import { connect } from 'dva';
// import { formatMessage } from 'umi-plugin-locale';

import { WhiteSpace } from '@/components/antd-mobile';
import Footer from '@/components/Footer';
import { ConnectState } from '@/models/connect';
import { router } from '@/utils';

// 业务组件
import Banner from './Banner';
import Entrance from './Entrance';
import Notification from './Notification';
import AntenatalCare from './AntenatalCare';
import Tools from './Tools';
import NewsListView from './NewsListView';

// 读取配置文件
const configuration = window.configuration;

import styles from './index.less';

interface IProps {
  dispatch: any;
  loading: any;
  news: Array<any>;
  hospital: string;
  currentPregnancy: {
    name: string;
    lmp: string;
    edd: string;
    gestationalWeek: string;
    hospital: string;
    [propName: string]: any;
  };
}

function Home(props: IProps) {
  const { dispatch, currentPregnancy, news, loading, hospital } = props;

  useEffect(() => {
    dispatch({
      type: 'news/getPersonNews',
      payload: {
        gesweek: '22',
      },
    });
    return () => {};
  }, []);

  const bannerProps = {
    name: currentPregnancy.name,
    lmp: currentPregnancy.lmp,
    edd: currentPregnancy.edd,
    sureEdd: currentPregnancy.sureEdd,
    gesweek: currentPregnancy.gestationalWeek,
    hospital: currentPregnancy.hospital || hospital,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className="module">
          <Banner dataSource={bannerProps} />
          <Entrance dataSource={configuration.mains} />
          {/* 消息提醒 */}
          <Notification />
        </div>
        <WhiteSpace size="md" />
        <Card full>
          <Card.Header
            title={
              <div className={styles.cardTitle}>
                <span className={styles.icon} />
                <span>孕产工具</span>
              </div>
            }
            // thumb={require('../../assets/icons/tool.png')}
            thumbStyle={{ width: '.32rem', marginBottom: '.02rem' }}
          />
          <Card.Body>
            <AntenatalCare />
            <Tools dataSource={configuration.tools} />
          </Card.Body>
        </Card>
        <WhiteSpace size="md" />
        <Card full>
          <Card.Header
            title={
              <div className={styles.cardTitle}>
                <span className={styles.icon} />
                <span>今日知识</span>
              </div>
            }
            // thumb={require('../../assets/icons/knowledge.png')}
            thumbStyle={{ width: '0.36rem' }}
            extra={
              <span className={styles.more} onClick={() => router('/school')}>
                更多
              </span>
            }
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
  hospital: global.hospital,
}))(Home);
