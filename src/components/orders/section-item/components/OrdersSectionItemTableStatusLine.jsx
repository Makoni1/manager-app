import React, {useMemo} from 'react';
import cn from "classnames";
import style from "../common.module.scss"
import { ORDER_STATUSES_DATA } from '../../../../mock';

const OrdersSectionItemTableStatusLine = ({ status }) => {
  const setBgColor = (statuses) => {
    return statuses.includes(status) ? ORDER_STATUSES_DATA[status]?.color : ''
  }
  return (
    <div className={cn(style.table_col_statusLine)}>
      <h6 className={cn(style.mobile_statusLineTitle)}>{ ORDER_STATUSES_DATA[status]?.title || status }</h6>
      <div className="d-flex align-items-center gap-1">
        <span style={{ backgroundColor: setBgColor([
          'moderation',
          'published',
          'waitstarttrip',
          'awaitingpayment',
          'waitingforcompletion',
          'inprocess',
          'onthetrip',
          'waitloadingcargo',
          'completed',
          'rejectedunloadingcargomoderation',
          'unloadingcargomoderation',
          'processunloadingcargo',
          'processloadingcargo',
          'unloadingcargo',
          'loadingcargo',
          'waitcompletion',
          'canceled',
          'booked',
          'rejected',
          'confirmed'
          ]) }}></span>
        <span style={{ backgroundColor: setBgColor([
            'waitingforcompletion',
            'awaiting-loading',
            'inprocess',
            'waitstarttrip',
            'processunloadingcargo',
            'processloadingcargo',
            'rejectedunloadingcargomoderation',
            'unloadingcargomoderation',
            'unloadingcargo',
            'loadingcargo',
            'onthetrip',
            'completed',
            'waitcompletion',
            'canceled',
            'rejected',
            'confirmed'
          ]) }}></span>
        <span style={{ backgroundColor: setBgColor([
            'inprocess',
            'onthetrip',
            'waitstarttrip',
            'waitingforcompletion',
            'unloadingcargo',
            'loadingcargo',
            'completed',
            'canceled',
            'waitcompletion',
            'rejected',
            'confirmed'
          ]) }}></span>
        <span style={{ backgroundColor: setBgColor([
            'completed',
            'waitcompletion',
            'canceled',
            'rejected',
          ]) }}></span>
      </div>
    </div>
  );
};

export default OrdersSectionItemTableStatusLine;