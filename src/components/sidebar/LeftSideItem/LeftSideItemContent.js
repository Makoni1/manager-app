import React from "react";
import cn from "classnames";
import styles from "./LeftSideItem.module.scss";
import OrderStatus from "../order/OrderStatus";
import ArrowIcon from "../../../assets/arrow-down.svg";
import ExitLogo from "../../../assets/exitLine.svg";
import {Link} from "react-router-dom";

function LeftSideItemContent({
                                 item,
                                 isNotify,
                                 displayText,
                                 displayChildren,
                                 hasChildren,
                                 isChild,
                                 isBalance,
                                 isLogout,
                                 titleRef,
                                 goTo,
                                 activeRouteName,
                                 isExpand,
                                  onNotificationClick
                             }) {

  const withCounter = item.count !== undefined

  const withStatus = item.status !== undefined && item.status !== -1

    const handleLogout = event => {
        event.preventDefault()
        event.stopPropagation()
        localStorage.removeItem('authData')
        window.location.href = '/login';
    };

    return (
        <Link
            className={cn(
                styles["navigation-item__link"],
                {
                    [styles["navigation-item_py-1"]]: isChild,
                    [styles["navigation-item_pr-0"]] : withCounter && !isNotify,
                    ['justify-content-center'] : !displayText,
                    [styles.active]: displayText && displayChildren || activeRouteName === item.link,
                }
            )}

            to={item.link || '/'}
            onClick={e => goTo(e, item.link)}
        >
            {withStatus && (
                <div className={cn("row align-items-center justify-content-center", styles["navigation-item__avatar"])}>
                    <OrderStatus status={item.status} />
                </div>
            )}

            {item.icon && (
                <div className={cn("row align-items-center justify-content-center", styles["navigation-item__avatar"])}>
                <div className={cn("m-0 p-0", styles['navigation-item__icon'])}>
                  {item.icon}
                  {isNotify && !isExpand && (
                    <div className={cn(styles["navigation-item__notification"])}>{item.count}</div>
                  )}
                </div>
                </div>
            )}

            <div
                className={cn(
                    styles["navigation-item__content"],
                    {
                        [styles.hidden]: !displayText,
                        [styles.flex]: hasChildren || withCounter || isLogout || isBalance,
                        [styles["items-center"]]: isBalance
                    }
                )}
            >

                <div ref={titleRef} className={styles["navigation-item__title"]}>
                    {item.title}
                </div>

                {hasChildren && (
                    <img
                        src={ArrowIcon}
                        alt="arrow"
                        width="20px"
                        height="20px"
                        style={{ transform: displayChildren ? "scale(-1)" : "" }}
                    />
                )}

                {withCounter && (
                    <span
                      className={cn(styles["navigation-item__badge"], {
                        [styles["navigation-item__badge_brand"]]: isNotify
                      })
                    }>
                      {item.count}
                        </span>
                )}

                {isBalance && (
                    <button className={styles["navigation-item__btn-balance"]}>
                        Баланс
                    </button>
                )}

                {isLogout && (
                    <img src={ExitLogo} alt="exit" width="20px" height="20px" onClick={handleLogout} />
                )}
            </div>
        </Link>
    );
}

export default LeftSideItemContent;
