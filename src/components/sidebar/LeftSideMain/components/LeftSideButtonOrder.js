import cn from "classnames";
import styles from "../LeftSideMain.module.scss";
import {Link} from "react-router-dom";
import PlusIcon from "../../../../assets/plus.svg";
import React from "react";
import {useAmplitude} from "../../../../hooks/useAmplitude";

export function LeftSideButtonOrder({ text = "", onForceClose}) {
  const { amplitude } = useAmplitude()
    return(
        <div className={cn(styles["navigation-custom__create"], styles["pl-11"], styles['pr-11'])}>
            <Link
                to="/orders/create"
                className={cn( 'bg-white d-flex flex-nowrap justify-content-center align-items-center text-dark rounded-10 pl-11', styles['navigation-custom__create-btn'])}
                onClick={() => {
                  if (onForceClose) onForceClose()
                  amplitude.startCreatingOrder()
                }}
            >
                <img
                    src={PlusIcon}
                    alt="Plus Icon"
                    style={{ width: '16px', height: '16px' }}
                />
                {text && <span> {text}</span> }
            </Link>
        </div>
    )
}
