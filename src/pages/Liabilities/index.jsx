/*
 * @Author: HHG
 * @Date: 2022-12-18 20:36:35
 * @LastEditTime: 2024-12-23 22:49:35
 * @LastEditors: 韩宏广
 * @FilePath: /personal-finance-web/src/pages/Liabilities/index.jsx
 * @文件说明:
 */
import React, { useState, useEffect } from 'react';
import {
  Descriptions,
  Statistic,
  Tag,
  Space,
  Table,
  Modal,
  Button,
  Progress,
  Form,
  Typography,
  Popconfirm,
  Input,
  message,
  DatePicker,
  InputNumber,
  Row,
  Col,
} from 'antd';
import {
  getLoanListApi,
  deleteLoanListApi,
  edtLoanInfo,
  getLoanInfoListApi,
  getLoanInfoApi,
  // editLoanInfoListApi,
  createdLoanRecordApi
} from '@/api/liabilities';
import './index.less';

const Liabilities = () => {
  const [modelData, setModelData] = useState({
    open: false,
  });
  const [liabilitieInfo, setLiabilitieInfo] = useState({
    liabilitiesName: '花呗', //贷款名称
    interestRate: 20, //年利率
    interest: 300, //总利息
    loanPeriod: 1, //贷款年限
    totalPeriod: 24, //总期数
    paymentsPerYearNum: 12, //每年还款次数
    loanInitiationTime: '2021-12-01', //贷款开始时间
    modeRepayment: '最低还款', //还款方式
    currentPeriod: 9, //当前期数
    amount: 15000, //总金额
    balance: 9000, //剩余金额
  });
  const [loanList, setLoanList] = useState([]);
  const [loanInfoList, setLoanInfoList] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [loanInfoState, setloanInfoState] = useState(false);
  const [loanId, setLoanId] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const [modelState, setModelState] = useState(false);
  const [createdForm] = Form.useForm();

  let liabilitiesList = {
    liabilitiesName: {
      label: '贷款名称',
      editable: true,
    },
    interestRate: {
      label: '年利率（%）',
      editable: true,
    },
    interest: {
      label: '总利息',
      editable: true,
    },
    loanPeriod: {
      label: '贷款年限',
      editable: true,
    },
    totalPeriod: {
      label: '总期数',
      editable: true,
    },
    paymentsPerYearNum: {
      label: '每年还款次数',
      editable: true,
    },
    loanInitiationTime: {
      label: '贷款开始时间',
      editable: true,
    },
    modeRepayment: {
      label: '还款方式',
      editable: true,
    },
    currentPeriod: {
      label: '当前期数',
      editable: true,
    },
    amount: {
      label: '总金额',
    },
    balance: {
      label: '剩余金额',
    },
  };
  const columns = [
    {
      title: '贷款单名称',
      dataIndex: 'liabilitiesName',
      key: 'liabilitiesName',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '还款方式',
      dataIndex: 'modeRepayment',
      key: 'modeRepayment',
    },
    {
      title: '总利息',
      dataIndex: 'interestRate',
      key: 'interestRate',
    },
    {
      title: '总利息',
      dataIndex: 'interest',
      key: 'interest',
    },
    {
      title: '剩余金额',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              seeLansInfo(record);
            }}
          >
            查看贷款单
          </a>
          <Popconfirm
            title="确定删除?"
            onConfirm={() => confirm(record._id)}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const modalColumns = [
    {
      title: '期数',
      dataIndex: 'numberperiods',
      key: 'numberperiods',
      render: (text) => <a>{text}</a>,
      editable: true,
    },
    {
      title: '还款日期',
      dataIndex: 'repaymentdate',
      key: 'repaymentdate',
      render: (text) => <a>{text}</a>,
      editable: true,
      width: 160,
    },
    {
      title: '期初余额',
      dataIndex: 'openingbalance',
      key: 'openingbalance',
      width: 100,
      editable: true,
    },
    {
      title: '计划还款',
      dataIndex: 'plannedrepayment',
      key: 'plannedrepayment',
      editable: true,
    },
    {
      title: '额外还款',
      dataIndex: 'additionalrepayment',
      key: 'additionalrepayment',
      editable: true,
    },
    {
      title: '累计利息',
      dataIndex: 'accumulatedinterest',
      key: 'accumulatedinterest',
      editable: true,
    },
    {
      title: '本金',
      dataIndex: 'principal',
      key: 'principal',
      editable: true,
    },
    {
      title: '期终余额',
      dataIndex: 'closingbalance',
      key: 'closingbalance',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'loanstate',
      key: 'loanstate',
      editable: true,
      render: (_, { loanstate }) => (
        <>
          {loanstate === '已还款' ? (
            <Tag color="green" key={loanstate}>
              {loanstate}
            </Tag>
          ) : (
            <Tag color="red" key={loanstate}>
              {loanstate}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>编辑</a>
      //     <a>删除</a>
      //   </Space>
      // ),
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="确定取消?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            编辑
          </Typography.Link>
        );
      },
    },
  ];

  useEffect(() => {
    getLoanList({});
  }, []);

  const confirm = (id) => {
    deleteLoanListApi(id).then((res) => {
      getLoanList({});
    });
  };
  const getLoanList = (params) => {
    getLoanListApi(params).then((res) => {
      // let list=[]
      // res.data.forEach((element) => {
      //   element.key = element.id;
      // });
      setLoanList(res.data);
    });
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
      repaymentdate: window.moment(record.repaymentdate),
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...loanInfoList];
      // console.log(key);
      const index = newData.findIndex((item) => {
        return key === item.key;
      });
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
          repaymentdate: window
            .moment(row.repaymentdate._d)
            .format('YYYY-MM-DD'),
        });
        // console.log(item);
        // console.log(row);
        setLoanInfoList(newData);
        setEditingKey('');
        editLoanInfoListApi({ loanid: loanId, loaninfoid: key, ...row }).then(
          (res) => { }
        );
      } else {
        // newData.push(row);
        setLoanInfoList(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const seeLansInfo = (rowdata) => {
    setLoanId(rowdata._id);
    setModelData({
      ...modelData,
      open: true,
    });
    getLoanInfoListApi({_id:rowdata._id}).then((res) => {
      res.data.forEach((element) => {
        element.key = element.id;
      });
      setLoanInfoList(res.data);
    });
    getLoanInfoApi({ _id: rowdata._id }).then((res) => {
      setLiabilitieInfo(res.data);
    });
  };
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // console.log(title);
    // console.log(children);
    const inputNode = inputType === 'number' ? <DatePicker /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns = modalColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'repaymentdate' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleOk = (e) => {
    console.log(liabilitieInfo);
    // console.log(e);
    setModelData({
      ...modelData,
      open: false,
    });
  };

  const handleCancel = (e) => {
    setModelData({
      ...modelData,
      open: false,
    });
    setEditingKey('');
    setloanInfoState(false);
  };

  const editLoanInfo = () => {
    setloanInfoState(!loanInfoState);
    //这个地方State是异步的，所以无法马上获取的当前已经修改的状态，而状态只有两种所以可以的取反获取上一次状态。

    // setTimeout(() => {
    //   console.log(liabilitieInfo);
    // }, 1000);
    if (loanInfoState === !false) {
      edtLoanInfo({ ...liabilitieInfo, id: loanId }).then((res) => {
        message.success(res.message);
      });
    }
  };
  const descriptionsList = (state) => {
    let descriptionsInfo = [];
    for (const key in liabilitiesList) {
      if (state) {
        //有可编辑的状态才可以进行编辑
        if (liabilitiesList[key] && liabilitiesList[key].editable === true) {
          // descriptionsInfo.push(<Descriptions.Item key={key} liabilitiesList={liabilitiesList[key].liabilitiesList}><Input defaultValue={liabilitieInfo[key]} /></Descriptions.Item>
          descriptionsInfo.push(
            <Descriptions.Item key={key} label={liabilitiesList[key]?liabilitiesList[key].label:''}>
              <Input
                defaultValue={liabilitieInfo[key]}
                onChange={(e) =>
                  setLiabilitieInfo({
                    ...liabilitieInfo,
                    [key]: e.target.value,
                  })
                }
              />
            </Descriptions.Item>
          );
        } else {
          // descriptionsInfo.push(
          //   <Descriptions.Item key={key} label={liabilitiesList[key]?liabilitiesList[key].label:''}>
          //     {liabilitieInfo[key]}
          //   </Descriptions.Item>
          // );
        }
      } else {
        descriptionsInfo.push(
          <Descriptions.Item key={key} label={liabilitiesList[key]?liabilitiesList[key].label:''}>
            {liabilitieInfo[key]}
          </Descriptions.Item>
        );
      }
    }
    return descriptionsInfo;
  };

  const progressColor = () => {
    let value =
      (liabilitieInfo.currentnumberissues / liabilitieInfo.totalnumberperiods) *
      100;
    switch (value) {
      case 10 < value < 20:
        return 'red';
      case 20 < value < 30:
        return 'green';
      default:
        return 'blue';
    }
  };
  const calculateHeight = () => {
    let tabheight;
    if (document.body.scrollHeight < 1000) {
      tabheight = {
        y: 240,
      };
    } else if (
      document.body.scrollHeight <
      1000 <
      document.body.scrollHeight <
      2000
    ) {
      tabheight = {
        y: 400,
      };
    }
    return tabheight;
  };
  const createdLiabilities = () => {
    createdForm.validateFields().then((values) => {
      console.log(values);
      createdLoanRecordApi({
        ...values,
      }).then((res) => {
        setModelState(false);
        getLoanList({});
      });
    });
  };
  return (
    <>
      {/* <div>负债贷款偿还11</div> */}
      <Row>
        <Col span={22}>
          <Descriptions title="总贷款信息">
            <Descriptions.Item label="总贷款金额（元）">
              <Statistic value={50000} />
            </Descriptions.Item>
            <Descriptions.Item label="剩余还款">
              <Statistic value={38000} />
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            onClick={() => {
              setModelState(true);
            }}
          >
            新建贷款信息
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={loanList} />

      <Modal
        title="贷款单详细"
        width={1200}
        centered="true"
        open={modelData.open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Descriptions
          bordered
          title=""
          size="small"
          column={2}
          extra={
            loanInfoState ? (
              <Button type="primary" onClick={editLoanInfo}>
                完成
              </Button>
            ) : (
              <Button type="primary" onClick={editLoanInfo}>
                编辑
              </Button>
            )
          }
        >
          {/* <Form
            name="basic"
            initialValues={{
            }}
            form={loanInfoForm}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >       </Form> */}
          {loanInfoState ? descriptionsList(true) : descriptionsList(false)}
          {/* <Descriptions.Item label="贷款名称">
            <Input value={liabilitieInfo.loanname} disabled></Input>
          </Descriptions.Item>
          <Descriptions.Item label="年利率">{liabilitieInfo.annualinterestrate}</Descriptions.Item>
          <Descriptions.Item label="总利息">{liabilitieInfo.totalinterest}</Descriptions.Item>
          <Descriptions.Item label="贷款年限">{liabilitieInfo.loanlife}</Descriptions.Item>
          <Descriptions.Item label="总期数">{liabilitieInfo.totalnumberperiods}</Descriptions.Item>
          <Descriptions.Item label="每年还款次数">{liabilitieInfo.thenumberrepaymentsperyear}</Descriptions.Item>
          <Descriptions.Item label="贷款开始时间">{liabilitieInfo.loanstarttime}</Descriptions.Item>
          <Descriptions.Item label="还款方式">{liabilitieInfo.moderepayment}</Descriptions.Item>
          <Descriptions.Item label="当前期数">{liabilitieInfo.currentnumberissues}</Descriptions.Item> */}
        </Descriptions>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Progress
            percent={
              (liabilitieInfo.currentnumberissues /
                liabilitieInfo.totalnumberperiods) *
              100
            }
            strokeColor={progressColor()}
            status="active"
          />
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              size="small"
              className="loan-info"
              bordered
              dataSource={loanInfoList}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
                defaultPageSize: 12,
              }}
              // scroll={{
              //   y: 240,
              // }}
              scroll={calculateHeight()}
            />
          </Form>
        </Space>
      </Modal>

      <Modal
        title="新增"
        open={modelState}
        onOk={createdLiabilities}
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
          <Form.Item label="贷款单名称" name="liabilitiesName">
            <Input />
          </Form.Item>
          <Form.Item label="金额" name="amount">
            <InputNumber
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item label="还款方式" name="modeRepayment">
            <Input />
          </Form.Item>
          <Form.Item label="利率" name="interestRate">
            <InputNumber
              style={{
                width: '100%',
              }}
              step="0.01"
            />
          </Form.Item>
          <Form.Item label="总利息" name="interest">
            <InputNumber
              style={{
                width: '100%',
              }}
              step="1"
            />
          </Form.Item>
          <Form.Item label="剩余金额" name="balance">
            <InputNumber
              style={{
                width: '100%',
              }}
              step="1"
            />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Liabilities;
