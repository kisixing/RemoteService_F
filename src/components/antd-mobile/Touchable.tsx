import React from 'react';
import Touchable, { ITouchable } from 'rc-touchable';

interface Iprops extends ITouchable {
  children: React.ReactNode
}

export default function(props: Iprops) {
  const { delayPressIn = 60, delayPressOut = 60 } = props;
  return (
    <Touchable
      activeStopPropagation
      activeStyle={{ background: 'rgba(0, 0, 0, 0.012)' }}
      delayPressIn={delayPressIn}
      delayPressOut={delayPressOut}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
    >
      {props.children}
    </Touchable>
  )
}
