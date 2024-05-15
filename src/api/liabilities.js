/*
 * @Author: HHG
 * @Date: 2023-01-09 09:00:40
 * @LastEditTime: 2023-01-10 23:00:19
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/api/liabilities.js
 * @文件说明: 
 */
import request from './index.js'

export const getLoanListApi = (params) => {
  return request({
    url: '/getloanlist',
    method: 'GET',
    params: {

    }
  })
}

export const getLoanInfoListApi = (params) => {
  return request({
    url: "/getloaninfolist",
    method: 'GET',
    params: {

    }
  })
}

export const deleteLoanListApi = (data) => {
  return request({
    url: '/deleteloanlist',
    method: 'POST',
    data: {
      loanid: data.id
    }
  })
}

export const getLoanInfoApi = (params) => {
  return request({
    url: '/getloaninfo',
    method: 'GET',
    params: {
      loanid: params.id
    }
  })
}

export const edtLoanInfo = (data) => {
  return request({
    url: '/editloaninfo',
    method: "POST",
    data: {
      loanid: data.id,
      loanname: data.loanname,   //贷款名称
      annualinterestrate: data.annualinterestrate, //年利率
      totalinterest: data.totalinterest, //总利息
      loanlife: data.loanlife, //贷款年限
      totalnumberperiods: data.totalnumberperiods, //总期数
      thenumberrepaymentsperyear: data.thenumberrepaymentsperyear, //每年还款次数
      loanstarttime: data.loanstarttime, //贷款开始时间
      moderepayment: data.moderepayment, //还款方式
      currentnumberissues: data.currentnumberissues, //当前期数
      amount: data.amount,//总金额
      residualamount: data.residualamount,//剩余金额
    }
  })
}
export const editLoanInfoListApi=(data)=>{
  return request({
    url:'/editloanInfolist',
    method:'POST',
    data:{
      loaninfoid:data.loaninfoid,
      loanid:data.loanid,
      numberperiods:data.numberperiods,
      repaymentdate:window.moment(data.repaymentdate).format("YYYY-MM-DD"),
      openingbalance:data.openingbalance,
      plannedrepayment:data.plannedrepayment,
      additionalrepayment:data.additionalrepayment,
      accumulatedinterest:data.accumulatedinterest,
      principal:data.principal,
      closingbalance:data.closingbalance,
      loanstate:data.loanstate,
    }
  })
}