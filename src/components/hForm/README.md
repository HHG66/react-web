# HForm表单

封装Ant Design of React表单组件，原来表单所有的api都是支持的，所以这里只记不支持或者个性化后的api

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

| 参数         | 说明              | 类型      | 默认值    | 备注                                                         |
| ------------ | ----------------- | --------- | --------- | ------------------------------------------------------------ |
| name         | id                | string    | -         | 表单的prop，必填唯一                                         |
| type         | 表单类型          | string    | -         | 表单类型，必填唯一                                           |
| placeholder  | 提示信息          | string    | -         | 可选，有的表单项不生效                                       |
| prefix       | 前后缀            | ReactNode | -         | 前后缀，用于附加图标                                         |
| item         | 配置项            | array     | []        | 可选，传入校验规则                                           |
| addItem      | 类型为keyword传递 | func      | -         | 可选，keyword添加的回调                                      |
| htmlType     | 可选-submit       | string    | -         | 按钮配置，当配置后，form组件可以传递onFinish方法回调入参为表单值 |
| onClick      | 可选              | func      | -         | botton的回调函数，没有回调入参，表单不用这个                 |
| autoSelect   | 类型为keyword传递 | boolean   | true      | 添加后是否自动选中，默认确定                                 |
| defaultValue | 表单默认值        | any       | undefined | 表单的默认值                                                 |



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

