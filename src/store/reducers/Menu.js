/*
 * @Author: HHG
 * @Date: 2024-12-13 10:28:00
 * @LastEditTime: 2024-12-13 10:50:40
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\store\reducers\Menu.js
 * @文件说明: 
 */
import { createSlice } from '@reduxjs/toolkit';

const MenuSlice = createSlice({
  name: 'menuInfo',
  //初始状态
  initialState: {
    selectMenu: '',
    menuList: [],
  },
  reducers: {
    setCurrentMenu: (state, action) => {
      // let { menuInfo } = 
      state.selectMenu = action.payload
    },
    // deleteInfo: (state, action) => {
    //   state.userInfo = '';
    //   state.Token = '';
    // },
  },
});

export const { setCurrentMenu } = MenuSlice.actions;
export default MenuSlice.reducer;

export const getMenu = (state) => {
  return state.MenuReducer.selectMenu
};