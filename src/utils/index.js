/*
 * @Author: HHG
 * @Date: 2022-09-02 14:37:41
 * @LastEditTime: 2024-05-21 08:50:06
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\utils\index.js
 * @文件说明:
 */

//取localstorage
export function getLocalStorage(key) {
  // return window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return window.localStorage.getItem(key);
  }
}
//存localstorage
export function setLocalStorage(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}
/**
 * @description: 日期格式化,后面使用moment的库，提供此方法
 * @param {*} date
 * @return {String} YYYY-HH-DD
 */
export function formatDate(date) {
  var date1 = new Date(date);
  return (
    date1.getFullYear() +
    '-' +
    (date1.getMonth() + 1) +
    '-' +
    date1.getDate() +
    ''
  );
}
/**
 * @description: 日期格式化为年月日
 * @param {*} date
 * @param {*} format
 * @return {*}
 */
export function formatDateStandard(date) {
  var date2 = new Date(date);
  return (
    date2.getFullYear() +
    '年' +
    (date2.getMonth() + 1) +
    '月' +
    date2.getDate() +
    '日'
  );
}
/**
 * @description: 判断是否为邮箱
 * @param {string} str
 * @return {*}
 */
export function isEmail(str) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * @description: 格式化新浪股票的返回值
 * @param {string} str
 * @return {object}
 */

// var hq_str_sz159605 = "互联中概,0.795,0.800,0.809,0.820,0.788,0.809,0.810,3068011351,2470955282.590,3308400,0.809,3344600,0.808,4678000,0.807,5452300,0.806,2777700,0.805,8157500,0.810,8186700,0.811,2619400,0.812,3255400,0.813,2737600,0.814,2022-12-16,15:00:00,00";

export function formatSinaStock(string) {
  // console.log(string.split(','));
  let sineInfo = string.split(',');
  return {
    name: sineInfo[0], //名字
    todayPrice: sineInfo[1],
    yesterdayclosingPrice: sineInfo[2],
    currentPrice: sineInfo[3],
    date: sineInfo[30],
    time: sineInfo[31],
  };
}
/**
 * @description: 防抖函数
 * @param {*}
 * @return {*}
 * @author: 韩宏广
 */
export function debounce(func, delay) {
  let timeout;
  return function () {
    const _this = this;
    const args = [...arguments];
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(_this, args);
    }, delay);
  };
}

export function throttle(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
