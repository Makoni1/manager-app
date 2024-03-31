import React from 'react';

const ClockIcon = ({ fullContent = false, ...rest }) => {
  if (fullContent) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3A50C6" {...rest}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.7691 7.12835C12.7691 6.70351 12.4247 6.35912 11.9999 6.35912C11.5751 6.35912 11.2307 6.70351 11.2307 7.12835V11.6202C11.2307 12.4483 11.6744 13.2129 12.3934 13.6238L16.1054 15.7449C16.4743 15.9557 16.9442 15.8276 17.155 15.4587C17.3657 15.0899 17.2376 14.62 16.8687 14.4092L13.1567 12.288C12.9171 12.1511 12.7691 11.8962 12.7691 11.6202V7.12835Z" />
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" stroke="#C3C5CA" {...rest}>
      <g id="zondicons:calendar" clipPath="url(#clip0_6305_3632)">
        <path id="Vector" d="M8.80469 6.03866V10.0602C8.80469 10.1405 8.82522 10.2186 8.86325 10.2876C8.91164 10.3753 8.9972 10.4338 9.08006 10.4901L11.4221 12.0809M17.0938 9.64746C17.0938 14.0657 13.512 17.6475 9.09375 17.6475C4.67547 17.6475 1.09375 14.0657 1.09375 9.64746C1.09375 5.22918 4.67547 1.64746 9.09375 1.64746C13.512 1.64746 17.0938 5.22918 17.0938 9.64746Z" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <defs>
        <clipPath id="clip0_6305_3632">
          <rect width="18" height="18" fill="white" transform="translate(0.09375 0.647461)"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default ClockIcon;