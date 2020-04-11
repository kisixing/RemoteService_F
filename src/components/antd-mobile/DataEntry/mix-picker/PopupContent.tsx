import React, { useState, useEffect } from 'react';
import { TextareaItem } from 'antd-mobile';
import classNames from 'classnames';
import { intersection } from 'lodash';
import TouchFeedback from 'rmc-feedback';
import { labelValue } from './index';
import styles from './PopupContent.less';

const RADIO_TAGS = ['无', '没有', '不清楚', '不知道', '不了解'];

interface IProps {
  options: labelValue[]
  multiple?: boolean
  placeholder?: string
  tagsValue?: string[]
  textValue?: string
  onTagChange?: (value: any) => void
  onTextChange?: (value: any) => void
}

function PopupContent({
  options = [],
  placeholder,
  onTagChange = () => {},
  onTextChange = () => {},
  textValue = '',
  tagsValue = [],
}: IProps) {
  const [dataSource, setDataSource] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const data = transformData(options, tagsValue);
    setDataSource(data);
    // 判断是否有选择'无'，'没有'等选项
    setDisabled(isInput(data));
  }, [tagsValue]);

  /**
   * 处理options，增加selected属性
   * @param options all tabs
   * @param value selected tabs
   */
  const transformData = (options: labelValue[], value: string[]) => {
    let result: any = [];
    for (let i = 0; i < options.length; i++) {
      const element_i = options[i];
      let selected = false;
      for (let j = 0; j < value.length; j++) {
        const element_j = value[j];
        if (element_j === element_i.value) {
          selected = true;
        }
      }
      result.push({ ...element_i, selected });
    }
    return result;
  };

  // 判断input组件是否可输入
  const isInput = (options: labelValue[]) => {
    let selectedTags: string[] = [];
    options.forEach((element: labelValue) => {
      const { label, selected } = element;
      if (selected) {
        selectedTags.push(label);
      }
    });
    const common = intersection(selectedTags, RADIO_TAGS);
    if (common.length) {
      return true;
    }
    return false;
  }

  const handleTabs = ({ label, value, selected }: labelValue, index: number) => {
    const clickTag = options[index];
    if (RADIO_TAGS.includes(label)) {
      const newTagsValue = [clickTag.value];
      onTagChange(newTagsValue);
      onTextChange('');
      return;
    }
    let newTagsValue = [...tagsValue];
    // 取消’无‘，’没有‘等的选择
    dataSource.forEach((element: labelValue) => {
      const { label, value, selected } = element;
      if (selected && RADIO_TAGS.includes(label)) {
        newTagsValue.splice(newTagsValue.findIndex(e => e === value), 1);
      }
    });
    // tagsValue是否含有clicktag，有(i > -1)则取消选择，无(i === -1)则增加选择
    const i = tagsValue.findIndex((e: string) => e === clickTag.value);
    if (i > -1) {
      // tagsValue含有clickTag，取消选择
      newTagsValue = [...newTagsValue.slice(0, i), ...newTagsValue.slice(i + 1)];
    } else {
      // tagsValue无clickTag，增加选择
      newTagsValue.push(clickTag.value);
    }
    onTagChange(newTagsValue);
  };

  return (
    <>
      <ul className={styles.wrapper}>
        {dataSource &&
          dataSource.length > 0 &&
          dataSource.map((item: labelValue, index: number) => (
            <TouchFeedback key={item.value} activeClassName="rmc-picker-popup-item-active">
              <li
                className={classNames(styles.item, { [styles.selected]: item.selected })}
                style={{ fontSize: item.label.length > 4 ? '0.24rem' : '0.26rem' }}
                onClick={() => handleTabs(item, index)}
              >
                {item.label}
              </li>
            </TouchFeedback>
          ))}
      </ul>
      <div className={styles.textarea}>
        <TextareaItem
          rows={3}
          labelNumber={3}
          placeholder={`请输入其他${placeholder}...`}
          value={textValue}
          onChange={onTextChange}
          disabled={disabled}
        />
      </div>
    </>
  );
}

export default PopupContent
