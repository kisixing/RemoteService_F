/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-14 23:02:52
 * @Description: 工具入口
 */

import * as React from 'react';
import { router } from '@/utils/utils';
import constant from '@/utils/constants';
import { Touchable } from '@/components/antd-mobile';

import styles from './Tools.less';

// 每行5列
const ROW = 5;

interface IProps {
  dataSource: any[]
}

interface ItemProps {
  dataSource: any
  index: number
  margin?: string
}

function Item({ dataSource, index }: ItemProps) {
  const width = 1.26;
  const onclick = (e: any) => {
    e.stopPropagation();
    console.log(e.type, e.target.id);
    router(dataSource.route);
  };

  return (
    <Touchable>
      <div
        className={styles.item}
        style={{
          width: `${width}rem`,
          borderRadius: `${width / 4}rem`,
          marginRight: index % ROW === 0 ? 0 : `calc((100% - 5*${width}rem) / (${ROW} - 1))`,
        }}
        onClick={onclick}
      >
        <div
          className={styles.icon}
          style={{ backgroundImage: `url(${constant.aliyuncs}/icons/${dataSource.icon})` }}
        />
        <div className={styles.label}>{dataSource.label}</div>
      </div>
    </Touchable>
  );
}

export default (props: IProps) => {
  // TODO 增加个性化产检规则提醒
  const { dataSource = [] } = props;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {dataSource.map((item, i) => {
          return <Item key={item.key} index={i + 1} dataSource={item} />;
        })}
      </div>
    </div>
  )
}
