import React from 'react';

const UserIcon = ({ ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="#C3C5CA" {...rest}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.38574 5.42502C5.38574 2.43453 7.89301 0 10.999 0C14.105 0 16.6123 2.43453 16.6123 5.42502C16.6123 8.4155 14.105 10.85 10.999 10.85C7.89301 10.85 5.38574 8.4155 5.38574 5.42502Z" />
      <path d="M2 22V19.8511C2.66601 15.628 6.4371 12.3855 11 12.3855C15.5629 12.3855 19.334 15.628 20 19.8511V22L2 22Z" />
    </svg>
  );
};

export default UserIcon;