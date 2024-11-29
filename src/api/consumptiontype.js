/*
 * @Author: HHG
 * @Date: 2022-09-13 19:16:40
 * @LastEditTime: 2024-11-29 18:33:10
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\consumptiontype.js
 * @文件说明: 消费类型的接口
 */
import request from "./index";

export function getConsumptionTypeListApi(searchData) {
  return request({
    method: 'GET',
    url: '/consumptionType/getconsumptiontypelist',
    params: {
      consumptionTypeName: searchData ? searchData.consumptionName : ''
    }
  })
}

export function addConsumptionType(data) {
  return request({
    method: 'POST',
    url: '/consumptionType/addConsumptionType',
    data: {
      consumptionTypeName: data.consumptionTypeName,
      remark: data.remark,
      productKeyWords: data.productKeyWords
    }
  })
}
export function editConsumptionTypeApi(data) {
  return request({
    method: 'POST',
    url: '/consumptionType/updateConsumptionType',
    data: {
      _id: data.id,
      ...data
    }
  })
}
export function deleteConsumptiontypeApi(data) {
  return request({
    method: 'POST',
    url: '/consumptionType/deleteConsumptionType',
    data: {
      _id: data,
    }
  })
}
export function newAssociatedBillName(data) {
  return request({
    method: 'POST',
    url: '/newassociatedbillname',
    data: {
      consumptionName: data.consumptionName,
      consumptiontypeid: data.consumptiontype
    }
  })
}

export function getassociatedbill(data) {
  return request({
    method: 'GET',
    url: '/getassociatedbill',
    params: {
      consumptionname: data.consumptionName,
      // consumptiontype: data.consumptiontype
    }
  })
}
//编辑关联消费账单名称
export function editAssociatedBill(data) {
  console.log(data);
  return request({
    method: 'POST',
    url: '/editassociatedbill',
    data: {
      id: data.editAssociatedBillId,
      consumptionname: data.values.consumptionName,
      consumptiontype: data.values.consumptiontype
    }
  })
}
//删除关联消费账单名称
export function deleteAssociatedBill(id) {
  return request({
    method: 'POST',
    url: '/deleteassociatedbill',
    data: {
      id: id,
    }
  })
}