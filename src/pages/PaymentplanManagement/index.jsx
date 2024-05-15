/*
 * @Author: HHG
 * @Date: 2022-09-01 17:04:01
 * @LastEditTime: 2023-02-19 22:06:42
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/pages/PaymentplanManagement/index.js
 * @文件说明: 
 */
import { useEffect, useState } from 'react'
import { Descriptions, Button, Row, Col, Form, DatePicker } from 'antd'
// import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { getPlanListApi } from '@/api/paymentplanManagement'
import './index.less'

const PaymentplanManagement = () => {
  const [year, setYear] = useState('2019')
  const [plan, setPlan] = useState({
    income: [],
    consumption: [],
    other: []
  })
  const [description, setDescription] = useState({
    detailed: 'none',
    month: '一月份',
    // name:'收入计划'
  })
  const [form] = Form.useForm()
  const onFinish = (values) => {
    if (values.annual !== undefined && values.annual !== null && values.annual !== '') {
      setYear(window.moment(values.annual._d).format('YYYY'))
    } else {
      setYear(window.moment(new Date()).format('YYYY'))
    }
  }
  useEffect(() => {
    setYear('2023')
    getPlanListApi({}).then(res => {
      setPlan(res.data)
    })
  }, [])

  const seeMonthPlan = () => {

    setDescription({
      ...description,
      detailed: description.detailed === 'block' ? 'none' : 'block'
    })
  }
  return (
    <>
      {/* 主要计划 */}

      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        labelCol={{
          xl: 4
        }}
      >
        <Row gutter={24}>
          <Col span={6} >
            <Form.Item
              name='annual'
              label='年度'
            >
              <DatePicker picker="year" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Col>
        </Row>
      </Form>

      <div style={{ display: (description.detailed === 'none') ? 'none' : 'block' }}>
        {
          Object.keys(plan).map(ele => {
            // debugger
            // console.log(ele);
            let title = ''
            if (ele === 'income') {
              title = '收入计划'
            } else if (ele === 'consumption') {
              title = '支出计划'
            } else {
              title = '其他计划'
            }
            return (<Descriptions key={ele} title={year + '年度' + title} extra={<><Button type="primary" style={{ marginRight: '5px' }}>编辑</Button><Button onClick={() => seeMonthPlan()} type="primary">查看详细</Button></>} className='descriptions' style={{ marginTop: '8px' }}>
              {
                Array.isArray(plan[ele]) && plan[ele].map((ele1) => {
                  return <Descriptions.Item key={ele1.id} label={ele1.name}>{ele1.value}</Descriptions.Item>
                })
              }
            </Descriptions>
            )
          })
        }
      </div>

      <div style={{ display: (description.detailed === 'none') ? 'block' : 'none' }}>
        <Descriptions title={year + '年度收入计划详细'} extra={<><Button type="primary" style={{ marginRight: '5px' }}>编辑</Button><Button onClick={() => seeMonthPlan()} type="primary">查看详细</Button></>} className='descriptions' style={{ marginTop: '8px' }}>
          {
            plan.income.map((ele) => {
              return <Descriptions.Item key={ele.id} label={ele.name}>{ele.value}</Descriptions.Item>
            })
          }
        </Descriptions>
      </div>

      {/*       
      <div style={{ display: (description.detailed == 'none') ? 'none' : 'block' }}>
        <Descriptions title={year + '年度收入计划'} extra={<><Button type="primary" style={{ marginRight: '5px' }}>编辑</Button><Button onClick={() => seeMonthPlan()} type="primary">查看详细</Button></>} className='descriptions' style={{ marginTop: '8px' }}>
          {
            plan.income.map((ele) => {
              return <Descriptions.Item key={ele.id} label={ele.name}>{ele.value}</Descriptions.Item>
            })
          }
        </Descriptions>
        <Descriptions title={year + '年度支出计划'} extra={<><Button type="primary" style={{ marginRight: '5px' }}>编辑</Button><Button onClick={() => seeMonthPlan()} type="primary">查看详细</Button></>} className='descriptions'>
          {
            plan.consumption.map((ele) => {
              return <Descriptions.Item key={ele.id} label={ele.name}>{ele.value}</Descriptions.Item>
            })
          }
        </Descriptions>
        <Descriptions title={year + '年度其他计划'} extra={<><Button type="primary" style={{ marginRight: '5px' }}>编辑</Button><Button onClick={() => seeMonthPlan()} type="primary">查看详细</Button></>} className='descriptions'>
          {
            plan.other.map((ele) => {
              return <Descriptions.Item key={ele.id} label={ele.name}>{ele.value}</Descriptions.Item>
            })
          }
        </Descriptions>
      </div>
      <div style={{ display: (description.detailed == 'none') ? 'block' : 'none' }}>
        <Descriptions title={year + '月度收入计划'} extra={<><Button type="primary" style={{ marginRight: '5px' }}>编辑</Button><Button onClick={() => seeMonthPlan()} type="primary">查看详细</Button></>} className='descriptions' style={{ marginTop: '8px' }}>
          {
            plan.income.map((ele) => {
              return <Descriptions.Item key={ele.id} label={ele.name}>{ele.value}</Descriptions.Item>
            })
          }
        </Descriptions>
      </div> 
      */}
    </>
  )
}

export default PaymentplanManagement