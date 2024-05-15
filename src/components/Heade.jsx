/*
 * @Author: HHG
 * @Date: 2022-09-09 11:31:33
 * @LastEditTime: 2023-02-14 09:33:35
 * @LastEditors: 韩宏广
 * @FilePath: \financial\web\src\components\Heade.js
 * @文件说明: 
 */
import { Breadcrumb, Avatar, Layout, Drawer,Popover,Button} from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import SvgIcon from '@/components/Icon'
import Routers from '@/routers'
import { useSelector,useDispatch  } from 'react-redux'
import {  deleteInfo } from '@/store/reducers/User.js'
// import { actions } from '@/store/export.js'
import { useNavigate } from 'react-router-dom'
import {setLocalStorage} from '@/utils/index'
const { Header } = Layout
const Heade = () => {
  const [breadcrumb, setBreadcrumb] = useState([])
  //key 路由，value 路由名称，利用这个对象匹配面包屑， 这种做法非常不正规。
  const [breadcrumbNameMap, setbreadcrumbNameMap] = useState({})
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dataRef = useRef()
  const store = useSelector(store => store.Store.UserReducer.userInfo)
  // const store1 = useSelector(store => store )
  // console.log(store1);
  const dispatch = useDispatch()
  
  // const { deleteInfo } = bindActionCreators(actions, dispatch)
  const navigate = useNavigate()

  useEffect(() => {
    function callbreadcrumbNameMap() {
      Routers.map((rou) => {
        if (rou.subs) {
          rou.subs.map((rouch) => {
            setbreadcrumbNameMap({ ...breadcrumbNameMap }, breadcrumbNameMap[rouch.key] = rouch.title)
            return breadcrumbNameMap
          })
          setbreadcrumbNameMap({ ...breadcrumbNameMap }, breadcrumbNameMap[rou.key] = rou.title)
        } else {
          setbreadcrumbNameMap({ ...breadcrumbNameMap }, breadcrumbNameMap[rou.key] = rou.title)
        }
        return breadcrumbNameMap
      })
    }
    callbreadcrumbNameMap()
    dataRef.current = breadcrumbNameMap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    //这里写法不太好，暂时先这样做，以后熟悉了react再优化,而且如果涉及三级路由一定报错    
    if (pathname.split('/').length === 2) {
      setBreadcrumb([dataRef.current[pathname]])
    } else {
      setBreadcrumb([dataRef.current["/" + pathname.split('/')[1]], dataRef.current[pathname]])
    }
  }, [pathname])

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  }
  const personalInfo = () => {
    // deleteInfo()
    dispatch(deleteInfo())
    setLocalStorage('Token','')
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
        <Breadcrumb>
          {
            breadcrumb.map((Item) => {
              return <Breadcrumb.Item key={Item}>{Item}</Breadcrumb.Item>
            })
          }
        </Breadcrumb>
        <div className='userInfo'>
          <span className='notice' onClick={showDrawer}>
            <div style={{ display: 'inline-block' }}>
              <SvgIcon iconClass="notice" style={{ width: "25px", height: "20px", color: "black" }} />
            </div>
          </span>
          <span>用户名：</span>
          <Popover placement="bottom" title={" "} content={ <Button type="link" onClick={personalInfo}>退出</Button>} trigger="click">
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