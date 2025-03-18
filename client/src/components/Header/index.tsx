import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

//function to create the Header
const Header: React.FC = () => {
  return (
    <Title level={1} style={{color: "white", margin: 0 }}>
      ByteShift
    </Title>
  );
}

export default Header;