/*
 * @Description: 绑定设备用户直接进入——体征管理【当天记录】页面。未绑定设备用户直接进入——体征录入页面。
 * @Author: Zhong Jun
 * @Date: 2020-03-10 17:05:37
 */

import React from 'react';
import { Redirect } from 'umi';
import PageLoading from '@/components/Loader';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

const TYPE_NAME = 'XICCO-aVS02';

function index(props: any) {
  const { pregnancy } = props;
  const [loading, setLoading] = React.useState(true);
  // 是否绑定设备， true已绑定 false未绑定
  const [state, setState] = React.useState(false);
  // const [state, setState] = React.useState(true);
  React.useEffect(() => {
    // 需要判断设备的type
    const isBind = pregnancy.devices && pregnancy.devices.length !== 0 && pregnancy.devices.findIndex((v: any) => v.type === TYPE_NAME) !== -1;

    let a = setTimeout(() => {
      setState(isBind);
      setLoading(false);
    }, 600);
    return function clean() {
      clearTimeout(a);
    }
  }, [])

  if (state && !loading) {
    return <Redirect to={`/signs/record`} />;
  }
  if (!state && !loading) {
    return <Redirect to={`/signs/input`} />;
  }
  return <PageLoading fullScreen spinning />;
}

export default connect(({ global }: ConnectState) => ({
  pregnancy: global.currentPregnancy
}))(index);
