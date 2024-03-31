import React from 'react';
import cn from 'classnames';
import style from '../common.module.scss';
// import iconStatusOnHold from '../../../../../../public/icons/status/onHold.svg';
// import iconStatusPaid from '../../../../../../public/icons/status/Paid.svg';

const BALANCE_STATUS = {
    "onHold": { title: 'На удержании', statusIcon: 'onHold.svg' },
    "paid": { title: 'Оплачено', statusIcon: 'Paid.svg' }
};

const BalanceSectionItemTableStatus = ({ status, displayText = true }) => {
    const statusData = BALANCE_STATUS[status] || { title: 'На удержании', statusIcon: 'Paid.svg' };
    console.log(status)

    const iconPath = statusData.statusIcon ? "/icons/status/" + statusData.statusIcon : null;

    return (
        <div className={cn(style.table_col_status)}>
            {iconPath && <img src={iconPath} alt={status} />}
            { displayText && <div className={cn(style.title)}>{statusData.title}</div> }
        </div>
    );
};

export default BalanceSectionItemTableStatus;
