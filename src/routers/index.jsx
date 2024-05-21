 

import AssetStatistics from '@/pages/AssetStatistics'
import SvgIcon from '@/components/Icon'
import {lazy,Outlet} from 'react'
const Home = lazy(() => import("@/pages/Home"));
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

// import ConsumptionManagement  from '@/pages/ConsumptionManagement'
// import ConsumpAssociated from '@/pages/ConsumpAssociated'
// import IncometypeManagement from '@/pages/IncometypeManagement'
// import IncometypeAssociated from '@/pages/IncometypeAssociated'
// import BalancepaymentsMgement from '@/pages/BalancepaymentsMgement'
// import ExportBill from '@/pages/ExportBill'
// import PaymentplanManagement from '@/pages/PaymentplanManagement'
// import BalancepaymentsImportBill from '@/pages/BalancepaymentsImportBill'
// import Funds from '@/pages/Funds'
// import Stock from '@/pages/Stock'
// import Deposits from '@/pages/Deposits'
// import Summary from '@/pages/Summary'
// import Liabilities from '@/pages/Liabilities'
// import DepositPlan from '@/pages/DepositPlan'

// import {
//   HomeOutlined,
// } from '@ant-design/icons';
// const Routers = [
//   // 菜单相关路由
//   {
//     key: '/home',
//     title: '首页',
//     icon: <div><SvgIcon iconClass="home" style={{ width: "20px", height: "20px", marginRight: '10px', }} /></div>,
//     component: <Home />,
//     role: "1"
//   },
//   {
//     key: '/consumptiontype',
//     title: "消费类型",
//     icon: <div><SvgIcon iconClass="consumptiontype" style={{ width: "20px", height: "20px", color: "white", marginRight: '10px', }} /></div>,
//     role: "2",
//     subs: [
//       { key: '/consumptiontype/management', title: '消费类型管理', component: <ConsumptionManagement />, role: "2-1" },
//       { key: '/consumptiontype/associated', title: '关联账单消费名称', component: <ConsumpAssociated />, role: "2-2" },
//     ],
//   },
//   {
//     key: '/incometype',
//     title: '收入类型',
//     icon: <div><SvgIcon iconClass="incometype" style={{ width: "23px", height: "23px", marginRight: '10px' }} /></div>,
//     role: "3",
//     subs: [
//       { key: '/incometype/management', title: '收入类型管理', component: <IncometypeManagement />, role: "3-1" },
//       { key: '/incometype/associated', title: '关联收入账单名称', component: <IncometypeAssociated />, role: "3-2" },
//     ],
//   },
//   {
//     key: '/balancepayments',
//     title: '收支情况',
//     icon: <div> <SvgIcon iconClass="balancepayments" style={{ width: "20px", height: "20px", marginRight: '10px' }} /></div>,
//     role: "4",
//     subs: [
//       { key: '/balancepayments/management', title: '收支情况记录', component: <BalancepaymentsMgement />, role: "4-1" },
//       { key: '/balancepayments/importBill', title: '导入账单', component: <BalancepaymentsImportBill />, role: "4-2" },
//     ],
//   },
//   {
//     key: '/investmentmanagement',
//     title: '投资信息管理',
//     icon: <div><SvgIcon iconClass="investmentmanagement" style={{ width: "20px", height: "20px", marginRight: '10px' }} /> </div>,
//     // component: <InvestmentManagement />,
//     role: "5",
//     subs: [
//       { key: '/investmentmanagement/funds', title: '基金', component: <Funds />, role: "5-1" },
//       { key: '/investmentmanagement/stock', title: '股票', component: < Stock />, role: "5-2" },
//       { key: '/investmentmanagement/deposits', title: '定期存款', component: <Deposits />, role: "5-3" },
//     ],
//   },
//   {
//     key: '/liabilities',
//     title: '负债贷款偿还',
//     icon: <div><SvgIcon iconClass="investmentmanagement" style={{ width: "20px", height: "20px", marginRight: '10px' }} /> </div>,
//     component: <Liabilities />,
//     role: "9",
//     // subs: [
//     //   { key: '/investmentmanagement/funds', title: '基金', component: <Funds />, role: "5-1" },
//     //   { key: '/investmentmanagement/stock', title: '股票', component: < Stock />, role: "5-2" },
//     //   { key: '/investmentmanagement/deposits', title: '定期存款', component: <Deposits />, role: "5-3" },
//     // ],
//   },
//   {
//     key: '/checkInformation',
//     title: '账单信息',
//     icon: <div><SvgIcon iconClass="checkInformation" style={{ width: "17px", height: "17px", marginRight: '13px' }} /></div>,
//     // component: <CheckInFormation />
//     role: "6",
//     subs: [
//       { key: '/checkInformation/summary', title: '账单汇总', component: <Summary />, role: "6-1" },
//       { key: '/checkInformation/exportbill', title: '导出账单', component: <ExportBill />, role: "6-2" },
//     ],
//   },
//   {
//     key: '/paymentplanmanagement',
//     title: '收支计划管理',
//     icon: <div><SvgIcon iconClass="paymentplanmanagement" style={{ width: "20px", height: "20px", marginRight: '10px' }} /></div>,
//     // component: <PaymentplanManagement />,
//     subs: [
//       { key: '/paymentplanmanagement/majorplan', title: '主要计划', component: <PaymentplanManagement />, role: "6-1" },
//       { key: '/paymentplanmanagement/depositplan', title: '存款计划', component: <DepositPlan />, role: "6-2" },
//     ],
//     role: "7"
//   },
//   {
//     key: '/assetstatistics',
//     title: '资产统计',
//     icon: <div><SvgIcon iconClass="assetstatistics" style={{ width: "20px", height: "20px", padding: '1px', marginRight: '10px' }} /></div>,
//     component: <AssetStatistics />,
//     role: "8" 
//   },
// ]
const Routers = [
  // 菜单相关路由
  {
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
    component:<Home></Home>,
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
      { key: '/consumptiontype/management', title: '消费类型管理', component: <ConsumptionManagement></ConsumptionManagement>, },
      { key: '/consumptiontype/associated', title: '关联账单消费名称', component: <ConsumpAssociated></ConsumpAssociated>, },
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
      { key: '/incometype/management', title: '收入类型管理', component: <IncometypeManagement></IncometypeManagement>},
      { key: '/incometype/associated', title: '关联收入账单名称', component: <IncometypeAssociated></IncometypeAssociated> },
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
      { key: '/balancepayments/management', title: '收支情况记录', component: <BalancepaymentsMgement></BalancepaymentsMgement>, role: "4-1" },
      { key: '/balancepayments/importBill', title: '导入账单', component: <BalancepaymentsImportBill></BalancepaymentsImportBill>, role: "4-2" },
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
      { key: '/investmentmanagement/funds', title: '基金', component: <Funds></Funds>, role: "5-1" },
      { key: '/investmentmanagement/stock', title: '股票', component: <Stock></Stock>, role: "5-2" },
      { key: '/investmentmanagement/deposits', title: '定期存款', component: <Deposits></Deposits>, role: "5-3" },
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
    component: <Liabilities></Liabilities>,
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
      { key: '/checkInformation/summary', title: '账单汇总', component: <Summary></Summary>, role: "6-1" },
      { key: '/checkInformation/exportbill', title: '导出账单', component: <ExportBill></ExportBill>, role: "6-2" },
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
      { key: '/paymentplanmanagement/majorplan', title: '主要计划', component:<PaymentplanManagement></PaymentplanManagement>, role: "6-1" },
      { key: '/paymentplanmanagement/depositplan', title: '存款计划', component:<DepositPlan></DepositPlan>, role: "6-2" },
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
    component:<AssetStatistics></AssetStatistics>,
    role: "8"
  },
]
export default Routers