import * as React from 'react';
import { List, ActivityIndicator } from 'antd-mobile';

import { router } from '@/utils/utils';
import styles from './NewsListView.less';

interface IProps {
  dataSource: any[]
  loading?: boolean
}
export default (props: IProps) => {
  const {
    dataSource = [],
    loading
  } = props;
  console.log('object', dataSource);

  if (loading) {
    return (
      <div className={styles['loading-container']}>
        <ActivityIndicator text="正在加载..." />
      </div>
    );
  }
  if (!dataSource || !dataSource.length) {
    return <div className={styles.empty}>暂无内容...</div>;
  }
  return (
    <List className={styles.list}>
      {dataSource.map(e => {
        return (
          <List.Item
            key={e.id}
            onClick={() => router(e.route)}
          >
            <div className={styles.item}>
              <div className={styles.content}>
                <div className={styles.title}>{e.title}</div>
                <div className={styles.brief}>{e.brief}</div>
                <div className={styles.footer}>
                  <span>{e.createTime}</span>
                </div>
              </div>
              {e.url ? (
                <div className={styles.thumbnail}>
                  <img alt={e.title} src={e.url} />
                </div>
              ) : null}
            </div>
          </List.Item>
        );
      })}
    </List>
  )
}
