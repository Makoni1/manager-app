import React, { useState, useEffect, useRef } from "react";
import LeftSideItemWrapper from "./LeftSideItemWrapper";
import LeftSideItemContent from "./LeftSideItemContent";
import LeftSideItemChildren from "./LeftSideItemChildren";
import SupportModal from "../../shared/SupportModal";

function    LeftSideItem({
                          item,
                          displayText,
                          isChild,
                          isBalance,
                          isNotify,
                          isLogout,
                          setActiveRouteName,
                          activeRouteName,
                          onForceClose,
                          isExpand
}) {

    const hasChildren = !!(item.children && item.children.length);
    const [displayChildren, setDisplayChildren] = useState(false);
    const titleRef = useRef(null);
    const [supportModal, setSupportModal] = useState(false)

    const openSupportModal = () => {
        setSupportModal(true);
    };

    const goTo = (e,link) => {
        if(link === "/support") {
            e.preventDefault()
            e.stopPropagation()
            setSupportModal(true)
            return
        }
        if (!hasChildren || !isExpand) {
            setActiveRouteName(link)
            onForceClose(false)
            return
        }

        e.preventDefault()
        e.stopPropagation()
        setDisplayChildren(!displayChildren);
    };
    const closeDropdown = () => {
        setDisplayChildren(false);
    };

    return (
        <LeftSideItemWrapper closeDropdown={closeDropdown} item={item} >
            <LeftSideItemContent
                item={item}
                displayText={displayText}
                displayChildren={displayChildren}
                hasChildren={hasChildren}
                isChild={isChild}
                isBalance={isBalance}
                isNotify={isNotify}
                isLogout={isLogout}
                titleRef={titleRef}
                goTo={goTo}
                setActiveRouteName={setActiveRouteName}
                activeRouteName={activeRouteName}
                isExpand={isExpand}
            />

            <LeftSideItemChildren
                hasChildren={hasChildren}
                displayText={displayText}
                displayChildren={displayChildren}
                item={item}
                isBalance={isBalance}
                isLogout={isLogout}
                goTo={goTo}
                setActiveRouteName={setActiveRouteName}
                activeRouteName={activeRouteName}
                onForceClose={onForceClose}
                isExpand={isExpand}

            />
            {supportModal && <SupportModal
              display={supportModal}
              onClose={() => {setSupportModal(false)}}
              displayHeader={false}
            />}
        </LeftSideItemWrapper>
    );
}


export default LeftSideItem;
