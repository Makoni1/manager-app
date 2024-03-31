import React, { useEffect, useState } from 'react';
import style from "./index.module.scss"
import WrapperContent from "../../../components/shared/WrapperContent";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CloseIcon from "../../../components/shared/icons/CloseIcon";
import InputCustom from "../../../components/shared/forms/input-custom";
import CardIcon from "../../../components/shared/icons/CardIcon";
import AvatarCameraIcon from "../../../components/shared/icons/AvatarCameraIcon";
import cn from 'classnames';
import Loading from '../../../components/invoices/Loading';
import { Driver, File, Order } from '../../../services';
import { toast } from 'react-toastify';
import { requestErrorDisplay } from '../../../utils';
import { useSelector } from 'react-redux';
import SelectCustom from '../../../components/shared/forms/select-custom';
import ArrowRightRotateIcon from '../../../components/shared/icons/ArrowRightRotateIcon';

const CarsCreatePage = () => {
  const { user } = useSelector(state => state);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const carsUrl = "/cars"
  const backUrl = searchParams.get("redirectUrl") ? searchParams.get("redirectUrl") + "?open=1" : carsUrl
  const [isLoading, setLoading] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState([]);
  const [types, setTypes] = useState([]);

  // Form data
  const [carModel, setCarModel] = useState("");
  const [numberCar, setNumberCar] = useState("");
  const [trailerModel, setTrailerModel] = useState("");
  const [trailerNumber, setTrailerNumber] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [loadingType, setTypeLoading] = useState(null);
  const [carPhoto, setCarPhoto] = useState(null);
  const [carIdPhoto, setCarIdPhoto] = useState(null);
  const [carIdTrailerPhoto, setCarIdTrailerPhoto] = useState(null);

  const getDefaultData = async () => {
    // await Driver.getVehicleLoadingTypes()
    await Order.getLoadingTypesDisc()
      .then(response => {
        setLoadingTypes(response.data);
      })
      .catch(error => {
        requestErrorDisplay(error)
      });

    // await Driver.getVehicleTypes()
    await Order.getTypes()
      .then(response => {
        setTypes(response.data);
      })
      .catch(error => {
        requestErrorDisplay(error)
      });
  }

  const validateFormatData = () => {
    if (!carModel) {
      toast.error("Не корректно заполнено поле Модель автомобиля")
      return false
    }

    if (!numberCar) {
      toast.error("Не корректно заполнено поле Гос номер автомобиля")
      return false
    }

    if (!trailerModel) {
      toast.error("Не корректно заполнено поле Модель прицепа")
      return false
    }

    if (!trailerNumber) {
      toast.error("Не корректно заполнено поле Гос номер прицепа")
      return false
    }
    if (!vehicleType) {
      toast.error("Не корректно заполнено поле Тип прицепа")
      return false
    }
    if (!loadingType) {
      toast.error("Не корректно заполнено поле Тип погрузки")
      return false
    }
    if (!carPhoto) {
      toast.error("Не корректно заполнено поле Фото автомобиля")
      return false
    }
    if (!carIdPhoto) {
      toast.error("Не корректно заполнено поле Свидетельство о регистрации автомобиля")
      return false
    }
    if (!carIdTrailerPhoto) {
      toast.error("Не корректно заполнено поле Свидетельство о регистрации прицепа")
      return false
    }
    return true
  }

  const onSubmit = () => {
    if (!validateFormatData()) {
      return false
    }
    setLoading(true)

    const data = {
      carModel,
      numberCar,
      trailerNumber,
      trailerModel: trailerModel,
      loadingTypeId: loadingType?.id,
      vehicleTypeId: vehicleType?.id,
    }

    Driver.createVehicleByExpeditor(user.id, data)
      .then(res => res.data)
      .then(async data => {
        const vehicleId = data.id
        if (carPhoto) {
          await uploadFile({
            vehicleId,
            side: 0,
            file: carPhoto,
            type: 5 // Автомобиль
          })
        }
        if (carIdPhoto) {
          await uploadFile({
            vehicleId,
            side: 0,
            file: carIdPhoto,
            type: 4 // Тех. паспорт
          })
        }
        if (carIdTrailerPhoto) {
          await uploadFile({
            vehicleId,
            side: 0,
            file: carIdTrailerPhoto,
            type: 7 //  фото тех паспорта прицепа
          })
        }
        toast.success("Автомобиль успешно добавлен")
        // toast.info("Автомобиль будет доступен для назначения в заявки после того как пройдет модерацию", { delay: 2000 })
        navigate(backUrl)
      })
      .catch(error => {
        requestErrorDisplay(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const uploadFile = (data) => {
    const Formdata = new FormData()
    for (const dataKey in data) {
      Formdata.append(dataKey, data[dataKey])
    }
    return File.addVehicleFile(Formdata)
  }

  useEffect(() => {
    getDefaultData()
  }, [])

  return (
    <WrapperContent>
      <div className={style.wrapper}>
        <h1 className={style.title}>Добавить автомобиль</h1>
        <div className={style.content}>
          <div className={style.field}>
            <span className={style.field_label}>Модель автомобиля</span>
            <InputCustom
              placeholder="Введите модель"
              prefixStart={<CardIcon />}
              defaultValue={carModel}
              onChangeValue={setCarModel}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Гос. номер автомобиля</span>
            <InputCustom
              placeholder="А123АА"
              prefixStart={<CardIcon />}
              defaultValue={numberCar}
              onChangeValue={setNumberCar}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Модель прицепа</span>
            <InputCustom
              placeholder="Введите модель"
              prefixStart={<CardIcon />}
              defaultValue={trailerModel}
              onChangeValue={setTrailerModel}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Гос. номер прицепа</span>
            <InputCustom
              placeholder="А123АА"
              prefixStart={<CardIcon />}
              defaultValue={trailerNumber}
              onChangeValue={setTrailerNumber}
            />
          </div>
          <div className={style.field} style={{ position: "relative", zIndex: "2" }}>
            <span className={style.field_label}>Тип прицепа</span>
            <SelectCustom
              placeholder="Выбрать"
              options={types}
              defaultValue={vehicleType}
              returnObject
              bgGray
              IconStart={<CardIcon />}
              onSubmit={setVehicleType}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Тип погрузки</span>
            <SelectCustom
              placeholder="Выбрать"
              options={loadingTypes}
              defaultValue={loadingType}
              returnObject
              bgGray
              IconStart={<CardIcon />}
              onSubmit={setTypeLoading}
            />
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Фото автомобиля</span>
            <div className={style.field_col_2}>
              <label className={style.field_upload}>
                <AvatarCameraIcon fill={"#C3C5CA"} />
                <span>{carPhoto?.name || 'Добавить фото'}</span>
                <input
                  type="file"
                  accept="image/webp, image/pbm, image/gif, image/jpeg, image/png, image/tiff"
                  onChange={(event) => setCarPhoto(event.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Свидетельство о регистрации автомобиля</span>
            <div className={style.field_col_2}>
              <label className={style.field_upload}>
                <AvatarCameraIcon fill={"#C3C5CA"} />
                <span>{carIdPhoto?.name || 'Добавить фото'}</span>
                <input
                  type="file"
                  accept="image/webp, image/pbm, image/gif, image/jpeg, image/png, image/tiff"
                  onChange={(event) => setCarIdPhoto(event.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className={style.field}>
            <span className={style.field_label}>Свидетельство о регистрации прицепа</span>
            <div className={style.field_col_2}>
              <label className={style.field_upload}>
                <AvatarCameraIcon fill={"#C3C5CA"} />
                <span>{carIdTrailerPhoto?.name || 'Добавить фото'}</span>
                <input
                  type="file"
                  accept="image/webp, image/pbm, image/gif, image/jpeg, image/png, image/tiff"
                  onChange={(event) => setCarIdTrailerPhoto(event.target.files[0])}
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

export default CarsCreatePage;