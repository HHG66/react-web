/*
 * @Author: HHG
 * @Date: 2022-09-16 16:37:52
 * @LastEditTime: 2024-03-31 19:12:48
 * @LastEditors: 韩宏广
 * @FilePath: /web/src/components/Authorized.js
 * @文件说明: 
 */
import { Navigate } from 'react-router-dom'
import { getLocalStorage } from '@/utils'
// import { useLocation } from 'react-router-dom'
const Authorized = ({ children }) => {
  // const { pathname } = useLocation()
  if (getLocalStorage("Token") && getLocalStorage("Token") !== "") {
    // console.log(pathname);
    // console.log(getLocalStorage("linearAsyncRou"));
    // var isrouter = {}
    // getLocalStorage("linearAsyncRou").forEach(element => {
    //   if (element.key == pathname) {
    //     isrouter = element
    //   }
    // });
    // console.log(Object.keys(isrouter).length === 0);
    // console.log(isrouter);
    // if (Object.keys(isrouter).length === 0) {
    //   return  <Navigate to="/login" replace />
    // } else {
    // console.log(children);
    return <>{children}</>
    // }
  } else {
    return <Navigate to="/login" replace />
  }
}

export default Authorized 