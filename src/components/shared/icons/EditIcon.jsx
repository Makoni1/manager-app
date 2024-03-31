import React from 'react';

const EditIcon = ({ ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="#909195" { ...rest }>
      <path d="M18.27 9.60755L14.5493 5.92535L15.775 4.69796C16.1106 4.36188 16.5229 4.19385 17.012 4.19385C17.5011 4.19385 17.9132 4.36188 18.2482 4.69796L19.4738 5.92535C19.8094 6.26143 19.9845 6.66705 19.9991 7.14223C20.0137 7.61741 19.8532 8.02274 19.5176 8.35823L18.27 9.60755ZM17.0006 10.9007L7.72072 20.1938H4V16.4678L13.2799 7.17467L17.0006 10.9007Z" />
    </svg>
  );
};

export default EditIcon;