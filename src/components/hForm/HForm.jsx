import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
  Radio,
} from 'antd';
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
import { useFormColumns } from './hooks/useFormColumns'; // 引入独立钩子

const HForm = forwardRef(({ columns, onFinish, formProps }, ref) => {
  const [form] = Form.useForm(); // 创建 form 实例
  const formRef = useRef(); // 引用 ref，方便在外部获取实例
  //优化过程
  // const [formColumns, setFormColumns] = useState(memoColumns || []);
  // const formColumns = useMemo(() => (columns ? [...columns] : []), [columns]);
  const formColumns = useFormColumns(columns, [columns]);
  // console.log(formColumns, 'formColumnsformColumns');

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
        switch (element.type) {
          case 'keyword':
            acc[element.name] = element.defaultValue
              ? [{ label: element.defaultValue, value: element.defaultValue }]
              : [];
            break;
          default:
            acc[element.name] = element.defaultValue;
            break;
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
        <InputNumber
          {...props}
          style={{ width: props.width ? props.width : '100%' }}
        />
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
        <DatePicker
          {...props}
          style={{ width: props.width ? props.width : '100%' }}
        />
      </Form.Item>
    ),
    keyword: (props) => <KeyWord {...props} form={form} />,
    checkbox: (props) => (
      <Form.Item
        {...props}
        {...props.item}
        valuePropName={props.valuePropName ? props.valuePropName : 'checked'}
      >
        {
          //判断props.options长度是否大于1，大于1则使用Checkbox.Group，否则使用Checkbox
          props.options.length > 1 ? (
            <Checkbox.Group options={props.options} />
          ) : (
            <Checkbox value={props.options[0].value}>
              {props.options[0].label}
            </Checkbox>
          )
        }
      </Form.Item>
    ),
    radio: (props) => (
      <Form.Item {...props} {...props.item}>
        {
          //判断props.options长度是否大于1，大于1则使用Radio.Group，否则使用Radio
          props.options.length > 1 ? (
            <Radio.Group {...props} options={props.options}></Radio.Group>
          ) : (
            <Radio {...props} value={props.options[0].value}>
              {props.options[0].label}
            </Radio>
          )
        }
      </Form.Item>
    ),
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
