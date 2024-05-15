/*
 * @Author: HHG
 * @Date: 2023-01-12 15:11:50
 * @LastEditTime: 2023-01-12 16:49:32
 * @LastEditors: 韩宏广
 * @FilePath: \financial\web\src\api\depositPlan.js
 * @文件说明: 
 */
import request from "./index";

export const getDepositPlan=(params)=>{
  return   request({
    url:'/getdepositplan',
    method:'GET',
    params:{
      
    }
  })
}

export const editSingleDepositPlanApi=(data)=>{
  return request({
    url:"/editsingledepositplan",
    method:'POST',
    data:{
      iscomplete:data.iscomplete
    }
  })
}