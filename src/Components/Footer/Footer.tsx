import './Footer.scss';

import React from 'react';

const Footer = (): JSX.Element => {

  const curYear = new Date().getFullYear();

  return (
    <div className="Footer">
      Cemalettin Taş
      {' '}
      {curYear}
      {'  '}
      <a href="https://cmlttnts.github.io/">My Website</a>
    </div>
  );
};

export default Footer;
