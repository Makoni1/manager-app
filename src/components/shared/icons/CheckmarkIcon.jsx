import React from 'react';

const CheckmarkIcon = ({...rest}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" {...rest}>
      <circle cx="16" cy="16" r="11" fill="#45A967"/>
      <path d="M11 16L14.6364 20L21 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default CheckmarkIcon;