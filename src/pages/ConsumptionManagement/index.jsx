/*
 * @Author: HHG
 * @Date: 2022-09-01 17:01:17
 * @LastEditTime: 2025-01-03 18:12:27
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\ConsumptionManagement\index.jsx
 * @文件说明:
 */
import {
  Table,
  Form,
  Input,
  Row,
  Col,
  Button,
  Space,
  Modal,
  message,
  Popconfirm,
  Tag,
} from 'antd';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  getConsumptionTypeListApi,
  addConsumptionType,
  editConsumptionTypeApi,
  deleteConsumptiontypeApi,
} from '@/api/consumptiontype';
import { useEffect, useState, useRef } from 'react';
import './index.less';
import HForm from '@/components/hForm/HForm.jsx';
const ConsumptionManagement = () => {
  let [dataSource, setDataSource] = useState([]);
  // let [formSearch, setFormSearch] = useState(false);
  //对话框
  // const [open, setOpen] = useState(false);
  const [open, setOpen] = useState({
    state: false,
    isEdit: false,
    title: '新增',
    id: '',
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentRowData, setRowdata] = useState({
    currentRowData:"",
    productKeyWords: null,
    remark: "",
  });
  //表单
  const formRef = useRef();

  const [searchform] = Form.useForm();
  const confirm = (record) => {
    deleteConsumptiontype(record._id);
  };

  const columns = [
    {
      title: '消费类型名称',
      dataIndex: 'consumptionTypeName',
      // key: 'consumptionTypenNae',
      width: 200,
    },
    {
      title: '关联产品关键字',
      dataIndex: 'productKeyWords',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color={tag.color} key={tag.value}>
                {tag.value}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      // key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editconsumptiontype(record)}>编辑</a>
          <Popconfirm
            title="确定要删除消费类型吗？"
            onConfirm={() => confirm(record)}
            // onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
          {/* <a onClick={() =>}></a> */}
        </Space>
      ),
    },
  ];
  const formConfig = {
    preserve: false,
    formProps: {
      labelCol: {
        span: 6,
      },
    },
    columns: [
      {
        name: 'consumptionTypeName',
        type: 'input',
        placeholder: '请输入消费类型名称',
        label: '消费类型名称',
        item: {
          rules: [{ required: true, message: '请输入消费类型名称' }],
        },
        // defaultValue: '123',
      },
      {
        name: 'productKeyWords',
        type: 'keyword',
        placeholder: '请输入关联产品关键字',
        label: '关联产品关键字',
        validateTrigger: 'onBlur',
        item: {
          rules: [],
        },
        option: [],
        // defaultValue: [],
      },
      {
        name: 'remark',
        type: 'input',
        placeholder: '请输入备注',
        label: '备注',
        option: [],
        // defaultValue: '',
      },
    ],
  };

  useEffect(() => {
    getAllConsumptiontypeList();
  }, []);

  useEffect(() => {
    if (open.state && formRef.current != null) {
      formRef.current.getFormInstance().setFieldsValue({
        consumptionTypeName: currentRowData.consumptionTypeName,
        productKeyWords: currentRowData.productKeyWords,
        remark: currentRowData.remark,
      });
    }
    if (open.isEdit == false && formRef.current != null) {
      formRef.current.getFormInstance().resetFields();
    }
  }, [open, formRef.current, currentRowData]);

  const getAllConsumptiontypeList = () => {
    getConsumptionTypeListApi({}).then((res) => {
      let data = [];
      res.data.forEach((element) => {
        data.push({
          ...element,
          key: element._id,
        });
      });
      setDataSource(data);
    });
  };
  const onReset = () => {
    searchform.resetFields();
    getAllConsumptiontypeList();
  };

  const onFinish = (values) => {
    // console.log(consumptionTypeList);
    getConsumptionTypeListApi(values).then((res) => {
      setDataSource(res.data);
      setOpen({
        state: false,
        isEdit: false,
        title: '',
        id: '',
      });
    });
  };

  // const showHideSearch = () => {
  //   if (formSearch === true) {
  //     setFormSearch(false)
  //   } else {
  //     setFormSearch(true)
  //   }
  // }

  //对话框
  const showModal = () => {
    setOpen({
      state: true,
      isEdit: false,
      title: '新增',
    });
  };

  const handleCancel = () => {
    setOpen({
      open: false,
    });
  };
  const handleOk = () => {
    //手动调用表单的校验规则，通过后可以提交
    formRef.current
      .getFormInstance()
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        if (open.isEdit !== true) {
          addConsumptionType(values).then((res) => {
            setConfirmLoading(false);
            if (res.code !== '0') return;
            message.success(res.message);
            getAllConsumptiontypeList();
            setOpen({
              open: false,
            });
          });
        } else {
          // console.log("编辑");
          editConsumptionTypeApi({ ...values, id: open.id }).then((res) => {
            setConfirmLoading(false);
            getAllConsumptiontypeList();
            setOpen({
              open: false,
            });
          }).catch(()=>{
            setConfirmLoading(false);
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(error);
      });
  };

  const editconsumptiontype = (rowdata) => {
    setOpen({
      state: true,
      isEdit: true,
      title: '编辑',
      id: rowdata._id,
    });
    setRowdata(rowdata);
  };

  const deleteConsumptiontype = (id) => {
    deleteConsumptiontypeApi(id).then((res) => {
      if (res.code !== '2') return;
      getAllConsumptiontypeList();
    });
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={searchform}
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={6} lg={5}>
            <Form.Item label="类型名称" name="consumptionName">
              <Input />
            </Form.Item>
          </Col>

          {/* 展开收入项目，暂时不需要 */}
          {/* <Col span={6} lg={5} className={formSearch === true ? 'search-form' : ''}>
            <Form.Item label="username2" name="username2" rules={[{ required: true, message: 'Please input your username!' }]} >
              <Input />
            </Form.Item>
          </Col> */}

          <Col span={6} lg={9}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={onReset}>重置</Button>
                {/* 链接纯粹为了一个样式 */}
                {/* <div onClick={showHideSearch}>
                  <div>
                    <a href='##'>
                      <Space>
                        {formSearch === true ? "展开" : "收起"}
                        {formSearch === true ? < DownOutlined /> : < UpOutlined />}
                      </Space>
                    </a>
                  </div>
                </div> */}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Row gutter={24} className="btn-form">
        <Col span={24} className="btn-positon">
          {/* <Space> */}
          <Button type="primary" onClick={() => showModal()}>
            + 新建
          </Button>
          {/* <Button>设置</Button> */}
          {/* </Space> */}
        </Col>
      </Row>
      {/* <Outlet></Outlet> */}
      <Table dataSource={dataSource} columns={columns} rowKey="_id" />
      {/* <Outlet></Outlet> */}
      <Modal
        title={open.title}
        className="lili"
        styles={{ display: 'block' }}
        open={open.state}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <HForm
          {...formConfig}
          onFinish={onFinish}
          // formProps={{}}
          ref={formRef}
        ></HForm>
        {/* <Form
          name="form"
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
            name="consumptionTypeName"
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
            label="关联产品关键字"
            name="productKeyWords"
            // validateTrigger={['onBlur', 'onSubmit']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
            // validateTrigger={['onBlur', 'onSubmit']}
          >
            <Input />
          </Form.Item>
        </Form> */}
      </Modal>
    </>
  );
};
export default ConsumptionManagement;
