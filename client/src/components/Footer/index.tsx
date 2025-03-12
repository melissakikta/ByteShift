import React from 'react';

// Import header style sheet
import '../styles/Footer.css';
import github from '../assets/images/github.png';
import globe from '../assets/images/globe.png';

// Function to create the Footer
const Footer: React.FC = () => {
  return (
    <div className="footer">
      <ul className="footer-links">
        {/* Add links to our GitHub */}
        <img src={globe} alt="globe" />
      
        <h2>
          <a href="https://github.com/BlazeEMP" target="_blank" rel="noopener noreferrer">
            Dan <img src={github} alt="github link" />
          </a>
        </h2>

        <h2>
          <a href="https://github.com/melissakikta" target="_blank" rel="noopener noreferrer">
            Missy <img src={github} alt="github link" />
          </a>
        </h2>

        <h2>
          <a href="https://github.com/Pizza199" target="_blank" rel="noopener noreferrer">
            Steve <img src={github} alt="github link" />
          </a>
        </h2>
      </ul>
    </div>
  );
}

export default Footer;