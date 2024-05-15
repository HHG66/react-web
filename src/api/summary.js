/*
 * @Author: HHG
 * @Date: 2023-01-11 14:53:01
 * @LastEditTime: 2023-01-11 22:23:33
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/api/Summary.js
 * @文件说明: 
 */
import request from "./index";


export const getBillSummaryListApi = (params) => {
  if (params.tradingtime !== undefined && params.tradingtime !== null) {
    params.tradingtime = window.moment(params.tradingtime).format('YYYY-MM-DD')
  }
  return request({
    url: '/getbillsummarylist',
    method: 'GET',
    params: {
      billname: params.billname,
      tradingtime: params.tradingtime,
      amount: params.amount,
      counterparty: params.counterparty,
      associationtype: params.associationtype,
    }
  })
}

export const editSingleBill = (data) => {
  if (data.tradingtime !== undefined && data.tradingtime !== null) {
    data.tradingtime = window.moment(data.tradingtime).format("YYYY-MM-DD")
  }
  return request({
    url: '/editsummarybill',
    method: 'POST',
    data: {
      summarybillid: data.billsummaryid,
      billname: data.billname,
      tradingtime: data.tradingtime,
      incomeexpenditure: data.incomeexpenditure,
      amount: data.amount,
      counterparty: data.counterparty,
      associationtype: data.associationtype,
    }
  })
}

export const deleteSingleBillApi=(data)=>{
  return request({
    url:'/deletesummarybill',
    method:'POST',
    data:{
      summarybillid:data.summarybillid
    }
  })
}