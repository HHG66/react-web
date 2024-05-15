/*
 * @Author: HHG
 * @Date: 2022-09-01 17:01:29
 * @LastEditTime: 2023-04-13 10:09:28
 * @LastEditors: 韩宏广
 * @FilePath: \web\src\pages\IncometypeAssociated\index.js
 * @文件说明: 
 */
import { Space, Table, Row, Col, Button, Modal, Form, Input, message, Select, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { newAssociatedIncome, getIncomeTypeListApi, editAssociatedIncomeApi, deleteAssociatedIncomeApi, getAssocicitedIncomeListApi } from '@/api/incometype';


const IncometypeAssociated = () => {
  const [model, setModel] = useState({
    title: '新建关联收入账单',
    state: false,
    isEdit: false
  })
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm();
  // const [title, setTitle] = useState("新建关联收入账单")
  const [incomeTypeList, setIncomeTypeList] = useState([])
  // const [tableData, setTabelDate] = useState(
  //   [
  //     {
  //       key: '1',
  //       billincomename: '胡彦斌',
  //       age: 32,
  //       incomtypename: '西湖区湖底公园1号',
  //     },
  //     {
  //       key: '2',
  //       billincomename: '胡彦祖',
  //       age: 42,
  //       incomtypename: '西湖区湖底公园1号',
  //     },
  //   ]
  // )
  const tableData = [
    // {
    //   key: '1',
    //   billincomename: '胡彦斌',
    //   age: 32,
    //   incomtypename: '西湖区湖底公园1号',
    // },
    // {
    //   key: '2',
    //   billincomename: '胡彦祖',
    //   age: 42,
    //   incomtypename: '西湖区湖底公园1号',
    // },
  ]

  useEffect(() => {

    getAssocicitedIncomeListApi({}).then((res) => {
      // const tableData = res.data.map(item => ({
      //   billincomename: item.billincomename,
      //   incomtypename: item.incomtypename,
      //   remarks: item.remarks,
      //   key: item.id
      // }))
      // console.log(tableData);
      // setTabelDate(tableData)
    })
  }, [])
  const columns = [
    {
      title: '账单收入名称',
      dataIndex: 'billincomename',
      key: 'billincomename',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '关联收入字段名称',
      dataIndex: 'incomtypename',
      key: 'incomtypename',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { edit(record) }}>编辑</a>
          <Popconfirm
            title="确定要删除吗?，关联的名称会被替换成默认！"
            onConfirm={() => { deletes(record) }}
            okText="确定"
            cancelText="取消"
          >
            <a >删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const edit = (rowdata) => {
    form.resetFields()
    setModel({
      ...model,
      state: true,
      isEdit: true,
      title: "编辑关联收入账单",
      id: rowdata.key
    })
    form.setFieldsValue({
      "billIncomeName": rowdata.billincomename,
      "incomTypeName": rowdata.incomtypename,
    })
  }
  const deletes = (rowdata) => {
    console.log(rowdata);
    deleteAssociatedIncomeApi({ id: rowdata.key }).then((res) => {
      message.success(res.message)
      setModel({
        ...model,
        state: false,
      })
    })
  }
  const showModal = () => {
    let incomeTypeList = []
    form.resetFields()
    getIncomeTypeListApi().then((res) => {
      // console.log(res);
      res.data.forEach(element => {
        incomeTypeList.push({ "label": element.name, "value": element.id, "key": element.id })
      });
      setIncomeTypeList(incomeTypeList)
    })
    setModel({
      ...model,
      state: true,
      title: '新建关联收入账单',
      isEdit: false
    })
  }
  const handleOk = () => {
    form.validateFields().then((res) => {
      setConfirmLoading(true)
      if (model.isEdit === false) {
        newAssociatedIncome(res).then((req) => {
          message.success(req.message)
          setConfirmLoading(false)
          setModel({
            ...model,
            state: false
          })
        })
      } else {
        console.log('编辑成功');
        editAssociatedIncomeApi({ ...res, id: model.id }).then((req) => {
          message.success(req.message)
          setModel({
            ...model,
            state: false
          })
          setConfirmLoading(false)
        })
      }
    })
  }
  const filterOption = (input, option) => {
    return option.label.indexOf(input) !== -1
  }
  return (
    <>
      <Row gutter={24} className='btn-form'>
        <Col span={3} lg={3} offset={21}>
          {/* <Space> */}
          <Button type="primary" onClick={() => showModal()}>+ 新建</Button>
          {/* <Button>设置</Button> */}
          {/* </Space> */}
        </Col>
      </Row>

      <Table columns={columns} dataSource={tableData} />
      <Modal
        title={model.title}
        className='lili'
        bodyStyle={{ display: 'block' }}
        open={model.state}
        onOk={handleOk}
        cancelText="取消"
        okText="确定"
        confirmLoading={confirmLoading}
        onCancel={() => setModel({ ...model, state: false })}
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
            label="账单收入名称"
            name="billIncomeName"
            validateTrigger={['onBlur', 'onSubmit']}
            rules={[
              {
                required: true,
                message: '请输入账单收入名称',
              },
            ]
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="关联收入类型"
            name="incomTypeName"
            validateTrigger={['onBlur', 'onSubmit']}
            rules={[
              {
                required: true,
                message: '请输入关联账单收入名称',
              },
            ]
            }
          >
            {/* <Input /> */}

            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              options={incomeTypeList}
              filterOption={
                filterOption
              }
            >

            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default IncometypeAssociated