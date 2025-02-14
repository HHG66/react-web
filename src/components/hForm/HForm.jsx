import { Button, Form, Input, Select, DatePicker, InputNumber } from 'antd';
import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import KeyWord from './components/keyWord';

const HForm = forwardRef(({ columns, onFinish, formProps }, ref) => {
  const [form] = Form.useForm(); // 创建 form 实例
  const formRef = useRef(); // 引用 ref，方便在外部获取实例
  const formColumns = useMemo(() => (columns ? [...columns] : []), [columns]);
  // const [formColumns, setFormColumns] = useState(memoColumns || []);
  console.log(formColumns, 'formColumnsformColumns');
  // 暴露 form 实例
  useEffect(() => {
    formRef.current = form; // 每次 form 更新时都更新 ref
  }, [form]);
  useImperativeHandle(ref, () => ({
    getFormInstance: () => formRef.current,
    resetFields: () => form.resetFields(),
    validateFields: () => form.validateFields(),
    setFieldsValue: (values) => form.setFieldsValue(values),
    getFieldValue: (name) => form.getFieldValue(name),
  }));

  // useEffect(() => {
  //   // setFormColumns([...columns]);
  //   //深度比较columns和formColumns是否相等，不相等则更新formColumns
  //   if (!isEqual(columns, formColumns)) {
  //     setFormColumns([...columns]);
  //   }
  // }, [columns]);

  // 初始化表单的默认值
  const initialValues = useMemo(
    () =>
      formColumns.reduce((acc, element) => {
        if (element.type !== 'keyword') {
          acc[element.name] = element.defaultValue;
        } else {
          acc[element.name] = element.defaultValue
            ? [{ label: element.defaultValue, value: element.defaultValue }]
            : [];
        }
        return acc;
      }, {}),
    [formColumns]
  ); // 依赖formColumns

  const handleProp = (props) => {
    let handledProps = { ...props };
    delete handledProps.defaultValue;
    return handledProps;
  };

  const components = {
    input: (props) => (
      <Form.Item {...props} {...props.item}>
        <Input {...props} />
      </Form.Item>
    ),
    number: (props) => (
      <Form.Item {...props} {...props.item}>
        <InputNumber {...props} />
      </Form.Item>
    ),
    password: (props) => (
      <Form.Item {...props} {...props.item}>
        <Input.Password {...props} />
      </Form.Item>
    ),
    button: (props) => (
      <Form.Item {...props.item}>
        <Button {...props} type={props.styletype || 'primary'}>
          {props.text}
        </Button>
      </Form.Item>
    ),
    select: (props) => (
      <Form.Item {...props} {...props.item}>
        <Select {...props} {...props.item} />
      </Form.Item>
    ),
    date: (props) => (
      <Form.Item {...props} {...props.item}>
        <DatePicker {...props} />
      </Form.Item>
    ),
    keyword: (props) => <KeyWord {...props} form={form} />,
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      initialValues={initialValues} // 使用 initialValues 来设置初始值
      {...formProps}
    >
      {formColumns.map((field, index) => {
        return components[field.type]
          ? React.cloneElement(components[field.type](handleProp(field)), {
              key: field.name || index, // 使用 `field.name` 或 `index` 作为 key
            })
          : null;
      })}
    </Form>
  );
});

HForm.propTypes = {
  columns: PropTypes.array.isRequired,
  onFinish: PropTypes.func.isRequired,
  formProps: PropTypes.object,
};

export default HForm;
