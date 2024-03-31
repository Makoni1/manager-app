import React from 'react';
import styles from "./BalanceBillContent.module.scss"
import {numberToFinanceFormat} from "../../../utils";
const BalanceAccount = ({title, icon, bill, quantity}) => {
  return(
    <div className={styles['balance__account']}>
      <div className={styles['balance__account-header']}>
        <div className={styles['balance__account-title']}>{title}</div>
        <div className={styles['balance__account-icon']}>{icon}</div>
      </div>
      <div className={styles['balance__account-bill']}>{numberToFinanceFormat(bill || 0)} ₸</div>
      <div className={styles['balance__account-quantity']}>{quantity}</div>
    </div>
  )
}

export default BalanceAccount;