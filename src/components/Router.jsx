/*
 * @Author: HHG
 * @Date: 2022-09-10 16:46:32
 * @LastEditTime: 2024-05-22 20:31:17
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\Router.jsx
 * @文件说明: 
 */
import { Routes, Route, Outlet, BrowserRouter, useRoutes } from 'react-router-dom'
import Authorized from '@/components/Authorized'
import Layouts from '@/pages/Layout'
import Loaddig from '@/components/Loaddig'
import Login from "@/pages/Login"
import Routers from '@/routers'
import { useEffect, useState, Suspense, Component, createElement, lazy } from 'react'
import { Navigate } from "react-router-dom";
// import Home from '@/pages/Home/index.jsx'
const Home = lazy(() => import("@/pages/Home"));
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const AppRouter = () => {
  // let [router, setRouter] = useState([])

  // let [routerList, setRouterList] = useState('Home')
  //  let  routerList=[]

  // const processRouting = (routers, oldRouterList) => {
  //   if (routers.length == 0) return
  //   let routerList = []
  //   routers.forEach(element => {
  //     console.log(element);
  //     if (oldRouterList) {
  //       if (!oldRouterList[oldRouterList.length - 1]["children"]) {
  //         oldRouterList[oldRouterList.length - 1]["children"] = []
  //       }
  //       oldRouterList[oldRouterList.length - 1]["children"].push({
  //         path: element.key,
  //         element: element.component,
  //       })
  //     } else {
  //       if (element.key) {
  //         routerList.push({
  //           path: element.key,
  //           element: element.component,
  //         })
  //       } else {
  //         routerList.push({
  //           element: element.component,
  //         })
  //       }

  //     }
  //     if (element.subs) {
  //       processRouting(element.subs, oldRouterList ? oldRouterList : routerList)
  //     }
  //   });
  //   return routerList
  // }



  const processRouting = (routers, oldRouterList) => {
    if (routers.length == 0) return
    let routerList = []
    routers.forEach(element => {
      // console.log(element);
      if (oldRouterList) {
        if (!oldRouterList[oldRouterList.length - 1]["children"]) {
          oldRouterList[oldRouterList.length - 1]["children"] = []
        }
        debugger
        oldRouterList[oldRouterList.length - 1]["children"].push({
          path: element.key,
          element: element.component,
        })
      } else {
        if (element.key) {
          routerList.push({
            path: element.key,
            element: element.component,
          })
        } else {
          routerList.push({
            element: element.component,
          })
        }

      }
      if (element.subs) {
        processRouting(element.subs, oldRouterList ? oldRouterList : routerList)
      }
    });
    return routerList
  }

  // let router = createBrowserRouter([{
  //   path: "about",
  //   element: <div>About</div>,
  // }])

  // let router = createBrowserRouter([...processRouting(Routers),{
  //   path: "/",
  //   element: <Layouts></Layouts>,
  // }])

  console.log(processRouting(Routers));
  let router = createBrowserRouter(processRouting(Routers))

  useEffect(() => {
    // console.log(processRouting(Routers));
    // let rouList = processRouting(Routers)
    // router = rouList
    // setRouter()
    // router= createBrowserRouter(processRouting(Routers))

  }, [])


  return (
    <>
      {/* <Suspense fallback={<></>}>  

        <Routes>
          <Route path='/' element={
            <Authorized>
              <Layouts />
            </Authorized>
          }>
            {
              router
            }
          </Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='*' element={<NoFound />}></Route>
        </Routes>
        </Suspense> */}
      {/* <BrowserRouter style={{ height: "100%", width: "100%" }}> */}
      {/* <Suspense fallback={<Loaddig></Loaddig>}>   </Suspense> */}
      {/* <Route path='/' element={<Layouts />}></Route> */}


      <RouterProvider router={router} />
      {/* </BrowserRouter> */}


    </>
  )
}

export default AppRouter;