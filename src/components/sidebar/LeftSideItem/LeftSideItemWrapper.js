import cn from "classnames";
import styles from "./LeftSideItem.module.scss";
import React, {useRef } from "react";
const LeftSideItemWrapper = ({children,  item}) => {
    const elRef = useRef()

    return(
        <li
            ref={elRef}
            className={cn("row align-items-center rounded-circle", styles["navigation-item"])}
            tabIndex={-1}
        >
            {item.line && <hr className={styles["navigation-item__line"]} />}
            {children}
        </li>
    )
}

export default LeftSideItemWrapper;