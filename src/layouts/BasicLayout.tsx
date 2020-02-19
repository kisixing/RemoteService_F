/**
 * 页面过度效果
 */
import React from 'react';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const BasicLayout: React.FC<any> = props => {

  return (
    <TransitionGroup>
      <CSSTransition key={props.location.pathname} classNames="fade" timeout={300}>
        {props.children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(BasicLayout);
