/*
 * @Author: HHG
 * @Date: 2025-02-25 14:49:58
 * @LastEditTime: 2025-02-25 17:17:50
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\Funds\hooks\usecreatFund.jsx
 * @文件说明:
 */
import { useState } from 'react';
export default () => {
  const [creatFundModal, setCreatFundModal] = useState(false);

  const formConfig = {
    columns: [
      {
        name: 'hhhh',
        type: 'input',
        text: 'hhhh',
        item: {
          rules: [{ required: true, message: '请输入值' }],
        },
      },
      {
        type: 'button',
        styletype: 'primary',
        text: '提交',
        className: 'plan-form-button',
        htmlType: 'submit',
        item: {
          // labelAlign: 'right',
          // className: 'login-button-item',
        },
      },
    ],
  };
  //表单提交
  const createdModelHandleOk = (formData, test) => {
    console.log(formData);
    console.log(test);
    // formModel
    //   .validateFields()
    //   .then((values) => {
    //     console.log(values);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return {
    creatFundModal, //model是否显示
    setCreatFundModal, //设置model是否显示
    formConfig,
    createdModelHandleOk,
  };
};
