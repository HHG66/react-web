/*
 * @Author: HHG
 * @Date: 2022-10-22 20:33:04
 * @LastEditTime: 2024-12-03 14:52:13
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\incometype.js
 * @文件说明: 
 */
import request from './index.js'
let baseUrl = 'incomeType'
export const addIncometype = (data) => {
  return request({
    method: 'POST',
    url: baseUrl+'/addIncomeType',
    data: data
  })
}

export const editIncometypeApi = (data) => {
  return request({
    method: 'POST',
    url: baseUrl + '/editincometype',
    data: {
      incomename: data.name,
      incomeId: data.id,
      remarks: data.remarks
    }
  })
}

export const deleteIncomeType = (id) => {
  return request({
    method: 'POST',
    url: baseUrl + '/deleteIncomeType',
    data: {
      _id: id
    }
  })
}

export const getIncomeTypeListApi = (searchform) => {
  let searchData
  if (!searchform) {
    searchData = ''
  } else {
    searchData = searchform.incomename
  } 
  return request({
    method: 'GET',
    url: baseUrl + '/getIncomeTypeList',
    params: {
      incometypename: searchData
    }
  })
}

//新增关联收入账单名称
export const newAssociatedIncome = (data) => {
  return request({
    method: 'POST',
    url: baseUrl + '/newassociatedincome',
    data: {
      billincomename: data.billIncomeName,
      incomTypeName: data.incomTypeName
    }
  })
}
//编辑关联收入账单名称
export const editAssociatedIncomeApi = (data) => {
  return request({
    method: 'POST',
    url: baseUrl + '/editassociatedincome',
    data: {
      associatedIncomeId: data.id,
      billIncomeName: data.billIncomeName,
      incomTypeName: data.incomTypeName
    }
  })
}
//删除关联收入账单名称
export const deleteAssociatedIncomeApi = (data) => {
  return request({
    method: "POST",
    url: baseUrl + "/deleteassociatedincome",
    data: {
      associatedIncomeId: data.id
    }
  })
}
//获取关联收入账单列表
export const getAssocicitedIncomeListApi = (params) => {
  return request({
    methed: 'GET',
    url: baseUrl + "/getassociatedincomelist",
    params: {
      associatedIncomeName: params.associatedIncomeName || '',
      remarks: params.remarks || "",
      incomTypeName: params.incomTypeName || ''
    }
  })
}