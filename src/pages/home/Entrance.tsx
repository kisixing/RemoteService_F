import * as React from 'react';
import { router } from '@/utils';
import constant from '@/utils/constants';
import styles from './Entrance.less';

interface IProps {
  dataSource: any[];
}
export default ({ dataSource = [] }: IProps) => {
  // 计算所有盒子需要的宽度，hide隐藏的盒子不计算
  const showData = dataSource.filter(e => !e.hide);
  const width = `${1.62 * showData.length - 0.05}rem`;

  return (
    <div className={styles.entrance}>
      <ul style={{ width }}>
        {showData.map(e => (
          <li key={e.key} onClick={() => router(e.route)}>
            <div
              className={styles.icon}
              style={{ backgroundImage: `url(${constant.aliyuncs}/icons/${e.icon})` }}
            />
            <div className={styles.label}>{e.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
