/*
 * @Author: HHG
 * @Date: 2023-01-13 23:18:35
 * @LastEditTime: 2025-01-07 17:14:26
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\paymentplanManagement.js
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
      planDate: data.annual,
      period: data.period,
    },
  });
}


export async function updataPlan(data) {
  return request({
    url: '/financialPlan/updataPlan',
    method: 'POST',
    data: data,
  });
}

export async function deletePlanApi(data) {
  return request({
    url: '/financialPlan/deletePlan',
    method: 'POST',
    data: data,
  });
}
