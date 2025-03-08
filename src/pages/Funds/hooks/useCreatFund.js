/*
 * @Author: HHG
 * @Date: 2025-02-26 09:33:44
 * @LastEditTime: 2025-03-08 13:22:14
 * @LastEditors: 韩宏广
 * @FilePath: /personal-finance-web/src/pages/Funds/hooks/useCreatFund.js
 * @文件说明: 
 */
/*
 * @Author: HHG
 * @Date: 2025-02-25 14:49:58
 * @LastEditTime: 2025-02-26 09:25:13
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\Funds\hooks\usecreatFund.jsx
 * @文件说明:基金新增的hooks，包括model的显示和隐藏，表单的配置，表单的提交
 */
import { options } from 'less';
import { useState } from 'react';
export default () => {
  const [creatFundModal, setCreatFundModal] = useState(false);

  const formConfig = {
    columns: [
      // {
      //   name: 'creatfundType',
      //   label: '创建类型',
      //   type: 'checkbox',
      //   // valuePropName: "checked",
      //   defaultValue:false,
      //   options: [
      //     {
      //       label: "手动",
      //       value: "01"
      //     },
      //   ],
      //   item: {
      //     // rules: [{ required: true, message: '请输入基金名称' }],
      //   },
      // },
      {
        name: 'creatfundType',
        label: '创建类型',
        type: 'radio',
        // valuePropName: "checked",
        defaultValue:false,
        options: [
          {
            label: "手动",
            value: "01"
          },
          {
            label: "自动",
            value: "02"
          },
        ],
        item: {
          // rules: [{ required: true, message: '请输入基金名称' }],
        },
      },
      
      {
        name: 'fundName',
        label: '基金名称',
        type: 'input',
        item: {
          rules: [{ required: true, message: '请输入基金名称' }],
        },
      },
      {
        name: 'purchasingDate',
        label: '购买时间',
        type: 'date',
        item: {
          rules: [{ required: true, message: '请输入基金名称' }],
        },
      },
      {
        name: 'fundAmount',
        label: '基金金额',
        // step
        type: 'number',
        item: {
          rules: [{ required: true, message: '请输入购买金额' }],
        },
      },
      {
        type: 'button',
        styletype: 'primary',
        text: '提交',
        htmlType: 'submit',
        item: {
          className: 'fund-button-item',
        },
      },

    ],
  };
  //表单提交
  const createdModelHandleOk = (formData) => {
    console.log(formData);
    // console.log('data',moment(formData.purchasingDate).format('YYYY-MM-DD'));

  };
  return {
    creatFundModal, //model是否显示
    formConfig,
    setCreatFundModal, //设置model是否显示
    createdModelHandleOk,//表单提交
  };
};
