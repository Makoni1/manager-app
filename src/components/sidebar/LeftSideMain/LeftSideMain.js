import React, {useState, useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
import {LeftSideMainContainer} from "./LeftSideMainContainer";
import {LeftSideContent} from "./components/LeftSideContent";
import {LeftSideHeader} from "./components/LeftSideHeader";
import {LeftSideList} from "./components/LeftSideList";
import {LeftSideButtonOrder} from "./components/LeftSideButtonOrder";
import {LeftSideFooter} from "./components/LeftSideFooter";
import LeftSideItem from "../LeftSideItem/LeftSideItem";
import {useLocation} from "react-router-dom";
import { menuExpeditor, menuClient } from "./mock"

const LeftSideMain = ({className, isOpen = false, onCloseMenu}) => {
    const location = useLocation()
    const {navigation} = useSelector(state => state);
    const [isExpand, setIsExpand] = useState(isOpen);
    const [activeRouteName, setActiveRouteName] = useState(location.pathname);
    const user = useSelector(state => state.user);

    const essentialLinks = useMemo(() => {
        if (user?.type === "Expeditor") {
            return menuExpeditor
            // return user.type === "Expeditor" ? menuExpeditor : menuExpeditor
        }
        // return menuExpeditor // TODO1
        return menuClient
    }, [user])

    useEffect(() => {
        setIsExpand(isOpen)
    }, [isOpen])

    useEffect(() => {
        if (essentialLinks.length && navigation && navigation.statuses) {
            const findIndex = essentialLinks.findIndex(m => m.isHasDropdownStatuses)
            if (findIndex !== -1) {
                essentialLinks[findIndex].children = navigation.statuses.map(i => {
                    return {
                        title: i.statusName,
                        link: `${essentialLinks[findIndex].link}?status=${i.status}`,
                        status: i.status,
                        count: i.count,
                    }
                })
            }
        }

    }, [essentialLinks, navigation.statuses])

    const toggleExpand = () => {
        setIsExpand(!isExpand);
        if (isExpand && onCloseMenu) {
            onCloseMenu();
        }
    };

    function onForceClose() {
        setIsExpand(false);
        if (isExpand && onCloseMenu) {
            onCloseMenu();
        }
    }

    return (
        <LeftSideMainContainer
          rootClassName={className}>
            <LeftSideContent
                isExpand={isExpand}
                onClose={() => onForceClose()}
            >
                <LeftSideHeader
                    isExpand={isExpand}
                    toggleExpand={toggleExpand}>
                </LeftSideHeader>
                <LeftSideList isExpand={isExpand}>
                    {essentialLinks.map((link, idx) => (
                        <LeftSideItem
                            key={idx}
                            item={link}
                            displayText={isExpand}
                            activeRouteName={activeRouteName}
                            setActiveRouteName={setActiveRouteName}
                            onForceClose={onForceClose}
                            isExpand={isExpand}
                        />
                    ))}
                </LeftSideList>
                <LeftSideButtonOrder
                    text={isExpand ? 'Создать заказ' : ''}
                    onForceClose={onForceClose}
                >
                </LeftSideButtonOrder>
               <LeftSideFooter
                   activeRouteName={activeRouteName}
                   setActiveRouteName={setActiveRouteName}
                   isExpand={isExpand}
                   user={user}
                   onForceClose={onForceClose}
               >
               </LeftSideFooter>
            </LeftSideContent>
       </LeftSideMainContainer>
    );
};

export default LeftSideMain;
