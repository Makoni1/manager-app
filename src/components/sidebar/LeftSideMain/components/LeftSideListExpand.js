import React from 'react';
import cn from "classnames";
import styles from "../LeftSideMain.module.scss";

const LeftSideListExpand = ({children, isExpand}) => {
    return (
        <li className={cn(
            "px-1 py-0 flex-nowrap d-flex mb-3",
            styles["navigation-custom__label"],
            {
                'd-flex align-items-center justify-content-center': !isExpand,
                'd-flex align-items-left justify-content-between': isExpand
            }
        )}>
        {children}
        </li>
    );
};

export default LeftSideListExpand;
