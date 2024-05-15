/*
 * @Author: HHG
 * @Date: 2022-12-13 20:02:38
 * @LastEditTime: 2022-12-23 12:07:40
 * @LastEditors: 韩宏广
 * @FilePath: \my-financial\web\src\api\balancepayments.js
 * @文件说明: 
 */
import request from './index.js'


export const getBalancepayMentsApi = (params) => {
  return request({
    url: '/getbalancepayments',
    method: 'GET',
    params: {
      date: params
    }
  })
}

export const ImportingbillsApi = (data) => {
  //把单次导入的账单数据进行了处理，去除了antd中table组件需要的key属性，减少网络带宽
  var datas = []
  data.forEach(element => {
    var billTable = {}
    for (const key in element) {
      if (key !== "key") {
        billTable[key] = element[key]
      }
    }
    datas.push(billTable)
  });
  // console.log(datas);
  return request({
    url: "/importingbills",
    method: 'POST',
    data: {
      tabeData: datas
    }
  })
}
export const getdisposebillApi = (params) => {
  return request({
    url: '/getdisposebill',
    method: 'GET',
    params: {
      tradinghours: params.tradinghours,
      transactiontype: params.transactiontype,
      balancepayments: params.balancepayments,
      amount: params.amount,
      transactionid: params.id,
      inporttime: params.inporttime
    }
  })
}
export const getImportRecordsApi = (data) => {
  return request({
    url: "/getimportrecords",
    method: "GET",
    data: {
      starttime: data.starttime,
      endtime: data.endtime
    }
  })
}

export const getinportbillinfoApi = (params) => {
  return request({
  url: '/getinportbillinfo',
  method: 'GET',
  params: {
    batchid:params.batchid
  }
})
}

export const newFinancialRecordApi=(data)=>{
  let type=''
  if(data.incometype){
    type=data.incometype
  }
  if(data.paymenttype){
    type=data.paymenttype
  }
  return request({
    url:'/newfinancialrecord',
    method:'POST',
    data:{
      //收入||支出
      balancepaymenttype:data.balancepaymenttype,
      type:type,
      name:data.name,
      amount:data.amount,
    }
  })
}

export const getPeriodTimeBillApi=(params)=>{
  return request({
    url:'/getperiodtimebill',
    method:"GET",
    params:{
      startdate:params.startDate||'',
      enddate:params.endDate||''
    }
  })
}