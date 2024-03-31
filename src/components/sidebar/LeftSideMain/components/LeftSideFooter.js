import cn from "classnames";
import styles from "../LeftSideMain.module.scss";
import LeftSideItem from "../../LeftSideItem/LeftSideItem";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {useSelector} from "react-redux";
import {numberToFinanceFormat, requestErrorDisplay} from "../../../../utils";
import WalletIcon from "../../../shared/icons/WalletIcon";
import UserProfileIcon from "../../../shared/icons/UserProfileIcon";
import NotificationIcon from '../../../shared/icons/NotificationIcon';
import {Notification} from "../../../../services";

export function LeftSideFooter({
    isExpand,
    setActiveRouteName,
    activeRouteName,
    onForceClose
}){
    const { user } = useSelector(state => state);
    const formattedBalance = numberToFinanceFormat(user.balance || 0);
  const [notificationsTotal, setNotificationsTotal] = useState( undefined);


  useLayoutEffect(() => {
      Notification.getQuantityNotifications({isSeen: false})
        .then((res) => {
        setNotificationsTotal(res.data.total)
      })
        .catch((err) => {
        requestErrorDisplay(err);
      });
  }, [])


  const notifyItem = {
    title: "Уведомления",
    icon: <NotificationIcon />,
    link: '/notification',
    count: notificationsTotal
  };

    const balanceItem = {
        title: formattedBalance + "₸",
        icon: <WalletIcon />,
        link: '/balance/lists'
    };

    const logoutItem = {
        title: user.name,
        icon: <UserProfileIcon />,
        link: '/profile'
    };

    return(
        <div className={cn(styles["navigation-custom__footer"],styles["pl-11"], styles['pr-11'])}>
          <LeftSideItem  key='isNotify'
            item={notifyItem}
            isNotify
            displayText={isExpand}
            setActiveRouteName={setActiveRouteName}
            activeRouteName={activeRouteName}
            onForceClose={onForceClose}
            isExpand={isExpand}
          />
            <LeftSideItem  key='isBalance'
              item={balanceItem}
              isBalance displayText={isExpand}
              setActiveRouteName={setActiveRouteName}
              activeRouteName={activeRouteName}
              onForceClose={onForceClose}
              isExpand={isExpand}
            />
            <LeftSideItem key="isLogout"
              item={logoutItem}
              isLogout displayText={isExpand}
              activeRouteName={activeRouteName}
              setActiveRouteName={setActiveRouteName}
              onForceClose={onForceClose}
              isExpand={isExpand}
            />
        </div>
    )
}