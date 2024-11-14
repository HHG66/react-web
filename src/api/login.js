/*
 * @Author: HHG
 * @Date: 2022-09-02 16:06:24
 * @LastEditTime: 2024-11-14 20:18:15
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\login.js
 * @文件说明:
 */
import request from './index.js';

export async function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      username: data.username,
      password: data.password,
    },
  });
}
