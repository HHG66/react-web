/*
 * @Author: HHG
 * @Date: 2023-01-09 09:00:40
 * @LastEditTime: 2024-12-27 09:30:53
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\liabilities.js
 * @文件说明: 
 */
import request from './index.js'
const baseUrl = 'liabilities'

export const createdLoanRecordApi = (data) => {
  return request({
    url: baseUrl + '/createdLoanRecord',
    method: 'POST',
    data: data
  })
}

export const getLoanListApi = (params) => {
  return request({
    url: baseUrl + '/getLoanList',
    method: 'GET',
    params: {

    }
  })
}
export const deleteLoanListApi = (data) => {
  return request({
    url: baseUrl + '/deleteLoan',
    method: 'POST',
    data: {
      loanid: data
    }
  })
}
//还款计划列表
export const getLoanInfoListApi = (params) => {
  return request({
    url: baseUrl + "/getLoanInfoList",
    method: 'GET',
    params: {
      _id: params._id
    }
  })
}


// 贷款单详细
export const getLoanInfoApi = (params) => {
  return request({
    url: baseUrl + '/getLoanInfo',
    method: 'GET',
    params: {
      _id: params._id
    }
  })
}

export const edtLoanInfo = (data) => {
  return request({
    url: baseUrl + '/editloaninfo',
    method: "POST",
    data: {
      _id: data.id,
      liabilitiesName: data.liabilitiesName,   //贷款名称
      interestRate: data.interestRate, //年利率
      interest: data.interest, //总利息
      loanPeriod: data.loanPeriod, //贷款年限
      totalPeriod: data.totalPeriod, //总期数
      paymentsPerYearNum: data.paymentsPerYearNum, //每年还款次数
      loanInitiationTime: data.loanInitiationTime, //贷款开始时间
      modeRepayment: data.modeRepayment, //还款方式
      currentPeriod: data.currentPeriod, //当前期数
      amount: data.amount,//总金额
      balance: new Number(data.balance),//剩余金额
    }
  })
}

//贷款偿还计划
export const updateLoanInfolist = (data) => {
  return request({
    url: baseUrl + '/updateLoanInfolist',
    method: 'POST',
    data: {
      _id: data._id,
      // loanid: data.loanid,
      numberPeriods: data.numberPeriods,
      repaymentDate: window.moment(data.repaymentDate).format("YYYY-MM-DD"),
      initialBalance: data.initialBalance,
      repaymentScheduleAmt: data.repaymentScheduleAmt,
      additionalRepayment: data.additionalRepayment,
      accumulatedInterest: data.accumulatedInterest,
      principal: data.principal,
      closingBalance: data.closingBalance,
      repaymentStatus: data.repaymentStatus,
    }
  })
}