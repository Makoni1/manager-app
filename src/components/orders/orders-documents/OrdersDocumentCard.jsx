import React from 'react';
import DocumentIcon from "../../shared/icons/DocumentIcon";
import PlusIcon from "../../shared/icons/PlusIcon";
import cn from "classnames";
import commonStyle  from "../section-item/common.module.scss"
import style from "./index.module.scss";
import CloseIcon from "../../shared/icons/CloseIcon";
import {File} from "../../../services";
import {toast} from "react-toastify";

const OrdersDocumentCard = ({
  fileId = null,
  text = "",
  isAddButton = false,
  allowClearFile = false,
  onUploadFile,
  onClearFile,
  withIcon = true
}) => {
  const randomId = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
  const handleEvent = (event) => {
    if (isAddButton) {
      onUploadFile(event.target.files[0])
    }
  }

  const downloadFile = () => {
    console.log("fileId", fileId)
    if (!fileId) {
      return
    }
    toast.info("Запрос на получение файла, отправлен.")
    File.downloadFileById(fileId)
      .then(res => res.data)
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        toast.error("Произошла ошибка, попробуйте позже")
      })
  }

  if (isAddButton) {
    return (
      <label
        htmlFor={"upload-files-" + randomId}
        className={cn(style.documentCard, commonStyle.cardItem, style.documentCard_add)}
      >
        <PlusIcon className={style.documentCard_icon} />
        <span className={style.documentCard_text}>{ text || "Добавить документ"}</span>
        <input
          className={'position-absolute'}
          id={"upload-files-" + randomId}
          type="file"
          onChange={handleEvent}
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
        />
      </label>
    )
  }
  return (
    <div className={cn(style.documentCard, commonStyle.cardItem, {
      [style.cursor]: fileId
    })} onClick={downloadFile}>
      { withIcon && <DocumentIcon className={style.documentCard_icon} /> }
      <span className={style.documentCard_text}>{text}</span>
      {
        allowClearFile && <span className={style.documentCard_close}>
          <CloseIcon width={16} height={16} onClick={onClearFile} fill={'#909195'} />
        </span>
      }
    </div>
  );
};

export default OrdersDocumentCard;