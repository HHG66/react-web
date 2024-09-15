/*
 * @Author: HHG
 * @Date: 2022-09-02 16:06:24
 * @LastEditTime: 2024-09-14 14:32:36
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\login.js
 * @文件说明: 
 */
import useFetch from "./index";


// export async function reqLogin(username, password) {
//   let data = await request({
//     url: '/login',
//     method: 'POST',
//     data: {
//       username: username,
//       password: password
//     }
//   })
//   return {
//     data
//   }

// }

export function useLogin(username, password) {
  const [loginData, loginError, loginLoading] = useFetch('/login', {
    method: 'POST',
    data: { username, password },
  });

  return { loginData, loginError, loginLoading };
}