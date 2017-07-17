import React from 'react';

const My404Page = (props) => {
  const imageUrl = require('../../assets/images/404.jpg');
  return (
    <div className="error-image">
      <img src={imageUrl} alt="404 Error" />
    </div>
  );
};

export default My404Page;
