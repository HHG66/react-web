

import AssetStatistics from '@/pages/AssetStatistics'
import SvgIcon from '@/components/Icon'
import { lazy, Suspense } from 'react'  
import Loaddig from '@/components/Loaddig'
import { Outlet } from 'react-router-dom';
//为什么这种方式报错
// 在Suspense下不能存在同步加载组件
import Layouts from '@/pages/Layout'
const Home = lazy(() => import("@/pages/Home"));
const NoFound = lazy(() => import("@/pages/NoFound"));
const ConsumptionManagement = lazy(() => import("@/pages/ConsumptionManagement"));
const ConsumpAssociated = lazy(() => import("@/pages/ConsumpAssociated"));
const IncometypeManagement = lazy(() => import("@/pages/IncometypeManagement"));
const IncometypeAssociated = lazy(() => import("@/pages/IncometypeAssociated"));
const BalancepaymentsMgement = lazy(() => import("@/pages/BalancepaymentsMgement"));
const ExportBill = lazy(() => import("@/pages/ExportBill"));
const PaymentplanManagement = lazy(() => import("@/pages/PaymentplanManagement"));
const BalancepaymentsImportBill = lazy(() => import("@/pages/BalancepaymentsImportBill"));
const Funds = lazy(() => import("@/pages/Funds"));
const Stock = lazy(() => import("@/pages/Stock"));
const Deposits = lazy(() => import("@/pages/Deposits"));
const Summary = lazy(() => import("@/pages/Summary"));
const Liabilities = lazy(() => import("@/pages/Liabilities"));
const DepositPlan = lazy(() => import("@/pages/DepositPlan"));
const Login = lazy(() => import("@/pages/Login"));
const FormTestPage = lazy(() => import('@/pages/FormTestPage'))
const lazyCompent = (element) => {
  return <Suspense fallback={<Loaddig></Loaddig>}>
    {element}
    {/* <Outlet></Outlet> */}
  </Suspense>

}
const Routers = [
  {
    key: "/",
    component: <Layouts></Layouts>,
    subs: [{
      key: '/home',
      title: '首页',
      // icon: <div><SvgIcon iconClass="" style={{ width: "20px", height: "20px", marginRight: '10px', }} /></div>,
      icon: {
        name: 'home',
        style: {
          width: "20px",
          height: "20px",
          // display: "block"
        }
      },
      component: lazyCompent(<Home></Home>),
    },
    {
      key: '/consumptiontype',
      title: "消费类型",
      icon: {
        name: 'consumptiontype',
        // style: `width: "20px", height: "20px", color: "white", marginRight: '10px'`
        style: {
          width: '20px',
          height: "20px",
          color: "white"
        }
      },
      subs: [
        {
          key: '/consumptiontype/management', title: '消费类型管理', component: lazyCompent(<ConsumptionManagement></ConsumptionManagement>),
        },
        { key: '/consumptiontype/management/associated', title: '关联账单消费名称', component: lazyCompent(<ConsumpAssociated></ConsumpAssociated>), },
      ],
    },
    {
      key: '/incometype',
      title: '收入类型',
      icon: {
        name: 'incometype',
        style: {
          width: "20px", height: "20px"
        }
      },
      role: "3",
      subs: [
        { key: '/incometype/management', title: '收入类型管理', component: lazyCompent(<IncometypeManagement></IncometypeManagement>) },
        { key: '/incometype/associated', title: '关联收入账单名称', component: lazyCompent(<IncometypeAssociated></IncometypeAssociated>) },
      ],
    },
    {
      key: '/balancepayments',
      title: '收支情况',
      icon: {
        name: 'balancepayments',
        style: {
          width: "20px", height: "20px"
        }
      },
      role: "4",
      subs: [
        { key: '/balancepayments/management', title: '收支情况记录', component: lazyCompent(<BalancepaymentsMgement></BalancepaymentsMgement>), role: "4-1" },
        { key: '/balancepayments/importBill', title: '导入账单', component: lazyCompent(<BalancepaymentsImportBill></BalancepaymentsImportBill>), role: "4-2" },
      ],
    },
    {
      key: '/investmentmanagement',
      title: '投资信息管理',
      icon: {
        name: 'investmentmanagement',
        style: {
          width: "20px", height: "20px",
        }
      },
      role: "5",
      subs: [
        { key: '/investmentmanagement/funds', title: '基金', component: lazyCompent(<Funds></Funds>), role: "5-1" },
        { key: '/investmentmanagement/stock', title: '股票', component: lazyCompent(<Stock></Stock>), role: "5-2" },
        { key: '/investmentmanagement/deposits', title: '定期存款', component: lazyCompent(<Deposits></Deposits>), role: "5-3" },
      ],
    },
    {
      key: '/liabilities',
      title: '负债贷款偿还',
      icon: {
        name: 'investmentmanagement',
        style: {
          width: "20px", height: "20px",
        }
      },
      component: lazyCompent(<Liabilities></Liabilities>),
      role: "9",
    },
    {
      key: '/checkInformation',
      title: '账单信息',
      icon: {
        name: 'checkInformation',
        style: {
          width: "20px", height: "20px",
        }
      },
      role: "6",
      subs: [
        { key: '/checkInformation/summary', title: '账单汇总', component: lazyCompent(<Summary></Summary>), role: "6-1" },
        { key: '/checkInformation/exportbill', title: '导出账单', component: lazyCompent(<ExportBill></ExportBill>), role: "6-2" },
      ],
    },
    {
      key: '/paymentplanmanagement',
      title: '收支计划管理',
      icon: {
        name: 'paymentplanmanagement',
        style: {
          width: "20px", height: "20px",
        }
      },
      subs: [
        { key: '/paymentplanmanagement/majorplan', title: '主要计划', component: lazyCompent(<PaymentplanManagement></PaymentplanManagement>), role: "6-1" },
        { key: '/paymentplanmanagement/depositplan', title: '存款计划', component: lazyCompent(<DepositPlan></DepositPlan>), role: "6-2" },
      ],
      role: "7"
    },
    {
      key: '/assetstatistics',
      title: '资产统计',
      icon: {
        name: 'assetstatistics',
        style: {
          width: "20px", height: "20px", padding: '1px',
        }
      },
      component: lazyCompent(<AssetStatistics></AssetStatistics>),
      role: "8"
    },
      //多层嵌套示例
      // {
      //   key: '/consumptiontype',
      //   title: "消费类型",
      //   icon: {
      //     name: 'consumptiontype',
      //     style: {
      //       width: '20px',
      //       height: "20px",
      //       color: "white"
      //     }
      //   },
      //   subs: [
      //     {
      //       //如果是多级嵌套，想要展示上一级，需要在上级添加路由出口组件<Outlet></Outlet>
      //       key: '/consumptiontype/management', title: '消费类型管理', component: lazyCompent(<ConsumptionManagement></ConsumptionManagement>), 
      //       subs: [
      //         //对应得组件只会在父级最近存在Outlet入口得组件中展示本级
      //         // key: 'management', title: '消费类型管理', 
      //         // subs: [
      //         {
      //           key: '/consumptiontype/management/home1',
      //           title: '首页11',
      //           component: <div>123123</div>,
      //         }
      //       ]
      //     },
      //     { key: '/consumptiontype/management/associated', title: '关联账单消费名称', component: lazyCompent(<ConsumpAssociated></ConsumpAssociated>), },
      //   ],
      // },
    ]
  }, {
    key: "*",
    component: lazyCompent(<NoFound></NoFound>),
  },
  {
    key: "/login",
    title: '登录',
    component: lazyCompent(<Login></Login>),
  },
  //临时用于封装表单用
  {
    key: "/formtest",
    title: '表单测试',
    component: lazyCompent(<FormTestPage></FormTestPage>),
  },
]
export default Routers