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

export function getFields(fields: any[]) {
  let result = [];
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
    const obj = { id: element.id, type: element.type }
    if (element.type) {
      result.push(obj);
    }
    if (element.children) {
      result.push(...getFields(element.children));
    }
  }
  return result;
}

