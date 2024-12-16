/*
 * @Author: HHG
 * @Date: 2022-12-13 20:02:38
 * @LastEditTime: 2024-12-13 11:54:13
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\api\balancepayments.js
 * @文件说明:
 */
import request from './index.js';
const baseUrl = 'bill'
export const getBalancepayMentsApi = (params) => {
  return request({
    url: baseUrl+'/getbalancepayments',
    method: 'GET',
    params: {
      date: params,
    },
  });
};

export const importingbillsApi = (data) => {
  //把单次导入的账单数据进行了处理，去除了antd中table组件需要的key属性，减少网络带宽
  var datas = [];
  data.forEach((element) => {
    var billTable = {};
    for (const key in element) {
      if (key !== 'key') {
        billTable[key] = element[key];
      }
    }
    datas.push(billTable);
  });
  // console.log(datas);
  return request({
    url: '/bill/importingbills',
    method: 'POST',
    data: datas,
  });
};
export const getdisposebillApi = (params) => {
  console.log(params);

  return request({
    url: '/bill/getdisposebill',
    method: 'GET',
    params: {
      tradinghours: params.tradinghours,
      transactiontype: params.transactiontype,
      balancepayments: params.balancepayments,
      amount: params.amount,
      transactionid: params.id,
      // importTime:  moment(params.importtime).format('YYYY-MM-DD'),
      importTime: params.importtime,
      pageSize: params.pageSize,
      page: params.page
    },
  });
};
export const getImportRecordsApi = (data) => {
  return request({
    url: '/getimportrecords',
    method: 'GET',
    data: {
      starttime: data.starttime,
      endtime: data.endtime,
    },
  });
};

export const getinportbillinfoApi = (params) => {
  return request({
    url: '/getinportbillinfo',
    method: 'GET',
    params: {
      batchid: params.batchid,
    },
  });
};

export const newFinancialRecordApi = (data) => {
  let type = '';
  if (data.incometype) {
    type = data.incometype;
  }
  if (data.paymenttype) {
    type = data.paymenttype;
  }
  return request({
    url: '/newfinancialrecord',
    method: 'POST',
    data: {
      //收入||支出
      balancepaymenttype: data.balancepaymenttype,
      type: type,
      name: data.name,
      amount: data.amount,
    },
  });
};

export const getPeriodTimeBillApi = (params) => {
  return request({
    url: baseUrl + '/getPeriodTimebill',
    method: 'GET',
    params: {
      startDate: params.startDate || '',
      endDate: params.endDate || '',
    },
  });
};
