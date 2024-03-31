import React from 'react';

const HomeIcon = ({ ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="#C3C5CA" { ...rest }>
      <path d="M0 18.6899V7.80336C0 6.90273 0.546563 6.09492 1.38188 5.76148L10.5909 2.07992C10.8522 1.97336 11.1444 1.97336 11.4091 2.07992L20.6181 5.76148C21.4534 6.09492 22 6.90617 22 7.80336V18.6899C22 19.1471 21.6322 19.5149 21.175 19.5149H19.525C19.0678 19.5149 18.7 19.1471 18.7 18.6899V9.61492C18.7 9.00648 18.2084 8.51492 17.6 8.51492H4.4C3.79156 8.51492 3.3 9.00648 3.3 9.61492V18.6899C3.3 19.1471 2.93219 19.5149 2.475 19.5149H0.825C0.367813 19.5149 0 19.1471 0 18.6899ZM16.775 19.5149H5.225C4.76781 19.5149 4.4 19.1471 4.4 18.6899V16.7649H17.6V18.6899C17.6 19.1471 17.2322 19.5149 16.775 19.5149ZM4.4 15.6649V13.4649H17.6V15.6649H4.4ZM4.4 12.3649V9.61492H17.6V12.3649H4.4Z" />
    </svg>
  );
};

export default HomeIcon;