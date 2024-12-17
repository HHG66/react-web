/*
 * @Author: HHG
 * @Date: 2023-01-05 08:52:37
 * @LastEditTime: 2024-12-17 16:32:30
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\deposits.js
 * @文件说明: 
 */
import request from "./index";
const baseUrl = 'investment'


export const getDepositListApi = (params) => {
  let expirationTime
  if (params && params.expirationTime) {
    expirationTime = window.moment(params.expirationTime._d).format('YYYY-MM-DD')
  }
  return request({
    url: baseUrl + '/getDepositList',
    method: 'GET',
    params: {
      depositName: params.depositname || undefined,//存款名称
      expirationTime: expirationTime,//到期时间
    }
  })
}



export const editDepositInfoApi = (data) => {
  let editdata = {}
  editdata = {
    _id: data._id,
    //actiontype 0续存 1结息
    actiontype: data.actiontype,
    expirationTime: window.moment(data.actiontype._d).format('YYYY-MM-DD'), //到期时间
    amountDeposited: data.renewalamount, //续存本金 存款金额=续存本金+本金
    interestRate: data.interestrate,//利率  0、1都需要传
    //1传入数据
    gowhere: data.gowhere,//去向
    interest: data.interest, //利息
  }
  // if (data.actiontype === '1') {
  //   editdata = {

  //   }
  // }
  return request({
    url: baseUrl + '/editDepositInfo',
    method: "POST",
    data: editdata
  })
}

// export const deleteDepositApi = (data) => {
//   return request({
//     url: "/deleteDepositinfo",
//     method: 'POST',
//     data: {
//       id: data.id
//     }
//   })
// }


export const createdDepositApi = (formData) => {
  return request({
    url: baseUrl + "/createdDeposit",
    method: 'POST',
    data: formData
  })
}

