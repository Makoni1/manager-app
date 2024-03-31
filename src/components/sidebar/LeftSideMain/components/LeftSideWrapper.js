import React from 'react';
import cn from "classnames";
import styles from "../LeftSideMain.module.scss";

const LeftSideWrapper = ({children}) => {
    return (
        <div className={cn(styles["pl-11"], styles['pr-11'],)}>
            {children}
        </div>
    );
};

export default LeftSideWrapper;
