/*
 * @Author: HHG
 * @Date: 2024-05-15 20:37:17
 * @LastEditTime: 2024-05-16 10:09:10
 * @LastEditors: 韩宏广
 * @FilePath: \financial-web\src\components\SvgIcon.jsx
 * @文件说明:
 */
export default function SvgIcon({
  name,
  prefix = 'icon',
  color = 'white',
  style,
  ...props
}) {
  const symbolId = `#${prefix}-${name}`;
  // debugger
  return (
    <svg {...props} aria-hidden="true" style={style}>
      <use href={symbolId} fill={color} />
    </svg>
  );
}
