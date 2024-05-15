/*
 * @Author: HHG
 * @Date: 2023-01-11 22:43:09
 * @LastEditTime: 2023-01-12 16:50:58
 * @LastEditors: 韩宏广
 * @FilePath: \financial\web\src\pages\DepositPlan\index.js
 * @文件说明: 
 */
import { useEffect, useState } from 'react'
import { Typography, Modal, Select, Form, message } from 'antd';
import { getDepositPlan,editSingleDepositPlanApi } from '@/api/depositplan'
import './index.less'
const { Title } = Typography;
const DepositPlan = () => {
  const [depositBox, setDepositBox] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm()

  useEffect(() => {
    getDepositPlan().then(res => {
      setDepositBox(res.data)
    })
  }, [])

  const graph = () => {
    let test = []
    depositBox.forEach((element, i) => {
      if (depositBox.length < 366) {
        if (element.iscomplete === true) {
          test.push(
            <div key={element.id} onClick={() => setDeposit(element.iscomplete)} className='iscomplete'>{i + 1}</div>
          )
        } else {
          test.push(
            <div key={element.id} onClick={() => setDeposit(element.iscomplete)}>{i + 1}</div>
          )
        }
      }
    });

    return test

  }

  const setDeposit = (iscomplete) => {
    showModal()
    if(iscomplete===true){
      form.setFieldValue('iscomplete','已完成')
    }else{
      form.setFieldValue('iscomplete','待完成')
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.validateFields().then(values=>{
      editSingleDepositPlanApi(values).then(res=>{
        message.success(res.message)
        handleCancel()
      })
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* DepositPlan */}
      {/* 心形图形 */}
      {/* <div className='love'></div> */}
      <Title level={3}>10元存款计划</Title>
      <div className='graph-box'>
        {graph()}
      </div>
      <Modal title="设置完成" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="状态"
            name="iscomplete"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Select
              options={[
                {
                  value: true,
                  label: '已完成',
                },
                {
                  value: false,
                  label: '待完成',
                }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default DepositPlan