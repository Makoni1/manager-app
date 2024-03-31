import React, {useState} from 'react';
import style from "./ConfirmDocs.module.css"
import VerificationIcon from "../../shared/icons/VerificationIcon";
import UploadIcon from "../../shared/icons/UploadIcon";
import cn from "classnames"
import CheckmarkIcon from "../../shared/icons/CheckmarkIcon";
import {File} from "../../../services";
import {toast} from "react-toastify";
import {useAmplitude} from "../../../hooks/useAmplitude";
import {requestErrorDisplay} from "../../../utils";

const ConfirmDocs = ({ userId, updateData, onClose }) => {
  const { amplitude } = useAmplitude()
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [registrationCertificate, setRegistrationCertificate] = useState(null);
  const [orderOfAppointment, setOrderOfAppointment] = useState(null);

  // TODO refactoring
  const onHandleSubmit = () => {
    console.log('files data ==>', registrationCertificate, orderOfAppointment);
    if (!registrationCertificate || !orderOfAppointment || isLoading) {
      toast.error("Загрузите файлы или подождите пока загрузиться")
      return
    }

    // send amplitude track
    amplitude.sendDocsToVerify()

    setLoading(true)
    const formData1 = new FormData();
    formData1.append("file", registrationCertificate);
    formData1.append("type", 0)
    formData1.append("userId", userId)
    const formData2 = new FormData();
    formData2.append("file", orderOfAppointment);
    formData2.append("type", 2);
    formData2.append("userId", userId);
    Promise.all([ File.add(formData1), File.add(formData2) ])
      .then(responses => {
      if (responses && responses.length && responses[0].status == 200 && responses[1].status == 200) {
        // setLoading(false);
        setSuccess(true)
        updateData()
      } else {
        setRegistrationCertificate(null);
        setOrderOfAppointment(null);
        toast.error("При загрузке файлов произошла ошибка (неверный формат файла или слишком большой размер файла),попробуйте заново загрузить!")
      }
    }).catch(error => {
      requestErrorDisplay(error, "При загрузке файлов произошла ошибка (неверный формат файла или слишком большой размер файла),попробуйте заново загрузить!")
      setLoading(false);
    }).finally(() => {
      setRegistrationCertificate()
      setOrderOfAppointment()
      setLoading(false);
    });
  }

  if (isSuccess) {
    return (
      <div className={style.confirm}>

        {/* Title */}
        <h2 className={style.title}>Документы на модерации</h2>

        {/* Summary */}
        <p className={style.summary}>
          Скоро вы сможете продолжить управлять заказами. Обычно это занимает не более 10 минут
        </p>

        {/* Submit */}
        <button
          className={cn(style.btn)}
          onClick={() => onClose()}
        >
          Закрыть
        </button>
      </div>
    )
  }
  return (
    <div className={style.confirm}>

      {/* Icon */}
      <VerificationIcon className={style.icon} />

      {/* Title */}
      <h2 className={style.title}>Верификация отправителя</h2>

      {/* Summary */}
      <p className={style.summary}>
        Загрузите документы, чтобы подтвердить аккаунт <br/> и работать с заказами
      </p>

      {/* First input */}
      <label
        htmlFor="first"
        className={cn(style.list, { [style.uploaded]: !!registrationCertificate })}
        data-file-name={registrationCertificate && registrationCertificate.name}
      >
        <div>
          <p>Свидетельство о регистрации</p>
          <span>
            { registrationCertificate ? 'Заменить' : 'Фото или скан документа' }
          </span>
          <input type="file" id="first" accept="image/gif,image/png,image/jpeg,application/pdf" onChange={(event) => setRegistrationCertificate(event.target.files[0])} />
        </div>
        { registrationCertificate ? <CheckmarkIcon /> : <UploadIcon /> }
      </label>

      {/* Second input */}
      <label
        htmlFor="last"
        className={cn(style.list, { [style.uploaded]: !!orderOfAppointment })}
        data-file-name={orderOfAppointment && orderOfAppointment.name}
      >
        <div>
          <p>Приказ о назначении</p>
          <span>
            { orderOfAppointment ? 'Заменить' : 'Фото или скан документа' }
          </span>
          <input type="file" id="last" accept="image/gif,image/png,image/jpeg,application/pdf" onChange={(event) => setOrderOfAppointment(event.target.files[0])} />
        </div>
        { orderOfAppointment ? <CheckmarkIcon /> : <UploadIcon /> }
      </label>

      {/* Summary */}
      <p className={cn(style.summary2, { [style.hide]: !registrationCertificate || !orderOfAppointment })}>
        Нажимая на кнопку, вы подтверждаете, что согласны с <a href="">Условиями использования</a> сервиса Biny
      </p>

      {/* Submit */}
      <button
        className={cn(style.btn, {
          [style.hide]: !registrationCertificate || !orderOfAppointment,
          [style.loading]: isLoading })
        }
        onClick={() => onHandleSubmit()}
      >
        Отправить
      </button>
    </div>
  );
};

export default ConfirmDocs;