import React from 'react';
import {uiUrl} from '../../config/ui_url';

const My404Page = (props) => {
  const imageUrl = uiUrl + '/img/404.jpg';
  return (
    <div className="error-image">
      <img src={imageUrl} alt="404 Error" />
    </div>
  );
};

export default My404Page;
