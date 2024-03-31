import React, {useState} from 'react';
import style from "./index.module.scss"
import cn from "classnames";
import InputCustom from "../../shared/forms/input-custom";
import OrdersSectionItemInfoColumn from "../section-item/components/OrdersSectionItemInfoColumn";
import OrdersDocumentCard from "../orders-documents/OrdersDocumentCard";

const CargoInsurance = ({
  defaultValue = false,
  onClick,
  declaredPrice,
  setDeclaredPrice,
  fileInvoice,
  setInvoiceFile,
  detect,
}) => {
  const getFile = event => {
    setInvoiceFile(event)
    if (detect) detect()
  }
  return (
    <div className={style.wrapper}>
      <div className={style.checkbox_wrapper}>
        <div className={cn(style.checkbox, { [style.checkbox_select]: defaultValue })} onClick={() => onClick(!defaultValue)}></div>
        <div className={style.checkbox_content}>
          <p>Включить страхование</p>
          <span>Составляет 0,3% от объявленной стоимости груза</span>
        </div>
      </div>
      { defaultValue && (
        <>
          <OrdersSectionItemInfoColumn title="Объявленная стоимость">
            <InputCustom
              inputType={'number'}
              placeholder="0"
              prefixEnd="₸"
              defaultValue={declaredPrice}
              onChangeValue={(item) => {
                setDeclaredPrice(item)
                if (detect) detect()
              }}
            />
          </OrdersSectionItemInfoColumn>
          <OrdersSectionItemInfoColumn title="Инвойс (необязательно)">
            <div className={style.btnUpload}>
              <OrdersDocumentCard
                key={'fileInvoice-add'}
                isAddButton text="Загрузить Инвойс"
                onUploadFile={getFile}
              />
            </div>
          </OrdersSectionItemInfoColumn>
        </>
      )}
      { fileInvoice?.name && <OrdersDocumentCard
        key={'fileInvoice-' + fileInvoice.size}
        text={fileInvoice.name}
        allowClearFile
        onClearFile={() => setInvoiceFile(null)}
      />}
    </div>
  );
};

export default CargoInsurance;