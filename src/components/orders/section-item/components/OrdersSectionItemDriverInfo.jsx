import React, {useEffect, useState} from 'react';
import OrdersSectionItemDriverCard from "./OrdersSectionItemDriverCard";
import Collapse from "../../../shared/Collapse";
import OrdersSectionItemInfoColumn from "./OrdersSectionItemInfoColumn";
import {Order, User} from "../../../../services";
import {isMobile} from "react-device-detect";
import moment from "moment/moment";

const OrdersSectionItemDriverInfo = ({driverId}) => {
  const [driverInfo, setDriverInfo] = useState(null);

  useEffect(() => {

    if (!driverId) {
      console.log("driverId не предоставлен");

      return
    }

    Order.getDriverInfo(driverId)
      .then(response => {

        if (response.status == 200) {
          setDriverInfo(response.data ? response.data : {});
        } else {
          setDriverInfo(null)
        }
      }).catch(error => {
      console.log("Ошибка при получении информации о водителе:", error);
    });
  }, [driverId])

  if (!driverInfo || !driverInfo.name) {
    return "Водитель не назначен";
  }

  const checkContent = content => content || "-"
  return (
    <>
      <OrdersSectionItemDriverCard fio={driverInfo?.surname + ' ' + driverInfo?.name} id={driverId}/>
      <Collapse gridCol={isMobile ? 1 : 2} gridGap={isMobile ? 10 : 20} isDisplay={true}>
        <OrdersSectionItemInfoColumn title="Гос. номер грузовика">
          {checkContent(driverInfo.carNumber)}
        </OrdersSectionItemInfoColumn>

        <OrdersSectionItemInfoColumn title="Модель грузовика">
          {checkContent(driverInfo.trailerModel)}
        </OrdersSectionItemInfoColumn>

        <OrdersSectionItemInfoColumn title="Гос. номер прицепа">
          {checkContent(driverInfo.trailerNumber)}
        </OrdersSectionItemInfoColumn>

        <OrdersSectionItemInfoColumn title="Тип транспорта">
          {checkContent(driverInfo.carModel)}
        </OrdersSectionItemInfoColumn>

        <OrdersSectionItemInfoColumn title="ИИН">
          {checkContent(driverInfo.iin)}
        </OrdersSectionItemInfoColumn>

        <OrdersSectionItemInfoColumn title="Номер удостоверения">
          {checkContent(driverInfo.idNumber)}
        </OrdersSectionItemInfoColumn>

        <OrdersSectionItemInfoColumn title="Когда выдан ИИН">
          {driverInfo.issuedDate && moment(driverInfo.issuedDate).format("DD MMMM YYYY")}
        </OrdersSectionItemInfoColumn>

        <OrdersSectionItemInfoColumn title="Кем присвоен ИИН">
          {checkContent(driverInfo.issuedBy)}
        </OrdersSectionItemInfoColumn>
      </Collapse>
    </>
  );
};

export default OrdersSectionItemDriverInfo;