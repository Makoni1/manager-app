import React from 'react';
import styles from "./style.module.scss"
import {numberToFinanceFormat} from "../../../../utils";
const ProfileCompanyCount = ({ totalCount, totalSum} ) => {
    const averagePrice = totalSum / totalCount;
    const averagePriceDisplay = isNaN(averagePrice) ? 0 : averagePrice;
    return (
        <div className={styles['profile__company-count']}>
            <div className={styles['profile__order']}>
                <div className={styles['profile__order-title']}>Заявок завершено</div>
                <div className={styles['profile__order-subtitle']}>{totalCount}</div>
            </div>
            <div className={styles['profile__order']}>
                <div className={styles['profile__order-title']}>Сумма оплат</div>
                <div className={styles['profile__order-subtitle']}>{numberToFinanceFormat(totalSum)} ₸ </div>
            </div>
            <div className={styles['profile__order']}>
                <div className={styles['profile__order-title']}>Средняя цена</div>
                <div className={styles['profile__order-subtitle']}>{numberToFinanceFormat(averagePriceDisplay)} ₸  </div>
            </div>
        </div>
    );
};

export default ProfileCompanyCount;