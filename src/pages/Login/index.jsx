import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '@/api/login';
import { setLocalStorage } from '@/utils';
import useFetch from '@/api/index.js';

import { DownCircleOutlined } from '@ant-design/icons';

// import './index.less'
import './index2.less';
import { useDispatch, useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux'
// import { actions } from '@/store/export.js'
import { addInfo } from '@/store/reducers/User';
import HForm from '../../components/hForm';
const Login = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  // const state = useSelector((state => state))
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  // let { data } = useFetch('/login', {
  //   method: 'POST',
  //   data: { username: "formData.username", password: "formData.password" },
  // });
  // console.log(data);

  const dispatch = useDispatch();
  //redux原生方式，改成toolkit的方式了
  // const { addInfo } = bindActionCreators(actions, dispatch)

  // 自定义验证密码
  const validatorPwd = async (_, value) => {
    if (!value) {
      return Promise.reject(new Error('密码必须输入'));
    } else if (value.length < 4) {
      return Promise.reject(new Error('密码长度不能小于4位!'));
    } else if (value.length > 16) {
      return Promise.reject(new Error('密码长度不能大于16位!'));
    } else if (!/^[a-zA-Z0-9_.]+$/.test(value)) {
      return Promise.reject(
        new Error('密码必须是英文或数字、下划线、符号.组成!')
      );
    } else {
      return Promise.resolve();
    }
  };

  const onFinish = async (values) => {
    let res = await login(values);
    if (!res) return;
    // console.log(res.data.token);
    dispatch(addInfo(res.data)); // 派发 addInfo action
    navigate('/home');
    // console.log(dispatch(getToken()));
  };

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

  return (
    <>
      <div className="login">
        <div className="login-main">
          <div className="login-left">
            <div className="login-logo">Han</div>
            <header className="login_header">
              {/* <h1>React项目：后台管理系统</h1> */}
              <h1>Login</h1>
            </header>
            <section className="login_content">
              {/* <h2>用户登录</h2> */}
              <HForm {...formConfig} onFinish={onFinish}></HForm>
              {/* <Form
                name="normal_login"
                className="login-form"
                onFinish={onSubmit}
              >
                <Form.Item
                  name="username"
                  validateTrigger="onChange"
                  // initialValue="admin"
                  rules={[
                    { required: true, message: '请输入用户名!' },
                    { min: 4, message: '用户名最少4位!' },
                    { max: 12, message: '用户名最多12位!' },
                    { pattern: /^[0-9a-zA-Z_]{1,}$/, message: '用户名必须是英文、数字、下划线、组成!' }
                  ]}
                >
                  <Input
                    prefix={
                      <UserOutlined
                        className="site-form-item-icon"
                        style={{ color: 'rgba(0,0,0,0.25)' }}
                      />
                    }
                    placeholder="用户名"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  validateTrigger="onChange"
                  rules={[
                    {
                      validator: validatorPwd
                    }
                  ]}
                >
                  <Input
                    prefix={
                      <LockOutlined
                        className="site-form-item-icon"
                        style={{ color: 'rgba(0,0,0,0.25)' }}
                      />
                    }
                    type="password"
                    placeholder="密码"
                  />
                </Form.Item>

                <Form.Item className='login-button-item'>
                  <Button loading={loading} icon={<DownCircleOutlined />} htmlType="submit" className="login-form-button login-btn">
                    登录
                  </Button>
                </Form.Item>
              </Form> */}
            </section>
            <div className="footer">
              {/* <svg aria-hidden="true" className="svg-icon">
                <use data-v-02d47eee="" xlink:href="#icon-record"></use>
              </svg> */}
              <span className="text">2021</span>
              <span className="text">|</span>
              <span className="text">蒙ICP备2021001531号-4</span>
            </div>
          </div>
          <div className="login-right"></div>
        </div>
      </div>
    </>
  );
};
export default Login;
