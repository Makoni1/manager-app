import React from 'react';

const UserProfileIcon = ({ ...rest }) => {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g clipPath="url(#clip0_5301_1615)">
        <g opacity="0.2">
          <path fillRule="evenodd" clipRule="evenodd" d="M22 6C13.1634 6 6 13.1634 6 22C6 27.453 8.72793 32.2689 12.8936 35.1575V32.8955C13.5674 28.4502 17.3831 25.0371 22 25.0371C26.6169 25.0371 30.4326 28.4502 31.1064 32.8955V35.1575C35.2721 32.2689 38 27.453 38 22C38 13.1634 30.8366 6 22 6ZM16.3203 17.7104C16.3203 14.5626 18.8572 12 22 12C25.1427 12 27.6796 14.5626 27.6796 17.7104C27.6796 20.8583 25.1427 23.4209 22 23.4209C18.8572 23.4209 16.3203 20.8583 16.3203 17.7104Z" fill="currentColor"/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_5301_1615">
          <rect width="44" height="44" rx="12" fill="currentColor"/>
        </clipPath>
      </defs>
    </svg>

  );
};

export default UserProfileIcon;