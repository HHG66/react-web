/*
 * @Author: HHG
 * @Date: 2022-09-10 16:46:32
 * @LastEditTime: 2024-05-23 17:33:17
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\Router.jsx
 * @文件说明: 
 */
import Routers from '@/routers'
import {lazy } from 'react'
const Home = lazy(() => import("@/pages/Home"));
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const AppRouter = () => {

  //递归处理路由表，转成路由
  const processRouting = (routers) => {
    if (routers.length == 0) return
    let routerList = []
    routers.forEach(element => {
      let newRoute = {}
      newRoute['path']=element.key
      newRoute['element']=element.component
      newRoute['children']=element.subs
      if (newRoute.children&&Array.isArray(newRoute.children)) {
        newRoute.children = processRouting(newRoute.children)
      }else{
        newRoute.children =[]
      }
      routerList.push(newRoute)
    });
    return routerList
  }



  let router = createBrowserRouter(processRouting(Routers))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRouter;