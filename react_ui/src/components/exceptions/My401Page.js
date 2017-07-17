import React from 'react';

const My401Page = (props) => {
  const imageUrl = require('../../assets/images/401.jpg');
  return (
    <div className="error-image">
      <img src={imageUrl} alt="Unauthorized 401 Error" />
    </div>
  );
};

export default My401Page;
