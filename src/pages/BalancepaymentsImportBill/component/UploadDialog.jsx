/*
 * @Author: HHG
 * @Date: 2025-03-08 13:32:06
 * @LastEditTime: 2025-03-08 23:39:51
 * @LastEditors: 韩宏广
 * @FilePath: /personal-finance-web/src/pages/BalancepaymentsImportBill/component/UploadDialog.jsx
 * @文件说明: 
 */
import { Button, Modal,message } from 'antd';
import {useState,useRef, useEffect} from 'react'
import HForm from '@/components/hForm/index.jsx'
import * as XLSX from 'xlsx';
import {
  importingbillsApi,
} from '@/api/balancepayments';
const UploadDialog=({openState,onClose})=>{
  // console.log(onClose);
  const [messageApi, contextHolder] = message.useMessage();

    const formRef = useRef();
    // console.log(openState);
    
  const handleOk = () => {
    // console.log(formRef.current);
    onChange(fileList[0])
    onClose()
  };
  const onChange = (evt) => {
    var selectedFile = evt;
    var reader = new FileReader();
    // 字段名映射对象
    const fieldMapping = {
      //微信
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
      //支付宝
      '交易号':"trasactionid",
      '商家订单号':"merchantstoorder",
      '交易创建时间':"transactionCreationTime",
      '付款时间':"tradinghours",
      '最近修改时间':"lastModifiedTime",
      '交易来源地':"sourceTransaction",
      '类型':"payPattern",
      // '交易对方':"counterparty",
      '商品名称':"product",
      '金额（元）':"amount",
      // '收/支':"collectorbranch",
      '交易状态':"tradingStatus",
      '服务费（元）':"serviceCharge",
      '成功退款（元）':"successfulRefund",
      // '备注':"remark",
      '资金状态':"fundStatus",
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
          UTC: true,
        });
        console.log(sheel);

        // var col_index = XLSX.utils.decode_col("D");
        // console.log(test);
        // setTest(test)
        var tableHead = [];
        sheel[0].forEach((element) => {
          element=element.trim()
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
        // setColumns(tableHead);
        sheel.forEach((element, index) => {
          if (index === 0) {
            return;
          }
          try {
            var rowData = {};
            for (let index = 0; index < element.length; index++) {
              rowData[tableHead[index].dataIndex] = element[index].trim()==''?null:element[index];
              rowData['key'] = Math.ceil(Math.random() * 100000);
            }
            datass.push(rowData);
          } catch (error) {
            console.log(error);
          }
        });
      });
      importingbillsApi({
        billList:datass,
        billType:formRef.current.getFieldValue("billType")
      }).then((res) => {
        getdisposebill();
      });
    };

    reader.onerror = function (event) {
      console.error('File could not be read! Code ' + event.target.error.code);
    };
    // 读取上传文件为二进制
    reader.readAsArrayBuffer(selectedFile);
  };
  const [fileList, setFileList] = useState([]);

const formConfig={
  columns:[
    {
      name:"billType",
      type:'select',
      label:"账单类型",
      options:[
        {
          label:'微信账单',
          value:'WeChat'
        },
        {
          label:'支付宝',
          value:'Alipay'
        },
      ]
    },
    {
      name:"billFile",
      type:'upload',
      // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
      onRemove: (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
      },
      beforeUpload: (file) => {
        setFileList([file]);
        return false;
      },
      fileList,
    }
  ]
}


  return (
    <>
    {contextHolder}
    <Modal title="导入账单" open={openState} onOk={handleOk} onCancel={onClose}>
        <HForm {...formConfig}   ref={formRef}></HForm>
    </Modal>
    </>
  )
}
export default UploadDialog