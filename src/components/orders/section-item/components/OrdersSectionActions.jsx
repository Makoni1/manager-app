import React, {useState} from 'react';
import style from "../common.module.scss"
import cn from "classnames";
import {useNavigate} from "react-router-dom";
import EditIcon from "../../../shared/icons/EditIcon";
import CopyIcon from "../../../shared/icons/CopyIcon";
import SupportIcon from "../../../shared/icons/SupportIcon";
import CancelIcon from "../../../shared/icons/CancelIcon";
import OrderEditeModal from "../../../order/info/OrderEditeModal";
import OrderCopyModal from "../../../order/info/OrderCopyModal";
import SupportModal from "../../../shared/SupportModal";
import CancelApp from "../../../order/info/CancelApp";
import {File} from "../../../../services";

const OrdersSectionActions = ({
                                order,
                                onForceUpdate
                              }) => {
  const navigate = useNavigate()
  const [infoModal, setInfoModal] = useState(false);
  const [isCancel, setCancelModal] = useState(false);
  const [copyModal, setCopyModal] = useState(false);
  const [support, setSupportModal] = useState(false);

  const handleGenerateDoc = (id) => {
    File.getDocApp(id)
      .then((response) => {
        console.log(response);
        const file = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
        alert("Произошла ошибка, попробуйте позже");
      });
  };
  return (
    <div className={cn("d-flex flex-wrap", style.actions)}>
      <button className={cn(style.actions_button, style.cardItem)} type="button" onClick={() => setInfoModal(true)}>
        <EditIcon/>
        <span>Редактировать</span>
      </button>
      <button className={cn(style.actions_button, style.cardItem)} type="button" onClick={() => setCopyModal(true)}>
        <CopyIcon/>
        <span>Копировать заказ</span>
      </button>
      <button className={cn(style.actions_button, style.cardItem)} type="button" onClick={() => setSupportModal(true)}>
        <SupportIcon fill={"#8B8C90"} />
        <span>Поддержка</span>
      </button>
      <button className={cn(style.actions_button, style.cardItem)} type="button" onClick={() => setCancelModal(true)}>
        <CancelIcon fill={"#C5115E"} />
        <span>Отозвать заказ</span>
      </button>
      {!['published', 'moderation', 'awaitingpayment'].includes(order.status) &&
        <button className={cn(style.actions_button, style.cardItem)} type="button"
                onClick={() => handleGenerateDoc(order.id)}>
          {/*<CancelIcon />*/}
          <span>Сформировать заказ</span>
        </button>}

      {infoModal && <OrderEditeModal
        item={order}
        onClose={() => setInfoModal(false)}
        onUpdateData={() => onForceUpdate()}
      />}
      {copyModal && <OrderCopyModal
        item={order}
        onClose={() => setCopyModal(false)}
        onUpdateData={id => {
          navigate("/order/" + id);
          onForceUpdate()
        }}
      />}
      {support &&
        <SupportModal
          display={support}
          onClose={() => setSupportModal(false)}
          displayHeader={false}
        />
      }
      {isCancel &&
        <CancelApp
          item={order}
          onClose={() => setCancelModal(false)}
          onUpdateData={() => onForceUpdate()}
        />
      }

    </div>
  );
};

export default OrdersSectionActions;