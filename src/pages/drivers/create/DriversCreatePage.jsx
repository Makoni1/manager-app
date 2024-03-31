import React, { useState, useEffect } from 'react';
import style from "./index.module.scss"
import WrapperContent from "../../../components/shared/WrapperContent";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CloseIcon from "../../../components/shared/icons/CloseIcon";
import InputCustom from "../../../components/shared/forms/input-custom";
import UserIcon from "../../../components/shared/icons/UserIcon";
import PhoneIcon from "../../../components/shared/icons/PhoneIcon";
import EmailIcon from "../../../components/shared/icons/EmailIcon";
import CardIcon from "../../../components/shared/icons/CardIcon";
import AvatarCameraIcon from "../../../components/shared/icons/AvatarCameraIcon";
import { Driver, File } from '../../../services';
import { requestErrorDisplay } from '../../../utils';
import InputMask from 'react-input-mask';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Loading from '../../../components/invoices/Loading';
import cn from 'classnames';

const PHONE_MASK = '+79999999999';

const DriversCreatePage = () => {
  const { user } = useSelector(state => state);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const driversUrl = "/drivers"
  const backUrl = searchParams.get("redirectUrl") ? searchParams.get("redirectUrl") : driversUrl
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [iin, setIin] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [carIdPhotoOne, setCarIdPhotoOne] = useState(null);
  const [carIdPhotoTwo, setCarIdPhotoTwo] = useState(null);
  const [userIdPhotoOne, setUserIdPhotoOne] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);
  const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');

  const validateFormatData = () => {
    if (!name || name.trim().split(" ").length < 2) {
      toast.error("Не корректно заполнено поле ФИО")
      return false
    }

    if (!phoneNumber) {
      toast.error("Не корректно заполнено поле Номер телефона")
      return false
    }

    // if (!email) {
    //   toast.error("Не корректно заполнено поле Email")
    //   return false
    // }

    if (!idNumber || idNumber.length !== 9) {
      toast.error("Не корректно заполнено поле Номер удостоверения")
      return false
    }

    if (!iin || iin.length !== 12) {
      toast.error("Не корректно заполнено поле Номер ИИН")
      return false
    }

    if (!issuedBy) {
      toast.error("Не корректно заполнено поле Кем выдан")
      return false
    }

    if (!issuedDate) {
      toast.error("Не корректно заполнено поле Дата выдачи")
      return false
    }

    if (!carIdPhotoOne || !carIdPhotoTwo) {
      toast.error("Не корректно заполнено поле Фото водительского удостоверения (лицевая и обратная сторона)")
      return false
    }

    if (!userIdPhotoOne) {
      toast.error("Не корректно заполнено поле Фото удостоверения")
      return false
    }

    if (!userPhoto) {
      toast.error("Не корректно заполнено поле Селфи водителя с водительским удостоверением")
      return false
    }
    return true
  }
  const onSubmit = () => {
    if (!validateFormatData()) {
      return false
    }
    setLoading(true)
    const fio = name.split(" ")
    const data = {
      "name": fio[0],
      "surname": fio[1],
      "patronymic": fio.join(" "),
      phoneNumber: phoneNumber.replace('+', ''),
      email,
      iin,
      idNumber,
    }

    Driver.createDriverByExpeditor(user.id, data)
      .then(res => res.data)
      .then(async data => {
        const driverId = data.id
        if (carIdPhotoOne) {
          await uploadFile({
            driverId,
            side: 0,
            file: carIdPhotoOne,
            type: 6 // Водительское удостоверение
          })
        }
        if (carIdPhotoTwo) {
          await uploadFile({
            driverId,
            side: 1,
            file: carIdPhotoTwo,
            type: 6 // Водительское удостоверение
          })
        }
        if (userIdPhotoOne) {
          await uploadFile({
            driverId,
            side: 0,
            file: userIdPhotoOne,
            type: 3 // Удостоверение личности
          })
        }
        if (userPhoto) {
          await uploadFile({
            driverId,
            side: 0,
            file: userPhoto,
            type: 8 // селфи
          })
        }
        toast.success("Водитель успешно добавлен")
        toast.info("Он будет доступен для назначения в заявки после того как пройдет модерацию", { delay: 2000 })
        navigate(backUrl)
      })
      .catch(error => {
        requestErrorDisplay(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    const checkPhoneNumber = async (number) => {
      try {
        const response = await fetch(`http://test-server.biny.co/api/v1/users/client/check/phone/${number}`);
        const data = await response.json();
        setPhoneNumberExists(data.isExists);
        setPhoneNumberErrorText(data.errorText);
      } catch (error) {
        console.error('Ошибка при проверке номера телефона:', error);
        setPhoneNumberExists(false);
        setPhoneNumberErrorText('Ошибка при проверке номера телефона');
      }
    };

    if (phoneNumber) {
      checkPhoneNumber(phoneNumber);
    }
  }, [phoneNumber]);

  const uploadFile = (data) => {
    const Formdata = new FormData()
    for (const dataKey in data) {
      Formdata.append(dataKey, data[dataKey])
    }
    return File.uploadDocumentDriver(Formdata)
  }

  return (
    <WrapperContent>
      <div className={style.wrapper}>
        <h1 className={style.title}>Добавить водителя</h1>
        <div className={style.content}>
          <div className={style.field}>
            <span className={style.field_label}>ФИО полностью</span>
            <InputCustom
              placeholder="Введите ФИО"
              defaultValue={name}
              onChangeValue={setName}
              prefixStart={<UserIcon />}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Номер телефона</span>
            <InputMask
              value={phoneNumber}
              maskChar={null}
              mask={PHONE_MASK}
              onChange={(event) => setPhoneNumber(event.target.value)}
              disabled={false}
            >
              {(inputProps) => (
                <InputCustom
                  {...inputProps}
                  placeholder={PHONE_MASK}
                  prefixStart={<PhoneIcon />}
                  defaultValue={phoneNumber}
                  onChangeValue={setPhoneNumber}
                />
              )}
            </InputMask>
            {phoneNumberExists && <p className={style.error_message}>{phoneNumberErrorText}</p>}
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Email
              <span className={style.optional}>(необязательное поле)</span>
            </span>
            <InputCustom
              defaultValue={email}
              onChangeValue={setEmail}
              placeholder="example@mail.com"
              prefixStart={<EmailIcon />}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Номер удостоверения</span>
            <InputCustom
              defaultValue={idNumber}
              onChangeValue={setIdNumber}
              placeholder="Введите"
              maxLength={9}
              prefixStart={<CardIcon />}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Номер ИИН</span>
            <InputCustom
              defaultValue={iin}
              onChangeValue={setIin}
              placeholder="Ввести"
              maxLength={12}
              prefixStart={<CardIcon />}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Кем выдан</span>
            <InputCustom
              defaultValue={issuedBy}
              onChangeValue={setIssuedBy}
              placeholder="Ввести"
              prefixStart={<CardIcon />}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Дата выдачи</span>
            <InputCustom
              defaultValue={issuedDate}
              onChangeValue={setIssuedDate}
              placeholder="DD-MM-YYYY"
              prefixStart={<CardIcon />}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Фото водительского удостоверения (лицевая и обратная сторона)</span>
            <div className={style.field_col_2}>
              <label className={style.field_upload}>
                <AvatarCameraIcon fill={"#C3C5CA"} />
                <span>{carIdPhotoOne?.name || 'Лицевая стороная'}</span>
                <input
                  type="file"
                  accept="image/webp, image/pbm, image/gif, image/jpeg, image/png, image/tiff"
                  onChange={(event) => setCarIdPhotoOne(event.target.files[0])}
                />
              </label>
              <label className={style.field_upload}>
                <AvatarCameraIcon fill={"#C3C5CA"} />
                <span>{carIdPhotoTwo?.name || 'Обратная стороная'}</span>
                <input
                  type="file"
                  accept="image/webp, image/pbm, image/gif, image/jpeg, image/png, image/tiff"
                  onChange={(event) => setCarIdPhotoTwo(event.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Фото удостоверения</span>
            <div className={style.field_col_2}>
              <label className={style.field_upload}>
                <AvatarCameraIcon fill={"#C3C5CA"} />
                <span><span>{userIdPhotoOne?.name || 'Лицевая стороная'}</span></span>
                <input
                  type="file"
                  accept="image/webp, image/pbm, image/gif, image/jpeg, image/png, image/tiff"
                  onChange={(event) => setUserIdPhotoOne(event.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Селфи водителя с водительским удостоверением</span>
            <div className={style.field_col_2}>
              <label className={style.field_upload}>
                <AvatarCameraIcon fill={"#C3C5CA"} />
                <span>{userPhoto?.name || 'Добавить фото'}</span>
                <input
                  type="file"
                  accept="image/webp, image/pbm, image/gif, image/jpeg, image/png, image/tiff"
                  onChange={(event) => setUserPhoto(event.target.files[0])}
                />
              </label>
            </div>
          </div>
          <button
            className={cn(style.button_upload, { [style.button_upload_loading]: isLoading })}
            onClick={() => onSubmit()}
          >
            {!isLoading && <span>Подтвердить</span>}
            {isLoading && <Loading inBlock marginBottom={0} />}
          </button>
        </div>
        <Link to={backUrl} className={style.buttonCancel}>
          Отмена
        </Link>
        <Link to={backUrl} className={style.buttonClose}>
          <CloseIcon />
        </Link>
      </div>
    </WrapperContent>
  );
};

export default DriversCreatePage;