/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-09 21:33:20
 * @Description: 围产建档表单列表
 */

import React from 'react';
import { connect } from 'dva';
import { ConnectState, ConnectProps } from '@/models/connect';

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
      <div style={{ height: '100vh' }}>
        围产建档列表
      </div>
    );
  }
}

export default FormList;
