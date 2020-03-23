/*
 * @Description: 咨询窗口
 * @Author: Zhong Jun
 * @Date: 2020-03-19 17:27:03
 * 聊天室
 */

import React, { useState, useEffect, useRef } from 'react';
import uuid from 'uuid';
import store from 'store';
import { useI } from '@lianmed/im';
import { TextareaItem, Button } from 'antd-mobile';
import { IconFont } from '@/components/antd-mobile';
import styles from './id.less';

let flag = false;

function ChatView() {
  const textRef = useRef(null);
  const [text, setText] = useState('');
  const { chatMessage, contacts, current, currentMessage, setCurrentId, sendTextMessage } = useI(
    `http://transfer.lian-med.com:9987/ws/stomp?access_token=${store.get('lianmp-token')}`,
  );

  const sendMessage = () => {
    sendTextMessage('mlogin_preg_19142986941', text);
    setText('');
  };
  useEffect(() => {
    if (contacts.length && !flag) {
      console.log('zzzzzzzz')
      setCurrentId(contacts[0].name);
      flag = true;
    }
  }, [contacts]);
  console.log('777777777', current);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>XXX 医生</span>
      </div>
      <div className={styles.content}>

      </div>
      <div className={styles.footer}>
        <TextareaItem
          autoHeight
          className={styles.textInput}
          ref={textRef}
          value={text}
          placeholder="输入内容..."
          onChange={(e: any) => setText(e)}
        />
        <div className={styles.buttons}>
          <Button inline type="primary" size="small" onClick={sendMessage}>
            发送
          </Button>
          <Button inline size="small">
            <IconFont type="add" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
