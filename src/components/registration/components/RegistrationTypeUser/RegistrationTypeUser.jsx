import React, {useState} from 'react';
import cn from "classnames";
import styles from "./type-user.module.scss"
import stylesCommon from "../../common.module.scss"
import {useAmplitude} from "../../../../hooks/useAmplitude";

export const USER_TYPE = {
  isCompany: 0,
  isCompanyTrans: 1,
  isDriver: 2
}

export const SUMMARY_TEXT = {
  [USER_TYPE.isCompany]: "Грузоотправитель",
  [USER_TYPE.isCompanyTrans]: "Транспортная компания",
}
const TypeUserRegistration = ({updateStep, setData, data}) => {
  const { amplitude } = useAmplitude()
  const [type, setType] = useState(data.type || null)
  const items = [
    {
      name: "Грузоотправитель",
      summary: "Создавайте заказы в считанные клики",
      value: USER_TYPE.isCompany,
      icon: "user-group"
    },
    {
      name: "Транспортная компания",
      summary: "Берите заказы по удобным направлениям",
      value: USER_TYPE.isCompanyTrans,
      icon: "trans-company"
    },
    {
      href: "https://play.google.com/store/apps/details?id=co.biny.mobile",
      name: "Водитель",
      summary: "Ищите заказы без посредников",
      value: USER_TYPE.isDriver,
      icon: "driver"
    }
  ]
  const nextStep = () => {
    amplitude.clientTypeSelected(type, SUMMARY_TEXT[type])
    updateStep(2)
    setData({type})
  }
  return (
    <div className={styles.wrapper}>
      { items.map(item => {
        if (item.href) {
          return (
            <a
              key={item.icon}
              href={item.href} target="_blank"
              className={cn(styles.list, {
                [styles.active]: item.value === type, [styles.hide]: item.hide
              })}
            >
              <div className={styles.icon}>
                <img className={styles.icon_1} src={"/icons/" + item.icon + ".svg"} alt={item.icon} />
                <img className={styles.icon_2} src={"/icons/" + item.icon + "-color.svg"} alt={item.icon} />
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
              </div>
            </a>
          )
        } else {
          return (
            <div
              key={item.icon}
              className={cn(styles.list, {
                [styles.active]: item.value === type, [styles.hide]: item.hide
              })}
              onClick={() => setType(item.value)}
            >
              <div className={styles.icon}>
                <img className={styles.icon_1} src={"/icons/" + item.icon + ".svg"} alt={item.icon} />
                <img className={styles.icon_2} src={"/icons/" + item.icon + "-color.svg"} alt={item.icon} />
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
              </div>
            </div>
          )
        }
      })}
      <button className={cn(stylesCommon.button, { [stylesCommon.hide]: type === undefined || type === null })} type="button" onClick={nextStep}>
        Подтвердить
      </button>
    </div>
  );
};

export default TypeUserRegistration;