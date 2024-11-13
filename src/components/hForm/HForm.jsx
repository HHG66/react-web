/*
 * @Author: HHG
 * @Date: 2024-08-26 14:17:48
 * @LastEditTime: 2024-11-13 20:18:55
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\hForm\HForm.jsx
 * @文件说明:
 */
import { Button, Checkbox, Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
// import registerConfig from './register.jsx';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const HForm = ({ columns }) => {
  // console.log(onFinish);

  console.log(columns, 'columns');

  const [formColumns, serColumns] = useState([]);
  // const formData = {
  //   onFinish: () => {},
  // };
  useEffect(() => {
    console.log('初始化渲染');
    if (columns) {
      serColumns(columns);
      // throw new Error('请传入配置');
      console.log('------');
      return;
    }
    // formData.columns &&
    //   formData.columns.map((field) => {
    //     registerConfig.resister(field.type, components[field.type]);
    //   });
  }, [columns]);
  console.log(formColumns);

  // console.log('HForm');
  // const components = (field) => {
  //   return {
  //     input: <Input placeholder="Basic usage" />,
  //     select: <Select
  //       defaultValue="lucy"
  //       options={field.options}
  //     />,
  //   }[field.type]
  // }
  const InputComponent = (props) => {
    console.log(props);
    // return < Input placeholder={props.placeholder} prefix={ props.prefix ? props.prefix.icon : {}} />
    return <Input {...props} />;
  };
  const PasswordComponent = (props) => {
    delete props.validateTrigger;
    return <Input.Password {...props} />;
  };
  PasswordComponent.propTypes = {
    validateTrigger: PropTypes.isRequired,
  };
  const components = {
    input: InputComponent,
    // password: PasswordComponent,
    // button: ButtonComponent,
    // select: SelectComponent,

    password: PasswordComponent,
    button: (props) => {
      // eslint-disable-next-line react/prop-types
      let styletype = props.styletype ? props.styletype : 'primary';
      let type = styletype || 'primary';
      return (
        <Button {...props} type={type}>
          {/* eslint-disable-next-line react/prop-types */}
          {props.text}
        </Button>
      );
    },
    select: (props) => {
      // eslint-disable-next-line react/prop-types
      return <Select defaultValue="" options={props.options} />;
    },
  };

  // useEffect(() => {
  //   config.columns.map((field) => {
  //     registerConfig.resister(field.type, components[field.type])
  //   })
  //   // createFormConfig()
  //   console.log("resister", registerConfig);

  // }, [config])

  // createFormConfig()
  // console.log('resister', registerConfig);
  // const formComponent = (field) => {
  //   let Compontent = components[field.type] || (() => ("111"))
  //   return <Compontent {...field}></Compontent>
  // }
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  return (
    <>
      <Form
        style={{
          padding: 8,
        }}
        onFinish={onFinish}
        // onFinish={onFinish}
      >
        {formColumns &&
          formColumns.map((field) => {
            return (
              <FormItem
                key={field.name + field.type}
                label={field.label}
                name={field.name}
                validateTrigger={field.validateTrigger}
                {...field.item}
              >
                {console.log(field)}
                {/* <field.type ></field.type> */}
                {/* {formComponent(field)} */}
                {/* 注册表中获取 */}
                {/* {registerConfig.componentMap[field.type](field)} */}
                {components[field.type](field)}
              </FormItem>
            );
          })}
      </Form>
    </>
  );
};
HForm.propTypes = {
  columns: PropTypes.array.isRequired,
  onFinish: PropTypes.func, // 正确使用 PropTypes.func 来验证函数类型
};

export default HForm;
