/*
 * @Description: 围产建档步骤条
 * @Author: Zhong Jun
 * @Date: 2020-02-21 16:47:06
 */

import React from 'react';
import classnames from 'classnames';

import { router } from '@/utils';
import { MAPS } from './MapList';
import styles from './styles.less';

interface Iprops {
  current: number
}

export default function StepBar({ current }: Iprops) {
  return (
    <ul className={styles.stepContainer}>
      {MAPS.map((e, i) => (
        <li key={e.name} className={styles.item} /* onClick={() => router(e.route)} */>
          <span className={classnames(styles.dot, { [styles.color]: i < current })} />
          <div className={styles.title}>{e.title}</div>
        </li>
      ))}
    </ul>
  );
}
