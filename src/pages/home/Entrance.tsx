import * as React from 'react';
import { router } from '@/utils/utils';
import styles from './Entrance.less';

interface IProps {
  dataSource: any[],
}
export default (props: IProps) => {
  const {
    dataSource = [],
  } = props;
  console.log(dataSource);
  return (
    <div className={styles.entrance}>
      <ul>
        {dataSource.map(e => (
          <li key={e.key} onClick={() => router(e.route)}>
            <div className={styles.icon} style={{ backgroundImage: `url(${e.icon})`}} />
            <div className={styles.label}>{e.label}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
