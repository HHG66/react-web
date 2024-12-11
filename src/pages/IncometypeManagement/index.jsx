/*
 * @Author: HHG
 * @Date: 2022-09-01 17:01:31
 * @LastEditTime: 2024-12-03 15:05:41
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\IncometypeManagement\index.jsx
 * @文件说明:
 */
import {
  Row,
  Space,
  Table,
  Col,
  Button,
  Form,
  Modal,
  Input,
  message,
  Popconfirm,
  Tag,
} from 'antd';
import { useEffect, useState, useRef } from 'react';
import {
  addIncometype,
  deleteIncomeType,
  getIncomeTypeListApi,
  editIncometypeApi,
} from '@/api/incometype';
import HForm from '@/components/hForm/HForm.jsx';
const IncometypeManagement = () => {
  const formRef = useRef();
  const formConfig = {
    preserve: false,
    formProps: {
      labelCol: {
        span: 6,
      },
    },
    columns: [
      {
        name: 'incomeName',
        type: 'input',
        placeholder: '请输入收入类型名称',
        label: '收入类型名称',
        item: {
          rules: [{ required: true, message: '请输入收入类型名称' }],
        },
        defaultValue: '',
      },
      {
        name: 'incomeKeyWords',
        type: 'keyword',
        placeholder: '请输入关联收入关键字',
        label: '关联收入关键字',
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
        defaultValue: '',
      },
    ],
  };
  const onFinish = (values) => {
    // console.log(consumptionTypeList);
  };
  const columns = [
    {
      title: '收入类型名称',
      dataIndex: 'incomeName',
      key: 'incomeName',
      width: 200,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '关联收入关键字',
      dataIndex: 'incomeKeyWords',
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
      key: 'remark',
    },
    {
      title: '操作',
      key: '操作',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              editIncomeType(record);
            }}
          >
            编辑{' '}
          </a>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => deleteIncomeTypes(record)}
            // onCancel={cancel}
            okText="删除"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const data = [];
  const [open, setOpen] = useState({
    open: false,
    title: '新增',
    isEdit: false,
  });
  const [incomeTypeId, setIncomeTypeId] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formdata, setFormdata] = useState(data);
  const [currentRowData, setRowdata] = useState(null);
  useEffect(() => {
    getIncomeTypeList();
  }, []);
  const getIncomeTypeList = () => {
    getIncomeTypeListApi().then((res) => {
      // console.log(res);
      setFormdata(res.data);
    });
  };
  const showModal = () => {
    setOpen({
      open: true,
      title: '新增',
      isEdit: false,
    });
    // formRef.current.getFormInstance().resetFields();
  };
  const handleOk = () => {
    formRef.current
      .getFormInstance()
      .validateFields()
      .then((res) => {
        setConfirmLoading(true);
        if (open.isEdit !== true) {
          addIncometype(res).then((res) => {
            setConfirmLoading(false);
            //无业务失败状态2，不需要手动处理，所以只需要判断3
            if (res.code == 3) return;
            setOpen({
              open: false,
            });
            getIncomeTypeList()
          });
        } else {
          editIncometypeApi({
            id: incomeTypeId,
            name: res.incomeName,
            remarks: res.remarks,
          }).then((res) => {
            setOpen({
              open: false,
            });
            getIncomeTypeList();
            message.success(res.message);
            setConfirmLoading(false);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!open.open || formRef.current == null || !currentRowData) return;
    formRef.current.getFormInstance().setFieldsValue({
      incomeName: currentRowData.incomeName,
      incomeKeyWords: currentRowData.incomeKeyWords,
      remark: currentRowData.remark,
    });
    if (open.isEdit == false && formRef.current != null) {
      // debugger;
      formRef.current.getFormInstance().resetFields();
    }
  }, [open, formRef.current, currentRowData]);
  const editIncomeType = (rowdata) => {
    setRowdata(rowdata);
    console.log(rowdata);
    setOpen({
      open: true,
      title: '编辑',
      isEdit: true,
    });
    setIncomeTypeId(rowdata.key);
  };
  const deleteIncomeTypes = (rowdata) => {
    deleteIncomeType(rowdata._id).then((res) => {
      if (res.code != 2) return;
      getIncomeTypeList();
    });
  };

  return (
    <>
      <Row gutter={24} className="btn-form">
        <Col span={3} lg={3} offset={21}>
          <Button type="primary" onClick={() => showModal()}>
            + 新建
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={formdata} rowKey="_id" />

      <Modal
        title={open.title}
        className="lili"
        styles={{ display: 'block' }}
        open={open.open}
        onOk={handleOk}
        cancelText="取消"
        okText="确定"
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <HForm
          {...formConfig}
          onFinish={onFinish}
          // formProps={{}}
          ref={formRef}
        ></HForm>
        {/* <Form
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
            name="incomeName"
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
        </Form> */}
      </Modal>
    </>
  );
};

export default IncometypeManagement;
