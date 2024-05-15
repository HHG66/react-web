import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from '@/store'
// import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
// import zhCN from 'antd/es/locale/en_US';
import { ConfigProvider } from 'antd';
//解决日历组件无法显示中文的问题
import moment from 'moment';
import 'moment/locale/zh-cn';
// redux
import { Provider } from 'react-redux'
import { store } from './store/index'

moment.locale('zh-cn');

window.moment=moment

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