/*
 * @Author: HHG
 * @Date: 2022-12-18 11:30:14
 * @LastEditTime: 2022-12-18 20:23:44
 * @LastEditors: 韩宏广
 * @FilePath: /个人财务/web/src/api/other.js
 * @文件说明:第三方api接口，区分本身api,考虑到请求频率和需要进行数据处理，可能需要将接口转成后端调取。
 */
import axios from "axios";

//新浪财经
export const getSineFundInfoApi = (params) => {
  return axios({
    // baseURL: "",
    url: '/api',
    method: 'GET',
    params: {
      list: params.fundname
    }
  })
  // .then(function (response) {
  //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  // });


  // return request({
  //   baseURL: " ",
  //   url: "/api",
  //   method: 'GET',
  //   // headers:{
  //   //   'Referer':"http://finance.sina.com.cn"
  //   // },
  //   params: {
  //     list: params.fundname
  //   }
  // })
}