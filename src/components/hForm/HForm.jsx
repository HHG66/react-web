/*
 * @Author: HHG
 * @Date: 2024-08-26 14:17:48
 * @LastEditTime: 2024-11-25 17:08:24
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\hForm\HForm.jsx
 * @文件说明:
 */
import { Button, Checkbox, Form, Input, Select ,Tag,Divider,Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
// import registerConfig from './register.jsx';
import { useEffect, useState,useRef } from 'react';
import PropTypes from 'prop-types';
import {
  StepBackwardOutlined,PlusOutlined 
} from '@ant-design/icons';
import KeyWord from './components/keyWord';

const HForm = ({ columns, onFinish }) => {
  const [form] = Form.useForm();

  const [formColumns, serColumns] = useState([]);
  const[initialValues,setInitialValues]=useState([])
  useEffect(() => {
    // console.log('表单初始化渲染');
    // console.log(columns);
    if (columns) {
      serColumns(columns);
    }

    // setInitialValues({
    //   eeee:['1']
    // })
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
    return <Select defaultValue="" options={props.options} />;
  };
  
  const KeyWordComponent=(props)=>{
    return <KeyWord  {...props} key={props.name + props.type} form={form}></KeyWord> 
  }

  const components = {
    input: InputComponent,
    password: PasswordComponent,
    button: ButtonComponent,
    select: SelectComponent,
    keyword:KeyWordComponent
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
        style={{
          padding: 8,
        }}
        onFinish={onFinish}
        form={form}
        // initialValues={initialValues}
      >
        {formColumns &&
          formColumns.map((field) => {
            return components[field.type](field);
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
