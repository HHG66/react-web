/*
 * @Author: HHG
 * @Date: 2023-01-09 09:00:40
 * @LastEditTime: 2024-12-22 10:55:54
 * @LastEditors: 韩宏广
 * @FilePath: /personal-finance-web/src/api/liabilities.js
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
    url: baseUrl +'/getloanlist',
    method: 'GET',
    params: {

    }
  })
}
export const deleteLoanListApi = (data) => {
  return request({
    url: baseUrl +'/deleteLoan',
    method: 'POST',
    data: {
      loanid: data
    }
  })
}

// export const getLoanInfoListApi = (params) => {
//   return request({
//     url: "/getloaninfolist",
//     method: 'GET',
//     params: {

//     }
//   })
// }



// export const getLoanInfoApi = (params) => {
//   return request({
//     url: '/getloaninfo',
//     method: 'GET',
//     params: {
//       loanid: params.id
//     }
//   })
// }

export const edtLoanInfo = (data) => {
  return request({
    url: baseUrl+'/editloaninfo',
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
      balance: data.balance,//剩余金额
    }
  })
}
// export const editLoanInfoListApi=(data)=>{
//   return request({
//     url:'/editloanInfolist',
//     method:'POST',
//     data:{
//       loaninfoid:data.loaninfoid,
//       loanid:data.loanid,
//       numberperiods:data.numberperiods,
//       repaymentdate:window.moment(data.repaymentdate).format("YYYY-MM-DD"),
//       openingbalance:data.openingbalance,
//       plannedrepayment:data.plannedrepayment,
//       additionalrepayment:data.additionalrepayment,
//       accumulatedinterest:data.accumulatedinterest,
//       principal:data.principal,
//       closingbalance:data.closingbalance,
//       loanstate:data.loanstate,
//     }
//   })
// }