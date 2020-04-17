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
import { LabelValue } from './index';

import styles from './PopupContent.less';

interface IProps {
  options?: LabelValue[]
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
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const data = transformData(options, tagsValue);
    if (tagsValue && tagsValue.length === 0) {
      setDataSource([{ label: '无', value: 'nothing', selected: true }, ...options]);
    }
    if (tagsValue && tagsValue.length) {
      let newDataSource = initOptions.map((ele: LabelValue) => {
        const value = ele.value;
        const isSelected = tagsValue.findIndex((e: LabelValue) => e.value === value);
        if (isSelected > -1) {
          return { ...ele, selected: true };
        }
        return ele;
      });
      setDataSource(newDataSource);
    }
    if (!tagsValue) {
      setDataSource(initOptions);
    }
    // setDataSource(data);
  }, [tagsValue]);

  const transformData = (options: LabelValue[], value: string[]) => {
    return []
  };

  const handleTag = (tag: LabelValue, index: number) => {
    const { label, value, selected } = tag;
    if (value === 'nothing') {
      onChange([]);
      return onDismiss();
    }
    if (value === 'other') {
      if (!selected) {
        setTimeout(() => {
          inputRef && inputRef.current && inputRef.current.focus();
        }, 100);
      }
      if (selected) {
        // 清空input text
        onTextChange('');
      }
    }
    const newData = [...dataSource];
    const firstObj = newData[0];
    // const lastObj = newData[newData.length - 1];
    newData[0] = { ...firstObj, selected: false };
    // newData[newData.length - 1] = { ...lastObj, selected: false };
    newData[index] = { ...tag, selected: !selected };
    // 提取已经选择的obj
    let selectedTags = filterData(newData)
    const result = selectedTags.length ? selectedTags : null;
    onTagsChange(result);
  }

  // 筛选selected
  const filterData = (data: LabelValue[]) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.selected) {
        result.push({ label: element.label, value: element.value });
      }
    }
    return result;
  }

  const handleTextChange = (value: any) => onTextChange(value);

  const visible =
    dataSource &&
    dataSource.length > 0 &&
    dataSource[dataSource.length - 1]['selected'] &&
    dataSource[dataSource.length - 1]['value'] === 'other';

  return (
    <div className={styles.content}>
      <ul className={styles.list}>
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map(({ value, label, selected }: LabelValue, index: number) => (
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
