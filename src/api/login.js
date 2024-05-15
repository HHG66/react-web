/*
 * @Author: HHG
 * @Date: 2022-09-02 16:06:24
 * @LastEditTime: 2022-09-16 14:54:17
 * @LastEditors: 韩宏广
 * @FilePath: \my-financial\web\src\api\login.js
 * @文件说明: 
 */
import request from "./index";


export function reqLogin(username,password){
   return  request({
      url:'/login',
      method:'POST',
      data:{
        username:username,
        password:password
      }
    }) 
}