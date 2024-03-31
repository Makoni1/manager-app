import React from "react";
import LeftSideWrapper from "./LeftSideWrapper";
import LeftSideListExpand from "./LeftSideListExpand";
import LeftSideButtonClose from "./LeftSideButtonClose";
import LeftSideIcon from "./LeftSideIcon";

export function LeftSideHeader({isExpand, toggleExpand}) {

    return(
        <LeftSideWrapper>
            <LeftSideListExpand isExpand={ isExpand}>
                   <LeftSideIcon isExpand ={isExpand}/>
                    <LeftSideButtonClose isExpand={isExpand} toggleExpand={toggleExpand}/>
            </LeftSideListExpand>
        </LeftSideWrapper>
    )
}