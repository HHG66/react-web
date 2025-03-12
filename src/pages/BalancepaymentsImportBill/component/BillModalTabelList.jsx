/*
 * @Author: HHG
 * @Date: 2025-03-12 11:17:36
 * @LastEditTime: 2025-03-12 16:25:37
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\BalancepaymentsImportBill\component\BillModalTabelList.jsx
 * @文件说明:
 */

import { Modal, Button } from 'antd';
import  BillTabelList from '@/components/BillTableList/index.jsx'
const BillModalTabelList = ({ isModalOpen, closeBillModal }) => {
  // console.log(isModalOpen);
  // const test = () => {
  //   console.log('test');
  //   openBillModal()
  console.log(closeBillModal);

  // };
  return (
    <>
      {/* <Button onClick={test}>test</Button> */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        // onOk={openBillModal}
        onCancel={closeBillModal}
        width={'90%'}
      >
        <BillTabelList></BillTabelList>
      </Modal>
    </>
  );
};

export default BillModalTabelList;
