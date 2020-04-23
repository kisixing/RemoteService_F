/*
 * @Description: 对话列表窗口区域
 * @Author: Zhong Jun
 * @Date: 2020-03-24 17:03:40
 */

import React from 'react';
import classnames from 'classnames';
import sample from 'lodash/sample';
import moment from 'moment';

import { IMessage } from '@lianmed/im/lib/hooks/new/types';

import styles from './Message.less';

interface IProps {
  message: IMessage
  [propName: string]: any
}
function Message(props: IProps) {
  const { message: { bySelf, id, isHead, msg, receiver, sender, timestamp, type, unread }} = props;
  const isSelf = sample([true, false]);
  return (
    <>
      {isHead && (
        <div className={styles.timestamp}>
          <span>{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
      )}
      <div className={classnames(styles.item, { [styles.reverse]: isSelf })}>
        <div className={styles.avatar}>
          <img alt="doctor" src={require(`../../../assets/icons/${isSelf ? 'girl' : 'boy'}.png`)} />
        </div>
        <div className={styles.content}>{msg}</div>
      </div>
    </>
  );
}

export default Message;

