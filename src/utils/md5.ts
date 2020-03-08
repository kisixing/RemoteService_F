/** 
 * 用于md5加密对比
 * 应用于app跳转至该项目页面验证
 * */ 
var md5 = require('blueimp-md5');

const P:number = 8;
export default function(s:string):string {
  const t = Object.prototype.toString.call(s);
  if(t !== '[object String]'){
    console.error(`expect String but ${t}`);
    return '';
  } 
  return md5(md5(s).substring(s.length % P));
}
