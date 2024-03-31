import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import style from '../common.module.scss';
import OrdersSectionItemTableStatusLine from './OrdersSectionItemTableStatusLine';
import { numberToFinanceFormat } from '../../../../utils';
import Loading from '../../../invoices/Loading';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import EmptyIcon from "../../../shared/icons/EmptyIcon";


moment.locale('ru');

const OrdersSectionItemTable = ({
                                isLoading = false,
                                items = [],
                                isExpeditor = false,
                                sortColumn = null,
                                changeSortColumn,
                              }) => {
const navigate = useNavigate();

const onSortColumn = (keyField) => {
  if (!sortColumn) {
    changeSortColumn({ [keyField]: 'asc' });
  } else if (sortColumn[keyField] === 'asc') {
    changeSortColumn({ [keyField]: 'desc' });
  } else {
    changeSortColumn(null);
  }
};

return (
  <div className={cn(style.mobile_wrapper)}>
    {isLoading ? (
      <Loading inBlock />
    ) : !items.length ? (
      <div className="text-center mb-4">
          <EmptyIcon/>
          <div className={style.empty_text}>Здесь пока пусто</div>
      </div>

    ) : (
      items.map((item, idx) => (
        <div key={item.number + idx} className={style.mobile_order_container} onClick={() => navigate('/order/' + item.id)}>
          <div className={style.mobile_order_row}>
            <div className={style.mobile_order_number}>№ {item.number}</div>
            <div className={style.mobile_order_price}>{numberToFinanceFormat(isExpeditor ? item.netPrice : item.price)} ₸</div>
          </div>
          <div className={style.mobile_order_address}>
            <div className={style.dots}><div className={style.mobile_order_palka}></div></div>
            <div className={style.mobile_order_cityName}>{item.cityFromName}
            </div>

            <div className={style.mobile_order_date}>
              {moment.utc(item.shippingDate).format('DD.MM')}
            </div>
          </div>
          <div className={style.mobile_order_address}>
            <div className={style.dots}></div>
            <div className={style.mobile_order_cityName}>{item.cityToName}</div>
            <div className={style.mobile_order_date}>
              {moment.utc(item.unloadingDate).format('DD.MM')}
            </div>
          </div>
          <div className={style.mobile_order_status}>
            <OrdersSectionItemTableStatusLine status={item.status} />
          </div>
          <div className={style.mobile_order_line}></div>
        </div>
      ))
    )}
  </div>
  );
};

export default OrdersSectionItemTable;
