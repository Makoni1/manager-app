import React from 'react';
import styles from "../LeftSideMain.module.scss";
import ExitIcon from "../../../shared/icons/ExitIcon";
import MenuIcon from "../../../shared/icons/MenuIcon";


const LeftSideButtonClose = ({isExpand, toggleExpand}) => {
    return (
        <button
            className={ styles["navigation-custom__label"]}
            aria-label="Menu"
            onClick={toggleExpand}
        >
            {isExpand ? (
                <ExitIcon/>
            ) : (
                <MenuIcon/>
            )}
        </button>

    );
};

export default LeftSideButtonClose;
