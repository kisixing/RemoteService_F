import React from 'react';
import { List } from 'antd-mobile';

import styles from './index.less';

function MPList (props) {
  return <List className={styles.list} {...props} />;
}

MPList.Item = List.Item;;

export default MPList;
