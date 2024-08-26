/*
 * @Author: HHG
 * @Date: 2024-08-26 14:17:48
 * @LastEditTime: 2024-08-26 20:54:34
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\hForm\HForm.jsx
 * @文件说明: 
 */
import { Button, Checkbox, Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import registerConfig from './register.jsx'
const HForm = (config) => {
  console.log(config);
  // console.log('HForm');
  // const components = (field) => {
  //   return {
  //     input: <Input placeholder="Basic usage" />,
  //     select: <Select
  //       defaultValue="lucy"
  //       options={field.options}
  //     />,
  //   }[field.type]
  // }


  const components = {
    input: (props) => (<Input placeholder="Basic usage" />),
    select: (props) => (<Select
      defaultValue="lucy"
      // options={props.options}
      options={
        [{
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        }]
      }
    />)

  }

  config.fields.map((field) => {
    console.log(field);
    console.log(components[field.type]);
    registerConfig.resister(field.type, components[field.type])
  })
  // createFormConfig()
  console.log("resister", registerConfig);


  const formComponent = (field) => {
    let Compontent = components[field.type] || (() => ("111"))
    return <Compontent {...field}></Compontent>
  }
  return (
    <>
      <Form style={{
        padding: 8,
      }}>
        {
          config.fields.map((field) => {
            return <FormItem key={field.name} label={field.label}>
              {/* <field.type ></field.type> */}
              {/* {formComponent(field)} */}
              {/* 注册表中获取 */}
              {registerConfig.componentMap[field.type]()}
            </FormItem>
          })
        }
      </Form>
    </>
  )
}
export default HForm
