import React, { useState } from 'react';
import HForm from '@/components/hForm/index.jsx';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Home = () => {
  const [formConfig, SetFormConfig] = useState({
    columns: [
      {
        name: 'username',
        type: 'input',
        placeholder: '请输入用户名',
        prefix: (
          <UserOutlined
            style={{
              color: 'rgba(0,0,0,.25)',
            }}
          ></UserOutlined>
        ),
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        item: {
          rules: [{ required: true, message: '请输入用户名' }],
        },
      },
      {
        name: 'password',
        type: 'password',
        placeholder: '请输入密码',
        prefix: (
          <LockOutlined
            className="site-form-item-icon"
            style={{ color: 'rgba(0,0,0,0.25)' }}
          />
        ),
        validateTrigger: 'onBlur',
        item: {
          rules: [
            // { required: true, message: '请输入密码' },
            {
              validator: (rule, value) => {
                if (
                  typeof Number(value) === 'number' &&
                  !isNaN(Number(value))
                ) {
                  return Promise.reject(new Error('请输入复杂密码'));
                }
                return Promise.resolve();
              },
            },
          ],
        },
      },
      {
        name: 'eeee',
        type: 'keyword',
        placeholder: '请输入关键词',
        validateTrigger: 'onBlur',
        option:[
          {value:'1',label:"1"},
          {value:'2',label:"2"},
        ],
        // autoSelect:false,
        addItem:(value)=>{
          console.log('1---------------');
        }
        // item: {
        //   rules: [
        //     // { required: true, message: '请输入密码' },
        //     {
        //       validator: (rule, value) => {
        //         if (
        //           typeof Number(value) === 'number' &&
        //           !isNaN(Number(value))
        //         ) {
        //           return Promise.reject(new Error('请输入复杂密码'));
        //         }
        //         return Promise.resolve();
        //       },
        //     },
        //   ],
        // },
      },
      
      {
        name: 'submit',
        type: 'button',
        styletype: 'dashed',
        text: '提交',
        className: 'login-form-button login-btn',
        htmlType: 'submit',//是否表单提交
        item: {
          labelAlign: 'right',
          className: 'login-button-item',
        },
        // onClick: () => {
        //   console.log("---------------");
        // },
      },
    ],
  });
  let onFinish = (forData) => {
    console.log(forData);
  };
  return (
    <>
      <h2>系统帮助自己处理复杂繁琐的账单</h2>
      <HForm {...formConfig} onFinish={onFinish}></HForm>
    </>
  );
};
export default Home;
