/*
 * @Author: HHG
 * @Date: 2025-02-17 08:50:24
 * @LastEditTime: 2025-02-17 09:39:03
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\hForm\hooks\useFormColumns.jsx
 * @文件说明: 
 */
import { useMemo } from 'react';
/**
 * 生成稳定的表单列配置（columns）数组
 * @param {Array} columnsConfig - 表单字段配置数组
 * @param {Array} deps - 依赖项数组（决定何时重新生成 columns）
 * @returns {Array} 稳定的 columns 数组
 */
export const useFormColumns = (columnsConfig, deps = []) => {
  return useMemo(() => {
    // 可选：添加校验逻辑或默认值处理
    if (!Array.isArray(columnsConfig)) {
      console.error('columnsConfig 必须是一个数组');
      return [];
    }
    return columnsConfig.map((column) => ({ ...column }));
  }, deps);
};
