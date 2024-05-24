import React from 'react';
import { Button, Spin } from 'antd';
const Loaddig = () => {
  const [spinning, setSpinning] = React.useState(true);
  return (
    <>
      <div style={
        {
          width: '100%',
          height: '100%',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }
      }>
        <Spin spinning={spinning} delay={100} size={'large'} style={{
        }} />
      </div>

    </>
  );
};
export default Loaddig;