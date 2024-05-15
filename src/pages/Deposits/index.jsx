/*
 * @Author: HHG
 * @Date: 2022-10-04 00:00:16
 * @LastEditTime: 2023-01-10 23:16:03
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/pages/Deposits/index.js
 * @文件说明: 
 */
import React, { useEffect, useState } from 'react'
import { Statistic, Row, Col, Button, Tag, Space, Table, Modal, Form, Input, Select, DatePicker, message, Popconfirm } from 'antd'
import { getDepositListApi, editDepositInfoApi, deleteDepositApi } from '@/api/deposits'
import './index.less'

const Deposits = () => {
  var modelEle
  const [tableData, settableData] = useState([])
  const [modelData, setModelData] = useState({
    isModalOpen: false,
    id: ''
  })
  const [actionState, setActionState] = useState("0")
  const [form] = Form.useForm()
  const [formSearchData] = Form.useForm()
  useEffect(() => {
    // getDepositListApi({}).then(res => {
    //   let data = []
    //   res.data.forEach(element => {
    //     data.push({
    //       ...element,
    //       key: element.id
    //     })
    //   });
    //   settableData(data)
    // })
    getDepositList()
  }, [])
  const columns = [
    {
      title: '存款名称',
      dataIndex: 'depositname',
      key: 'depositname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '金额(¥)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '利率',
      dataIndex: 'interestrate',
      key: 'interestrate',
    },
    {
      title: '到期时间',
      dataIndex: 'maturitytime',
      key: 'maturitytime',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      render: (_, { type }) => {
        if (type === '定期存款') {
          return (
            <>
              <Tag color={'red'} >
                {"定期存款"}
              </Tag>
            </>
          )
        } else if (type === '活期存款') {
          return (
            <>
              <Tag color={'green'} >
                {"活期存款"}
              </Tag>
            </>
          )
        }

      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { editDeposit(record) }}>编辑</a>
          <Popconfirm
            title="确认删除这条存款单吗?"
            onConfirm={() => confirm(record.id)}
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

  const confirm = (id) => {
    // console.log("confirm");
    deleteDepositApi({ id: id }).then(res => {
      message.success(res.message)
      getDepositList()
    })
  }
  //获取存款单列表
  const getDepositList = (data) => {
    getDepositListApi(data||{}).then(res => {
      let data = []
      res.data.forEach(element => {
        data.push({
          ...element,
          key: element.id
        })
      });
      settableData(data)
    })
  }
  const editDeposit = (rowdata) => {
    form.resetFields()
    setModelData({ ...modelData, id: rowdata.id, isModalOpen: true })
  }
  const handleOk = () => {
    form.validateFields().then(values => {
      // console.log(values);
      editDepositInfoApi(values).then(res => {
        message.success(res.message)
        setModelData({
          ...modelData,
          isModalOpen: false
        });
      })
    })
  };
  const handleCancel = () => {
    setModelData({
      ...modelData,
      isModalOpen: false
    });
  };
  const handleChange = (value) => {
    setActionState(value)
  }
  const onFinish = (values) => {
    console.log(values);
    getDepositList(values)
  }
  if (actionState === '0') {
    modelEle = <>  <Form.Item
      label="续存金额"
      name="renewalamount"
    >
      <Input />
    </Form.Item>
      <Form.Item
        label="续存利率"
        name="renewalrate"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="到期时间"
        name="maturitytime"
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
    </>
  } else if (actionState === '1') {
    modelEle = <>
      <Form.Item
        label="利率"
        name="interestrate"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="利息"
        name="interest"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="去向"
        name="gowhere"
      >
        <Input />
      </Form.Item>
    </>
  }
  return (
    <>
      {/* <div>Deposits</div> */}

      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="总存款¥" value={112893} />
        </Col>
        <Col span={12}>
          说明：总金额计算的是本金，不包含没有结清的利息收入。
        </Col>
      </Row>
      <Row className='form-search'>
        <Col>
          <Form
            name="basic"
            form={formSearchData}
            // initialValues={}
            onFinish={onFinish}
          >
            <Row gutter={{
              xs: 8,
              sm: 10,
              md: 24,
              lg: 20,
            }}>
              <Col>
                <Form.Item
                  label="存款名称"
                  name="depositname"
                  auto-complete='new-password'
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="到期时间"
                  name="maturitytime"
                >
                  <DatePicker />
                </Form.Item>
              </Col>

              <Col>
                <Space>
                  <Button type='primary' htmlType='submit'>提交</Button>
                  <Button type='primary' htmlType='reset'>重置</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Table columns={columns} dataSource={tableData} />
      <Modal title="编辑" open={modelData.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            {/* <Input /> */}
            <Select
              // style={{
              //   width: 120,
              // }}
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
          {
            modelEle
            // actionState == '0' ? (
            //   <>
            //   <Form.Item
            //     label="续存金额"
            //     name="renewalamount"
            //   >
            //     <Input />
            //   </Form.Item>
            //   <Form.Item
            //     label="续存利率"
            //     name="renewalamount"
            //   >
            //     <Input />
            //   </Form.Item>
            //   <Form.Item
            //     label="到期时间"
            //     name="maturitytime"
            //   >
            //     <Input />
            //   </Form.Item>
            //   </>
            // ) : (
            //   <>
            //   <Form.Item
            //   label="利率"
            //   name="interestrate"
            // >
            //   <Input />
            // </Form.Item>
            // <Form.Item
            //   label="利息"
            //   name="interest"
            // >
            //   <Input />
            // </Form.Item>
            // <Form.Item
            //   label="去向"
            //   name="gowhere"
            // >
            //   <Input />
            // </Form.Item>
            //   </>
            // )
          }

        </Form>
      </Modal>
    </>
  )
}

export default Deposits