/*
 * @Author: HHG
 * @Date: 2022-10-03 23:55:35
 * @LastEditTime: 2025-03-12 16:19:48
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\BalancepaymentsImportBill\index.jsx
 * @文件说明:
 */
import React, { useState, useEffect } from 'react';
import {
  Upload,
  Button,
  Table,
  message,
  Row,
  Col,
  Space,
  Drawer,
  Timeline,
  Form,
  Input,
  DatePicker,
  Popconfirm,
} from 'antd';
// import React, { useCallback, useEffect, useState } from "react";
import {
  getBillBatchApi,
  getImportRecordsApi,
  getinportbillinfoApi,
} from '@/api/balancepayments';
import './index.less';
import UploadDialog from './component/UploadDialog';
import useUploadForm from './hooks/useUploadForm.js';
import { formatDate } from '@/utils/index.js';
import BillTabelList from './component/BillModalTabelList.jsx';
import useBillShow from './hooks/useBillShow.js';
const BalancepaymentsImportBill = () => {
  const { isModalOpen, openBillModal, closeBillModal } = useBillShow();
  // const [test, setTest] = useState({})

  //导入账单批次信息
  const [tatelColumns, setTatelColumns] = useState([
    {
      title: '导入时间',
      dataIndex: 'importtime',
      key: 'importtime',
      width: 200,
      render: (value) => {
        return window.moment(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '账单类型',
      dataIndex: 'billtype',
      key: 'billtype',
      width: 200,
    },
    {
      title: '总业务数',
      dataIndex: 'businesstotal',
      key: 'businesstotal',
      width: 200,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editBili(record)}>编辑</a>
          <Popconfirm
            title="确定删除记录？"
            onConfirm={() => confirm(record)}
            // onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
          {/* 查看批次账单 */}
          <a onClick={openBillModal}>查看</a>
        </Space>
      ),
    },
  ]);
  const [pres, setPres] = useState([]);
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [record, setRecord] = useState([]);
  const [batchInfo, setBatchInfo] = useState({});

  const { isDialogOpen, openDialog, closeDialog } = useUploadForm();
  const [params, setParams] = useState({
    pageSize: 10,
    // pageNum: 0,
    current: 0,
    total: 0,
    page: 1,
  });
  const editBili = (record) => {
    console.log(record);
  };
  useEffect(() => {}, []);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showChildrenDrawer = () => {
    getinportbillinfoApi({ batchid: 123 }).then((res) => {
      setBatchInfo(res.data);
    });
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  useEffect(() => {
    getBillBatchApi({ ...params }).then((res) => {
      console.log(res);
      setPres(res.data);
      setParams({
        pageSize: res.meta.pageSize,
        total: res.meta.total,
        page: res.meta.page,
      });
    });
  }, []);
  const tabelEventFun = (event) => {
    let params = {
      importtime: '2022-12-01',
    };
    getdisposebill(params);
    event.stopPropagation();
  };
  const getdisposebill = async () => {
    console.log(form, 'form');
    let validateState = await form.validateFields();
    console.log(validateState);

    form.getFieldsValue();
    let queryData = {
      ...validateState,
    };
    if (validateState.tradinghours) {
      queryData.tradinghours = validateState.tradinghours
        ? window.moment(validateState.tradinghours).format('YYYY-MM-DD')
        : '';
    }
    getBillBatchApi(queryData).then((res) => {
      setPres(res.data);
      setParams({
        pageSize: res.meta.pagesize,
        total: res.meta.total,
        current: res.meta.page,
      });
    });
  };
  // const exportRecord = () => {
  //   let data = {
  //     starttime: '2022-01-01',
  //     endtime: '2022-12-30',
  //   };
  //   getImportRecordsApi(data).then((res) => {
  //     setRecord(res.data.list);
  //   });
  //   showDrawer();
  // };
  const beforeUpload = (file) => {
    onChange(file);
    return false;
  };

  const onFinish = (values) => {
    getdisposebill();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      {/* 导入账单  */}
      <UploadDialog
        openState={isDialogOpen}
        onClose={closeDialog}
      ></UploadDialog>
      <BillTabelList isModalOpen={isModalOpen}  closeBillModal={closeBillModal}></BillTabelList>
      <Form
        name="basic"
        form={form}
        // initialValues={}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row
          gutter={{
            xs: 8,
            sm: 10,
            md: 24,
            lg: 20,
          }}
        >
          {/* <Col>
            <Form.Item
              label="交易时间"
              name="tradinghours"
              auto-complete="new-password"
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="交易类型" name="transactiontype">
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="收入/支出"
              name="balancepayments"
              auto-complete="new-password"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="金额" name="amount" auto-complete="new-password">
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="交易单号" name="id" auto-complete="new-password">
              <Input />
            </Form.Item>
          </Col> */}
          <Col>
            <Form.Item
              label="导入时间"
              name="importtime"
              auto-complete="new-password"
            >
              <DatePicker picker="month"></DatePicker>
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" htmlType="reset">
                重置
              </Button>
            </Space>
          </Col>
        </Row>
        {/* <Row>
        <Space>
          <Col>
            <Form.Item
              label="导入时间"
              name="inporttime"
              auto-complete='new-password'
            >
              <DatePicker picker="month"></DatePicker>
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button type='primary' htmlType='submit'>提交</Button>
              <Button type='primary' htmlType='reset'>重置</Button>
            </Space>
          </Col>
        </Space>
      </Row> */}
      </Form>
      <Row>
        {/* <Col offset={22}>
          <Button
            type="primary"
            style={{ marginBottom: '10px' }}
            onClick={exportRecord}
          >
            导入记录
          </Button>
        </Col> */}
        <Col offset={22}>
          <Button
            type="primary"
            style={{ marginBottom: '10px', marginLeft: '10px' }}
            onClick={openDialog}
          >
            导入账单
          </Button>
          {/* <Upload beforeUpload={beforeUpload} showUploadList={false}>
            <Button
              type="primary"
              style={{ marginBottom: '10px', marginLeft: '10px' }}
            >
              导入账单
            </Button>
          </Upload> */}
        </Col>
      </Row>
      {/* <Button onClick={addField}>Click </Button> */}
      
      <Table
        columns={tatelColumns}
        dataSource={pres}
        pagination={{
          // showSizeChanger: true,
          // showQuickJumper: false,
          showTotal: () => `共${params.total}条`,
          pageSize: params.pageSize,
          current: params.page,
          total: params.total,
          onChange: (current, pageSize) => {
            getdisposebill({
              ...form,
              page: current.toString(),
              pageSize: pageSize.toString(),
            });
          },
        }}
        scroll={{ y: false }}
        className="tab-box"
        rowKey="_id"
      />
      {/* <table dangerouslySetInnerHTML={{__html: content}}></table> */}
      <Drawer
        width={400}
        closable={false}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p
          rootClassName="site-description-item-profile-p"
          rootStyle={{
            marginBottom: 24,
          }}
        >
          导入记录
        </p>

        <Timeline mode={'left'}>
          {record.map((ele) => {
            return (
              <Timeline.Item
                key={ele.importtime}
                label={<a onClick={tabelEventFun}>{ele.importtime}</a>}
                onClick={showChildrenDrawer}
              >
                {ele.batchname}
              </Timeline.Item>
            );
          })}
        </Timeline>

        {/* <Divider />
      <p>Some contents...</p> */}
        <Drawer
          // title="账单详细"
          width={500}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          <p
            rootClassName="site-description-item-profile-p"
            rootStyle={{
              marginBottom: 24,
            }}
          >
            账单详细
          </p>
          <p rootClassName="site-description-item-profile-p">Personal</p>
          <Row>
            <Col span={12}>
              <div
                title={batchInfo.businesstotal}
                rootClassName="site-description-item-profile-wrapper"
              >
                <p rootClassName="site-description-item-profile-p-label">
                  总业务数:
                </p>
                {batchInfo.businesstotal}
              </div>
            </Col>
            <Col span={12}>
              <div
                title={batchInfo.totalrevenue}
                rootClassName="site-description-item-profile-wrapper"
              >
                <p rootClassName="site-description-item-profile-p-label">
                  总收入:
                </p>
                {batchInfo.totalrevenue}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div
                title={batchInfo.totalconsumption}
                rootClassName="site-description-item-profile-wrapper"
              >
                <p rootClassName="site-description-item-profile-p-label">
                  总消费:
                </p>
                {batchInfo.totalconsumption}
              </div>
            </Col>
          </Row>
        </Drawer>
      </Drawer>
    </>
  );
};

export default BalancepaymentsImportBill;
