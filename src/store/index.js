/*
 * @Author: HHG
 * @Date: 2022-10-19 22:50:31
 * @LastEditTime: 2024-11-15 11:10:53
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\store\index.js
 * @文件说明:
 */
import { combineReducers } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
// import redecers from "./reducers/index"
// import thunk from "redux-thunk"
//toolkit
import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import UserReducer from './reducers/User';
import TestReducer from './reducers/Test';

// const persistConfig = {
//   key: 'root',
//   storage,
// }
// const persistedReducer = persistReducer(persistConfig, redecers)
//没有redux调试工具
// export const store = createStore(
//   persistedReducer,
//   redecers,
//   {},
//   applyMiddleware(thunk),
// )
//有redux调试工具
// export const store = createStore(
//   persistedReducer,
//   compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   ),//插件调试，未安装会报错
// )
// export const persistor = persistStore(store)
//redux-toolkit
const persistConfig = {
  key: 'redux',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  UserReducer,
  TestReducer,
});
// 包裹 reducer 以使其支持持久化
const PersistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  // reducer: {
  //   Store: PersistedReducer,
  //   //如果不需要缓冲，就把reducer放到这里
  // },
  reducer: PersistedReducer, // 配置为持久化的 reducer
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // 禁用序列化检查，解决 redux-persist 报错问题
    });
  },
});

// export const store = createStore(
//   persistedReducer,
//   compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   ),//插件调试，未安装会报错
// )

export const persistor = persistStore(store);
