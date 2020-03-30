/**
 * 用于处理数字数组中的空值情况
 * 使用 null 代表 空值
 * key为空 则使用arr[i]
 * key不为空 使用arr[i][key]
 */

export function arrFill<T>(arr: Array<T>, key: string = ""): Array<T>{
  let index = 0;
  console.log(arr);
  const len = arr.length;
  if(key === "" && Object.prototype.toString.call(arr[i]) === '[object Number]'){
    for(let i = 0; i < len ; i++){
      if(arr[i] === null){
        arr[i] = 0;
      }else{
        if(index != i && index != i - 1){
          const d = (arr[i]-arr[index])/(i-index);
          for(let j = index + 1; j < i; j++ ){
            arr[j] = arr[index] + d*(j-index);
          }
        }else{
          index = i;
        }
      }
    }
  }else{
    for(let i = 0; i < len ; i++){
      if(arr[i][key] === null){

      }else{
        if(index != i && index != i - 1){
          const d = (arr[i][key]-arr[index][key])/(i-index);
          for(let j = index + 1; j < i; j++ ){
            arr[j][key] = arr[index][key] + d*(j-index);
          }
        }else{
          index = i;
        }
      }
    }
  }
  console.log(arr);
  return arr;
}
