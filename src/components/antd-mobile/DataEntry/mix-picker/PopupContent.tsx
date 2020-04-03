import React, { useState, useEffect } from 'react';
import { TextareaItem } from 'antd-mobile';
import classNames from 'classnames';

import styles from './PopupContent.less';

interface IProps {
  data: string[]
  value?: any[]
  multiple?: boolean
  onChange?: any
  placeholder?: string
}

function PopupContent({ data, value = [], multiple = false, placeholder, onChange = () => {} }: IProps) {
  const [dataSource, setDataSource] = useState([]);
  const [textarea, setTextarea] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    transformData(data, value);
    separatedData(data, value);
    separatedData(data, value);
  }, []);

  const transformData = (data = [], value = []) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      const element_i = data[i];
      let selected = false;
      for (let j = 0; j < value.length; j++) {
        const element_j = value[j];
        if (element_i === element_j) {
          selected = true;
        }
      }
      result.push({ value: element_i, selected });
    }
    setDataSource(result);
    // return result;
  };

  const separatedData = (data = [], value = []) => {
    let selectedTags: any = [];
    let textarea = '';
    value.forEach((i: string) => {
      const isTag = data.find((j: string) => j === i);
      if (!isTag) {
        textarea = i;
      } else {
        selectedTags.push(i);
      }
    });
    setTextarea(textarea);
    setSelectedTags(selectedTags);
    // return result;
  };

  const getTextarea = (d = data, v = value) => {
    let result = '';
    v.forEach((i: string) => {
      const isTag = d.find((j: string) => j === i);
      if (!isTag) {
        result = i;
      }
    });
    return result;
  };

  const getSelectedTags = (d = data, v = value) => {
    let result: any[] = [];
    v.forEach((i: string) => {
      const isTag = d.find((j: string) => j === i);
      if (isTag) {
        result.push(i);
      }
    });
    return result;
  };

  interface P { value: string, selected: boolean };

  const handleSelect = (object: P) => {
    const clickTag = object.value;
    let newDataSource = [];
    let newSelectedTags = [];
    let newValue = [];
    if (['无', '没有', '不清楚', '不知道', '不了解'].includes(clickTag)) {
      // tab === '无'/'没有'/'不清楚'/'不知道'
      newDataSource = dataSource.map((e: P) => {
        let selected = false;
        if (e.value === clickTag) {
          selected = true;
        }
        return { value: e.value, selected };
      });
      newSelectedTags = [clickTag];
      newValue = [...newSelectedTags];
      setDataSource(newDataSource);
      setSelectedTags(newSelectedTags);
      setTextarea('');
      onChange(newValue);
    } else if (multiple) {
      // 多选
      newDataSource = dataSource.map((e: P) => {
        let selected = e.selected;
        if (['无', '没有', '不清楚', '不知道', '不了解'].includes(e.value)) {
          selected = false;
        }
        if (e.value === clickTag) {
          selected = !e.selected;
        }
        return { value: e.value, selected };
      });
      // 取选中的array value
      let filterValue = newDataSource.filter(({ selected }) => selected);
      newSelectedTags = filterValue.map(({ value }) => value);
      // value值
      newValue = [...newSelectedTags];
      newValue.push(textarea)
      setDataSource(newDataSource);
      setSelectedTags(newSelectedTags);
      onChange(newValue);
    } else {
      // 单选
      newDataSource = dataSource.map((e: P) => {
        let selected = false;
        if (e.value === clickTag) {
          selected = true;
        }
        return { value: e.value, selected };
      });
      newSelectedTags = [clickTag];
      newValue = [clickTag];
      newValue.push(textarea);
      setDataSource(newDataSource);
      setSelectedTags(newSelectedTags);
      onChange(newValue);
    }
  };

  const handleChange = (v: string) => {
    setTextarea(v);
    const value = [...selectedTags];
    value.push(v);
    onChange(value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map(({ value, selected }) => (
            <div
              key={value}
              className={classNames(styles.item, { [styles.selected]: selected })}
              onClick={() => handleSelect({ value, selected })}
            >
              {value}
            </div>
          ))}
      </div>
      <div className={styles.textarea}>
        <TextareaItem
          rows={3}
          labelNumber={3}
          placeholder={`其他${placeholder}...`}
          value={textarea}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default PopupContent
