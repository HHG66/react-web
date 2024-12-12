/*
 * @Author: HHG
 * @Date: 2022-10-03 23:55:35
 * @LastEditTime: 2024-12-12 17:38:54
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
import * as XLSX from 'xlsx';
// import React, { useCallback, useEffect, useState } from "react";
import {
  importingbillsApi,
  getdisposebillApi,
  getImportRecordsApi,
  getinportbillinfoApi,
} from '@/api/balancepayments';
import './index.less';
import moment from 'moment';
// export class BalancepaymentsImportBill extends Component {
//   render() {
//     return (
//       <div>导入账单</div>
//       <Upload {...props}>
//       <Button >Click to Upload</Button>
//     </Upload>
//     )
//   }
// }
const BalancepaymentsImportBill = () => {
  // const [test, setTest] = useState({})
  const [columns, setColumns] = useState([
    {
      title: '交易时间',
      dataIndex: 'tradinghours',
      key: 'tradinghours',
      width: 200,
    },
    {
      title: '交易类型',
      dataIndex: 'tradetype',
      key: 'tradetype',
      width: 100,
    },
    {
      title: '交易对方',
      dataIndex: 'counterparty',
      key: 'counterparty',
      width: 150,
    },
    {
      title: '商品',
      dataIndex: 'product',
      key: 'product',
      width: 200,
    },
    {
      title: '收/支',
      dataIndex: 'collectorbranch',
      key: 'collectorbranch',
      width: 80,
    },
    {
      title: '金额(元)',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
    },
    {
      title: '支付方式',
      dataIndex: 'patternpayment',
      key: 'patternpayment',
      width: 100,
    },
    {
      title: '当前状态',
      dataIndex: 'currentstate',
      key: 'currentstate',
      width: 100,
    },
    {
      title: '交易单号',
      dataIndex: 'trasactionid',
      key: 'trasactionid',
      width: 200,
    },
    {
      title: '商户单号',
      dataIndex: 'merchantstoorder',
      key: 'merchantstoorder',
      width: 200,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 80,
    },
    {
      title: '操作',
      // key: 'action',
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
          {/* <a onClick={() =>}></a> */}
        </Space>
      ),
    },
  ]);
  const [pres, setPres] = useState([]);
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [record, setRecord] = useState([]);
  const [batchInfo, setBatchInfo] = useState({});
  // const [tableParams, setTableParams] = useState({
  //   pagination: {
  //     current: 1,
  //     pageSize: 10,
  //     // total:85,
  //     // showTotal
  //   },
  // });

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
    // let params = {
    //   // importtime: moment().format('YYYY-MM-DD'),

    // };
    getdisposebillApi({ ...params }).then((res) => {
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
    // getdisposebillApi(params).then((res) => {
    //   setPres(res.data.list);
    //   setParams({
    //     pageSize: res.data.pagesize,
    //     total: res.data.total,
    //     current: res.data.current,
    //   });
    //   onClose();
    // });
    event.stopPropagation();
  };
  const getdisposebill = async () => {
    console.log(form, 'form');
    let validateState = await form.validateFields();
    console.log(validateState);

    form.getFieldsValue();
    getdisposebillApi(params).then((res) => {
      setPres(res.data);
      setParams({
        pageSize: res.meta.pagesize,
        total: res.meta.total,
        current: res.meta.page,
      });
    });
  };
  const exportRecord = () => {
    let data = {
      starttime: '2022-01-01',
      endtime: '2022-12-30',
    };
    getImportRecordsApi(data).then((res) => {
      setRecord(res.data.list);
    });
    showDrawer();
  };
  const beforeUpload = (file) => {
    onChange(file);
    return false;
  };
  const onChange = (evt) => {
    // debugger
    // console.log(evt);
    // console.log(evt.file);
    var selectedFile = evt;
    var reader = new FileReader();
    // 字段名映射对象
    const fieldMapping = {
      交易时间: 'tradinghours',
      交易类型: 'tradetype',
      交易对方: 'counterparty',
      商品: 'product',
      '收/支': 'collectorbranch',
      '金额(元)': 'amount',
      支付方式: 'patternpayment',
      当前状态: 'currentstate',
      交易单号: 'trasactionid',
      商户单号: 'merchantstoorder',
      备注: 'remark',
      更新日期: 'updataDate',
    };

    var datass = [];
    reader.onload = function (event) {
      // debugger
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary',
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // XLSX.utils.v
        var sheeldata = workbook.Sheets[sheetName];
        // console.log(sheeldata);
        var sheel = XLSX.utils.sheet_to_json(sheeldata, {
          header: 1,
          raw: false,
          blankrows: true,
          defval: ' ',
          rawNumbers: true,
          dateNF: 'YYYY-MM-DD',
          UTC:true
        });
        console.log(sheel);
        
        // var col_index = XLSX.utils.decode_col("D");
        // console.log(test);
        // setTest(test)
        var tableHead = [];
        sheel[0].forEach((element) => {
          if (
            element === '交易单号' ||
            element === '商户单号' ||
            element === '交易时间'
          ) {
            // debugger
            tableHead.push({
              title: element,
              dataIndex: fieldMapping[element],
              key: fieldMapping[element],
              width: 200,
            });
          } else {
            tableHead.push({
              title: element,
              dataIndex: fieldMapping[element],
              key: fieldMapping[element],
              width: 80,
            });
          }
        });
        console.log(tableHead);
        // {
        //   title: '交易时间',
        //   dataIndex: 'tradinghours',
        //   key: 'tradinghours',
        //   width: 200,
        // },
        setColumns(tableHead);
        sheel.forEach((element, index) => {
          if (index === 0) {
            return;
          }
          try {
            var rowData = {};
            for (let index = 0; index < element.length; index++) {
              rowData[tableHead[index].dataIndex] =
                element[index];
              rowData['key'] = Math.ceil(Math.random() * 100000);
            }
            datass.push(rowData);
          } catch (error) {
            console.log(error);
          }
        });
        // console.log(datass);
        // var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        // if (XL_row_object.length > 0) {
        // console.log(JSON.parse(JSON.stringify(XL_row_object)));
        // }
      });
      // setPres(datass);
      importingbillsApi(datass).then((res) => {
        getdisposebill();
      });
    };

    reader.onerror = function (event) {
      console.error('File could not be read! Code ' + event.target.error.code);
    };
    // 读取上传文件为二进制
    reader.readAsBinaryString(selectedFile);
  };

  const onFinish = (values) => {
    getdisposebill();
    return;
    console.log('Success:', values);
    // console.log(window.moment(values.tradinghours._d).format('YYYY-MM-DD'));
    let tradinghours = undefined;
    let importtime = undefined;
    if (values.tradinghours) {
      tradinghours = window.moment(values.tradinghours._d).format('YYYY-MM-DD');
    }
    if (values.importtime) {
      importtime = window.moment(values.importtime).format('YYYY-MM');
    }
    getdisposebillApi({
      ...values,
      tradinghours: tradinghours,
      importtime: importtime,
      ...params,
    }).then((res) => {
      setPres(res.data);
      setParams({
        pageSize: res.meta.pageSize,
        total: res.meta.total,
        page: res.meta.page,
      });
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      {/* <div>导入账单</div> */}
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
          <Col>
            <Form.Item
              label="交易时间"
              name="tradinghours"
              auto-complete="new-password"
            >
              {/* <Input /> */}
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
          </Col>
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
          <Upload beforeUpload={beforeUpload} showUploadList={false}>
            <Button
              type="primary"
              style={{ marginBottom: '10px', marginLeft: '10px' }}
            >
              导入账单
            </Button>
          </Upload>
        </Col>
      </Row>
      {/* <Button onClick={addField}>Click </Button> */}
      <Table
        columns={columns}
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
          {/* <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
        <Timeline.Item>Technical testing</Timeline.Item>*/}
          {/* <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>  */}
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
