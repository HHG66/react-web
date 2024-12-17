import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// redux
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from '@/store'
//antd中文日历
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
//解决日历组件无法显示中文的问题
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
// redux
import { Provider } from 'react-redux'
import { store } from './store/index'
import 'virtual:svg-icons-register'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.locale('zh-cn');
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)


window.moment=dayjs
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //下面的这个注掉的原因是react会在StrictMode下执行两次render来监测组件的副作用
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </PersistGate>
    {/* </React.StrictMode>*/}
  </Provider>
);