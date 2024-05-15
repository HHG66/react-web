/*
 * @Author: HHG
 * @Date: 2022-10-03 23:59:38
 * @LastEditTime: 2023-01-31 22:29:31
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/pages/Funds/index.js
 * @文件说明: 
 */
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row, Space, DatePicker, Table, Select, Modal, InputNumber, Popconfirm, message } from 'antd';
import './index.less'
import { getPositionFundsListApi, deleteFundApi, editfundinfo } from '@/api/funds'
// import { getSineFundInfoApi } from '@/api/other';
// import { formatSinaStock } from '@/utils/index';


const Funds = () => {
  // Funds 组件
  const [form] = Form.useForm();
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fundInfo, setFundInfo] = useState(true);
  const [editfundid, setEditFundid] = useState('')
  const [formModel] = Form.useForm()
  const columns = [
    {
      title: '基金名称',
      dataIndex: 'fundname',
      key: 'fundname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '基金代码',
      dataIndex: 'fundcode',
      key: 'fundcode',
    },
    {
      title: '投入金额',
      dataIndex: 'amountinvested',
      key: 'amountinvested',
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '板块',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: '买入时间',
      dataIndex: 'buydate',
      key: 'buydate',
    },
    {
      title: '卖出时间',
      dataIndex: 'saledate',
      key: 'saledate',
    },
    {
      title: '持仓状态',
      dataIndex: 'holdingstate',
      key: 'holdingstate',
    },

    //增加最近操作，只是增加工作，因为不能每次操作都去修改，更多应该关注持有和卖出两个阶段。
    // {
    //   title: '最近操作',
    //   dataIndex: 'fundstate',
    //   key: 'fundstate',
    //   //不是最优设计
    //   render: (_, { fundstate }) => (
    //     <div className='tag-box' title={fundstate}>
    //       {
    //         fundstate.map(tag => {
    //           return (
    //             <Tag key={tag}>{tag}</Tag>
    //           )
    //         })
    //       }
    //     </div>
    //   )
    // },
    {
      title: '持仓占比(%)',
      dataIndex: 'proportionpositionsheld',
      key: 'proportionpositionsheld',
      render: (_, record) => (
        // console.log(record.proportionpositionsheld)
        <div>{record.proportionpositionsheld}</div>
      ),
    },
    {
      title: '成本(元）',
      dataIndex: 'costprice',
      key: 'costprice',
    },
    {
      title: '当日价格（元）',
      dataIndex: 'currentprice',
      key: 'currentprice',
    },
    {
      title: '当日盈亏(%)',
      dataIndex: 'currentearnings',
      key: 'currentearnings',
    },
    {
      title: '盈亏(百分比）',
      dataIndex: 'earningspercentage',
      key: 'earningspercentage',
    },
    {
      title: '盈亏（元）',
      dataIndex: 'earnings',
      key: 'earnings',
    },
    {
      title: '编辑',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editState(record)}>编辑状态</a>
          <Popconfirm
            title="确定删除基金?"
            onConfirm={() => deletefunds(record)}
            okText="确定"
            cancelText="取消"
          >
            <a >删除</a>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  useEffect(() => {
    let params = {}
    getPositionFundsListApi(params).then(res => {
      // console.log(res);
      // let ss=[]
      // res.data.forEach(element => {
      //   console.log(element);
      //   let i={}
      //   for (const key in element) {
      //     i[key]=element[key]
      //   }
      //   ss.push(i)
      // });
      // console.log(ss);
      setData(res.data)
    })
  }, [])

  const onFinish = (values) => {
    let startdate
    let enddate
    if (values.startdate) {
      startdate = window.moment(values.startdate._d).format('HHHH-YY-DD')
    }
    if (values.enddate) {
      enddate = window.moment(values.enddate._d).format('HHHH-YY-DD')
    }
    console.log(startdate, enddate);
    // console.log(enddate);
    console.log('Success:', values);
    //第三方的股票查询，已不用
    // getSineFundInfoApi({ fundname: "sz159605,s_sh600519" }).then(res => {
    //   let ttt = res.data.replace(/[\r\n]/g, "")
    //   let ddd = ttt.replace('"', '')
    //   let yyy = ddd.split(";")
    //   yyy.forEach(element => {
    //     let i = element.replaceAll('"', '')
    //     let t = i.split("=")
    //     // console.log(t[1]);
    //     if (t[1]) {
    //       let g = formatSinaStock(t[1])
    //       console.log(g);
    //     }
    //   });
    // })



  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const editState = (rowData) => {
    setEditFundid(rowData.fundid)
    // console.log("editState");
    setIsModalOpen(true)
    formModel.resetFields(['sellingprice', 'sellingnumber', 'addnumber', 'price'])
    formModel.setFieldsValue({ sellingnumber: 1, addnumber: 1 })
  }
  const deletefunds = (rowData) => {
    // console.log("deletefunds");
    // console.log(rowData);
    deleteFundApi(rowData.fundid).then(res => {
      message.success(res.message)
    })
  }
  const handleOk = () => {
    formModel.validateFields().then((values) => {
      // console.log(values);
      editfundinfo({ ...values, fundid: editfundid }).then(res => {
        // console.log(res);
        message.success(res.message)
        setIsModalOpen(false);
      })
    }).catch(error => {
      console.log(error);
    })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    if (parseInt(value) === 2) {
      setFundInfo(false)
    } else {
      setFundInfo(true)
    }
    formModel.resetFields(['sellingprice', 'sellingnumber', 'addnumber', 'price'])
  }
  return (
    <>
      <Form
        name="basic"
        form={form}
        // form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Space>
            <Col>
              <Form.Item
                label="股票基金名称"
                name="fundname"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="持仓状态"
                name="holdingstate"
              >
                <Select
                  // defaultValue=""

                  style={{ width: 120 }}
                  // onChange={handleChange}
                  options={[
                    {
                      value: '0',
                      label: '持有',
                    },
                    {
                      value: '1',
                      label: '已卖出',
                    },
                  ]}
                />

              </Form.Item>
            </Col>
            <Col >
              <Form.Item
                label="起始时间"
                name="startdate"
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col >
              <Form.Item
                label="终止时间"
                name="enddate"
              >
                {/* <Input /> */}
                <DatePicker />
              </Form.Item>
            </Col>
            <Col>
              <Button htmlType='submit' type='primary'>查询</Button>
            </Col>
          </Space>

        </Row>
      </Form>


      <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} />

      <Modal title="操作" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{ sellingnumber: 1, addnumber: 1 }}
          form={formModel}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="状态"
            name="fundstate"
            rules={[
              {
                required: true,
                message: '请选择状态',
              },
            ]}
          >
            <Select
              // defaultValue="0"
              // initialValues={{value:'0'}}
              // style={{ width: 120 }}
              onChange={handleChange}
              options={[
                {
                  value: '2',
                  label: '加仓',
                },
                {
                  value: '1',
                  label: '卖出',
                },
              ]}
            />
          </Form.Item>

          {
            fundInfo ? (
              <>
                <Form.Item
                  label="卖出价格"
                  name="sellingprice"
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
                  label="卖出数量"
                  name="sellingnumber"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  {/* 数字输入需要动态获取最大数量 max={}  */}
                  <InputNumber min={1} className="input-number" />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  label="加仓数量"
                  name="addnumber"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  {/* <Input /> */}
                  <InputNumber min={1} className="input-number" />
                </Form.Item>
                <Form.Item
                  label="价格"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            )
          }

          {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  )
}

export default Funds
