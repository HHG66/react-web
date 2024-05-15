/*
 * @Author: HHG
 * @Date: 2022-09-01 17:00:51
 * @LastEditTime: 2023-02-19 22:06:33
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/pages/AssetStatistics/index.js
 * @文件说明: 
 */

import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './index.less'
const AssetStatistics = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    //setTimeout解决echart图表超过宽度
    setTimeout(() => {
      echart()
    }, 100);
  }, [])
  const echart = () => {
    var chartDom = document.getElementById('echart');
    var myChart = echarts.init(chartDom);
    var option;

    const colors = ['#5470C6', '#91CC75', '#EE6666'];
    option = {
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        right: '20%'
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['支出', '收入', '负债']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          // prettier-ignore
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '支出',
          position: 'right',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: '{value} ¥'
          }
        },
        {
          type: 'value',
          name: '收入',
          position: 'right',
          alignTicks: true,
          offset: 80,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[1]
            }
          },
          axisLabel: {
            formatter: '{value} ¥'
          }
        },
        {
          type: 'value',
          name: '负债',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[2]
            }
          },
          axisLabel: {
            formatter: '{value} ¥'
          }
        }
      ],
      series: [
        {
          name: '支出',
          type: 'line',
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: '收入',
          type: 'bar',
          yAxisIndex: 1,
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ]
        },
        {
          name: '负债',
          type: 'line',
          yAxisIndex: 2,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    };
    // var echart = document.getElementById("echart");
    // //通过获取echart容器元素宽度减去一定宽度实现动态调整宽度，解决默认宽度超出的问题    
    // var w = echart.offsetWidth;
    // myChart.resize({ width: (w - 200) });
    option && myChart.setOption(option);
  }
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <>
      {/* AssetStatistics */}
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8} >
            <Form.Item
              name={`fiel`}
              label={`Field1`}
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item
              name={`fiel`}
              label={`Field1`}
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item
              name={`fiel`}
              label={`Field1`}
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {
            expand ? (
              <>
                <Col span={8} >
                  <Form.Item
                    name={`fiel`}
                    label={`Field000`}
                    rules={[
                      {
                        required: true,
                        message: 'Input something!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8} >
                  <Form.Item
                    name={`fiel`}
                    label={`Field000`}
                    rules={[
                      {
                        required: true,
                        message: 'Input something!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </>
            ) : ""
          }
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
            <a
              style={{
                fontSize: 12,
              }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <><UpOutlined />收回</> : <><DownOutlined />展开</>}
            </a>
          </Col>
        </Row>
      </Form>
      <div id='echart' className='echart'></div>
    </>
  )
}

export default AssetStatistics