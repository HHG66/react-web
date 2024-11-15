import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'userinfo',
  //初始状态
  initialState: {
    userInfo: {},
    Token: '',
  },
  reducers: {
    addInfo: (state, action) => {
      // console.log(action);
      // console.log(action.payload.userInfo);
      const { userInfo, token } = action.payload;
      state.userInfo = userInfo; // 设置 userInfo
      state.Token = token; // 设置 token
      window.localStorage.setItem('Token', token);
    },
    deleteInfo: (state, action) => {
      state.userInfo = '';
      state.Token = '';
    },
  },
});

export const { addInfo, deleteInfo } = UserSlice.actions;
export default UserSlice.reducer;

export const selectToken = (state) => state.UserReducer.Token;
export const selectUserInfo = (state) => state.userinfo.userInfo;
