/*
 * @Author: HHG
 * @Date: 2022-10-04 00:02:13
 * @LastEditTime: 2023-03-12 14:28:54
 * @LastEditors: 韩宏广
 * @FilePath: /Financial/web/src/pages/Summary/index.js
 * @文件说明: 
 */
import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Input, Space, Table, DatePicker, Modal, message, Popconfirm, Select, Drawer, Divider } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { getBillSummaryListApi, editSingleBill, deleteSingleBillApi } from '@/api/summary'
import { getConsumptionTypeListApi } from '@/api/consumptiontype'
import { getIncomeTypeListApi } from '@/api/incometype'
// import { dateFormat } from '@/utils/index'

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const Summary = () => {
  const [expand, setExpand] = useState(false);
  const [tabData, setTabData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billsummaryid, setBillsummaryid] = useState('');
  const [incomeExpenditureState, setIncomeExpenditureState] = useState('')
  const [incomeOption, setIncomeOption] = useState([])
  const [spendingOption, setSpendingOption] = useState([])
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editModelForm] = Form.useForm()
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    getbillsummarylist(values)
  };

  useEffect(() => {
    getbillsummarylist({})
    getConsumptionTypeListApi().then(res => {
      let options = []
      res.data.forEach(element => {
        options.push({ label: element.name, value: element.id })
      })
      setSpendingOption(options)
    })
    getIncomeTypeListApi().then(res => {
      let options = []
      res.data.forEach(element => {
        options.push({ label: element.name, value: element.id })
      })
      setIncomeOption(options)
    })
  }, [])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    editModelForm.validateFields().then(values => {
      setIsModalOpen(false);
      editSingleBill({ ...values, billsummaryid: billsummaryid }).then(res => {
        message.success(res.message)
      })
    })

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getbillsummarylist = (data) => {
    getBillSummaryListApi(data).then(res => {
      res.data.forEach(element => {
        // ...element,
        element.key = element.billsummaryid
      });
      setTabData(res.data)
    })
  }
  const editBill = (rowData) => {
    showModal()
    setBillsummaryid(rowData.key)
    if (typeof (rowData.tradingtime) === 'string' && rowData.tradingtime.replace(/\s+/g, "") === '') {
      rowData.tradingtime = ''
    } else {
      rowData.tradingtime = window.moment(rowData.tradingtime)
    }
    editModelForm.setFieldsValue(rowData)
  }
  const confirm = (id) => {
    deleteSingleBillApi({ summarybillid: id }).then(res => {
      message.success(res.message)
      getbillsummarylist({})
    })
  }
  const incomeExpenditureChange = (value) => {
    setIncomeExpenditureState(value)
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const seeBillSummary=()=>{
    showDrawer()
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'billname',
      key: 'billname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '交易日期',
      dataIndex: 'tradingtime',
      key: 'tradingtime',
    },
    {
      title: '收/支',
      dataIndex: 'incomeexpenditure',
      key: 'incomeexpenditure',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '交易方',
      dataIndex: 'counterparty',
      key: 'counterparty',
    },
    {
      title: '关联收支类型',
      dataIndex: 'associationtype',
      key: 'associationtype',
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
          <a onClick={() => editBill(record)}>编辑</a>
          <Popconfirm
            title="确定要删除账单信息吗?"
            onConfirm={() => confirm(record.key)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      {/* Summary */}
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={6} >
            <Form.Item
              name='billname'
              label='账单名称'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} >
            <Form.Item
              name='tradingtime'
              label='交易时间'
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6} >
            <Form.Item
              name='amount'
              label='金额'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} >
            <Form.Item
              name='counterparty'
              label='交易方'
            >
              <Input />
            </Form.Item>
          </Col>
          {
            expand ? (<>
              <Col span={6} >
                <Form.Item
                  name='associationtype'
                  label='关联收支类型'
                >
                  <Input />
                </Form.Item>
              </Col>
            </>) : (<> </>)
          }
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" onClick={()=>seeBillSummary()} style={{marginRight:'10px'}}>
              统计详细
            </Button>
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
            <a
              style={{
                fontSize: 12,
              }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? (<><UpOutlined />收回</>) : (<><DownOutlined />展开</>)}
            </a>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={tabData} />
      <Modal title="编辑账单" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          // initialValues={{editModel}}
          form={editModelForm}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="名称"
            name="billname"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="交易时间"
            name="tradingtime"
            rules={[
              {
                required: true,
                message: '请选择交易时间',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="收/支"
            name="incomeexpenditure"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Select
              onChange={incomeExpenditureChange}
              options={[
                {
                  value: '收入',
                  label: '收入',
                },
                {
                  value: '支出',
                  label: '支出',
                }
              ]}
            />
          </Form.Item>
          <Form.Item
            label="金额"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="交易方"
            name="counterparty"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="关联收支类型"
            name="associationtype"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            {/* <Input /> */}
            <Select
              // onChange={}
              options={incomeExpenditureState === '收入' ? incomeOption : spendingOption}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
        <b>统计详细</b>
        </p>
        <p className="site-description-item-profile-p">收入</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="总金额" content="1000" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="收入" content="30000" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="支出" content="4000" />
          </Col>
          <Col span={12}>
          <DescriptionItem title="做多次交易方" content="食堂" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="单笔最大消费名称" content="February" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="单笔最大消费金额" content="2000" />
          </Col>
        </Row>
        {/* <Row>
          <Col span={12}>
            <DescriptionItem title="单笔最大消费名称" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row> */}
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider />
        {/* <p className="site-description-item-profile-p">Company</p> */}
        
      </Drawer>
    </>
  )
}

export default Summary