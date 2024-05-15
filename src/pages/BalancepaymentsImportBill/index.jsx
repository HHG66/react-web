/*
 * @Author: HHG
 * @Date: 2022-10-03 23:55:35
 * @LastEditTime: 2023-03-14 21:10:20
 * @LastEditors: 韩宏广
 * @FilePath: /Financial/web/src/pages/BalancepaymentsImportBill/index.js
 * @文件说明: 
 */
import React, { useState, useEffect } from 'react'
import { Upload, Button, Table, message, Row, Col, Space, Drawer, Timeline, Form, Input, DatePicker } from 'antd'
import * as XLSX from 'xlsx';
// import React, { useCallback, useEffect, useState } from "react";
import { ImportingbillsApi, getdisposebillApi, getImportRecordsApi, getinportbillinfoApi } from '@/api/balancepayments'
import './index.less'
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
      "title": "交易时间",
      "dataIndex": "交易时间",
      "key": "交易时间",
      "width": 200
    },
    {
      "title": "交易类型",
      "dataIndex": "交易类型",
      "key": "交易类型",
      "width": 100
    },
    {
      "title": "交易对方",
      "dataIndex": "交易对方",
      "key": "交易对方",
      "width": 150
    },
    {
      "title": "商品",
      "dataIndex": "商品",
      "key": "商品",
      "width": 200
    },
    {
      "title": "收/支",
      "dataIndex": "收/支",
      "key": "收/支",
      "width": 80
    },
    {
      "title": "金额(元)",
      "dataIndex": "金额(元)",
      "key": "金额(元)",
      "width": 100
    },
    {
      "title": "支付方式",
      "dataIndex": "支付方式",
      "key": "支付方式",
      "width": 100
    },
    {
      "title": "当前状态",
      "dataIndex": "当前状态",
      "key": "当前状态",
      "width": 100
    },
    {
      "title": "交易单号",
      "dataIndex": "交易单号",
      "key": "交易单号",
      "width": 200
    },
    {
      "title": "商户单号",
      "dataIndex": "商户单号",
      "key": "商户单号",
      "width": 200
    },
    {
      "title": "备注",
      "dataIndex": "备注",
      "key": "备注",
      "width": 80
    }
  ])
  const [pres, setPres] = useState([]);
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false)
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
    pageSize: 0,
    pageNum: 0,
    total: 0,
    current: 1
  })
  const tableParams = {
    // showSizeChanger: true,
    // showQuickJumper: false,
    showTotal: () => `共${params.total}条`,
    pageSize: params.pageSize,
    current: params.current,
    total: params.total,
    onChange: (page, pageSize) => console.log(page, pageSize)
    // onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
    // onChange: (current) => this.changePage(current),
  }
  const [form] = Form.useForm()
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showChildrenDrawer = () => {

    getinportbillinfoApi({ batchid: 123 }).then(res => {
      setBatchInfo(res.data)
    })
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  useEffect(() => {
    let params = {
      date: "2022-12-01"
    }
    getdisposebillApi(params).then(res => {
      setPres(res.data.list)
      setParams({
        pageSize: res.data.pagesize,
        total: res.data.total,
        current: res.data.current,
      })
    })
  }, []);
  const getdisposebill = (event) => {
    let params = {
      date: "2022-12-01"
    }
    getdisposebillApi(params).then(res => {
      setPres(res.data.list)
      setParams({
        pageSize: res.data.pagesize,
        total: res.data.total,
        current: res.data.current,
      })
      onClose()
    })
    event.stopPropagation();
  }
  const exportRecord = () => {
    let data = {
      starttime: '2022-01-01',
      endtime: '2022-12-30'
    }
    getImportRecordsApi(data).then(res => {
      setRecord(res.data.list)
    })
    showDrawer()
  }
  const beforeUpload = (file) => {
    onChange(file)
    return false;
  }
  const onChange = (evt) => {
    // debugger
    // console.log(evt);
    // console.log(evt.file);
    var selectedFile = evt
    var reader = new FileReader();
    var datass = []
    reader.onload = function (event) {
      // debugger
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // XLSX.utils.v
        var sheeldata = workbook.Sheets[sheetName]
        // console.log(sheeldata);
        var sheel = XLSX.utils.sheet_to_json(sheeldata, { header: 1, raw: false, blankrows: true, defval: " ", rawNumbers: true, dateNF: "2022-01-01" })
        // var col_index = XLSX.utils.decode_col("D");
        // console.log(test);
        // setTest(test)
        var tableHead = []
        sheel[0].forEach(element => {
          if (element === "交易单号" || element === "商户单号" || element === "交易时间") {
            // debugger
            tableHead.push({
              title: element,
              dataIndex: element,
              key: element,
              width: 200
            })
          } else {
            tableHead.push({
              title: element,
              dataIndex: element,
              key: element,
              width: 80
            })
          }

        });
        // console.log(tableHead);
        setColumns(tableHead)
        sheel.forEach((element, index) => {
          if (index === 0) {
            return
          }
          try {
            var rowData = {}
            for (let index = 0; index < element.length; index++) {
              rowData[tableHead[index].dataIndex] = element[index]
              rowData['key'] = Math.ceil(Math.random() * 100000)
            }
            datass.push(rowData)
          } catch (error) {
            console.log(error);
          }
        });
        // console.log(datass);
        // var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        // if (XL_row_object.length > 0) {
        // console.log(JSON.parse(JSON.stringify(XL_row_object)));
        // }

      })
      // setPres(datass);
      ImportingbillsApi(datass).then(res => {
        console.log(res);
        // setPres(res.data);
        message.success(res.message)
      })
    };

    reader.onerror = function (event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };
    // 读取上传文件为二进制
    reader.readAsBinaryString(selectedFile);
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    // console.log(window.moment(values.tradinghours._d).format('YYYY-MM-DD'));
    let tradinghours = undefined
    let inporttime = undefined
    if (values.tradinghours) {
      tradinghours = window.moment(values.tradinghours._d).format('YYYY-MM-DD')
    }
    if (values.inporttime) {
      inporttime = window.moment(values.inporttime._d).format('YYYY-MM')
    }
    getdisposebillApi({ ...values, tradinghours: tradinghours, inporttime: inporttime }).then(res => {
      setPres(res.data.list)
    })
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
        <Row gutter={{
          xs: 8,
          sm: 10,
          md: 24,
          lg: 20,
        }}>
          <Col>
            <Form.Item
              label="交易时间"
              name="tradinghours"
              auto-complete='new-password'
            >
              {/* <Input /> */}
              <DatePicker />

            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="交易类型"
              name="transactiontype"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="收入/支出"
              name="balancepayments"
              auto-complete='new-password'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="金额"
              name="amount"
              auto-complete='new-password'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="交易单号"
              name="id"
              auto-complete='new-password'
            >
              <Input />
            </Form.Item>
          </Col>
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
        <Col offset={20}>
          <Button type="primary" style={{ marginBottom: "10px" }} onClick={exportRecord}>导入记录</Button>
        </Col>
        <Col >
          <Upload beforeUpload={beforeUpload} showUploadList={false}>
            <Button type="primary" style={{ marginBottom: "10px", marginLeft: "10px" }}>导入账单</Button>
          </Upload>
        </Col>
      </Row>
      {/* <Button onClick={addField}>Click </Button> */}
      <Table columns={columns} dataSource={pres} pagination={tableParams} scroll={{ y: 300 }} className='tab-box' />
      {/* <table dangerouslySetInnerHTML={{__html: content}}></table> */}

      <Drawer width={400} closable={false} placement="right" onClose={onClose} open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          导入记录
        </p>

        <Timeline mode={"left"}>
          {
            record.map(ele => {
              return <Timeline.Item key={ele.importtime} label={<a onClick={getdisposebill}>{ele.importtime}</a>} onClick={showChildrenDrawer}>{ele.batchname}</Timeline.Item>
            })
          }
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
            className="site-description-item-profile-p"
            style={{
              marginBottom: 24,
            }}
          >
            账单详细
          </p>
          <p className="site-description-item-profile-p">Personal</p>
          <Row>
            <Col span={12}>
              <div title={batchInfo.businesstotal} className="site-description-item-profile-wrapper">
                <p className="site-description-item-profile-p-label">总业务数:</p>
                {batchInfo.businesstotal}
              </div>
            </Col>
            <Col span={12}>
              <div title={batchInfo.totalrevenue} className="site-description-item-profile-wrapper">
                <p className="site-description-item-profile-p-label">总收入:</p>
                {batchInfo.totalrevenue}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div title={batchInfo.totalconsumption} className="site-description-item-profile-wrapper">
                <p className="site-description-item-profile-p-label">总消费:</p>
                {batchInfo.totalconsumption}
              </div>
            </Col>
          </Row>
        </Drawer>
      </Drawer>
    </>
  )
}

export default BalancepaymentsImportBill