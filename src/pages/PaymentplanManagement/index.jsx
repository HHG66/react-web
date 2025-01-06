/*
 * @Author: HHG
 * @Date: 2022-09-01 17:04:01
 * @LastEditTime: 2025-01-06 18:12:25
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\PaymentplanManagement\index.jsx
 * @文件说明:
 */
import { useEffect, useState } from 'react';
import {
  Descriptions,
  Button,
  Row,
  Col,
  Form,
  DatePicker,
  Space,
  Table,
  Tag,
  Drawer,
  Modal,
} from 'antd';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { createdPlanApi,getPlanApi } from '@/api/paymentplanManagement';
import './index.less';
import HForm from '../../components/hForm';
const PaymentplanManagement = () => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'planName',
      key: 'planName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '时间',
      dataIndex: 'planDate',
      key: 'planDate',
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setOpen(true);
            }}
          >
            查看详细
          </a>
          <a onClick={()=>{setCreatedModel({...createdModel,title:"编辑",modelState:true})}}>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
 const [data,setTabelDate]=useState([])
  const items = [
    {
      key: '1',
      label: 'UserName',
      children: 'Zhou Maomao',
    },
    {
      key: '2',
      label: 'Telephone',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Live',
      children: 'Hangzhou, Zhejiang',
    },
    {
      key: '4',
      label: 'Remark',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Address',
      children:
        'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
  ];
  const [year, setYear] = useState('2019');
  const [plan, setPlan] = useState({
    income: [],
    consumption: [],
    other: [],
  });
  // const [description, setDescription] = useState({
  //   detailed: 'none',
  //   month: '一月份',
  //   // name:'收入计划'
  // })
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // if (
    //   values.annual !== undefined &&
    //   values.annual !== null &&
    //   values.annual !== ''
    // ) {
    //   setYear(window.moment(values.annual._d).format('YYYY'));
    // } else {
    //   setYear(window.moment(new Date()).format('YYYY'));
    // }

    getPlanApi({
      ...values,
      annual:window.moment(values.annual).format('YYYY-MM-DD')
    }).then(res=>{
      setTabelDate(res.data)
    })
  };

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const [createdModel, setCreatedModel] = useState({
    modelState: false,
    title: '新增',
  });
  const [formConfig, SetFormConfig] = useState({
    columns: [
      {
        name: 'planName',
        type: 'input',
        placeholder: '请输入名称',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        item: {
          rules: [{ required: true, message: '请输入用户名' }],
        },
      },
      {
        name: 'planDate',
        type: 'date',
        placeholder: '请选择日期',
        item: {
          // rules: [
           
          // ],
          width:'100%'
        },
      },
      {
        // name: "submit",
        type: 'button',
        styletype: 'primary',
        text: '提交',
        className: 'plan-form-button',
        htmlType: 'submit',
        item: {
          // labelAlign: 'right',
          // className: 'login-button-item',
        },
      },
    ],
  });
  const handleOk = () => {};
  const handleCancel = () => {
    setCreatedModel({
      ...createdModel,
      modelState: false,
    });
  };
  const createdPlanconfirm=(formData)=>{
    // console.log(window.moment(formData.planDate).format('YYYY-MM-DD'))
    createdPlanApi(formData).then(res=>{
      setCreatedModel({
        ...createdModel,
        modelState:false
      })
      getPlanApi({}).then((res) => {
        setTabelDate(res.data);
      });
    })
  }
  useEffect(() => {
    setYear('2023');
    getPlanApi({}).then((res) => {
      setTabelDate(res.data);
    });
  }, []);

  return (
    <>
      {/* 主要计划 */}

      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        labelCol={{
          xl: 4,
        }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="annual" label="年度">
              <DatePicker picker="year" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              onClick={() => {
                setCreatedModel({
                  ...createdModel,
                  modelState: true,
                  title: '新增',
                });
              }}
            >
              新增
            </Button>
          </Col>
        </Row>
      </Form>

      <Table columns={columns} dataSource={data} />

      <Drawer
        title="详细"
        onClose={onClose}
        open={open}
        size={'large'}
        width={'50%'}
      >
        <Descriptions items={items} />
      </Drawer>

      <Modal
        title={createdModel.title}
        open={createdModel.modelState}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {/* <Button>Custom Button</Button>
            <CancelBtn />
            <OkBtn /> */}
          </>
        )}
      >
        <HForm {...formConfig} onFinish={createdPlanconfirm}></HForm>
      </Modal>
    </>
  );
};

export default PaymentplanManagement;
