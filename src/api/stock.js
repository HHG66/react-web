/*
 * @Author: HHG
 * @Date: 2022-12-22 14:28:11
 * @LastEditTime: 2023-01-10 23:17:37
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/api/stock.js
 * @文件说明: 
 */
import request from "./index";

export const getStockListApi = (params) => {
  return request({
    url: '/getstocklist',
    method: 'GET',
    params: {
      stockname: params.stockname,
      stockcode: params.stockcode
    }
  })
}
export const editStockApi = (data, stockId) => {
  //2加仓，1卖出
  let fomrdata = {}
  if (data.stockstate === '2') {
    fomrdata = {
      stockstate: data.stockstate,
      stockid: stockId,
      addnumber: data.addnumber,
      price: data.price,
      sellingnumber: "",
      sellingprice: "",
    }
  } else if (data.stockstate === '1') {
    fomrdata = {
      stockid: stockId,
      stockstate: data.stockstate,
      sellingnumber: data.sellingnumber,
      sellingprice: data.sellingprice,
      addnumber: "",
      price: "",
    }
  }
  return request({
    url: "/editstock",
    method: 'POST',
    data: fomrdata
  })
}
export const deleteStockApi = (data) => {
  return request({
    url: "/deletestock",
    method: 'POST',
    data: {
      stockid: data.id
    }
  })
}