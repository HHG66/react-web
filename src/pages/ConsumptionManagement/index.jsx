/*
 * @Author: HHG
 * @Date: 2022-09-01 17:01:17
 * @LastEditTime: 2023-02-16 09:10:25
 * @LastEditors: 韩宏广
 * @FilePath: \financial\web\src\pages\ConsumptionManagement\index.js
 * @文件说明: 
 */
import { Table, Form, Input, Row, Col, Button, Space, Modal, message, Popconfirm } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { getConsumptionTypeListApi, newConsumptionType, editConsumptionTypeApi, deleteConsumptiontypeApi } from '@/api/consumptiontype'
import { useEffect, useState } from 'react';
import './index.less'
const ConsumptionManagement = () => {

  let [dataSource, setDataSource] = useState([])
  let [formSearch, setFormSearch] = useState(false)
  //对话框
  // const [open, setOpen] = useState(false);
  const [open, setOpen] = useState({
    state: false,
    isEdit: false,
    title: '新增',
    id: ""
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  //表单
  const [form] = Form.useForm();
  const [searchform] = Form.useForm();
  const confirm = (record) => {
    deleteConsumptiontype(record.key)
  }

  const columns = [
    {
      title: '消费类型名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editconsumptiontype(record)}>编辑</a>
          <Popconfirm
            title="确定要删除消费类型吗？如果存在关联，需要先删除关联消费账单后再试。"
            onConfirm={() => confirm(record)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">删除</a>
          </Popconfirm>
          {/* <a onClick={() =>}></a> */}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllConsumptiontypeList()
  }, [])
  const getAllConsumptiontypeList = () => {
    getConsumptionTypeListApi({}).then((res) => {
      let data = []
      res.data.forEach(element => {
        data.push({
          ...element,
          key: element.id
        })
      });
      setDataSource(data)
    });
  }
  const onReset = () => {
    searchform.resetFields();
    getAllConsumptiontypeList()
  };

  const onFinish = (values) => {
    getConsumptionTypeListApi(values).then((res) => {
      setDataSource(res.data)
    });
  };

  const showHideSearch = () => {
    if (formSearch === true) {
      setFormSearch(false)
    } else {
      setFormSearch(true)
    }
  }

  //对话框
  const showModal = () => {
    setOpen({
      state: true,
      isEdit: false,
      title: '新增'
    });
    form.resetFields()
  };

  const handleCancel = () => {
    setOpen({
      open: false
    });
  };
  const handleOk = () => {
    //手动调用表单的校验规则，通过后可以提交
    form.validateFields().then(values => {
      setConfirmLoading(true);
      if (open.isEdit !== true) {
        newConsumptionType(values).then(res => {
          setConfirmLoading(false);
          if (res.code === "00000") {
            message.success(res.message);
            getAllConsumptiontypeList()
            setOpen({
              open: false
            });
          }
        })
      } else {
        // console.log("编辑");
        editConsumptionTypeApi({ ...values, id: open.id }).then((res) => {
          setConfirmLoading(false);
          message.success(res.message);
          getAllConsumptiontypeList()
          setOpen({
            open: false
          });
        })
      }

    }).catch(error => {
      console.log(error);
    })
  };

  const editconsumptiontype = (rowdata) => {
    setOpen({
      state: true,
      isEdit: true,
      title: '编辑',
      id: rowdata.id
    });
    // console.log(form);
    console.log(rowdata);
    form.resetFields(["consumptionName"])
    form.setFieldsValue({
      "consumptionName": rowdata.name,
      'remarks': rowdata.remarks
    })
  }

  const deleteConsumptiontype = (id) => {
    deleteConsumptiontypeApi(id).then((res) => {
      if (res.code === '00000') {
        getAllConsumptiontypeList()
        message.success(res.message)
      }
    })
  }

  return (
    <>

      <Form name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={searchform}
        autoComplete="off">
        <Row gutter={24}>
          <Col span={6} lg={5}>
            <Form.Item label="类型名称" name="consumptionName"  >
              <Input />
            </Form.Item>
          </Col>

          {/* 展开收入项目，暂时不需要 */}
          {/* <Col span={6} lg={5} className={formSearch === true ? 'search-form' : ''}>
            <Form.Item label="username2" name="username2" rules={[{ required: true, message: 'Please input your username!' }]} >
              <Input />
            </Form.Item>
          </Col> */}

          <Col span={6} lg={9} >
            <Form.Item >
              <Space>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button onClick={onReset}>重置</Button>
                {/* 链接纯粹为了一个样式 */}
                <div onClick={showHideSearch}>
                  <div>
                    <a href='##'>
                      <Space>
                        {formSearch === true ? "展开" : "收起"}
                        {formSearch === true ? < DownOutlined /> : < UpOutlined />}
                      </Space>
                    </a>
                  </div>
                </div>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Row gutter={24} className='btn-form' >
        <Col span={24} className='btn-positon'>
          {/* <Space> */}
          <Button type="primary" onClick={() => showModal()}>+ 新建</Button>
          {/* <Button>设置</Button> */}
          {/* </Space> */}
        </Col>
      </Row>

      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title={open.title}
        className='lili'
        bodyStyle={{ display: 'block' }}
        open={open.state}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
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
            label="消费类型名称"
            name="consumptionName"
            validateTrigger={['onBlur', 'onSubmit']}
            rules={[
              {
                required: true,
                message: '请输入消费类型名称',
              },
            ]
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remarks"
            validateTrigger={['onBlur', 'onSubmit']}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

    </>
  )
}
export default ConsumptionManagement