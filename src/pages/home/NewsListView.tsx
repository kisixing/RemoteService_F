import * as React from 'react';
import { List } from 'antd-mobile';

import { router } from '@/utils/utils';
import styles from './NewsListView.less';

interface IProps {
  dataSource: any[],

}
export default (props: IProps) => {
  const {
    dataSource = [],
  } = props;

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
                <div className={styles.footer}>footer</div>
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
