/*
 * @Author: HHG
 * @Date: 2022-09-01 10:58:19
 * @LastEditTime: 2025-03-08 12:43:34
 * @LastEditors: 韩宏广
 * @FilePath: /personal-finance-web/src/components/Aside.jsx
 * @文件说明:
 */
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Routers from '@/routers';
// import { setLocalStorage, getLocalStorage } from '@/utils'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;
// const rootSubmenuKeys = [
//   '/consumptiontype',
//   '/incometype',
//   '/balancepayments',
//   '/investmentmanagement',
//   '/checkInformation',
// ];
import SvgIcon from './SvgIcon';
import { getMenu, setCurrentMenu } from '@/store/reducers/Menu';

const Aside = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [routerItem, setRouterItem] = useState([]);
  // const [openKeys, setOpenKeys] = useState([]);
  // const [selectedKeys, setselectedKeys] = useState(['']);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const selectMenu = useSelector(getMenu); // 获取 token
  const dispatch = useDispatch();
  const [openMenu,setOpenMenu]=useState([])
  const store = useSelector((store) => {
    // if (Object.keys(store.userInfo).length === 0) {
    //   // console.log(getLocalStorage("asideInfo"));
    //   return getLocalStorage("asideInfo")
    // } else {
    //   setLocalStorage("asideInfo", store.userInfo)
    //   return store.userInfo
    // }
    return store.UserReducer.userInfo;
  });

  useEffect(() => {
    // console.log(recursionRouter([...Routers[0]['subs'],Routers[1]]));
    setRouterItem(recursionRouter([...Routers[0]['subs'], Routers[1]]));
    // console.log(recursionRouter([...Routers[0]['subs'], Routers[1]]));
    // console.log(routerItem, 'routerItem');
  }, []);
  //递归处理路由表
  function recursionRouter(routers) {
    var menuList = [];
    routers.forEach((element) => {
      let newMenuList = {};
      newMenuList['key'] = element.key;
      newMenuList['icon'] = element.icon ? (
        <SvgIcon name={element.icon.name} style={element.icon.style}></SvgIcon>
      ) : (
        ''
      );
      newMenuList['label'] = element.title;
      newMenuList['children'] = element.subs;
      // if (menuList2) {
      //   if (!menuList2[menuList2.length - 1].children) {
      //     menuList2[menuList2.length - 1].children = []
      //   }
      //   menuList2[menuList2.length - 1]["children"].push(
      //     { key: element.key, icon: element.icon ? <SvgIcon name={element.icon.name} style={element.icon.style}></SvgIcon> : '', label: element.title }
      //   )
      // } else {
      //   menuList.push(
      //     // { key: '1', icon: element.icon?<element.icon.name />:'', label: element.title }
      //     { key: element.key, icon: element.icon ? <SvgIcon name={element.icon.name} style={element.icon.style}></SvgIcon> : '', label: element.title }
      //   )
      // }
      if (newMenuList.children && Array.isArray(newMenuList.children)) {
        newMenuList.children = recursionRouter(element.subs);
      } else {
        newMenuList.children = null;
      }
      menuList.push(newMenuList);
    });
    return menuList;
  }


  // setOpenMenu(['/' + selectMenu.split('/')[1]])
  useEffect(() => {
    // setselectedKeys([pathname]);
    // console.log(selectedKeys, 'selectedKeys');
    // console.log(selectMenu,'selectMenu');
    // console.log([selectMenu],'[selectMenu]');

    // ['/' + selectMenu.split('/')[1]]
    // console.log('selectMenu',selectMenu);
       //根据当前路由设置选中导航菜单
  if(selectMenu==pathname){
    // debugger
    setOpenMenu(['/' + selectMenu.split('/')[1]])
  }else{
    setOpenMenu([])
    // debugger
  }
    // console.log(pathname);

  }, [pathname]);
  // useEffect(() => {
    // selectMenu.replec()
    // console.log(selectMenu.split('/')[1], '---');
  // }, [selectMenu]);
  //这个地方是只展开一个父级菜单，onOpenChange只在打开有子级导航的时候,以及收回侧边栏会触发。
  // const onOpenChange = (keys) => {
  //   console.log('执行了子菜单收回');
  //   // console.log(keys);
  //   // console.log(openKeys);
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   console.log(latestOpenKey);
  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     if (collapsed === false) {
  //       // console.log(keys);
  //       setOpenKeys(keys);
  //       // setLocalStorage("OpenKeys", keys)
  //     }
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //     // setLocalStorage("OpenKeys", latestOpenKey ? [latestOpenKey] : [])
  //   }
  // };
  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    // console.log({ item, key, keyPath, selectedKeys, domEvent });
    dispatch(setCurrentMenu(key));
    navigate(key);
  };
  const onOpenChange=(newOpenKeys)=>{
    // setOpenKeys(newOpenKeys);
    setOpenMenu(newOpenKeys)
  }
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
        }}
        style={{ display: 'block' }}
      >
        {/* <div className="logo" > </div> */}
        <Menu
          theme="dark"
          // defaultSelectedKeys={'/home'}
          mode="inline"
          items={routerItem}
          onSelect={onSelect}
          onOpenChange={onOpenChange}
          // 为了解决二级菜单展开无法展开的问题
          // {...defaultProps}
          // defaultOpenKeys={['/' + selectMenu.split('/')[1]]}
          openKeys={openMenu}
          
          selectedKeys={selectMenu}
        />
      </Sider>
    </>
  );
};

export default Aside;
