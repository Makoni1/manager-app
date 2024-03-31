import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import {Link} from 'react-router-dom';
import cn from "classnames";
import InputMask from "react-input-mask";
import {toast} from "react-toastify";

import {get} from "../../../../services/config";
import {User} from '../../../../services';
import {validateEmail} from "../../../../utils/checkEmail";
import {requestErrorDisplay, validPhone} from "../../../../utils";
import {USER_TYPE} from "../RegistrationTypeUser/RegistrationTypeUser";

import stylesCommon from "../../common.module.scss";
import {useAmplitude} from "../../../../hooks/useAmplitude";

const BIN_LENGTH = 12

const FormRegistration = ({data}) => {
  const {amplitude} = useAmplitude()
  const [companyName, setCompanyName] = useState(data?.name || '');
  const [bin, setBin] = useState(data?.bin || '');
  const [email, setEmail] = useState(data?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || '');
  const [password, setPassword] = useState(data?.password || '');
  const [passwordConfirm, setPasspordConfirm] = useState(data?.passwordConfirm || '');
  const [passwordVisable, setPasswordVisable] = useState([]);
  const [errorTitle, setErrorTitle] = useState();
  const [errorTitlePhone, setErrorTitlePhone] = useState();
  const [errorTitleEmail, setErrorTitleEmail] = useState();
  const [errorTitleBin, setErrorTitleBin] = useState();
  const [errorTitleMessage, setErrorTitleMessage] = useState();
  const [binData, setBinData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [pendingCompanyName, setPendingCompanyName] = useState('');

  const [isBinValid, setIsBinValid] = useState(false);
  const phoneNumberMask = "+79999999999";

  const checkEmailNumber = (type, value) => {
    if (type === 'email') {
      setEmail(value.toLowerCase())
      if (validateEmail(value.toLowerCase())) getCheck(type, value.toLowerCase())
    } else if (type === 'phone') {
      setPhoneNumber(value)
      if (validPhone(value)) getCheck(type, value)
    }
  }

  const getCheck = (type, value) => {
    User.getCheck(type, value).then((response) => {
      if (response.status == 200) {
        if (response.data.isExists) {
          if (type == 'phone') toast.error("Пользователь с данным контактом уже существует")
          if (type == 'email') toast.error("Пользователь с данным емаил уже существует")
          if (type == 'bin') toast.error("Такой БИН организации уже существует")
        }
      } else {
        toast.error("Произошла ошибка, попробуйте позже")
      }
    })
      .catch((error) => {
        requestErrorDisplay(error, "Произошла ошибка, попробуйте позже")
      });
  }

  const togglePasswordDisplay = (id) => {
    if (passwordVisable.find(i => i === id)) {
      setPasswordVisable(passwordVisable.filter(i => i !== id))
    } else {
      setPasswordVisable([...passwordVisable, id])
    }
  }

  const getInfoByBin = async (bin) => {
    try {
      const {data} = await get(`/v1/users/gov/juridical`, {
        params: {
          bin, lang: "ru"
        }
      })
      if (!data.success) {
        throw data
      }
      setBinData(data.obj)
    } catch (e) {
      console.log("error", e)
      toast.error(e)
    }
  }

  useEffect(() => {
    if (binData) setCompanyNameValue(binData.name)

  }, [binData])

  const setBinValue = (bin = "") => {
    setBinData(null);
    setCompanyName('');
    const cleanedBin = bin.replace(/\D/g, "");
    setBin(cleanedBin);

    if (cleanedBin.length === BIN_LENGTH) {
      getInfoByBin(cleanedBin);
      setErrorTitleBin(null);
      setIsBinValid(true);
      setErrorTitleMessage(null);
    } else {
      setErrorTitleBin("БИН должен содержать ровно двенадцать цифр");
      setIsBinValid(false);
      setErrorTitleMessage("Заполните сначала БИН");
    }
  };


  const setCompanyNameValue = (name = "") => {
    if (!isBinValid) {
      setErrorTitleMessage("Заполните сначала БИН");
      setCompanyName('');
    } else {
      setErrorTitleMessage(null);
      setCompanyName(name);
    }
  };


  const handleRegistration = (e) => {
    // stop reload page
    e.preventDefault()


    // Validate BIN length
    const cleanedBin = bin.replace(/\D/g, "");
    if (!/^\d{12}$/.test(cleanedBin)) {

      return;
    }

    console.log('phone', phoneNumber);
    if (phoneNumber && phoneNumber.length < 11) {
      toast('Введите правильный номер телефона');
      return;
    }
    // send amplitude track
    amplitude.filledInfo(
      phoneNumber,
      binData?.bin || bin
    )

    // set loading
    setIsLoading(true);
    const formData = {
      phoneNumber,
      email,
      password,
      passwordConfirm,
      type: data.type.toString()
    }

    // set company date
    formData.name = binData?.name || companyName
    formData.businessIdentificationNumber = binData?.bin || bin

    User.register(formData)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true)
          setIsLoading(false);
          // onHandleSubmit(response.data.userId)
        } else {
          setIsLoading(false);
          toast.error("Произошла ошибка, попробуйте позже")
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.status === 409) {
          toast.error("Телефон или электронной почте уже есть в базе!")
        } else {
          toast.error("Произошла ошибка, попробуйте позже")
        }
      }).finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleRegistration}>

      {/* Bin */}
      <div className={cn(stylesCommon.input, {[stylesCommon.hide]: USER_TYPE.isDriver === data.type})}>
        <Form.Label className={stylesCommon.inputLabel} htmlFor="bin">БИН организации</Form.Label>
        <Form.Control
          id="bin"
          value={bin}
          onChange={(e) => setBinValue(e.target.value)}
          size="lg"
          type="text"
          placeholder="123456789012"
          maxLength={BIN_LENGTH}
        />
        {errorTitleBin && (
          <div style={{fontSize: "13px", color: "red"}}>
            {errorTitleBin}
          </div>
        )}
      </div>

      {/* Company name */}
      <div className={cn(stylesCommon.input, {[stylesCommon.hide]: USER_TYPE.isDriver === data.type})}>
        <Form.Label className={stylesCommon.inputLabel} htmlFor="companyName">Название организации</Form.Label>
        <Form.Control
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyNameValue(e.target.value)}
          size="lg"
          type="text"
          disabled={binData || !isBinValid}
          readOnly={binData || !isBinValid}
          placeholder="Название компании"
        />
        {errorTitleMessage && (
          <div style={{fontSize: "13px", color: "red"}}>
            {errorTitleMessage}
          </div>
        )}
      </div>

      {/* Email */}
      <div className={stylesCommon.input}>
        <Form.Label className={stylesCommon.inputLabel} htmlFor="email">Email</Form.Label>
        <Form.Control
          id="email"
          value={email}
          onChange={(e) => checkEmailNumber('email', e.target.value)}
          size="lg"
          type="text"
          placeholder="example@example.com"
        />
        {errorTitleEmail && (
          <div style={{fontSize: "13px", color: "red"}}>
            {errorTitleEmail}
          </div>
        )}
      </div>

      {/* Phone */}
      <div className={stylesCommon.input}>
        <Form.Label className={stylesCommon.inputLabel} htmlFor="phoneNumber">Номер телефона</Form.Label>
        <InputMask
          id="phoneNumber"
          value={phoneNumber}
          maskChar={null}
          mask={phoneNumberMask}
          onChange={(event) => checkEmailNumber('phone', event.target.value)}
          disabled={false}
        >
          {(inputProps) => (
            <Form.Control
              {...inputProps}
              type="text"
              placeholder="Номер телефона"
            />
          )}
        </InputMask>
        {errorTitlePhone && (
          <div style={{fontSize: "13px", color: "red"}}>
            {errorTitlePhone}
          </div>
        )}
      </div>

      {/* Password */}
      <div className={stylesCommon.input}>
        <Form.Label className={stylesCommon.inputLabel} htmlFor="password">Пароль</Form.Label>
        <Form.Control
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          type={passwordVisable.find(i => i === 1) ? "text" : "password"}
          placeholder="*********"
        />
        <button type="button" className={stylesCommon.passwordEye} onClick={() => togglePasswordDisplay(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
            <path
              d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
              fill="#C3C5CA"/>
          </svg>
        </button>
        {password && (
          <button type="button" className={stylesCommon.passwordCheckmark}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="#23AF53"/>
              <path d="M5.45312 9.99973L8.75891 13.6361L14.544 7.27246" stroke="white" strokeWidth="2"
                    strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Repeat password */}
      <div className={stylesCommon.input}>
        <Form.Label className={stylesCommon.inputLabel} htmlFor="password2">Повторите пароль</Form.Label>
        <Form.Control
          id="password2"
          value={passwordConfirm}
          onChange={(e) => setPasspordConfirm(e.target.value)}
          size="lg"
          type={passwordVisable.find(i => i === 2) ? "text" : "password"}
          placeholder="*********"
        />
        {errorTitle && (
          <div style={{marginTop: "12px", fontSize: "13px", color: "red"}}>
            {errorTitle}
          </div>
        )}
        <button type="button" className={stylesCommon.passwordEye} onClick={() => togglePasswordDisplay(2)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
            <path
              d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
              fill="#C3C5CA"/>
          </svg>
        </button>
        {passwordConfirm && password === passwordConfirm && (
          <button type="button" className={stylesCommon.passwordCheckmark}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="#23AF53"/>
              <path d="M5.45312 9.99973L8.75891 13.6361L14.544 7.27246" stroke="white" strokeWidth="2"
                    strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        data-val={`${!validateEmail(email)} ${errorTitleEmail} ${!password} ${password !== passwordConfirm}`}
        className={cn(stylesCommon.button, {
            [stylesCommon.disabled]: isLoading || !validateEmail(email) || errorTitleEmail || !password || password !== passwordConfirm || isSuccess || !isBinValid || !companyName
          }
        )}
        type="submit"
      >
        {isLoading ? 'Отправляется данные...' : 'Подтвердить'}
      </button>

      {isSuccess && (
        <div className="alert alert-success mt-2" role="alert">
          Вы успешно зарегистрировались. Пожалуйста <Link to="/login"> Авторизируйтесь</Link>
        </div>
      )}

      {/* Text */}
      <p className={stylesCommon.footerText}>
        Продолжая, вы соглашаетесь с условиями <a href="/privacy-policy.pdf" target="_blank">публичной оферты</a>
      </p>
    </form>
  );
};

export default FormRegistration;
