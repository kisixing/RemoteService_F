import React, { useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import { InputItem, DatePicker, Radio } from '@/components/antd-mobile';

function MapList({ id, label, type, charactertype, required, placeholder, onChange = () => {}, hide, ...rest }: any) {
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
  )
}

const FetusForm = ({ value = {}, dataSource = [], onChange = () => {} }: any) => {
  // const data = setValues(dataSource, value);
  const [data, setData] = useState([]);

  useEffect(() => {
    setValues(dataSource, value);
  }, [onChange]);

  // 赋值
  const setValues = (data: any, value: any) => {
    let newData: any = [...data];
    for (let i = 0; i < data.length; i++) {
      const id = data[i]['id'];
      newData[i]['value'] = value[id];
    }
    console.log('ooooooooo', value, newData);
    setData(newData);
    // return newData;
  }

  const handleChange = (val: any, id: string) => {
    console.log('value', val, id);
    let newValue = { ...value };
    newValue[id] = val;
    // rc-form onChange
    onChange(newValue);
  };

  return (
    <List className={'styles.list'}>
      {data && data.map((item: any) => {
        return <MapList key={item.id} onChange={handleChange} {...item} />;
      })}
    </List>
  )
};

export default FetusForm;
