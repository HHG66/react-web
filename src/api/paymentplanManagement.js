/*
 * @Author: HHG
 * @Date: 2023-01-13 23:18:35
 * @LastEditTime: 2023-01-13 23:20:12
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/api/paymentplanManagement.js
 * @文件说明: 
 */
import request from "./index";

export const getPlanListApi = (params) => {
  return request({
    url: '/getplanlist',
    method:'GET',
    params:{
      year:params.year
    }
  })
}