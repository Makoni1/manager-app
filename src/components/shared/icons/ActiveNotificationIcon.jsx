import React from 'react';

const ActiveNotificationIcon = ({ fill = "#C3C5CA", ...rest })  => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <circle opacity="0.11" cx="12" cy="12" r="12" fill={fill} />
      <circle cx="12" cy="12" r="6" fill={fill}/>
    </svg>
  );
};

export default ActiveNotificationIcon;