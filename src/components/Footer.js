import React from 'react';
import { Link } from 'react-router-dom';
import { About } from './About';

export const Footer = () => {
  return (
   
    <footer>
      <p>Copy Right 2023</p>
       <Link to='/about'>about</Link>
      </footer>
  
  );
};
