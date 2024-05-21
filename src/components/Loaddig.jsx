import React from 'react';
import { Button, Spin } from 'antd';
const Loaddig = () => {
  const [spinning, setSpinning] = React.useState(true);
  return (
    <>
      <Spin spinning={spinning} fullscreen />
    </>
  );
};
export default Loaddig;