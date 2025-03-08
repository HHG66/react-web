/*
 * @Author: HHG
 * @Date: 2025-03-08 16:37:00
 * @LastEditTime: 2025-03-08 20:09:10
 * @LastEditors: 韩宏广
 * @FilePath: /personal-finance-web/src/pages/BalancepaymentsImportBill/hooks/useUploadForm.js
 * @文件说明: 
 */
import { useState } from 'react'
const useUploadForm = () => {
  //上传model展示
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  //处理表单得到接口入参
  const getBillList=(file,)=>{
    
  }
  return {
    isDialogOpen,
    openDialog,
    closeDialog,
    getBillList
  }
}

export default useUploadForm