/*
 * @Author: HHG
 * @Date: 2023-01-13 23:18:35
 * @LastEditTime: 2023-01-13 23:20:12
 * @LastEditors: 韩宏广
 * @FilePath: /Personal-finance/web/src/api/paymentplanManagement.js
 * @文件说明: 
 */
import request from './index.js';

export async function createdPlanApi(data) {
  return request({
    url: '/financialPlan/createdPlan',
    method: 'POST',
    data: data,
  });
}

export async function getPlanApi(data) {
  return request({
    url: '/financialPlan/getPlan',
    method: 'GET',
    params: {
      planDate: data.annual
    },
  });
}

