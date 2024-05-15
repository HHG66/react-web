/*
 * @Author: HHG
 * @Date: 2022-09-10 16:46:32
 * @LastEditTime: 2023-02-15 09:30:27
 * @LastEditors: 韩宏广
 * @FilePath: \financial\web\src\components\Router.js
 * @文件说明: 
 */
import { Routes, Route } from 'react-router-dom'
import Authorized from '@/components/Authorized'
import Layouts from '@/pages/Layout'
import Login from "@/pages/Login"
import Routers from '@/routers'
import NoFound from "@/pages/NoFound"
import { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";
const AppRouter = () => {
  let [router, setRouter] = useState([])
  useEffect(() => {
    //等待重写
    let router = Routers.map((rou) => {
      let _rou = []
      if (rou.subs) {
        rou.subs.map((children) => {
          return _rou.push(<Route key={children.key} path={children.key} element={<Authorized>{children.component}</Authorized>}></Route>)
        })
        //这一级是父级路由所以组件上面不需要权限判断，因为子级路由已经做了判断
        return <Route key={rou.key} path={rou.key} element={rou.component}>{[..._rou]}</Route>
      }

      return <Route key={rou.key} path={rou.key} element={<Authorized>{rou.component}</Authorized>}></Route>
    })
    router.push( <Route key='/' path='/' element={<Navigate to='/home' />}></Route>)
    setRouter(router)
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Authorized>
            <Layouts />
          </Authorized>
        }>
          {/* 遍历路由表，返回需要的路由列表 */}
          {
            router
          }
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NoFound />}></Route>

      </Routes>
    </>
  )
}

export default AppRouter;