/*
 * @Author: HHG
 * @Date: 2025-03-12 15:57:36
 * @LastEditTime: 2025-03-12 16:26:55
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\BillTableList\index.jsx
 * @文件说明:
 */
import { Table } from 'antd';
import { useState } from 'react';
const BillTabelList = ({ billListData, onChange, params = {} }) => {
  const [columns, setColumns] = useState([
    {
      title: '交易时间',
      dataIndex: 'tradinghours',
      key: 'tradinghours',
      width: 200,
    },
    {
      title: '交易类型',
      dataIndex: 'tradetype',
      key: 'tradetype',
      width: 100,
    },
    {
      title: '交易对方',
      dataIndex: 'counterparty',
      key: 'counterparty',
      width: 150,
    },
    {
      title: '商品',
      dataIndex: 'product',
      key: 'product',
      width: 200,
    },
    {
      title: '收/支',
      dataIndex: 'collectorbranch',
      key: 'collectorbranch',
      width: 80,
    },
    {
      title: '金额(元)',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
    },
    {
      title: '支付方式',
      dataIndex: 'patternpayment',
      key: 'patternpayment',
      width: 100,
    },
    {
      title: '当前状态',
      dataIndex: 'currentstate',
      key: 'currentstate',
      width: 100,
    },
    {
      title: '交易单号',
      dataIndex: 'trasactionid',
      key: 'trasactionid',
      width: 200,
    },
    {
      title: '商户单号',
      dataIndex: 'merchantstoorder',
      key: 'merchantstoorder',
      width: 200,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 80,
    },
    // {
    //   title: '操作',
    //   // key: 'action',
    //   width: 150,
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a onClick={() => editBili(record)}>编辑</a>
    //       <Popconfirm
    //         title="确定删除记录？"
    //         onConfirm={() => confirm(record)}
    //         // onCancel={cancel}
    //         okText="确定"
    //         cancelText="取消"
    //       >
    //         <a href="#">删除</a>
    //       </Popconfirm>
    //       {/* <a onClick={() =>}></a> */}
    //     </Space>
    //   ),
    // },
  ]);
  if (!onChange) {
    onChange = (current, pageSize) => {
      getdisposebill({
        ...form,
        page: current.toString(),
        pageSize: pageSize.toString(),
      });
    };
  }
  return (
    <>
      <Table
        columns={columns}
        dataSource={billListData}
        pagination={{
          // showSizeChanger: true,
          // showQuickJumper: false,
          showTotal: () => `共${params.total || 0}条`,
          pageSize: params.pageSize || 0,
          current: params.page || 0,
          total: params.total || 0,
          onChange: (current, pageSize) => {
            onChange(current, pageSize);
          },
        }}
        scroll={{ y: false }}
        className="tab-box"
        rowKey="_id"
      />
    </>
  );
};

export default BillTabelList;
