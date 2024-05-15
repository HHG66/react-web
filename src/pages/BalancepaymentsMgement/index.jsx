/*
 * @Author: HHG
 * @Date: 2022-09-01 17:01:04
 * @LastEditTime: 2023-03-12 14:29:23
 * @LastEditors: 韩宏广
 * @FilePath: /Financial/web/src/pages/BalancepaymentsMgement/index.js
 * @文件说明: 
 */
import { Calendar, Col, Divider, Drawer, Row, Badge, Space, Button, Modal, Form, Input, Select, message, DatePicker } from 'antd'
import { useEffect, useState } from 'react'
import "./index.less"

import { getBalancepayMentsApi, newFinancialRecordApi, getPeriodTimeBillApi } from '@/api/balancepayments'
import { getIncomeTypeListApi } from '@/api/incometype'
import { getConsumptionTypeListApi } from '@/api/consumptiontype'

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const BalancepaymentsMgement = () => {
  //为解决日历组件切换到日期范围会导致onSelect方法触发
  let calendarState = ''
  const [drawers, setDrawers] = useState(false);
  const [balancepayMents, setBalancepayMents] = useState({ income: [], spending: [] })
  const [modelInfo, setModelInfo] = useState({
    open: false,
    title: "新增",
    type: 'income'
  })
  const [incomePayment, setincomePayment] = useState([])
  const [calendarList, setCalendarList] = useState([])
  const [form] = Form.useForm()
  const onClose = () => {
    setDrawers(false);
  };
  useEffect(() => {
    //接口，默认当月的日期，去获取日历当月需要渲染的数据
    let startDate = window.moment(new Date()).subtract(1, 'M').format("YYYY-MM");
    let endDate = window.moment(new Date()).add(1, 'M').format("YYYY-MM");
    console.log(startDate);
    getPeriodTimeBillApi({ startDate, endDate }).then(res => {
      setCalendarList(res.data)
    })

  }, [])

  const onPanelChange = (value, mode) => {
    calendarState = 'isPanelChange'
    // console.log(value, mode)
    // console.log(value.format('YYYY-MM-DD'), mode);
  };
  const onSelect = (moment) => {
    console.log(calendarState);
    if (calendarState === "") {
      setDrawers(true);
      getBalancepayMentsApi(window.moment(moment._d).format('YYYY-MM-DD')).then(res => {
        // console.log(res.data);
        setBalancepayMents(res.data)
      })
    }
    calendarState = ''
    // console.log(window.moment(moment._d).format('YYYY-MM-DD'));
  }
  const aRecord = () => {
    // console.log('aRecord');
    setModelInfo({
      ...modelInfo,
      open: true
    })
  }
  const handleOk = () => {
    form.validateFields().then(res => {
      console.log(res);
      newFinancialRecordApi(res).then(res => {
        message.success(res.message)
      })
      setModelInfo({
        ...modelInfo,
        open: false
      })
    }).catch((error) => {
      console.log(error);
    })

  }
  const handleCancel = () => {
    setModelInfo({
      ...modelInfo,
      open: false
    })
  }
  const handleChange = (value) => {
    if (value === '1') {
      setModelInfo({
        ...modelInfo,
        type: 'payment'
      })
      getConsumptionTypeListApi().then(res => {
        let incomePayment = []
        res.data.forEach(element => {
          incomePayment.push({
            label: element.name,
            value: element.id
          })
        });
        setincomePayment(incomePayment)
      })
    } else {
      setModelInfo({
        ...modelInfo,
        type: 'income'
      })
      getIncomeTypeListApi().then(res => {
        let incomePayment = []
        res.data.forEach(element => {
          incomePayment.push({
            label: element.name,
            value: element.id
          })
        });
        setincomePayment(incomePayment)
      })
    }
  }
  const monthCellRender = (value) => {
    // const num = ''
    // if (value.month() === 8) {
    //   num = 1394;
    // }
    // return num ? (
    //   <div className="notes-month">
    //     <section>{num}</section>
    //     <span>Backlog number</span>
    //   </div>
    // ) : null;
  };
  const getListData = (value) => {
    let listData = []
    let ss = window.moment(value).format("YYYY-MM")
    let gg = window.moment(value).format("YYYY-MM-DD")
    // console.log(ss);
    calendarList.forEach(element => {
      // console.log(element);
      if (element.date === ss) {
        element.list.forEach(ele => {
          let type;
          if (ele.date === gg) {
            if (ele.type === '收入') {
              type = 'success'
            } else if (ele.type === '支出') {
              type = 'warning'
            }
            listData.push({
              key: ele.id,
              type: type,
              content: ele.type + '、' + ele.goods,
            })
          }
        });
      }
    });
    // debugger

    // switch (value.date()) {
    //   case 8:
    //     listData = [
    //       {
    //         type: 'warning',
    //         content: 'This is warning event.',
    //       },
    //       {
    //         type: 'success',
    //         content: 'This is usual event.',
    //       },
    //     ];
    //     break;
    //   case 10:
    //     listData = [
    //       {
    //         type: 'warning',
    //         content: 'This is warning event.',
    //       },
    //       {
    //         type: 'success',
    //         content: 'This is usual event.',
    //       },
    //       {
    //         type: 'error',
    //         content: 'This is error event.',
    //       },
    //     ];
    //     break;
    //   case 15:
    //     listData = [
    //       {
    //         type: 'warning',
    //         content: 'This is warning event',
    //       },
    //       {
    //         type: 'success',
    //         content: 'This is very long usual event。。....',
    //       },
    //       {
    //         type: 'error',
    //         content: 'This is error event 1.',
    //       },
    //       {
    //         type: 'error',
    //         content: 'This is error event 2.',
    //       },
    //       {
    //         type: 'error',
    //         content: 'This is error event 3.',
    //       },
    //       {
    //         type: 'error',
    //         content: 'This is error event 4.',
    //       },
    //     ];
    //     break;
    //   default:
    // }
    return listData || [];
  };
  const dateCellRender = (value) => {
    // console.log(value);
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.key}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      {/* BalancepaymentsMgement */}
      <div className='calendar'>
        <Button type='primary' onClick={aRecord}>记一笔</Button>
        <Calendar onPanelChange={onPanelChange} fullscreen={true} onSelect={onSelect} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={drawers}>
          <p
            className="site-description-item-profile-p"
            style={{
              marginBottom: 24,
            }}
          >
            收支情况
          </p>
          <p className="site-description-item-profile-p">收入</p>

          <Row>
            {
              // console.log(balancepayMents.income)
              balancepayMents.income.map((value, index) => {
                // console.log(value);
                return <Col span={12} key={value.id}>
                  <div className='line-box'>
                    <Space>
                      <Badge color="#f50" />
                      <DescriptionItem key={index} title={value.name} content={value.value} />
                    </Space>
                  </div>
                </Col>
              })
            }
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">消费</p>
          <Row>
            {
              balancepayMents.spending.map((value, index) => {
                // console.log(value);
                return <Col span={12} key={value.id}>
                  <div className='line-box'>
                    <Space>
                      <Badge color="blue" />
                      <DescriptionItem key={index} title={value.name} content={value.value} />
                    </Space>
                  </div>
                </Col>
              })
            }
          </Row>
        </Drawer>

        <Modal title={modelInfo.title} open={modelInfo.open} onOk={handleOk} onCancel={handleCancel}>
          <Form
            name="basic"
            labelCol={{
              span: 5,
            }}
            // wrapperCol={{
            //   span: 16,
            // }}
            // initialValues={{
            //   remember: true,
            // }}
            form={form}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="类型"
              name="balancepaymenttype"
              rules={[
                {
                  required: true,
                  // message: 'Please input your username!',
                },
              ]}
            >
              <Select
                // defaultValue="lucy"
                // style={{
                //   width: 120,
                // }}
                onChange={handleChange}
                options={

                  [
                    {
                      value: '3',
                      label: '收入',
                    },
                    {
                      value: '1',
                      label: '支出',
                    },

                  ]
                }
              />
            </Form.Item>
            {
              modelInfo.type === 'income' ? (
                <>
                  <Form.Item
                    label="收入类型"
                    name="incometypes"
                    rules={[
                      {
                        required: true,
                        // message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Select
                      // defaultValue="lucy"
                      // style={{
                      //   width: 120,
                      // }}
                      // onChange={handleChange}
                      //模拟
                      options={
                        incomePayment
                        // [
                        //   {
                        //     label:1,
                        //     values:1
                        //   }
                        // ]
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="金额（元）"
                    name="amount"
                    rules={[
                      {
                        required: true,
                        // message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    label="支出类型"
                    name="paymenttype"
                    rules={[
                      {
                        required: true,
                        // message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Select
                      // defaultValue="lucy"
                      // style={{
                      //   width: 120,
                      // }}
                      // onChange={handleChange}
                      //模拟
                      options={incomePayment}
                    />
                  </Form.Item>
                  <Form.Item
                    label="金额（元）"
                    name="amount"
                    rules={[
                      {
                        required: true,
                        // message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </>
              )
            }
            <Form.Item
              label="名称"
              name="name"
              rules={[
                {
                  required: true,
                  // message: 'Please input your password!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="日期"
              name="date"
              rules={[
                {
                  required: true,
                  // message: 'Please input your password!',
                },
              ]}
            >
              {/* <Input /> */}
              <DatePicker className='date-box' />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default BalancepaymentsMgement