import React from 'react';
import { Layout, Typography, Space } from 'antd';
import github from '../../assets/images/github.png';

const { Footer } = Layout;
const { Text, Link } = Typography;

// Function to create the Footer
const FooterComponent: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#282c34', color: 'white', padding: '20px' }}>
      <Text style={{ color: 'white', fontSize: '16px' }}>
        Developed by:
      </Text>

      <Space size="large" style={{marginTop: '10px', display: 'block'}}>
        <Link href="https://github.com/BlazeEMP" target="_blank" rel="noopener noreferrer">
          Dan
          <img src={github} alt="github link" style={{ width: "15px", marginLeft: "5px" }}/>
        </Link>

        <Link href="https://github.com/melissakikta" target="_blank" rel="noopener noreferrer">
          Missy
          <img src={github} alt="github link" style={{ width: "15px", marginLeft: "5px" }}/>
        </Link>
    
        <Link href="https://github.com/Pizza199" target="_blank" rel="noopener noreferrer">
          Steve
          <img src={github} alt="github link" style={{ width: "15px", marginLeft: "5px" }}/>
        </Link>
      </Space>
    </Footer>
  );
};

export default FooterComponent;