import React from 'react';
import { WhiteSpace, Tag, IconFont, Button } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';

function Example() {
  return (
    <div style={{ padding: '0.3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tag>default</Tag>
        <Tag color="#ddd">default</Tag>
        <Tag color="#f00">default</Tag>
        <Tag size="small">tag</Tag>
        <Tag size="small" color="#ddd">tag</Tag>
        <Tag size="small" color="#f00">tag</Tag>
      </div>

      <p />
      <Button>default button</Button>
      <WhiteSpace />
      <Button type="primary">primary button</Button>
      <WhiteSpace size="sm" />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button inline>button</Button>
        <Button inline type="primary">button</Button>
        <Button inline disabled type="primary">button</Button>
        <Button inline type="ghost">button</Button>
      </div>
      <div>small size</div>
      <Button size="small">default button</Button>
      <WhiteSpace />
      <Button type="primary" size="small">primary button</Button>
      <WhiteSpace size="sm" />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
        <Button inline size="small">inline</Button>
        <Button inline type="primary" size="small">inline</Button>
        <Button inline disabled type="primary" size="small">inline</Button>
        <Button inline type="ghost" size="small">inline</Button>
        <Button inline type="warning" size="small">inline</Button>
      </div>
      <div>注意type取值</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <IconFont type="tongzhi" />
        <IconFont type="doctor" />
        <IconFont type="visit" />
        <IconFont type="order" />
        <IconFont type="fetus" />
        <IconFont type="serve" />
        <IconFont type="refund" />
        <IconFont type="ultrasonic" />
        <IconFont type="back" />
        <IconFont type="device" />
      </div>

      <BackButton />
    </div>
  );
}

export default Example;
