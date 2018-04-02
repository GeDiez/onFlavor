import React from 'react';

import Images from '@assets/images';
import './index.css';

const Footer = () => {
  return (
    <div className="footer">
      On Flavor is powered by{'    '}
      <a href="https://michelada.io">
        <img src={Images.imalogo} alt="logo" width="15px" /> michelada.io
      </a>
    </div>
  );
};

export default Footer;
