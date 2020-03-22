/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-09 21:33:20
 * @Description: 围产建档表单列表
 */

import React from 'react';
import { connect } from 'dva';
import { WingBlank } from 'antd-mobile';
import { Touchable } from '@/components/antd-mobile';

import { ConnectState, ConnectProps } from '@/models/connect';
import { router } from '@/utils/utils';
import styles from './MapList.less';

export const MAPS = [
  {
    title: '基本信息',
    name: 'basic',
    icon: require('../../assets/icons/icon_wc_jiben.png'),
    finished: false,
    route: '/perinatal/basic-info',
  },
  {
    title: '本孕信息',
    name: 'pregnancy',
    icon: require('../../assets/icons/icon_wc_benyun.png'),
    finished: false,
    route: '/perinatal/current-pregnancy',
  },
  {
    title: '孕产史信息',
    name: 'history',
    icon: require('../../assets/icons/icon_wc_changshi.png'),
    finished: 'none',
    route: '/perinatal/pregnancy-history',
  }
];

interface P extends ConnectProps {

}

interface S {

};

@connect(({ global, loading }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  loading: loading.effects['global/getPregnancy'],
}))
class MapList extends React.Component<P, S> {
  state = { dataSource: MAPS };

  componentDidMount() {
    const { dispatch, currentPregnancy } = this.props;
    // TODO 处理表单填写情况
    dispatch({
      type: 'global/getPregnancy',
      payload: currentPregnancy.id,
    }).then((res: any) => {
      if (res && res[0] && res[0]['id']) {
        const data = [...this.state.dataSource];
        const { residenceAddressDetail, maritalYears } = res;
        if (!!residenceAddressDetail) {
          data[0]['finished'] = true;
        }
        if (!!maritalYears) {
          data[1]['finished'] = true;
        }
        this.setState({ dataSource: data });
      }
    });
  }

  onPress = (e: any) => {
    e.stopPropagation();
    console.log(e.type, e.target.id);
  };

  // 表单完成状态
  status = (state: any) => {
    if (state === true) {
      return <div className={styles.finished}>资料已完成</div>;
    }
    if (state === false) {
      return <div className={styles.unfinished}>资料未完善，请立即前往 ></div>;
    }
    return;
  };
  // TODO 行内样式转样式表引入
  // Touchable组件点击后导致行内样式无法恢复到原来的效果
  render() {
    return (
      <WingBlank className={styles.container}>
        {this.state.dataSource.map(item => {
          return (
            <Touchable key={item.name} onPress={() => router(item.route)}>
              <div className={styles.item}>
                <div className={styles.content}>
                  <img alt={item.title} src={item.icon} />
                  <div>
                    <div className={styles.title}>{item.title}</div>
                    {this.status(item.finished)}
                  </div>
                </div>
                <img
                  alt="arrow"
                  src={require('../../assets/icons/icon_wc_next.png')}
                  className={styles.arrow}
                />
              </div>
            </Touchable>
          );
        })}
      </WingBlank>
    );
  }
}

export default MapList;
