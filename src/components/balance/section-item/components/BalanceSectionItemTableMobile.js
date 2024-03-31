import React, {useEffect, useMemo, useState} from 'react';
import cn from "classnames";
import style from "../common.module.scss"
import BalanceSectionItemTableStatus from "./BalanceSectionItemTableStatus";
import Loading from "../../../invoices/Loading";
import {numberToFinanceFormat} from "../../../../utils";
import moment from "moment/moment";
import EmptyIcon from "../../../shared/icons/EmptyIcon";


const BalanceSectionItemTableMobile = ({
                                         isLoading = false,
                                         items = [],
                                         isExpeditor = false,
                                         sortColumn = null,
                                         changeSortColumn }) => {


  return (
    <div className={cn(style.mobile_wrapper)}>
      { isLoading
        ? <Loading inBlock />
        : !items.length
          ? (
            <div className="text-center mb-4">
              <EmptyIcon/>
              <div className={style.empty_text}>Здесь пока пусто</div>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={item.number + idx} className={style.mobile_balance_container} onClick={() => navigate('/order/' + item.id)}>
                <div className={style.mobile_balance_row}>
                  <div className={style.mobile_balance_number}>№ {item.number}</div>
                  <div className={style.mobile_balance_priceStatus}>
                    <BalanceSectionItemTableStatus status={item.status} displayText={false} />
                    <div className={style.mobile_balance_price}>{numberToFinanceFormat(isExpeditor ? item.netPrice : item.price)} ₸</div>
                  </div>
                </div>

                <div className={style.mobile_balance_address}>
                    {item.cityFromName} - {item.cityToName}
                </div>

                <div className={style.mobile_balance_date}>
                  <div className={style.mobile_balance_shippingDate}>
                    {moment.utc(item.shippingDate).format('DD.MM')}
                  </div>

                  <div className={style.mobile_balance_shippingTime}>
                    {moment(item.shippingDate).format("HH:mm")}
                  </div>
                </div>
                <div className={style.mobile_balance_line}></div>
              </div>
            ))
          )}
    </div>
  );
};

export default BalanceSectionItemTableMobile;