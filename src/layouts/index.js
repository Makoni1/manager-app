import React from 'react';
import Main from "./MainLayout";
import Without from "./WithoutLayout";

const Layout = ({isAuthenticated, children, ...props}) => {
  return (
    <>
      { isAuthenticated
        ? (
          <Main {...props}>
            { children }
          </Main>
        )
        : (
          <Without {...props}>
            { children }
          </Without>
        )
      }
    </>
  );
};

export default {
  index: Layout,
  Main,
  Without
};