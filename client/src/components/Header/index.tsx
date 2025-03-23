import React from 'react';
import { Typography } from 'antd';
import '../../App.css';

const { Title } = Typography;

//function to create the Header
const Header: React.FC = () => {
  return (
    <Title level={1} style={{color: "var(--primary)", background: "var(--tertiary)", marginTop: "0px",padding: "5px", fontFamily: "var(--font-header)", fontSize: "4rem" }}>
      ByteShift
    </Title>
  );
}

export default Header;