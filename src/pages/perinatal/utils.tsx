import _ from 'lodash';

/**
 * 获取建档表单的每一个key
 *
 * @export
 * @param {array} fields
 * @returns
 */
export function getKeys(fields: any[]) {
  let keys = [];
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
    if (element.type) {
      keys.push(element.id);
    }
    if (element.children) {
      keys.push(...getKeys(element.children));
    }
  }
  return keys;
}

export function getBlock(fields: any) {

}

/**
 * 平铺
 * @param fields
 */
export function getFields(fields: any[]) {
  let result = [];
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
    if (element.type && element.type !== 'block') {
      result.push(element);
    }
    if (element.children) {
      result.push(...getFields(element.children));
    }
  }
  return result;
}

export function assignmentData(values: any, fields: any[]) {
  // 对于特殊的表，提取出来比如personalProfile、partnerProfile
  let newValues = {};
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
  }



  const keys = getKeys(fields);
  let result = _.pick(values, keys);
  console.log('12345', result)
  const fieldsArray = getFields(fields);
  for (let i = 0; i < fieldsArray.length; i++) {
    const element = fieldsArray[i];
    const id = element.id;

    if (element.type === 'radio-input' || element.type === 'picker-input') {
      // 这类表单赋值格式 --> { dysmenorrhea: boolean | string, dysmenorrheaNote: '' }
      let obj = {};
      // 子表单属性
      const children = element.props;
      for (let j = 0; j < children.length; j++) {
        const item = children[j];
        obj[item.id] = values[item.id]
      }
      result = { ...result, [id]: obj }
    }
    if (element.type === 'multiple-picker') {
      let array = [];
      const object = values[id];
      if (object) {
        const options = element.options;
        array = options.filter((e: any) => object[e.value] === true);
      }
      result = { ...result, [id]: array };
    }
  }

  console.log('初始化赋值', result)
  return result;
};

/**
 * 整理符合提交需要的数据格式
 * @param values 表单域的值
 * @param fields 表单结构
 */
export function submittedData(values: any, fields: any[]) {
  let result = { ...values };
  const fieldsArray = getFields(fields);

  for (let i = 0; i < fieldsArray.length; i++) {
    const element = fieldsArray[i];
    const id = element.id;
    const value = values[id];
    if (element.type === 'radio-input' || element.type === 'picker-input') {
      // 输入类型type=radio-input时，输出value格式为{ key1: '' , key2: '' }
      result = { ...result, ...value };
      delete result[id];
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
  }
  return result;
}
