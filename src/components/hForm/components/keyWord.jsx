import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Input, Select, Space, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';

//生成随机颜色值
function getRandomColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}

const KeyWord = (props) => {
  // console.log(props);
  // debugger
  const inputRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  // 初始化默认选项
  const initialOptions = props.option.map((element) => ({
    ...element,
    color: getRandomColor(),
  }));

  const [name, setName] = useState(''); // 输入框内容
  const [options, setOptions] = useState(initialOptions); // 选项列表
  useEffect(() => {
    console.log(props, 'props');

    let newItem = props.form.getFieldValue(props.name);

    let defaultOption = [];
    defaultOption = newItem.map((element) => {
      return {
        label: element.label,
        value: element.value,
        color: element.color,
      };
    });
    setOptions((prev) => [...defaultOption]); // 更新选项
    // console.log(defaultOption, '-------+');
    // console.log(options);
    //因为打开的时候form创建未完成所以无法获取到对应的值，所以需要监测props.form.getFieldValue(props.name)来确保有值的时候赋值
  }, [props, props.form.getFieldValue(props.name)]);
  // 渲染标签
  const tagRender = ({ label, closable, onClose }) => {
    const option = options.find((opt) => opt.value === label);
    const color = option ? option.color : '#000';
    return (
      <Tag
        color={color}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  // 添加新选项
  const addItem = () => {
    if (!name.trim()) return;

    // 检查是否重复
    if (options.some((opt) => opt.value === name)) {
      messageApi.open({
        type: 'error',
        content: '已存在记录',
      });
      return;
    }

    const newItem = { value: name, label: name, color: getRandomColor() };
    setOptions((prev) => [...prev, newItem]); // 更新选项
    if (props.autoSelect == undefined || props.autoSelect !== false) {
      let selectValue = [
        ...options,
        {
          label: name,
          value: name,
          color: getRandomColor(),
        },
      ];
      props.form.setFieldValue(props.name, selectValue);
    }
    setName('');
    setTimeout(() => inputRef.current?.focus(), 0); // 聚焦输入框
  };
  // 处理选择变化
  const handleChange = (selectedValues) => {
    const selectedObjects = selectedValues.map((value) =>
      options.find((opt) => opt.value === value)
    );
    props.form.setFieldValue(props.name, selectedObjects); // 更新表单的值为完整对象
  };
  return (
    <>
      {contextHolder}
      <FormItem
        key={props.name}
        label={props.label}
        name={props.name}
        {...props.item}
        // initialValue={options}
      >
        <Select
          mode="multiple"
          tagRender={tagRender}
          style={{ width: '100%' }}
          options={options}
          // value={selectValue} // 绑定选中值
          onChange={handleChange} // 更新选中值
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Input
                  placeholder="请输入标签"
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()} // 防止键盘事件冒泡
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  添加
                </Button>
              </Space>
            </>
          )}
        />
      </FormItem>
    </>
  );
};

export default KeyWord;
