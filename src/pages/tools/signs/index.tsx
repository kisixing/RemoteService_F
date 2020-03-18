/*
 * @Description: 绑定设备用户直接进入——体征管理【当天记录】页面。未绑定设备用户直接进入——体征录入页面。
 * @Author: Zhong Jun
 * @Date: 2020-03-10 17:05:37
 */

import React from 'react';
import { Redirect } from 'umi';
import PageLoading from '@/components/Loader';

function index() {
  const [loading, setLoading] = React.useState(false);
  // 是否绑定设备， true已绑定 false未绑定
  const [state, setState] = React.useState(false);
  React.useEffect(() => {
    let a = setTimeout(() => {
      setState(true);
      setLoading(false);
    }, 600);
    return function clean(){
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

export default index;
