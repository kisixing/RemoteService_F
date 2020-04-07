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

import styles from './PopupContent.less';

interface IProps {
  dataSource?: string[]
  onChange?: (value: any) => void
  onTabsChange?: (value: any) => void
  onTextChange?: (value: string) => void
  onDismiss?: () => void
  placeholder?: string
  tabsvalue?: any[]
  textValue?: string
}

function PopupContent({
  dataSource = [],
  tabsvalue = [],
  textValue = '',
  placeholder,
  onDismiss = () => {},
  onTabsChange = () => {},
  onTextChange = () => {},
  onChange = () => {},
}: IProps) {
  const inputRef = useRef(null);
  const tabs = [{ label: '无', value: 'nothing' }, ...dataSource];
  const [selectedTags, setSelectedTags] = useState<any>(tabs);
  const [text, setText] = useState(textValue);

  useEffect(() => {}, []);

  const handleTagSelect = (value: string, selected: boolean, index: number) => {
    if (value === 'nothing') {
      setSelectedTags([{ label: '无', value: 'nothing', selected: !selected }, ...dataSource]);
      onChange([]);
      onDismiss();
    } else if (value === 'other') {
      const t: any = [...tabs];
      t[index] = { label: '其他', value: 'other', selected: !selected };
      setSelectedTags(t);
      setTimeout(() => {
        inputRef && inputRef.current && inputRef.current.focus();
      }, 100);
    } else {
      const t = [...selectedTags];
      const item = t[index];
      t[0] = { label: '无', value: 'nothing', selected: false };
      t[t.length - 1] = { label: '其他', value: 'other', selected: false };
      t[index] = { ...item, selected: !selected };
      setSelectedTags(t);
    }
  };

  const handleTextChange = (value: any) => setText(value);

  const visible = selectedTags && selectedTags.length > 0 && selectedTags[selectedTags.length - 1]['selected'];

  return (
    <div className={styles.content}>
      <ul className={styles.list}>
        {selectedTags &&
          selectedTags.length > 0 &&
          selectedTags.map(({ value, label, selected }: any, index: number) => (
            <TouchFeedback key={value} activeClassName="rmc-picker-popup-item-active">
              <li
                style={{ fontSize: label.length > 4 ? '.24rem' : '.26rem' }}
                className={classNames(styles.item, { [styles.selected]: selected })}
                onClick={() => handleTagSelect(value, selected, index)}
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
            value={text}
            onChange={handleTextChange}
          />
        ) : null}
      </div>
    </div>
  );
}

export default PopupContent
