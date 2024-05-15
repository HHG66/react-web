/*
 * @Author: HHG
 * @Date: 2022-10-22 20:33:04
 * @LastEditTime: 2023-03-12 14:32:17
 * @LastEditors: 韩宏广
 * @FilePath: /Financial/web/src/api/incometype.js
 * @文件说明: 
 */
import request from './index.js'

export const newIncometype = (data) => {
  return request({
    method: 'POST',
    url: '/newincometype',
    data: {
      incomename: data.incomName,
      remarks: data.remarks
    }
  })
}

export const editIncometypeApi = (data) => {
  return request({
    method: 'POST',
    url: '/editincometype',
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
    url: '/deleteincometype',
    data: {
      incometypeid: id
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
    url: '/getincometypelist',
    params: {
      incometypename: searchData
    }
  })
}

//新增关联收入账单名称
export const newAssociatedIncome = (data) => {
  return request({
    method: 'POST',
    url: '/newassociatedincome',
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
    url: '/editassociatedincome',
    data: {
      associatedIncomeId: data.id,
      billIncomeName: data.billIncomeName,
      incomTypeName: data.incomTypeName
    }
  })
}
//删除关联收入账单名称
export const deleteAssociatedIncomeApi=(data)=>{
  return request({
    method:"POST",
    url:"/deleteassociatedincome",
    data:{
      associatedIncomeId:data.id
    }
  })
}
//获取关联收入账单列表
export const getAssocicitedIncomeListApi=(params)=>{
  return request({
    methed:'GET',
    url:"/getassociatedincomelist",
    params:{
      associatedIncomeName:params.associatedIncomeName||'',
      remarks:params.remarks||"",
      incomTypeName:params.incomTypeName||''
    }
  })
}