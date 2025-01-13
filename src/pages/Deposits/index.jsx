/*
 * @Author: HHG
 * @Date: 2022-10-04 00:00:16
 * @LastEditTime: 2025-01-13 18:13:12
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\Deposits\index.jsx
 * @文件说明:
 */
import React, { useEffect, useState, useRef } from 'react';
import {
  Statistic,
  Row,
  Col,
  Button,
  Tag,
  Space,
  Table,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Popconfirm,
  InputNumber,
  Flex,
  Drawer,
} from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import HForm from '@/components/hForm/HForm.jsx';
import {
  getDepositListApi,
  editDepositInfoApi,
  deleteDepositApi,
  createdDepositApi,
  updateDepositsInfoApi,
  depositSummaryApi,
} from '@/api/deposits';
import './index.less';

const Deposits = () => {
  var modelEle;
  const [tableData, settableData] = useState([]);
  const [modelData, setModelData] = useState({
    isModalOpen: false,
    id: '',
  });
  const [actionState, setActionState] = useState('0');
  const [form] = Form.useForm();
  const [createdForm] = Form.useForm();
  const [formSearchData] = Form.useForm();
  const [modelState, setModelState] = useState(false);
  const [updataInfo, setUpdataState] = useState({
    _id: '',
    openState: false,
  });
  const [depositsInfoForm] = Form.useForm();
  const [isShow, setShow] = useState(false);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [depositsDrawerState, setDepositsDrawerState] = useState(false);
  const [depositsDrawerData, setDepositsDrawerData] = useState([]);
  const [addDepositRecordsModel, setDepositRecordsModel] = useState(false);
  useEffect(() => {
    getDepositList();
  }, []);
  const columns = [
    {
      title: '存款名称',
      dataIndex: 'depositName',
      key: 'depositName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '总金额(¥)',
      dataIndex: 'amountDeposited',
      key: 'amountDeposited',
    },
    {
      title: '利率',
      dataIndex: 'interestRate',
      key: 'interestRate',
    },
    {
      title: '开始日期',
      dataIndex: 'dateCommenced',
      key: 'dateCommenced',
      render: (value) => {
        return window.moment(value).format('YYYY-MM-DD');
      },
    },
    {
      title: '到期时间',
      dataIndex: 'expirationTime',
      key: 'expirationTime',
    },
    {
      title: '存款状态',
      dataIndex: 'depositState',
      key: 'depositState',
    },
    {
      title: '结息',
      dataIndex: 'interest',
      key: 'interest',
      render: (value, rowData) => {
        let state = window
          .moment()
          // .isSameOrBefore(rowData.expirationTime);
          .isBefore(rowData.expirationTime, 'day');
        console.log(state);
        if (!state && value == 0) {
          return '-';
        } else {
          return value;
        }
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '类型',
      key: 'depositType',
      dataIndex: 'depositType',
      render: (type) => {
        if (type === '定期存款') {
          return (
            <>
              <Tag color={'red'}>{'定期存款'}</Tag>
            </>
          );
        } else if (type === '活期存款') {
          return (
            <>
              <Tag color={'green'}>{'活期存款'}</Tag>
            </>
          );
        } else {
          return (
            <>
              <Tag color={'green'}>{type}</Tag>
            </>
          );
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setUpdataState({
                ...updataInfo,
                openState: true,
                _id: record._id,
              });
            }}
          >
            修改信息
          </a>
          <a
            onClick={() => {
              setDepositsDrawerState(true);
            }}
          >
            查看详细
          </a>
          <a
            onClick={() => {
              setDepositRecordsModel(true);
            }}
          >
            添加存款
          </a>
          {/* <a
            onClick={() => {
              editDeposit(record);
            }}
          >
            编辑
          </a> */}
          <Popconfirm
            title="确认删除这条存款单吗?"
            onConfirm={() => confirm(record._id)}
            // onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const depositsDrawerColumns = [
    {
      title: '存款日期',
      dataIndex: 'depositDate',
      key: 'depositDate',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '金额',
      dataIndex: 'depositRecordAmount',
      key: 'depositRecordAmount',
      // render: (text) => <a>{text}</a>,
    },
  ];
  const formRef = useRef();
  const [formConfig, SetFormConfig] = useState({
    columns: [
      {
        name: 'depositDate',
        type: 'date',
        placeholder: '请选择存款时间',
        label: '存款时间',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        item: {
          rules: [{ required: true, message: '请选择存款时间' }],
        },
        style:{
          width:'100%'
        }
      },
      {
        name: 'depositRecordAmount',
        type: 'number',
        placeholder: '请输入金额',
        label: '金额',
        //Form.Item设置相关的属性，注意是封装组件直接继承antd的表单属性
        item: {
          rules: [{ required: true, message: '请输入金额' }],
        },
        style:{
          width:'100%'
        }
      },
      // {
      //   // name: "submit",
      //   type: 'button',
      //   styletype: 'primary',
      //   text: '提交',
      //   className: 'plan-form-button',
      //   htmlType: 'submit',
      //   item: {
      //     // labelAlign: 'right',
      //     // className: 'login-button-item',
      //   },
      // },
    ],
  });

  const confirm = (id) => {
    deleteDepositApi(id).then((res) => {
      // message.success(res.message);
      getDepositList();
    });
  };
  //获取存款单列表
  const getDepositList = (data) => {
    getDepositListApi(data || {}).then((res) => {
      let data = [];
      res.data.forEach((element) => {
        data.push({
          ...element,
          key: element.id,
        });
      });
      settableData(data);
    });
    depositSummaryApi().then((res) => {
      setTotalDeposits(res.data.unmaturedDeposit);
    });
  };
  const editDeposit = (rowdata) => {
    form.resetFields();
    setModelData({ ...modelData, id: rowdata._id, isModalOpen: true });
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      // console.log(values);
      editDepositInfoApi({ ...values, _id: modelData.id }).then((res) => {
        setModelData({
          ...modelData,
          isModalOpen: false,
        });
      });
    });
  };
  const createdDeposit = () => {
    createdForm.validateFields().then((values) => {
      createdDepositApi({
        ...values,
        dateCommenced: window.moment(values.dateCommenced).format('YYYY-MM-DD'),
        expirationTime: window
          .moment(values.expirationTime)
          .format('YYYY-MM-DD'),
      }).then((res) => {
        // message.success(res.message);
        setModelState(false);
      });
    });
  };

  // const handleCancel = () => {
  //   setModelData({
  //     ...modelData,
  //     isModalOpen: false,
  //   });
  // };
  const handleChange = (value) => {
    setActionState(value);
  };
  const onFinish = (values) => {
    console.log(values);
    getDepositList(values);
  };
  const updateDepositsInfo = () => {
    depositsInfoForm.validateFields().then((field) => {
      updateDepositsInfoApi({
        ...field,
        expirationTime: window
          .moment(field.expirationTime)
          .format('YYYY-MM-DD'),
        _id: updataInfo._id,
      }).then((res) => {
        setUpdataState({
          ...updataInfo,
          openState: false,
          _id: '',
        });
      });
    });
  };
  const substitutionCharacter = (totalDeposits) => {
    // console.log();
    // debugger;

    return '*'.repeat(totalDeposits.toString().length);
    // return string.replace('','*')
  };
  if (actionState === '0') {
    modelEle = (
      <>
        {' '}
        <Form.Item label="续存金额" name="renewalamount">
          <Input />
        </Form.Item>
        <Form.Item label="续存利率" name="interestrate">
          <Input />
        </Form.Item>
        <Form.Item label="到期时间" name="maturitytime">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </>
    );
  } else if (actionState === '1') {
    modelEle = (
      <>
        <Form.Item label="利率" name="interestrate">
          <Input />
        </Form.Item>
        <Form.Item label="利息" name="interest">
          <Input />
        </Form.Item>
        <Form.Item label="去向" name="gowhere">
          <Input />
        </Form.Item>
      </>
    );
  }
  return (
    <>
      {/* <div>Deposits</div> */}

      <Row gutter={24} justify="space-between">
        <Col span={5}>
          <Flex justify="space-between">
            <Statistic
              title="总存款¥"
              value={
                isShow ? totalDeposits : substitutionCharacter(totalDeposits)
              }
            />
            <EyeOutlined
              style={{
                fontSize: '25px',
                marginLeft: '10px',
                display: isShow ? 'none' : 'block',
              }}
              onClick={() => {
                setShow(true);
              }}
            />
            <EyeInvisibleOutlined
              style={{
                fontSize: '25px',
                marginLeft: '10px',
                display: isShow ? 'block' : 'none',
              }}
              onClick={() => {
                setShow(false);
              }}
            />
          </Flex>
        </Col>

        <Col span={4}>说明：总金额计算的是本金，不包含没有结清的利息收入。</Col>
      </Row>
      {/* <Row className='form-search'> */}
      {/* <Col> */}
      <Form
        name="basic"
        form={formSearchData}
        // initialValues={}
        onFinish={onFinish}
      >
        <Row
          gutter={{
            xs: 8,
            sm: 10,
            md: 24,
            lg: 20,
          }}
        >
          <Col>
            <Form.Item
              label="存款名称"
              name="depositname"
              auto-complete="new-password"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="到期时间" name="expirationTime">
              <DatePicker />
            </Form.Item>
          </Col>

          <Col>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button type="primary" htmlType="reset">
                重置
              </Button>
            </Space>
          </Col>
          <Col offset={22}>
            <Button
              type="primary"
              onClick={() => {
                setModelState(true);
              }}
            >
              新增
            </Button>
          </Col>
        </Row>
      </Form>
      {/* </Col> */}
      {/* </Row> */}
      <Table columns={columns} dataSource={tableData} rowKey="_id" />
      <Modal
        title="新增"
        open={modelState}
        onOk={createdDeposit}
        onCancel={() => {
          setModelState(false);
        }}
      >
        <Form
          name="created"
          form={createdForm}
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item label="存款名称" name="depositName">
            <Input />
          </Form.Item>
          <Form.Item label="本金" name="amountDeposited">
            <InputNumber
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item label="利率" name="interestRate">
            {/* <Input /> */}
            <InputNumber
              style={{
                width: '100%',
              }}
              // defaultValue="1"
              // min="0"
              // max="100"
              step="0.01"
              // onChange={onChange}
              // stringMode
            />
          </Form.Item>
          <Form.Item label="起始时间" name="dateCommenced">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="到期时间" name="expirationTime">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="存款类型" name="depositType">
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* <Modal
        title="编辑"
        open={modelData.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="edit"
          form={form}
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item
            label="操作"
            name="actiontype"
            rules={[
              {
                required: true,
                message: '请选择操作类型!',
              },
            ]}
          >
             
            <Select
           
              onChange={handleChange}
              options={[
                {
                  value: '0',
                  label: '续存',
                },
                {
                  value: '1',
                  label: '结息',
                },
                // {
                //   value: 'Yiminghe',
                //   label: 'yiminghe',
                // },
              ]}
            />
          </Form.Item>
          {modelEle}
        </Form>
      </Modal> */}

      <Modal
        title="更新信息"
        open={updataInfo.openState}
        onOk={updateDepositsInfo}
        onCancel={() => {
          setUpdataState({
            ...updataInfo,
            openState: false,
          });
        }}
      >
        <Form
          name="created"
          form={depositsInfoForm}
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item label="存款名称" name="depositName">
            <Input />
          </Form.Item>
          <Form.Item label="本金" name="amountDeposited">
            <InputNumber
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item label="利率" name="interestRate">
            {/* <Input /> */}
            <InputNumber
              style={{
                width: '100%',
              }}
              // defaultValue="1"
              // min="0"
              // max="100"
              step="0.01"
              // onChange={onChange}
              // stringMode
            />
          </Form.Item>
          <Form.Item label="起始时间" name="dateCommenced">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="到期时间" name="expirationTime">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="存款类型" name="depositType">
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Drawer
        title="存款详细信息"
        onClose={() => setDepositsDrawerState(false)}
        open={depositsDrawerState}
        width={'50%'}
      >
        <Table
          columns={depositsDrawerColumns}
          dataSource={depositsDrawerData}
          size="small"
        />
      </Drawer>

      <Modal
        title="存款详细"
        open={addDepositRecordsModel}
        onCancel={() => setDepositRecordsModel(false)}
        style={{ marginBotton: '10px' }}
      >
        <HForm
          {...formConfig}
          formProps={{
            labelCol: {
              span: 4,
            },
          }}
          // onFinish={createdPlanconfirm}
          ref={formRef}
        ></HForm>
      </Modal>
    </>
  );
};

export default Deposits;
