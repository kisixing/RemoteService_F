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

const  NAVIGATION = [
  {
    title: '基本信息',
    icon: require('../../assets/icons/icon_wc_jiben.png'),
    shadow: '0 12px 19px 0 rgba(255,253,228,0.6)',
    bgcolor: '#FFF6D8',
    finished: true,
  },
  {
    title: '本孕信息',
    icon: require('../../assets/icons/icon_wc_benyun.png'),
    shadow: '0 12px 19px 0 rgba(255,240,228,0.6)',
    bgcolor: '#FFF0E4',
    finished: true,
  },
  {
    title: '孕产史信息',
    icon: require('../../assets/icons/icon_wc_changshi.png'),
    shadow: '0 12px 19px 0 rgba(255,122,156,0.12)',
    bgcolor: '#FFECEC',
    finished: false,
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
  state = { dataSource: NAVIGATION }
  componentDidMount() {
    // TODO 处理表单填写情况
  }
  // TODO 行内样式转样式表引入
  // Touchable组件点击后导致行内样式无法恢复到原来的效果
  render() {
    return (
      <WingBlank style={{ height: '100vh' }}>
        {this.state.dataSource.map(item => {
          return (
            <Touchable key={item.bgcolor}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '2rem',
                  marginTop: '.4rem',
                  paddingLeft: '.45rem',
                  paddingRight: '.4rem',
                  backgroundColor: item.bgcolor,
                  boxShadow: item.shadow,
                  borderRadius: '.2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    alt={item.title}
                    src={item.icon}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      marginRight: '.24rem',
                      borderRadius: '50%'
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: '.36rem',
                        color: '#333',
                        fontFamily: 'PingFangSC-Medium'
                      }}
                    >
                      {item.title}
                    </div>
                    {item.finished ? (
                      <div style={{ fontSize: '.24rem', color: '#999' }}>资料已完成</div>
                    ) : (
                      <div style={{ fontSize: '.24rem', color: '#FF5858' }}>资料未完善，请立即前往 ></div>
                    )}
                  </div>
                </div>
                <div>
                  <img
                    alt="arrow"
                    src={require('../../assets/icons/icon_wc_next.png')}
                    style={{ width: '.4rem' }}
                  />
                </div>
              </div>
            </Touchable>
          );
        })}
      </WingBlank>
    );
  }
}

export default FormList;
