import _ from 'lodash';

/**
 * 获取该建档表单的每一个key
 * @export
 * @param {array} fields
 * @returns
 */
export function getFormKeys(fields: any[]) {
  let keys = [];
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
    if (element.type) {
      keys.push(element.id);
    }
    if (element.children) {
      keys.push(...getFormKeys(element.children));
    }
  }
  return keys;
}

/**
 * 获取与api获取的values相对应的属性，即实际提交保存的keys
 * @param keys 表单实际的keys，有方法getFormKeys获取
 */
export function getValueKeys(keys: any) {
  const newKeys = getFormKeys(keys);
  let result = [];
  for (let i = 0; i < newKeys.length; i++) {
    const element = newKeys[i];
    if (element.includes('.')) {
      // 以是否有’.‘分隔符判断
      const prefixKey = element.split('.')[0];
      result.push(prefixKey);
    } else {
      result.push(element);
    }
  }
  // 去重
  const uniqueResult = Array.from(new Set(result));
  return uniqueResult;
}

export function getRealData(values: any, fields: any) {
  // 获取values实际上的keys
  const keys = getValueKeys(fields);
  // 截取本业表单需要的values值
  let result = _.pick(values, keys);
  return result;
}

/**
 * 平铺表单配置fields
 * @param fields
 */
export function getFields(fields: any[]) {
  let result = [];
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
    if (element.type) {
      result.push(element);
    }
    if (element.children) {
      result.push(...getFields(element.children));
    }
  }
  return result;
}

/**
 * 整理适合表单赋值
 * @param values 接口获取的原始值
 * @param fields 表单配置信息
 */
export function assignmentData(values: any, fields: any[]) {
  // 截取本业表单需要的values值
  let result = getRealData(values, fields);
  // 平铺表单配置fields
  const fieldsArray = getFields(fields);
  for (let i = 0; i < fieldsArray.length; i++) {
    const element = fieldsArray[i];
    const id = element.id;
    if (id.includes('.')) {
      // 带'.'标记的id
      const ids = id.split('.');
      if (element.type === 'radio-input' || element.type === 'picker-input') {
        // 这类表单赋值格式 --> { dysmenorrhea: boolean | string, dysmenorrheaNote: '' }
        let obj = {};
        // 父级属性key
        const parentKey: string = ids[0];
        // 子属性childKeys
        const childKeys: string[] = ids[1].split('&');
        obj[childKeys[0]] = values[parentKey][childKeys[0]];
        obj[childKeys[1]] = values[parentKey][childKeys[1]];
        result = { ...result, [id]: obj }
      } else {
        // 其他的type类型（大概率不会出现multiple-picker类型的组件）
        // 拆分id
        result = { ...result, [id]: values[ids[0]][ids[1]] };
      }
    }
    if (!id.includes('.')) {
      // 不带'.'标记的id
      if (element.type === 'radio-input' || element.type === 'picker-input') {
        // 这类表单赋值格式 --> { dysmenorrhea: boolean | string, dysmenorrheaNote: '' }
        let obj = {};
        // 子属性childKeys
        const childKeys: string[] = id.split('&');
        obj[childKeys[0]] = values[childKeys[0]];
        obj[childKeys[1]] = values[childKeys[1]];
        result = { ...result, [id]: obj }
      }
      if (
        element.type === 'multiple-picker' ||
        (element.type === 'multiple-picker' && element.cols === 1 && element.valueFormat === 'labelInValue')
      ) {
        let array = [];
        const object = values[id];
        if (object) {
          const options = element.options;
          array = options.filter((e: any) => object[e.value] === true);
        }
        result = { ...result, [id]: array };
      }
    }
  }

  // 删除没有对应表单域的对象，如personalProfile、partnerProfile、menstrualHistory
  for (const key in result) {
    // 在fieldsArray找到id=key的对象元素
    const index = fieldsArray.findIndex((e: any) => e.id === key);
    if (index === -1) {
      delete result[key]
    }
  }
  return result;
};

/**
 * 整理符合提交需要的数据格式
 * @param values 表单域填写的值
 * @param fields 表单结构
 */
export function submittedData(values: any, fields: any[]) {
  // rc-form获取的原始数据
  let result = { ...values };
  const fieldsArray = getFields(fields);
  for (let i = 0; i < fieldsArray.length; i++) {
    const element = fieldsArray[i];
    const id = element.id;
    const value = values[id];
    if (element.type === 'radio-input' || element.type === 'picker-input') {
      // 输入类型type=radio-input时，输出value格式为{ key1: '' , key2: '' }
      if (id.includes('.')) {
        // 带'.'标记的id
        const ids = id.split('.');
        // 父级属性key
        const parentKey: string = ids[0];
        // 子属性childKeys，含&字符
        const childKey: string = ids[1];
        const parentValue = result[parentKey];
        const obj = values[parentKey][ids[1]];
        result = { ...result, [parentKey]: { ...parentValue, ...obj } };
        delete result[parentKey][childKey];
      }
      if (!id.includes('.')) {
        // 不带'.'标记的id
        result = { ...result, ...value };
        delete result[id];
      }
    }
    if (element.type === 'multiple-picker') {
      let obj = {};
      if (value) {
        value.forEach((ele: any) => {
          obj[ele.value] = true;
          if (ele.value === 'other') {
            obj['otherNote'] = ele.note;
          }
        });
      }
      result = { ...result, [id]: value ? obj : null };
    }
    // if ((element.type === 'picker' && element.cols === 1 && element.valueFormat === 'labelInValue') || ) {

    // }
  }
  console.log('rc-form获取的原始数据', values, result);
  return result;
}

export function setFormId(original: any, values: any) {
  let result = { ...values };
  for (const key in original) {
    const element = original[key];
    if (element && element.id) {
      result[key]['id'] = element.id;
    }
  }
  return result;
}

// 获取需要进行value取值转换的key
export function getSpecialKeys(data: any[]) {
  const result = data.filter((e: any) => {
    const type = e.type === 'picker' || e.type === 'multiple-picker';
    const format = e.valueFormat === 'labelInValue';
    return type && format;
  });
  return result;
}
