/*
 * @Author: HHG
 * @Date: 2022-09-01 10:58:19
 * @LastEditTime: 2022-12-10 21:22:02
 * @LastEditors: 韩宏广
 * @FilePath: /个人财务/web/src/components/Aside.js
 * @文件说明: 
 */
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Routers from '@/routers';
// import { setLocalStorage, getLocalStorage } from '@/utils'
import { useSelector } from 'react-redux';
const { Sider } = Layout;
const rootSubmenuKeys = ['/consumptiontype', '/incometype', '/balancepayments', '/investmentmanagement', '/checkInformation'];

const Aside = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [routerItem, setRouterItem] = useState([])
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setselectedKeys] = useState(['']);
  const { pathname } = useLocation()
  const store = useSelector((store) => {
    // if (Object.keys(store.userInfo).length === 0) {
    //   // console.log(getLocalStorage("asideInfo"));
    //   return getLocalStorage("asideInfo")
    // } else {
    //   setLocalStorage("asideInfo", store.userInfo)
    //   return store.userInfo
    // }
    return store.Store.UserReducer.userInfo

  })
  // console.log(store);
  const [asyncRouter, setasyncRouter] = useState([])
  //注意不要使用openKeys这个api，因为为了解决导航菜单收回的时候无法同时收回二级菜单。
  // const defaultProps = collapsed ? {} : { openKeys: openKeys };
  //将路由表转化成要使用的格式，组Aside
  useEffect(() => {
    // console.log(Routers);
    const Router = []
    asyncRouter.map((item) => {
      // Routers.map((item) => {
      if (item.subs) {
        const childrens = []
        item.subs.map((children) => {
          childrens.push({
            label: <Link to={children.key}>{children.title}</Link>,
            key: children.key,
            icon: children.icon,
          })
          return childrens
        })
        Router.push({
          label: item.title,
          key: item.key,
          icon: item.icon,
          children: childrens,
          className: "aside-icon"
        })
      } else {
        Router.push({
          label: <Link to={item.key}>{item.title}</Link>,
          key: item.key,
          icon: item.icon,
          className: "aside-icon"
        })
      }
      return Router
    })
    setRouterItem(Router)
    //默认导航到home
    // navigate('/home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncRouter])

  //根据当前路由设置选中导航菜单
  useEffect(() => {
    setselectedKeys([pathname])
  }, [pathname])

  //异步路由。登录接口返回的权限
  useEffect(() => {
    const asyncRole = (Routers) => {
      var asyncRou = []
      //作用将有下级节点菜单，组成线性结构
      var linearAsyncRou = []
      Routers.forEach(element => {
        if (element.subs) {
          if (store.role && store.role.indexOf(element.role) !== -1) {
            var routerInfo = {
              key: element.key,
              title: element.title,
              icon: element.icon,
              role: element.role,
            }
            var subs = []
            element.subs.forEach((children) => {
              if (store.role && store.role.indexOf(children.role) !== -1) {
                subs.push(children)
                linearAsyncRou.push(children)
              }
            })
            routerInfo.subs = subs
            asyncRou.push(routerInfo)
            // linearAsyncRou.push(routerInfo)
          } else {
            element.subs.forEach((children) => {
              if (store.role && store.role.indexOf(children.role) !== -1) {
                asyncRou.push(children)
                linearAsyncRou.push(children)
              }
            })
          }
        } else {
          if (store.role && store.role.indexOf(element.role) !== -1) {
            asyncRou.push(element)
            linearAsyncRou.push(element)
          }
        }
      });
      setasyncRouter(asyncRou)
      // setLocalStorage("asideRouter", asyncRou)
      // setLocalStorage("linearAsyncRou", linearAsyncRou)
      // console.log(asyncRouter);
      // console.log(asyncRou);
    }
    asyncRole(Routers)
  }, [store.role])

  useEffect(() => {
    // if (Object.keys(openKeys).length === 0) {
    //   if (getLocalStorage('OpenKeys')) {
    //     setOpenKeys(getLocalStorage('OpenKeys'))
    //   }
    // }
  }, [openKeys])

  useEffect(() => {
    // if (collapsed === true) {
    //   setOpenKeys([]);
    //   setLocalStorage("OpenKeys", [])
    // }
  }, [collapsed])

  //这个地方是只展开一个父级菜单，onOpenChange只在打开有子级导航的时候,以及收回侧边栏会触发。
  const onOpenChange = (keys) => {
    console.log('执行了子菜单收回');
    // console.log(keys);
    // console.log(openKeys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    console.log(latestOpenKey);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      if (collapsed === false) {
        // console.log(keys);
        setOpenKeys(keys);
        // setLocalStorage("OpenKeys", keys)
      }
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      // setLocalStorage("OpenKeys", latestOpenKey ? [latestOpenKey] : [])
    }
  };

  const onClick = (e) => {
    //这里是为了，点击没有子菜单的导航可以将已经展开的导航关闭
    // if (e.keyPath.length === 1) {
    //   setOpenKeys([])
    // }
  }
  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    // console.log({ item, key, keyPath, selectedKeys, domEvent });
    // console.log(selectedKeys);
    // console.log(openKeys);
    // setOpenKeys([])
    // setLocalStorage("OpenKeys", [keyPath[1]])
    // setselectedKeys([key])
    // debugger
    // if(collapsed==true){
    //   setselectedKeys([])
    // setLocalStorage("OpenKeys", [ ])
    // }
  }
  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => { setCollapsed(value) }}>
        {/* <div className="logo" > </div> */}
        <Menu theme="dark" defaultSelectedKeys={'/home'} mode="inline" items={routerItem} onClick={onClick} onOpenChange={onOpenChange}
          // openKeys={openKeys}
          selectedKeys={selectedKeys}
          onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => { onSelect({ item, key, keyPath, selectedKeys, domEvent }) }}
        // 为了解决二级菜单展开无法展开的问题
        // {...defaultProps}
        />
      </Sider>
    </>
  )
}

export default Aside 