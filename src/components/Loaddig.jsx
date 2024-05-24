import React from 'react';
import { Button, Spin } from 'antd';
const Loaddig = () => {
  const [spinning, setSpinning] = React.useState(true);
  return (
    <>
      <div style={
        {
          // position: 'fixed',
          width: '100%',
          height: '100%',
          // backgroundColor: token.colorBgMask,
          // zIndex: token.zIndexPopupBase,
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          // opacity: 0,
        }
      }>
        <Spin spinning={spinning} delay={100} size={'large'} style={{

          // visibility: 'hidden',
        }} />
      </div>

    </>
  );
};
export default Loaddig;