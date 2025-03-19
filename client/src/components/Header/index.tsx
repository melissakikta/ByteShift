import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

//function to create the Header
const Header: React.FC = () => {
  return (
    <Title level={1} style={{color: "var(--primary)", background: "var(--tertiary)", margin: 0 }}>
      ByteShift
    </Title>
  );
}

export default Header;