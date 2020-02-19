## Lianmp FontEnd

公众号重构项目

-------------------------------------

### 原型图

  原型参考ui文件夹内容

### 基本需求规划

  > 入口设计

  主要分为两类，微信公众号和第三方app

  1. 微信公众号，baseurl/#/?code=openid

  2. 第三方app

  |参数|说明|类型|默认值|
  |-|-|-|-|
  |code|用户id|
  |usermcno|就诊卡id|
  |userInfo|用户信息，仅用于从第三方app进入时有效|object|undefined|
  |...||||

  > 权限问题

  根据路由区分权限，目前只要分为两部分，个人信息和孕妇学校

  1. 个人信息，大部分页面都属于，包括围产、产检、报告、随访以及孕册工具。这些都需要孕妇已经建档的情况下才能操作浏览

  2. 知识库、孕妇学校等宣教页面不需要权限即可访问

  > **围产档案（重点）**

  简表可由配置文件设置，表单联动问题。
  设计要求：简化表单录入难度及录入时间，降低输入成本，以选择输入为主，尽量避免键盘输入。

  1. rc-form方案[参考链接](http://react-component.github.io/form/) 简单的根据表单配置文件config.js循环出各类组件。根据antd-mobile Data Entry组件进行二次封装

  2. UForm方案[参考链接](https://uformjs.org/#/MpI2Ij/dNFzFyTb)
   
  3. 难点
    表单域联动、动态表单

  > 宣教文章、孕妇学校

  有限加载列表，点击按钮加载更多或者向上滑动加载更多内容（10条/页）

  > **业务组件开发**

  1. 简表组件。

  - 地址输入（address-input)，省市区选择，详细键盘输入。保存格式：`广东省 广州市 天河区, 天河东路480号`
  - 数字输入（number-input），左右增加 `-` `+` 按钮
  - 输入联系选择输入（associating-input），根据输入字段，提供常见列表选项
  - 选择器 可参考[antd-mobile](https://mobile.ant.design/components/picker-cn/)
      单选（picker）
      多选（multiple-picker）
  - Radio单选框，Checkbox复选框，要求这两种组件样式表现一致
  - 其他常规输入组件参考[antd-mobile](https://mobile.ant.design/docs/react/introduce-cn)Data Entry即可

  1. PDF阅读组件（pdf.js）

  2. 文章、视频列表组件

  3. 随访问卷

  > **数据结构**

  鉴于目前简表数据保存格式存在的问题：

  - 基本都是string类型
  - 没有统一的字典
  - 数据扩展性偏差
  
  解决方案：

  - 区分合适的数据类型，string、number、array、bool
  - picker、multiple-picker组件
    string类型，如：过敏史，单选 `青霉素`， 多选 `青霉素,头孢,花生`；
    array类型，如：过敏史，单选 `[青霉素]`， 多选 `[青霉素,头孢,花生]`
    数据源`options`选项配置方案：

    ```javascript
      [
        { label: '青霉素', value: '青霉素' },
        { label: '头孢', value: '头孢' },
        { label: '花生', value: '花生' },
      ]
    ```
    提交数据格式：
      string类型 `allergy: '青霉素'` 或 `allergy: '青霉素,头孢'`
      array类型 `allergy: [青霉素]` 或 `allergy: [青霉素,头孢]`
  - DatePicker组件，
    常规时间选择，string类型，`2008-08-02 12:00:00`
    可以考虑增加时间区间选择，`2008-08-08 12:00:00,2009-06-01 12:00:00`，array类型 `[2008-08-08 12:00:00,2009-06-01 12:00:00]`
  - bool类型组件
  对于`有` `无` 和 `是` `否` 选择，数据源`options`选项配置方案：

  ```javascript
    [
      { label: '有（是）', value: true },
      { label: '无（否）', value: false },
    ]
  ```
  
  提交数据格式为bool类型，取 `true` 或 `false`，如：`isSmoking: true`
  
### 技术选型

  应用框架：[umi](https://umijs.org/zh/)及其提供的[脚手架](https://github.com/umijs/create-umi)

  知识点：[DvaJS](https://dvajs.com/guide/)、 [TypeScript](http://www.typescriptlang.org/docs/home.html)、[Ant Design Mobile](https://mobile.ant.design/index-cn)

  其他：

  1. airbnb JavaScript [代码规范](https://github.com/airbnb/javascript)
  2. git commit规范 可参考[Angular提交准则](https://juejin.im/post/5d0b3f8c6fb9a07ec07fc5d0) (暂时不作要求)

### 项目进度规划

  1. 架构设计（5人/天）
    权限、路由、数据可持续化设计、入口设计

  2. 组件开发（10人/天）
    Ant Design Mobile输入组件二次封装、自定义输入组件开发

  3. 业务开发。（30人/天）
    根据UI原型，开发webapp，mock.js规划符合预期的api接口

  4. api接口接入、调试
    待后台接口开发进度确定

  5. 测试
