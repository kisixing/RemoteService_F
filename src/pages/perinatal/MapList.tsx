/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-09 21:33:20
 * @Description: 围产建档表单列表
 */

import React from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { WingBlank, Toast } from 'antd-mobile';
import { Touchable } from '@/components/antd-mobile';

import { ConnectState, ConnectProps } from '@/models/connect';
import constant from '@/utils/constants';
import styles from './MapList.less';

// 读取配置文件
const { sequentialControl } = window.configuration;

interface LabelProps {
  title: string
  name: string
  icon: string
  finished: string
  route: string
}

export const MAPS: LabelProps[] = [
         {
           title: '基本信息',
           name: 'basic',
           icon: 'icon_wc_jiben',
           finished: 'false',
           route: '/perinatal/basic-info',
         },
         {
           title: '本孕信息',
           name: 'pregnancy',
           icon: 'icon_wc_benyun',
           finished: 'false',
           route: '/perinatal/current-pregnancy',
         },
         {
           title: '孕产史信息',
           name: 'history',
           icon: 'icon_wc_changshi',
           finished: 'none',
           route: '/perinatal/pregnancy-history',
         },
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
      if (res && res.id) {
        const data = [...this.state.dataSource];
        const { residenceAddress, maritalYears } = res;
        if (!!residenceAddress) {
          data[0]['finished'] = 'true';
        }
        if (!!maritalYears) {
          data[1]['finished'] = 'true';
        }
        this.setState({ dataSource: data });
      }
    });
  }

  onClick = (e: any, item: any) => {
    e.stopPropagation();
    const { route, name } = item;
    const { dataSource } = this.state;

    if (sequentialControl && name !== 'basic') {
      // 是否做顺序控制
      if (name === 'pregnancy') {
        // 进入本孕信息pregnancy时，检验基本信息basic是否已经填写完整
        const isAllow = dataSource[0]['finished'] === 'true';
        if (!isAllow) {
          return Toast.info('请填写完整的基本信息', 2)
        }
      }
      if (name === 'history') {
        // 进入本孕信息history时，检验基本信息basic，本孕信息pregnancy是否已经填写完整
        const isAllow1 = dataSource[0]['finished'] === 'true';
        const isAllow2 = dataSource[1]['finished'] === 'true';
        if (isAllow1) {
          return Toast.info('请填写完整的基本信息', 2)
        }
        if (isAllow2) {
          return Toast.info('请填写完整的本孕信息', 2)
        }
      }
    }
    Router.push(route);
  };

  // 表单完成状态
  status = (state: any) => {
    if (state === 'true') {
      return <div className={styles.finished}>资料已完成</div>;
    }
    if (state === 'false') {
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
            <Touchable key={item.name}>
              <div className={styles.item} onClick={e => this.onClick(e, item)}>
                <div className={styles.content}>
                  <div
                    className={styles.thumbnails}
                    style={{
                      backgroundImage: `url(${constant.aliyuncs}/icons/${item.icon}@3x.png)`,
                    }}
                  />
                  <div>
                    <div className={styles.title}>{item.title}</div>
                    {this.status(item.finished)}
                  </div>
                </div>
                <span
                  style={{ backgroundImage: `url(${constant.aliyuncs}/icons/icon_wc_next@3x.png)` }}
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
