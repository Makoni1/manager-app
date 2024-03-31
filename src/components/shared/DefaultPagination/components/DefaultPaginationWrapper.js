import React from 'react';
import cn from "classnames";
import style from "../pagination.module.scss"

const DefaultPaginationWrapper = ({ children }) => {
  return (
    <ul className={cn("pagination justify-content-center", style.pagination)}>
      { children }
    </ul>
  );
};

export default DefaultPaginationWrapper;