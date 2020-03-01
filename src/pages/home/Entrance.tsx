import * as React from 'react';
import { router } from '@/utils/utils';
import styles from './Entrance.less';

interface IProps {
  dataSource: any[],
}
export default (props: IProps) => {
  const { dataSource = [] } = props;
  const width = `${1.62 * dataSource.length - 0.2 }rem`;
  return (
    <div className={styles.entrance}>
      <ul style={{ width: width }}>
        {dataSource.map(e => (
          <li key={e.key} onClick={() => router(e.route)}>
            <div className={styles.icon} style={{ backgroundImage: `url(/images/icon/${e.icon})`}} />
            <div className={styles.label}>{e.label}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
