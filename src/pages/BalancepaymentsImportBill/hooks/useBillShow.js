/*
 * @Author: HHG
 * @Date: 2025-03-12 11:22:01
 * @LastEditTime: 2025-03-12 15:33:21
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\pages\BalancepaymentsImportBill\hooks\useBillShow.js
 * @文件说明: 
 */
import { useState } from 'react';
const useBillShow = ()=> {
  
    //展示账单列表的弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openBillModal = () => {
        setIsModalOpen(true);
    };
    const closeBillModal = () => {
        setIsModalOpen(false);
    };

    return {
        isModalOpen,
        openBillModal,
        closeBillModal
    }
}

export default useBillShow 