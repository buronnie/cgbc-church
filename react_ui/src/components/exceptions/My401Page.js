import React from 'react';
import {uiUrl} from '../../config/ui_url';

const My401Page = (props) => {
  const imageUrl = uiUrl + '/img/401.jpg';
  return (
    <div className="error-image">
      <img src={imageUrl} alt="Unauthorized 401 Error" />
    </div>
  );
};

export default My401Page;
