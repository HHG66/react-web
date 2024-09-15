/*
 * @Author: HHG
 * @Date: 2022-09-02 13:13:54
 * @LastEditTime: 2024-09-14 12:02:37
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\index.js
 * @文件说明: 
 */

import axios from "axios";
import { notification, message } from 'antd';
import { getLocalStorage } from '@/utils/index'
import { throttle } from '@/utils/index.js'
// let request = axios.create({
//   // baseURL: "http://127.0.0.1:4523/m1/1605761-0-default/",
//   baseURL: "/proxy",
//   timeout: 300000
// })

// //请求先拦截器
// request.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   config.headers['Authorization'] = `Bearer ${getLocalStorage('Token')}`
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// request.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   //这段的拦截没有意义，实际应该不要，暂时保留想一下
//   //正常
//   if (response.data.code === "0") {
//     return response.data
//   } else if (response.data.code === "1") {
//     //当结果不正确的时候 ，或者其他情况下，返回结果需要提示就将desc返回成error，这个提示是固定的
//     message.error(response.data.error);
//     return response.data
//   }
// }, function (error) {
//   console.log(error);
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
//   if (error && error.response) {
//     switch (error.response.status) {
//       case 401:
//         window.location.href = '/login'
//         break;
//       case 502:
//         notification.open({
//           message: '网络错误',
//           type: "error",
//           description:
//             '请检查网络后重试，错误码（502）',
//         });
//         break;
//       case 0:
//         if (error.code === 'ERR_NETWORK') {
//           notification.open({
//             message: '网络错误！',
//             type: "error",
//             description: "请检查网络连接",
//           });
//         }
//         break;
//       default:
//         break;
//     }
//   } else if (error.request) {
//     let { processingMessage, processingDesc } = handleAnException(error.code)
//     showMessage(processingMessage, processingDesc )
//   } else {
//     // 发送请求时出了点问题
//     console.log('Error', error.message);
//   }
//   return Promise.reject(error);
// });
// //错误异常信息
// function handleAnException(errorCode) {
//   switch (errorCode) {
//     case "ECONNABORTED":
//       return {
//         processingMessage: "拒绝连接",
//         processingDesc: "网络错误，请检查网络"
//       }
//     case "ERR_NETWORK":
//       return {
//         processingMessage: "网络错误",
//         processingDesc: "请求超时，请检查网络"
//       }
//     default:
//       return {
//         processingMessage: "未知错误",
//         processingDesc: "请求超时，请检查网络"
//       }
//   }
// }

// function openMessage(processingMessage, processingDesc){
//   notification.open({
//     message: processingMessage,
//     type: "error",
//     description: processingDesc,
//   });
// }
// let showMessage=throttle(openMessage,500)
// export default request



import { useState, useEffect } from 'react';

// import { useState, useEffect } from 'react';  
// import axios from 'axios';  
  
export default function useFetch(url, options = {}) {  
  const [data, setData] = useState(null);  
  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(false);  
  
  useEffect(() => {  
    setLoading(true);  
    axios(url, options)  
      .then(response => {  
        setData(response.data);  
      })  
      .catch(error => {  
        setError(error);  
      })  
      .finally(() => {  
        setLoading(false);  
      });  
  }, [url, options]); // 直接使用 options 对象作为依赖项  
  
  return { data, error, loading };  
}