# HForm表单

封装Ant Design of React表单组件，原来表单所有的api支持

API

基本使用引入，在jsx中：

```jsx
<HForm formConfig={formConfig}></HForm>
```

Form

| 参数    | 说明                 | 类型  | 默认值 | 备注                  |
| ------- | -------------------- | ----- | ------ | --------------------- |
| columns | 表单项，配置formItem | array | []     | 具体参考prop中columns |
|         |                      |       |        |                       |
|         |                      |       |        |                       |

Form.Item

| 参数        | 说明         | 类型                    | 默认值 | 备注                     |
| ----------- | ------------ | ----------------------- | ------ | ------------------------ |
| name        | 字段名       | string                  | -      | 必填                     |
| type        | 表单类型     | input、button、password | -      | 必填，对应antd表单组件   |
| placeholder | 提示占位信息 | string                  | -      | 非必填，可用的组件中有效 |



```react
  const [formConfig, SetFormConfig] = useState({
    fields: [
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
        item: {
          rules: [
            // { required: true, message: '请输入密码' },
            {
              validator: validatorPwd,
            },
          ],
        },
      },
      {
        // name: "submit",
        type: 'button',
        styletype: 'dashed',
        text: '提交',
        className: 'login-form-button login-btn',
        htmlType: 'submit',
        item: {
          labelAlign: 'right',
          className: 'login-button-item',
        },
      },
    ],
  });
```

