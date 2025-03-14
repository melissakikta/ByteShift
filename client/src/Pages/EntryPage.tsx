//import styling

import React from 'react';
import { Link } from 'react-router-dom';

import button from ./assets/images/button.png; 

//function to create the entry page
const Entry: React.FC = () => {
  return (
    <section className="home">
      <div className="page-section">
        <h1>Welcome to ByteShift!</h1>
        <div className="flex-container">
          <p>Struggling to keep track of important team updates? Losing links in endless email threads?</p>
          <p>Try <strong>ByteShift</strong>!</p>
          <p> ByteShift provides a dedicated space for your team to effortlessly share links, code snippets, and text. Team members can react, comment, and collaborate seamlessly, ensuring smoother communication and better organization. Say goodbye to scattered information and hello to streamlined teamwork!</p>
        </div>
        <div className="flex-container">
          <Link to="/signup" className="flex-item">
            <img src={button} alt="signup" className="button-image" />
            <h2>Sign Up</h2>
          </Link>

          <Link to="/login" className="flex-item">
            <img src={button} alt="signup" className="button-image" />
            <h2>Login</h2>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Entry;