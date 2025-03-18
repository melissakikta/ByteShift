import React from 'react';
import { Typography } from 'antd';
import github from '../assets/images/github.png';

const { Text } = Typography;

// Function to create the Footer
const Footer: React.FC = () => {
  return (
    <div style= {{ textAlign: "center" }}>
      <Text style={{ color: "white" }}>
        Developed by:
      </Text>
    
    <div>
      <a href="https://github.com/BlazeEMP" target="_blenk" rel="noopener noreferrer">
        Dan
        <img src={github} alt="github link" style={{ width: "15px", marginLeft: "5px" }}/>
      </a>

      <a href="https://github.com/melissakikta" target="_blenk" rel="noopener noreferrer">
        Missy
        <img src={github} alt="github link" style={{ width: "15px", marginLeft: "5px" }}/>
      </a>

      <a href="https://github.com/Pizza199" target="_blenk" rel="noopener noreferrer">
        Steve
        <img src={github} alt="github link" style={{ width: "15px", marginLeft: "5px" }}/>
      </a>
    </div>
  </div>
  );
}

export default Footer;