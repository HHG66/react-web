/*
 * @Author: HHG
 * @Date: 2024-08-26 14:17:48
 * @LastEditTime: 2025-01-06 16:14:21
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\hForm\HForm.jsx
 * @文件说明:
 */
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Tag,
  Divider,
  Space,
  DatePicker,
} from 'antd';
import FormItem from 'antd/es/form/FormItem';
// import registerConfig from './register.jsx';
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StepBackwardOutlined, PlusOutlined } from '@ant-design/icons';
import KeyWord from './components/keyWord';

const HForm = forwardRef(({ columns, onFinish, formProps }, ref) => {
  const [form] = Form.useForm();
  React.useImperativeHandle(ref, () => ({
    // 暴露 form 实例的方法，可以根据需要暴露更多方法或属性
    getFormInstance: () => form,
    // resetFields: () => form.resetFields(),
    // validateFields: () => form.validateFields(),
  }));
  const [formColumns, serColumns] = useState([]);
  let initialValues = {};
  columns.forEach((element) => {
    // debugger
    //keyWord 内部有设置了默认值逻辑，所以需要筛选出
    if (element.type !== 'keyword') {
      initialValues[element.name] = element.defaultValue;
    } else {
      if (element.defaultValue) {
        initialValues[element.name] = [
          {
            label: element.defaultValue,
            value: element.defaultValue,
          },
        ];
      } else {
        initialValues[element.name] = [];
      }
    }
  });

  console.log(initialValues);
  // debugger;

  useEffect(() => {
    if (columns) {
      serColumns(columns);
    }
  }, [columns]);

  const InputComponent = (props) => {
    return (
      <FormItem
        key={props.name}
        label={props.label}
        name={props.name}
        {...props.item}
      >
        <Input {...props} />
      </FormItem>
    );
  };
  const PasswordComponent = (props) => {
    delete props.validateTrigger;
    return (
      <FormItem
        key={props.name + props.type}
        label={props.label}
        name={props.name}
        {...props.item}
      >
        <Input.Password {...props} />
      </FormItem>
    );
  };

  const ButtonComponent = (props) => {
    let styletype = props.styletype ? props.styletype : 'primary';
    // let type = styletype || 'primary';
    return (
      <FormItem key={props.name + props.type}>
        <Button {...props} type={styletype} htmlType={props.htmlType}>
          {props.text}
        </Button>
      </FormItem>
    );
  };
  const SelectComponent = (props) => {
    return <Select options={props.options} />;
  };

  const datePickerComponent = (props) => {
    // return <DatePicker />
    return (
      <FormItem key={props.name + props.type} name={props.name}>
        <DatePicker
          onChange={props.onChange}
          style={{ width: props.item.width ? props.item.width : '100%' }}
        />
      </FormItem>
    );
  };

  const KeyWordComponent = (props) => {
    return (
      <KeyWord {...props} key={props.name + props.type} form={form}></KeyWord>
    );
  };
  const handleProp = (props) => {
    let handleProp = {};
    handleProp = {
      ...props,
    };
    delete handleProp.defaultValue;
    return handleProp;
    // {
    //   name: 'remark',
    //   type: 'input',
    //   placeholder: '请输入备注',
    //   label: '备注',
    //   option: [],
    //   defaultValue:""
    // },
  };
  const components = {
    input: InputComponent,
    password: PasswordComponent,
    button: ButtonComponent,
    select: SelectComponent,
    keyword: KeyWordComponent,
    date: datePickerComponent,
  };
  PasswordComponent.propTypes = {
    name: PropTypes.isRequired,
    type: PropTypes.isRequired,
    label: PropTypes.isRequired,
    item: PropTypes.any,
    validateTrigger: PropTypes.isRequired,
  };
  InputComponent.propTypes = {
    name: PropTypes.isRequired,
    type: PropTypes.isRequired,
    label: PropTypes.isRequired,
    item: PropTypes.any,
  };

  ButtonComponent.propTypes = {
    name: PropTypes.isRequired,
    type: PropTypes.isRequired,
    label: PropTypes.isRequired,
    item: PropTypes.any,
    styletype: PropTypes.any,
    htmlType: PropTypes.any,
    text: PropTypes.isRequired,
  };

  SelectComponent.propTypes = {
    name: PropTypes.isRequired,
    type: PropTypes.isRequired,
    label: PropTypes.isRequired,
    item: PropTypes.any,
    options: PropTypes.array,
  };

  return (
    <>
      <Form
        // style={{
        //   padding: 8,
        // }}
        onFinish={onFinish}
        form={form}
        initialValues={initialValues}
        // initialValues={{
        //   consumptionTypeName: 'weewwe',
        //   remark: '2',
        // }}
        {...formProps}
      >
        {formColumns &&
          formColumns.map((field) => {
            //handleProp处理一些单个组件不需要的设置
            return components[field.type](handleProp(field));
          })}
      </Form>
    </>
  );
});
HForm.propTypes = {
  columns: PropTypes.array.isRequired,
  onFinish: PropTypes.func, // 正确使用 PropTypes.func 来验证函数类型
};

export default HForm;
