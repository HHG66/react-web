/*
 * @Author: HHG
 * @Date: 2022-09-01 17:01:31
 * @LastEditTime: 2023-03-12 14:38:27
 * @LastEditors: 韩宏广
 * @FilePath: /Financial/web/src/pages/IncometypeManagement/index.js
 * @文件说明: 
 */
import { Row, Space, Table, Col, Button, Form, Modal, Input, message, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { newIncometype, deleteIncomeType, getIncomeTypeListApi, editIncometypeApi } from '@/api/incometype'

const IncometypeManagement = () => {
  const columns = [
    {
      title: '收入类型名称',
      dataIndex: 'incometypename',
      key: 'incometypename',
      width: 200
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: '操作',
      key: '操作',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { editIncomeType(record) }}>编辑 </a>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => deleteIncomeTypes(record)}
            // onCancel={cancel}
            okText="删除"
            cancelText="取消"
          >
            <a >删除</a>
          </Popconfirm>

        </Space>
      ),
    },
  ];
  const data = [];
  const [open, setOpen] = useState({
    open: false,
    title: '新增',
    isEdit: false
  })
  const [incomeTypeId, setIncomeTypeId] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm();
  const [formdata, setFormdata] = useState(data)
  useEffect(() => {
    getIncomeTypeList()
  }, [])
  const getIncomeTypeList = () => {
    getIncomeTypeListApi().then((res) => {
      console.log(res);
      // {
      //   key: '1',
      //   name: 'John Brown',
      //   age: 32,
      //   address: 'New York No. 1 Lake Park',
      //   tags: ['nice', 'developer'],
      // },
      var tabelData = []
      res.data.forEach(element => {
        tabelData.push({
          key: element.id,
          incometypename: element.name,
          date: element.data,
          remarks: element.remarks
        })
      });
      setFormdata(tabelData)
    })
  }
  const showModal = () => {
    setOpen({
      open: true,
      title: '新增',
      isEdit: false
    })
    form.resetFields()
  }
  const handleOk = () => {
    form.validateFields().then((res) => {
      setConfirmLoading(true)
      if (open.isEdit !== true) {
        newIncometype(res).then((res) => {
          setConfirmLoading(false)
          setOpen({
            open: false
          })
          message.success(res.message)
        })
      } else {
        editIncometypeApi({ id: incomeTypeId, name: res.incomName, remarks: res.remarks }).then((res) => {
          setOpen({
            open: false
          })  
          getIncomeTypeList()
          message.success(res.message)
          setConfirmLoading(false)
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  }
  const editIncomeType = (rowdata) => {
    console.log(rowdata);
    setOpen({
      open: true,
      title: '编辑',
      isEdit: true
    })
    form.setFieldsValue({ incomName: rowdata.incometypename, remarks: rowdata.remarks })
    setIncomeTypeId(rowdata.key)
  }
  const deleteIncomeTypes = (rowdata) => {
    deleteIncomeType(rowdata.key).then((res) => {
      message.success(res.message)
      getIncomeTypeList()
    })
  }

  return (
    <>
      <Row gutter={24} className='btn-form'>
        <Col span={3} lg={3} offset={21}>
          <Button type="primary" onClick={() => showModal()}>+ 新建</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={formdata} />


      <Modal
        title={open.title}
        className='lili'
        bodyStyle={{ display: 'block' }}
        open={open.open}
        onOk={handleOk}
        cancelText="取消"
        okText="确定"
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="收入类型名称"
            name="incomName"
            validateTrigger={['onBlur', 'onSubmit']}
            rules={[
              {
                required: true,
                message: '请输入收入类型名称',
              },
            ]
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remarks"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default IncometypeManagement