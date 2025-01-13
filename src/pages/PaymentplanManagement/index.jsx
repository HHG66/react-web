/*
 * @Author: HHG
 * @Date: 2022-09-01 17:04:01
 * @LastEditTime: 2025-01-13 21:08:56
 * @LastEditors: 韩宏广
 * @FilePath: /personal-finance-web/src/pages/PaymentplanManagement/index.jsx
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
  deletePlanApi,
} from '@/api/paymentplanManagement';
import './index.less';
import HForm from '../../components/hForm';
import { getConsumptionTypeListApi } from '@/api/consumptiontype';
import { getIncomeTypeListApi } from '@/api/incometype';

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

  let expenditurePatternOptionList = [
    {
      value: '01',
      label: '固定支出',
    },
    {
      value: '02',
      label: '变动支出',
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
      title: '生效时间',
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
        return labelText ? labelText.label : '-';
      },
    },
    {
      title: '支出方式',
      dataIndex: 'expenditurePattern',
      key: 'expenditurePattern',
      render: (value) => {
        let labelText = expenditurePatternOptionList.find((opt) => {
          return opt.value == value;
        });
        return labelText ? labelText.label : '-';
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
          <a
            onClick={() => {
              deletePlanAffirm(record);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];
  const deletePlanAffirm = (rowData) => {
    Modal.confirm({
      content: '是否删除计划',
      okText: '确定',
      cancelText: '取消',
      // footer:null,
      onOk: () => {
        deletePlan();
      },
    });
    const deletePlan = () => {
      deletePlanApi({ _id: rowData._id }).then(() => {
        getPlan();
      });
    };
    // Modal.info({
    //   title: '提示',
    //   content: '是否删除计划',
    //   okText: "确定",
    //   cancelText: '取消',
    //   onOk: () => {
    //     console.log('---');
    //     // 在这里添加你的逻辑，比如删除计划
    //   },
    //   // 不需要设置 footer: null，因为 Modal.info 会自动处理
    // });
  };
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
  // const [year, setYear] = useState('2019');
  // const [plan, setPlan] = useState({
  //   income: [],
  //   consumption: [],
  //   other: [],
  // });
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
    getPlan();
  };
  const getPlan = () => {
    let queryParameter = form.getFieldValue();
    queryParameter.annual
      ? (queryParameter.annual = window
          .moment(queryParameter.annual)
          .format('YYYY-MM'))
      : '';
    getPlanApi({
      ...queryParameter,
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

//   const correlationTypeList=[
//     {
//         "label": "ce11",
//         "value": "674d602b1050a0ace66778ef"
//     },
//     {
//         "label": "1",
//         "value": "674eab17377230f2c0bcb288"
//     },
//     {
//         "label": "楚呈轩",
//         "value": "674eab2c377230f2c0bcb28c"
//     },
//     {
//         "label": "222",
//         "value": "674ead96377230f2c0bcb293"
//     },
//     {
//         "label": "测1",
//         "value": "674eadec377230f2c0bcb297"
//     }
// ]

// useEffect(()=>{
//   setTest({
//     ...test,
//     test1:'12312'
//   })
// },[])
// const [test,setTest]=useState({
//   test1:"ttt",
//   onChange:()=>{
//     console.log(test);
//   }
// })


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
        // defaultValue:'123'
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
        },
      },
      {
        name: 'receiveOrSpend',
        type: 'select',
        placeholder: '请选择',
        label: '收/支',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        options: [
          { label: '收入', value: '01' },
          { label: '支出', value: '02' },
        ],
        item: {
          rules: [{ required: true, message: '请选择' }],
        },
        onChange(value) {
          updateFormConfigBasedOnReceiveOrSpend(value);
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
          rules: [{ required: true, message: '请选择收入方式' }],
          // style: {
          //   width: '120px',
          // },
        },
      },
      {
        name: 'expenditurePattern',
        type: 'select',
        placeholder: '请选择支出方式',
        label: '支出方式',
        options: expenditurePatternOptionList,
        item: {
          rules: [{ required: true, message: '请选择支出方式' }],
          // style: {
          //   width: '120px',
          // },
        },
        hidden: true,
      },
      {
        name: 'associationType',
        type: 'select',
        placeholder: '请选择收/支关联类型',
        label: '关联类型',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        options: [],
        item: {
          rules: [{ required: true, message: '请选择收/支关联类型' }],
          // style: {
          //   width: '120px',
          // },
        },
      },
      {
        name: 'amount',
        type: 'input',
        placeholder: '请输入金额',
        label: '金额',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        item: {
          rules: [{ required: true, message: '请输入金额' }],
          // style: {
          //   width: '120px',
          // },
        },
      },
      {
        name: 'planDate',
        type: 'date',
        placeholder: '请选择生效日期',
        label: '生效日期',
        item: {
          rules: [{ required: true, message: '请选择生效日期' }],
        },
        style: {
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
  const updateFormConfigBasedOnReceiveOrSpend = (value) => {
    // 使用更新函数以获取最新的 formConfig 值
    SetFormConfig((currentFormConfig) => {
      const updatedColumns = currentFormConfig.columns.map((column) => {
        if (column.name === 'incomePattern') {
          return {
            ...column,
            hidden: value !== '01',  // 如果不是 '01' 则隐藏 incomePattern
            item: {
              rules: value === '01' ? [{ required: true, message: '请选择收入方式' }] : [],
            },
          };
        }
        if (column.name === 'expenditurePattern') {
          return {
            ...column,
            hidden: value !== '02',  // 如果不是 '02' 则隐藏 expenditurePattern
            item: {
              rules: value === '02' ? [{ required: true, message: '请选择支出方式' }] : [],
            },
          };
        }
        return column;
      });
      return {
        ...currentFormConfig,
        columns: updatedColumns,
      };
    });
  };
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
      updataPlan({ ...formData, _id: currentRowData._id }).then((res) => {
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
    getPlanApi({}).then((res) => {
      setTabelDate(res.data);
    });
    
  }, []);
  
  useEffect(()=>{
    getConsumptionTypeListApi().then((res) => {
      getIncomeTypeListApi().then((resData) => {
        let list = [...res.data, ...resData.data];
        let processedAssociationList = list.map((ele) => {
          // debugger
          return {
            label: ele.incomeName || ele.consumptionTypeName,
            value: ele._id,
          };
        });
        console.log(processedAssociationList, 'processedAssociationList');
        const updatedColumns = formConfig.columns.map((column) => {
          if (column.name === 'associationType') {
            return {
              ...column,
              options:processedAssociationList
            };
          }
          return column;
        });
        console.log(updatedColumns,'updatedColumns');
        SetFormConfig((formConfig)=>{
          console.log(formConfig,'formConfigformConfigformConfig');
          return {
              ...formConfig,
              columns:updatedColumns
          }
        });
        setTimeout(() => {
          console.log(formConfig,'formConfigcccc');
        }, 1000);
      });
    });
    // formConfig
  },[])



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
          xl: 6,
          span:8
        }}
        initialValues={{
          period: 'month',
          viewingPeriod:'01'
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
                  width:'100%',
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
          <Col span={6}>
            <Form.Item  name="viewingPeriod" label="查看时段">
              <Select
                style={{
                  width: 180,
                }} 
                // onChange={handleChange}
                options={[
                  {
                    label: '当前',
                    value: '01',
                  },
                  {
                    label: '历史',
                    value: '02',
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
