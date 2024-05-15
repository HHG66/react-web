/*
 * @Author: HHG
 * @Date: 2023-01-05 08:52:37
 * @LastEditTime: 2023-01-10 23:19:45
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/api/deposits.js
 * @文件说明: 
 */
import request from "./index";

export const getDepositListApi = (params) => {
  let maturitytime
  if (params && params.maturitytime) {
    maturitytime=  window.moment(params.maturitytime._d).format('YYYY-MM-DD')
  }
  return request({
    url: '/getdepositlist',
    method: 'GET',
    params: {
      depositname: params.depositname||undefined,//存款名称
      maturitytime: maturitytime,//到期时间
    }
  })
}

export const editDepositInfoApi = (data) => {
  let editdata = {}
  if (data.actiontype === '0') {
    editdata = {
      actiontype: data.actiontype,
      maturitytime: window.moment(data.actiontype._d).format('YYYY-MM-DD'),
      renewalamount: data.renewalamount,
      renewalrate: data.renewalrate,
    }
  }
  if (data.actiontype === '1') {
    editdata = {
      actiontype: data.actiontype,
      gowhere: data.gowhere,//去向
      interest: data.interest, //利息
      interestrate: parseInt(data.interestrate),//利率
    }
  }
  return request({
    url: 'editdepositinfo',
    method: "POST",
    data: editdata
  })
}

export const deleteDepositApi = (data) => {
  return request({
    url: "/deleteDepositinfo",
    method: 'POST',
    data: {
      id: data.id
    }
  })
}

