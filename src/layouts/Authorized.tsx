/*
 * @Description: 鉴权路由组件
 * @Author: Zhong Jun
 * @Date: 2020-04-28 10:17:52
 */

import React from 'react';
// import { connect } from 'dva';
// import { Router, Route, Redirect, withRouter } from 'dva/router';

interface IProps {
  children?: React.ReactNode
}

function Authorized(props: IProps) {
  return (
    <div>
      <div>PrivateRoute (routes/PrivateRoute.js)</div>
      {props.children}
    </div>
  );
};

export default Authorized;
