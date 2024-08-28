
import HForm from "../../components/hForm"
import { useState } from 'react'
const FormTestPage = () => {
  const [fromConfig, SetConfig] = useState({
    fields: [{
      label: "输入框1", name: "1", type: "select", options: [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yimingheyimingheyimingheyimingheyiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]
    }, { label: "输入框2", name: "2", type: "input" }]
  })

  return (
    <>
      <HForm {...fromConfig}></HForm>
    </>

  )
}

export default FormTestPage