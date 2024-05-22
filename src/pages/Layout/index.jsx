import { Outlet } from 'react-router-dom'
import { lazy,Suspense } from 'react'
import Loaddig from '@/components/Loaddig'

// import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined,UserOutlined,} from '@ant-design/icons';
import { Layout, theme } from 'antd';
// import Aside from '@/components/Aside'
// import Heade from '@/components/Heade';
const Aside = lazy(() => import("@/components/Aside"));
const Heade = lazy(() => import("@/components/Heade"));
import './index.less'
const { Content, Footer } = Layout;
const lazyCompent=(element)=>{
  return <Suspense fallback={<Loaddig></Loaddig>}>
    {element}
  </Suspense>
}

const Layouts = () => {
  return (
    <Layout
      style={{
        minHeight: '100%',
        height: '100%'
      }}
    >
      {lazyCompent(<Aside />)}
      <Layout className="site-layout">
        {lazyCompent(<Heade  />)}
        <Content>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 250,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            padding: '10px 50px'
          }}
        >
          个人财务理财系统，方便处理各种账单，辅助理财。
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Layouts;
