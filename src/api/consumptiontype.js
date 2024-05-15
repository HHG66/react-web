/*
 * @Author: HHG
 * @Date: 2022-09-13 19:16:40
 * @LastEditTime: 2023-02-20 23:00:31
 * @LastEditors: 韩宏广
 * @FilePath: /Financial/web/src/api/consumptiontype.js
 * @文件说明: 消费类型的接口
 */
import request from "./index";

export function getConsumptionTypeListApi(searchData) {
  return request({
    method: 'GET',
    url: '/getconsumptiontypelist',
    params: {
      consumptiontypename: searchData ? searchData.consumptionName : ''
    }
  })
}

export function newConsumptionType(consumptiontype) {
  return request({
    method: 'POST',
    url: '/newconsumptiontype',
    data: {
      consumptiontype: consumptiontype.consumptionName,
      remarks: consumptiontype.remarks
    }
  })
}
export function editConsumptionTypeApi(data) {
  return request({
    method: 'POST',
    url: '/editconsumptiontype',
    data: {
      consumptiontypeId: data.id,
      consumptiontypename: data.consumptionName,
      remarks: data.remarks
    }
  })
}
export function deleteConsumptiontypeApi(data) {
  return request({
    method: 'POST',
    url: '/deleteconsumptiontype',
    data: {
      consumptiontypeId: data,
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