import React from 'react';

const LocationIcon = ({ ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#141516" {...rest}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20 8.29134C20 15.383 12 24 12 24C12 24 4 15.383 4 8.29134C4 3.71216 7.58172 0 12 0C16.4183 0 20 3.71216 20 8.29134ZM11.8367 12.4931C14.1811 12.4931 16.0816 10.5795 16.0816 8.21909C16.0816 5.85864 14.1811 3.94512 11.8367 3.94512C9.49233 3.94512 7.59183 5.85864 7.59183 8.21909C7.59183 10.5795 9.49233 12.4931 11.8367 12.4931Z" />
    </svg>
  );
};

export default LocationIcon;