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
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { IconFont } from '@/components/antd-mobile';
import Message from './Message';
import styles from './id.less';

let flag = false;

function ChatView() {
  const textRef = useRef(null);
  const scrollRef = useRef(null);
  const [currentId, setCurrentId] = useState('mlogin_preg_19142986941');
  const [text, setText] = useState('');
  const { chatMessage, sendTextMessage } = useI(
    `http://transfer.lian-med.com:9987/ws/stomp?access_token=${store.get('lianmp-token')}`,
  );

  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollTo(0, 999);
  }, []);

  const sendMessage = () => {
    if (!text) {
      return Toast.info('请输入内容...')
    }
    sendTextMessage(currentId, text);
    setText('');
  };

  console.log('messages:', chatMessage[currentId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>XXX 医生</span>
      </div>
      <div className={styles.content}>
        <div ref={scrollRef}>
          {chatMessage[currentId] &&
            chatMessage[currentId].length &&
            chatMessage[currentId].map(message => <Message message={message} key={message.id} />)}
        </div>
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
          <Button inline type="primary" onClick={sendMessage}>
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
