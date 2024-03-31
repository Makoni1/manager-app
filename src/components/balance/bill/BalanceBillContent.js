import React, {useEffect, useState} from 'react';
import styles from './BalanceBillContent.module.scss'
import {useSelector} from "react-redux";
import BalanceAccount from "./BalanceAccount";
import {Invoice} from "../../../services";


const BalanceBillContent = ( ) => {
    const {user} = useSelector(state => state);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        if (user && user.id) {
            Invoice.getBalanceInfo(user.id).then((response) => {
                console.log('Invoices responce', response.data);
                if(response.status == 200) {
                    setAccount(response.data)
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }, [user]);

    const formattedDate = account?.filled ? new Date(account.filled).toLocaleDateString('ru-RU') : 'неизвестно';

    return (
        <div className={styles['balance__content']}>
            <BalanceAccount
                icon={(<img src="/icons/balance-status/paid.svg" />)}
                // quantity={accounts?.filled || 0}
                quantity={'пополнен: ' + formattedDate}
                title="Доступно"
                bill={user?.balance}
                className={styles['balance__item']}
            />
            <BalanceAccount
                icon={(<img src="/icons/balance-status/onHold.svg" />)}
                // quantity={accounts?.onHoldOrdersCount || 0}
                quantity={account?.onHoldOrdersCount + ' заказа'}
                title="На удержании"
                bill={user?.moneyOnHold}
                className={styles['balance__item']}
            />
            <BalanceAccount
                icon={(<img src="/icons/balance-status/paid.svg" />)}
                // quantity={accounts?.totalPaidOrdersCount || 0}
                quantity={account?.totalPaidOrdersCount + ' заказа' }
                title="Оплачено всего"
                bill={user?.totalPaid}
                className={styles['balance__item']}
            />
        </div>
    );
};

export default BalanceBillContent;