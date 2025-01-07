/*
 * @Author: HHG
 * @Date: 2022-09-01 17:04:01
 * @LastEditTime: 2025-01-07 18:02:31
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\PaymentplanManagement\index.jsx
 * @文件说明:
 */
import { useEffect, useState, useRef } from 'react';
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
  Select,
} from 'antd';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  createdPlanApi,
  getPlanApi,
  updataPlan,
} from '@/api/paymentplanManagement';
import './index.less';
import HForm from '../../components/hForm';
const PaymentplanManagement = () => {
  let periodOptionList = [
    {
      value: 'einmal',
      label: '单次',
    },
    {
      value: 'month',
      label: '月度',
    },
    {
      value: 'quarter',
      label: '季度',
    },
    {
      value: 'year',
      label: '年度',
    },
  ];
  let incomePatternOptionList = [
    {
      value: '01',
      label: '固定收入',
    },
    {
      value: '02',
      label: '变动收入',
    },
  ];
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
    {
      title: '周期',
      dataIndex: 'period',
      key: 'period',
      render: (value) => {
        let labelText = periodOptionList.find((opt) => {
          return opt.value == value;
        });
        return labelText ? labelText.label : '';
      },
    },
    {
      title: '收入方式',
      dataIndex: 'incomePattern',
      key: 'incomePattern',
      render: (value) => {
        let labelText = incomePatternOptionList.find((opt) => {
          return opt.value == value;
        });
        return labelText ? labelText.label : '';
      },
    },
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
          <a
            onClick={() => {
              setCreatedModel({
                ...createdModel,
                title: '编辑',
                modelState: true,
              });
              setRowdata(record);
            }}
          >
            编辑
          </a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const [data, setTabelDate] = useState([]);
  const items = [
    {
      key: 'planName',
      label: '预算名称',
      children: '',
    },
    {
      key: 'planDate',
      label: '日期',
      children: '',
    },
    {
      key: 'period',
      label: '周期',
      children: '',
    },
    {
      key: 'incomePattern',
      label: '收入方式',
      children: '',
    },
    {
      key: 'amount',
      label: '金额',
      children: '',
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
  const formRef = useRef();
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
      annual: window.moment(values.annual).format('YYYY-MM-DD'),
    }).then((res) => {
      setTabelDate(res.data);
    });
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
    formProps: {
      labelCol: {
        span: 4,
      },
    },
    columns: [
      {
        name: 'planName',
        type: 'input',
        placeholder: '请输入名称',
        label: '预算名称',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        item: {
          rules: [{ required: true, message: '请输入预算名称' }],
        },
      },
      {
        name: 'period',
        type: 'select',
        placeholder: '请选择周期',
        label: '周期',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        options: periodOptionList,
        item: {
          rules: [{ required: true, message: '请选择周期' }],
          style: {
            width: '120px',
          },
        },
      },
      {
        name: 'incomePattern',
        type: 'select',
        placeholder: '请选择收入方式',
        label: '收入方式',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        options: incomePatternOptionList,
        item: {
          rules: [{ required: true, message: '请选择周期' }],
          style: {
            width: '120px',
          },
        },
      },

      {
        name: 'planDate',
        type: 'date',
        placeholder: '请选择日期',
        label: '日期',
        item: {
          // rules: [

          // ],
          width: '100%',
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
  const [currentRowData, setRowdata] = useState();
  const handleOk = () => {};
  const handleCancel = () => {
    setCreatedModel({
      ...createdModel,
      modelState: false,
    });
  };
  const createdPlanconfirm = (formData) => {
    // console.log(window.moment(formData.planDate).format('YYYY-MM-DD'))
    if (createdModel.title == '新增') {
      createdPlanApi(formData).then((res) => {
        setCreatedModel({
          ...createdModel,
          modelState: false,
        });
        getPlanApi({}).then((res) => {
          setTabelDate(res.data);
        });
      });
    } else {
      updataPlan(formData).then((res) => {
        setCreatedModel({
          ...createdModel,
          modelState: false,
        });
        getPlanApi({}).then((res) => {
          setTabelDate(res.data);
        });
      });
    }
  };
  useEffect(() => {
    setYear('2023');
    getPlanApi({}).then((res) => {
      setTabelDate(res.data);
    });
  }, []);
  useEffect(() => {
    if (createdModel.modelState != true || formRef.current == undefined) return;
    if (createdModel.title == '编辑') {
      formRef.current.resetFields();
      formRef.current.getFormInstance().setFieldsValue({
        ...currentRowData,
        planDate: window.moment(currentRowData.planDate),
      });
    } else {
      formRef.current.resetFields();
    }
  }, [createdModel, currentRowData]);

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
        initialValues={{
          period: 'month',
        }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="annual" label="年度">
              <DatePicker picker="year" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="period" label="周期">
              <Select
                style={{
                  width: 120,
                }}
                // onChange={handleChange}
                options={[
                  ...periodOptionList,
                  {
                    label: '全部',
                    value: '-1',
                  },
                ]}
              />
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
                setRowdata(null);
              }}
            >
              新增
            </Button>
          </Col>
        </Row>
      </Form>

      <Table columns={columns} dataSource={data} rowKey="_id" />

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
        footer={(_, { OkBtn, CancelBtn }) => <></>}
      >
        <HForm
          {...formConfig}
          onFinish={createdPlanconfirm}
          ref={formRef}
        ></HForm>
      </Modal>
    </>
  );
};

export default PaymentplanManagement;
