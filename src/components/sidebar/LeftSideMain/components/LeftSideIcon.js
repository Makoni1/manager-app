import React from 'react';
import LogoIcon from "../../../shared/icons/LogoIcon";


const LeftSideIcon = ({isExpand}) => {
    return (
        <>
            {isExpand && (
              <LogoIcon/>
            )}
        </>
    );
};

export default LeftSideIcon;
