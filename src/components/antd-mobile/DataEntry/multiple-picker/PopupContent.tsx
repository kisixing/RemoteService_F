/*
 *    范围内的文字自动缩小字号
 *    autoFontSize($o)
 *    @param    $object    指向<h4><em></em></h4>的em
 *    需要双层结构，如<h4><em>text</em></h4>，且h4 要有white-space: nowrap;，em是行元素
 *    读取em自动撑开的宽度，em宽度比h3宽时就会调整
 */
// autoFontSize: function($o) {
//   var iCW = $o.width(),
//     $p = $o.parent(),
//     iPW = $p.width();

//   if (iCW > iPW) $o.css('fontSize', iPW * parseInt($p.css('font-size')) / iCW);    //h4宽度 / ( em宽度 / h4默认字体大小)
// }

import React, { useState, useEffect, useRef } from 'react';
import { TextareaItem } from 'antd-mobile';
import TouchFeedback from 'rmc-feedback';
import classNames from 'classnames';
import { labelValue } from './index';

import styles from './PopupContent.less';
import { LabeledValue } from 'antd/lib/select';

interface IProps {
  options?: labelValue[]
  onChange?: (value: any) => void
  onTagsChange?: (value: any) => void
  onTextChange?: (value: string) => void
  onDismiss?: (value?: any) => void
  placeholder?: string
  tagsValue?: any
  textValue?: string
}

function PopupContent({
  options = [],
  tagsValue,
  textValue,
  placeholder,
  onDismiss = () => {},
  onTagsChange = () => {},
  onTextChange = () => {},
  onChange = () => {},
}: IProps) {
  const inputRef = useRef(null);
  const initOptions = [{ label: '无', value: 'nothing' }, ...options];
  const [dataSource, setDataSource] = useState(initOptions);

  useEffect(() => {
    const data = transformData(options, tagsValue);
    console.log('select value', tagsValue, initOptions);
    if (tagsValue && tagsValue.length === 0) {
      setDataSource([{ label: '无', value: 'nothing', selected: true }, ...options]);
    }
    if (tagsValue && tagsValue.length) {
      let newDataSource = [];
      for (let i = 0; i <  initOptions.length; i++) {
        const value_i = initOptions[i];
        for (let j = 0; j < tagsValue.length; j++) {
          const value_j = tagsValue[j];
          if (value_i.value === value_j.value) {
            newDataSource.push({ ...value_i, selected: true });
          } else {
            newDataSource.push(value_i);
          }
        }
      }
      console.log('77777777777', newDataSource);
      setDataSource(newDataSource);
    }
    // setDataSource(data);
  }, [tagsValue]);

  const transformData = (options: labelValue[], value: string[]) => {
    return []
  };

  // const handleTagSelect = (value: string, selected: boolean, index: number) => {
  //   if (value === 'nothing') {
  //     setSelectedTags([{ label: '无', value: 'nothing', selected: !selected }, ...dataSource]);
  //     onChange([]);
  //     onDismiss();
  //   } else if (value === 'other') {
  //     const t: any = [...tags];
  //     t[index] = { label: '其他', value: 'other', selected: !selected };
  //     setSelectedTags(t);
  //     setTimeout(() => {
  //       inputRef && inputRef.current && inputRef.current.focus();
  //     }, 100);
  //   } else {
  //     const t = [...selectedTags];
  //     const item = t[index];
  //     t[0] = { label: '无', value: 'nothing', selected: false };
  //     t[t.length - 1] = { label: '其他', value: 'other', selected: false };
  //     t[index] = { ...item, selected: !selected };
  //     setSelectedTags(t);
  //   }
  // };

  const handleTag = (tag: labelValue, index: number) => {
    const { label, value, selected } = tag;
    if (value === 'nothing') {
      setDataSource([{ label, value, selected: !selected }, ...options]);
      onChange([]);
      onDismiss();
    } else if (value === 'other') {
      const newData = [...initOptions];
      newData[index] = { ...tag, selected: !selected };
      setDataSource(newData);
      // 提取已经选择的obj
      const selectedTags = [{ label: tag.label, value: tag.value }];
      const value = selectedTags.length ? selectedTags : null;
      console.log('456789', value);
      onTagsChange(value);
      setTimeout(() => {
        inputRef && inputRef.current && inputRef.current.focus();
      }, 100);
    } else {
      const newData = [...dataSource];
      const firstObj = newData[0];
      const lastObj = newData[newData.length - 1];
      newData[0] = { ...firstObj, selected: false };
      newData[newData.length - 1] = { ...lastObj, selected: false };
      newData[index] = { ...tag, selected: !selected };
      setDataSource(newData);
      // 提取已经选择的obj
      let selectedTags = [];
      for (let i = 0; i < newData.length; i++) {
        const element = newData[i];
        if (element.selected) {
          selectedTags.push({ label: element.label, value: element.value });
        }
      }
      const value = selectedTags.length ? selectedTags : null;
      onTagsChange(value);
      // 清空input text
      onTextChange('');
    }
  }

  const handleTextChange = (value: any) => onTextChange(value);

  const visible =
    dataSource && dataSource.length > 0 && dataSource[dataSource.length - 1]['selected'];

  return (
    <div className={styles.content}>
      <ul className={styles.list}>
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map(({ value, label, selected }: labelValue, index: number) => (
            <TouchFeedback key={value|| label} activeClassName="rmc-picker-popup-item-active">
              <li
                style={{ fontSize: label.length > 4 ? '.24rem' : '.26rem' }}
                className={classNames(styles.item, { [styles.selected]: selected })}
                onClick={() => handleTag({ label, value, selected }, index)}
              >
                {label}
              </li>
            </TouchFeedback>
          ))}
      </ul>
      <div className={styles.textarea} style={{ visibility: visible ? 'visible' : 'hidden' }}>
        {visible ? (
          <TextareaItem
            ref={inputRef}
            rows={2}
            placeholder={`如果选择了其他，请输入${placeholder}...`}
            value={textValue}
            onChange={handleTextChange}
          />
        ) : null}
      </div>
    </div>
  );
}

export default PopupContent
