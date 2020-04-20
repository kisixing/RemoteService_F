import React, { useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import { InputItem, DatePicker, Radio } from '@/components/antd-mobile';

// 读取配置文件
const { history } = window.configuration;
const fields = history.data[0]['children'].filter((e: any) => e.id === 'child')[0]['data'];

function MapList({
  id,
  label,
  type,
  charactertype,
  required,
  placeholder,
  onChange = () => {},
  hide,
  ...rest
}: any) {
  if (hide) {
    return null;
  }
  return (
    <>
      {type === 'radio' ? (
        <Radio
          key={id}
          name={label}
          required={required}
          charactertype={charactertype}
          onChange={(e: any) => onChange(e, id)}
          {...rest}
        >
          {label}
        </Radio>
      ) : type === 'date-picker' ? (
        <DatePicker
          key={id}
          name={label}
          required={required}
          placeholder={placeholder}
          onChange={e => onChange(e, id)}
          {...rest}
        >
          {label}
        </DatePicker>
      ) : (
        <InputItem
          key={id}
          style={{ textAlign: 'right' }}
          name={label}
          required={required}
          charactertype={charactertype}
          placeholder={placeholder}
          onChange={e => onChange(e, id)}
          {...rest}
        >
          {label}
        </InputItem>
      )}
    </>
  );
}

const FetusForm = ({ value = {}, onChange = () => {} }: any) => {
  // 赋值
  const setValues = (data: any, value: any) => {
    let newData: any = [...data];
    for (let i = 0; i < data.length; i++) {
      const id = data[i]['id'];
      newData[i]['value'] = value[id];
    }
    return newData;
  }

  const [data, setData] = useState(setValues(fields, value));

  const handleChange = (val: any, id: string) => {
    let newValue = { ...value };
    newValue[id] = val;
    onChange(newValue); // rc-form onChange
    formVisible(id, val) // 表单显示隐藏处理
  };

  // 显示隐藏
  const formVisible = (id: string, val: any) => {
    let newData = [...data];
    if (id === 'childLiving') {
      // 健在时显示
      const sequelaIndex = newData.findIndex((e: any) => e.id === 'sequela');
      newData[sequelaIndex]['hide'] = !val;
      const childDeformityIndex = newData.findIndex((e: any) => e.id === 'childDeformity');
      newData[childDeformityIndex]['hide'] = !val;
      // 死亡时显示
      const childDeathNoteIndex = newData.findIndex((e: any) => e.id === 'childDeathNote');
      newData[childDeathNoteIndex]['hide'] = val;
    }
  }

  return (
    <List className={'styles.list'}>
      {data && data.map((item: any) => {
        return <MapList key={item.id} onChange={handleChange} {...item} />;
      })}
    </List>
  )
};

export default FetusForm;
