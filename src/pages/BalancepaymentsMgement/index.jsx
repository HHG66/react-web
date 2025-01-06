/*
 * @Author: HHG
 * @Date: 2022-09-01 17:01:04
 * @LastEditTime: 2025-01-06 10:17:13
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\BalancepaymentsMgement\index.jsx
 * @文件说明:
 */
import {
  Calendar,
  Col,
  Divider,
  Drawer,
  Row,
  Badge,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  DatePicker,
  Descriptions,
} from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import Decimal from 'decimal.js';

import {
  getBalancepayMentsApi,
  newFinancialRecordApi,
  getPeriodTimeBillApi,
} from '@/api/balancepayments';
import { getIncomeTypeListApi } from '@/api/incometype';
import { getConsumptionTypeListApi } from '@/api/consumptiontype';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const BalancepaymentsMgement = () => {
  //为解决日历组件切换到日期范围会导致onSelect方法触发
  let calendarState = '';
  const [drawers, setDrawers] = useState(false);
  const [balancepayMents, setBalancepayMents] = useState([]);
  const [modelInfo, setModelInfo] = useState({
    open: false,
    title: '新增',
    type: 'income',
  });
  const [incomePayment, setincomePayment] = useState([]);
  const [calendarList, setCalendarList] = useState([]);
  const [form] = Form.useForm();
  const onClose = () => {
    setDrawers(false);
  };
  useEffect(() => {
    //接口，默认当月的日期，去获取日历当月需要渲染的数据
    let startDate = window
      .moment(new Date())
      .subtract(1, 'M')
      .format('YYYY-MM');
    let endDate = window.moment(new Date()).add(1, 'M').format('YYYY-MM');
    console.log(startDate);
    getPeriodTimeBill(startDate, endDate);
  }, []);
  const getPeriodTimeBill = (startDate, endDate) => {
    getPeriodTimeBillApi({ startDate, endDate }).then((res) => {
      setCalendarList(res.data);
    });
  };
  const onPanelChange = (value, mode) => {
    calendarState = 'isPanelChange';
    // console.log(value, mode)
    // console.log(value.format('YYYY-MM-DD'));
    console.log(
      moment(value).endOf('month').format('YYYY-MM-DD'),
      " moment(value).endOf('month').format('YYYY-MM')"
    );

    getPeriodTimeBill(
      value.format('YYYY-MM'),
      moment(value).endOf('month').format('YYYY-MM-DD')
    );
  };

  const getBalancepayMent = (moment) => {
    getBalancepayMentsApi(window.moment(moment).format('YYYY-MM-DD')).then(
      (res) => {
        // console.log(res.data);
        setBalancepayMents(res.data);
      }
    );
  };
  const onSelect = (moment, { source }) => {
    console.log(calendarState);
    if (calendarState === '') {
      setDrawers(true);
      getBalancepayMent(moment);
      // getBalancepayMentsApi(window.moment(moment._d).format('YYYY-MM-DD')).then(
      //   (res) => {
      //     // console.log(res.data);
      //     setBalancepayMents(res.data);
      //   }
      // );
    }
    calendarState = '';

    if (source === 'date') {
      console.log('Panel Select:', window.moment(moment).format('YYYY-MM-DD'));
    }
    // console.log(window.moment(moment._d).format('YYYY-MM-DD'));
  };
  const aRecord = () => {
    // console.log('aRecord');
    setModelInfo({
      ...modelInfo,
      open: true,
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((res) => {
        console.log(res);
        newFinancialRecordApi(res).then((res) => {
          message.success(res.message);
        });
        setModelInfo({
          ...modelInfo,
          open: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCancel = () => {
    setModelInfo({
      ...modelInfo,
      open: false,
    });
  };
  const handleChange = (value) => {
    if (value === '1') {
      setModelInfo({
        ...modelInfo,
        type: 'payment',
      });
      getConsumptionTypeListApi().then((res) => {
        let incomePayment = [];
        res.data.forEach((element) => {
          incomePayment.push({
            label: element.name,
            value: element.id,
          });
        });
        setincomePayment(incomePayment);
      });
    } else {
      setModelInfo({
        ...modelInfo,
        type: 'income',
      });
      getIncomeTypeListApi().then((res) => {
        let incomePayment = [];
        res.data.forEach((element) => {
          incomePayment.push({
            label: element.name,
            value: element.id,
          });
        });
        setincomePayment(incomePayment);
      });
    }
  };

  const getListData = (value) => {
    let listData = [];
    let start = window.moment(value).format('YYYY-MM-DD H:mm:ss');
    let end = window.moment(value).format('YYYY-MM-DD');
    // console.log(ss);
    let generalIncome = 0;
    let totalExpenditure = 0;
    calendarList.forEach((element) => {
      let isCurrentData = false;
      isCurrentData = moment(element.tradinghours).isBetween(
        start,
        end,
        'day',
        '[]'
      );
      if (isCurrentData) {
        if (element.collectorbranch == '收入') {
          generalIncome = new Decimal(generalIncome).add(element.amount);
        } else if (element.collectorbranch == '支出') {
          totalExpenditure = new Decimal(totalExpenditure).add(element.amount);
        }
        // listData.push({
        //   key: element._id,
        //   type: element.collectorbranch == '收入' ? 'success' : 'warning',
        //   content: `总计${element.collectorbranch}:${
        //           element.collectorbranch == '收入'
        //             ? generalIncome
        //             : totalExpenditure
        //         }
        //     `,
        // });
      }
    });
    let dayIncomeBills = [];
    let dayExpendBills = [];
    if (generalIncome !== 0) {
      dayIncomeBills = [
        {
          key: 0,
          type: 'success',
          content: `总计收入:${generalIncome} `,
        },
      ];
    }
    if (totalExpenditure !== 0) {
      dayExpendBills = [
        {
          key: 1,
          type: 'warning',
          content: `总计支出:${totalExpenditure} `,
        },
      ];
    }
    return (listData = [...dayIncomeBills, ...dayExpendBills]);
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
      <div className="calendar">
        {/* <Button type="primary" onClick={aRecord}>
          记一笔
        </Button> */}
        <Calendar
          onPanelChange={onPanelChange}
          fullscreen={true}
          onSelect={onSelect}
          cellRender={dateCellRender}
        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={onClose}
          open={drawers}
        >
          <p
            rootClassName="site-description-item-profile-p"
            rootStyle={{
              marginBottom: 24,
            }}
          >
            收支情况
          </p>
          <p rootClassName="site-description-item-profile-p">收入</p>

          <Row>
            {
              // console.log(balancepayMents.income)
              balancepayMents.map((value, index) => {
                if (value.collectorbranch !== '收入') return;
                // console.log(value);
                return (
                  <Col span={24} key={value.id}>
                    <div rootClassName="line-box">
                      <Space>
                        <Badge color="green" />
                        <DescriptionItem
                          key={index}
                          title={value.product}
                          content={`￥${value.amount} （ ${value.counterparty}）（${value.tradetype}） （${value.currentstate}）`}
                        />
                      </Space>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
          <Divider />
          <p rootClassName="site-description-item-profile-p">消费</p>
          <Row>
            {balancepayMents.map((value, index) => {
              // console.log(value);
              if (value.collectorbranch !== '支出') return;
              return (
                <Col span={24} key={value.id}>
                  <div rootClassName="line-box">
                    <Space>
                      <Badge color="blue" />
                      <DescriptionItem
                        size={'small'}
                        key={index}
                        title={value.product}
                        bordered
                        layout="vertical"
                        content={`￥${value.amount} （ ${value.counterparty}）（${value.tradetype}） （${value.currentstate}）`}
                      />
                    </Space>
                  </div>
                </Col>
              );
            })}
          </Row>
          <p rootClassName="site-description-item-profile-p">其他</p>
          <Row>
            {balancepayMents.map((value, index) => {
              // console.log(value);
              if (
                value.collectorbranch == '支出' ||
                value.collectorbranch == '收入'
              )
                return;
              return (
                <Col span={24} key={value.id}>
                  <div rootClassName="line-box">
                    <Space>
                      <Badge color="#f50" />
                      <DescriptionItem
                        key={index}
                        title={value.product}
                        bordered
                        layout="vertical"
                        content={`￥${value.amount} （ ${value.counterparty}）（${value.tradetype}） （${value.currentstate}）`}
                      />
                    </Space>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Drawer>

        <Modal
          title={modelInfo.title}
          open={modelInfo.open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
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
                options={[
                  {
                    value: '3',
                    label: '收入',
                  },
                  {
                    value: '1',
                    label: '支出',
                  },
                ]}
              />
            </Form.Item>
            {modelInfo.type === 'income' ? (
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
            )}
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
              <DatePicker className="date-box" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default BalancepaymentsMgement;
