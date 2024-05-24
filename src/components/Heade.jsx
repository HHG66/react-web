/*
 * @Author: HHG
 * @Date: 2022-09-09 11:31:33
 * @LastEditTime: 2024-05-23 14:39:09
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\Heade.jsx
 * @文件说明: 
 */
import { Breadcrumb, Avatar, Layout, Drawer, Popover, Button } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import SvgIcon from '@/components/Icon'
import Routers from '@/routers'
import { useSelector, useDispatch } from 'react-redux'
import { deleteInfo } from '@/store/reducers/User.js'
// import { actions } from '@/store/export.js'
import { useNavigate } from 'react-router-dom'
import { setLocalStorage } from '@/utils/index'
const { Header } = Layout
const Heade = () => {
  // const [breadcrumb, setBreadcrumb] = useState([])
  //key 路由，value 路由名称，利用这个对象匹配面包屑， 这种做法非常不正规。
  // const [breadcrumbNameMap, setbreadcrumbNameMap] = useState({})
  const [currentRoutingInfo, setCurrentRoutingInfo] = useState({})
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dataRef = useRef()
  const store = useSelector(store => store.Store.UserReducer.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentRoutingInfo(getRouterInfo(Routers[0].subs, pathname))
  }, [pathname])

  //根据当前路由获取路由表详细信息
  const getRouterInfo = (routers, pathname, currentRoutingInfo = [], currentParentId = null) => {
    if (routers.length == 0) return
    for (let index = 0; index < routers.length; index++) {
      const element = routers[index];
      if (pathname == element.key) {
        currentRoutingInfo.unshift({ title: element.title })
        return currentRoutingInfo
      }
      if (element.subs) {
        let result = getRouterInfo(element.subs, pathname, currentRoutingInfo, element.key)
        if (result) {
          currentRoutingInfo.unshift({ title: element.title })
          return result
        }
      }
    }

    return null
  }
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  }
  const personalInfo = () => {
    dispatch(deleteInfo())
    setLocalStorage('Token', '')
    navigate('/login')
  }
  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
        <Breadcrumb items={currentRoutingInfo}>

        </Breadcrumb>
        <div className='userInfo'>
          <span className='notice' onClick={showDrawer}>
            <div style={{ display: 'inline-block' }}>
              <SvgIcon iconClass="notice" style={{ width: "25px", height: "20px", color: "black" }} />
            </div>
          </span>
          <span>用户名：</span>
          <Popover placement="bottom" title={" "} content={<Button type="link" onClick={personalInfo}>退出</Button>} trigger="click">
            <span>{store.name}</span>
          </Popover>
          <Avatar className='head-portrait' src=""
          >123</Avatar>
        </div>
      </Header>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>

  )
}

export default Heade