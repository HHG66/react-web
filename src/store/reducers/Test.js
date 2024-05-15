/*
 * @Author: HHG
 * @Date: 2022-10-22 12:02:06
 * @LastEditTime: 2023-02-14 09:39:47
 * @LastEditors: 韩宏广
 * @FilePath: \financial\web\src\store\reducers\Test.js
 * @文件说明: 
 */
import { createSlice } from "@reduxjs/toolkit";

const TestReducer = createSlice({
  name: 'test',
  initialState: {
    ss: 1
  },
  reducers: {
    addTest: (state, action) => {
      console.log(state);
      console.log(action);
    }
  }
})

export const { addTest } = TestReducer.actions
export default TestReducer.reducer