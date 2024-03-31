import React from "react";
import styles from "./LeftSideItem.module.scss";
import LeftSideItem from "./LeftSideItem";
import cn from "classnames";

function LeftSideItemChildren({
                                  hasChildren,
                                  displayText,
                                  displayChildren,
                                  item,
                                  isBalance,
                                  isLogout,
                                  withClick,
                                  isActive,
                                  handleClick,
                                  setActiveRouteName,
                                  activeRouteName,
                                  onForceClose,
                                   isExpand
}) {
    return (
        <>
         {hasChildren && displayText && displayChildren && (
            <ul className={cn(styles["navigation-item-children"])}>
                {item.children.map((child, idx) => (
                    <LeftSideItem
                        key={'children-' + idx}
                        item={child}
                        displayText={displayText}
                        isBalance={isBalance}
                        isLogout={isLogout}
                        withClick={withClick}
                        isActive={isActive}
                        handleClick={handleClick}
                        setActiveRouteName={setActiveRouteName}
                        activeRouteName={activeRouteName}
                        onForceClose={onForceClose}
                        isExpand={isExpand}
                    />
                ))}
            </ul>
         )}
        </>
    );
}

export default LeftSideItemChildren;

