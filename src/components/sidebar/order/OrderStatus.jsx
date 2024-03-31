import React from 'react';
import styles from './index.module.scss';
import cn from "classnames"

export const statusOrders = {
  in_moderation: 0,
  awaiting_payment: 1,
  wait_unloading: 3,
  in_process: 5,
  waitingFor_completion: 8,
};

const OrderStatus = ({ status }) => {
    return (
        <div
            className={cn(
                styles['orderStatus'], {
                    [styles.in_moderation]: status === statusOrders.in_moderation,
                    [styles.awaiting_payment]: status === statusOrders.awaiting_payment,
                    [styles.wait_unloading]: status === statusOrders.wait_unloading,
                    [styles.in_process]: status === statusOrders.in_process,
                    [styles.waitingFor_completion]: status === statusOrders.waitingFor_completion,
                }
            )}
        ></div>
    );
};

export default OrderStatus;



