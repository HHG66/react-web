/*
 * @Author: HHG
 * @Date: 2024-08-26 14:17:48
 * @LastEditTime: 2024-11-12 20:10:39
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\hForm\HForm.jsx
 * @文件说明: 
 */
import { Button, Checkbox, Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import registerConfig from './register.jsx' 
import { useEffect } from 'react'  
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
    input: (props) => {
      console.log(props);
      // return < Input placeholder={props.placeholder} prefix={ props.prefix ? props.prefix.icon : {}} />
      return < Input   {...props} />
    },
    password: (props) => {
      return <Input.Password {...props} />
    },
    button: (props) => {
      let type = props.styletype || 'primary'
      return <Button  {...props} type={type}>{props.text}</Button>
    },
    select: (props) => {
      return (<Select
        defaultValue=""
        options={props.options}
      />)
    }

  }
  // useEffect(() => {
  //   config.fields.map((field) => {
  //     registerConfig.resister(field.type, components[field.type])
  //   })
  //   // createFormConfig()
  //   console.log("resister", registerConfig);

  // }, [config])

  config.fields.map((field) => {
    registerConfig.resister(field.type, components[field.type])
  })
  // createFormConfig()
  console.log("resister", registerConfig);
  // const formComponent = (field) => {
  //   let Compontent = components[field.type] || (() => ("111"))
  //   return <Compontent {...field}></Compontent>
  // }
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };
  return (
    <>
      <Form style={{
        padding: 8,
      }}
        onFinish={config.onFinish}
      // onFinish={onFinish}
      >
        {
          config.fields.map((field) => {
            return (
              <FormItem key={field.name + field.type} label={field.label} name={field.name} {...field.item} >
                {/* <field.type ></field.type> */}
                {/* {formComponent(field)} */}
                {/* 注册表中获取 */}
                {registerConfig.componentMap[field.type](field)}
              </FormItem>
            )
          })
        }
      </Form>
    </>
  )
}
export default HForm
