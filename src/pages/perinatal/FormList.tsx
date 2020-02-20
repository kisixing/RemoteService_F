/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-09 21:33:20
 * @Description: 围产建档表单列表
 */

import React from 'react';
import { connect } from 'dva';
import { WingBlank } from 'antd-mobile';

import { ConnectState, ConnectProps } from '@/models/connect';

const  NAVIGATION = [
  {
    title: '基本信息',
    icon: require('../../assets/icons/icon_wc_jiben.png'),
    shadow: '0 12px 19px 0 rgba(255,253,228,0.6)',
    bgcolor: '#FFF6D8'
  },
  {
    title: '本孕信息',
    icon: require('../../assets/icons/icon_wc_benyun.png'),
    shadow: '0 12px 19px 0 rgba(255,240,228,0.6)',
    bgcolor: '#FFF0E4'
  },
  {
    title: '孕产史信息',
    icon: require('../../assets/icons/icon_wc_changshi.png'),
    shadow: '0 12px 19px 0 rgba(255,122,156,0.12)',
    bgcolor: '#FFECEC'
  }
];

interface P extends ConnectProps {
  loading?: boolean;
}

interface S {

};

@connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
class FormList extends React.Component<P, S> {
  state = {  }
  render() {
    const { loading } = this.props;
    return (
      <WingBlank style={{ height: '100vh' }}>
        {NAVIGATION.map(item => {
          return (
            <div
              key={item.bgcolor}
              style={{
                height: '2rem',
                marginTop: '.4rem',
                backgroundColor: item.bgcolor,
                boxShadow: item.shadow,
                borderRadius: '.2rem',
              }}
            >
              <div></div>
              <div></div>
            </div>
          );
        })}
      </WingBlank>
    );
  }
}

export default FormList;
