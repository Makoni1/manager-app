import React, {useEffect, useState} from 'react';
import style from "./index.module.css"
import {Link, useLocation} from "react-router-dom";
import {File} from "../../../services";
import {useSelector} from "react-redux";
import ModalWindow from "../../shared/ModalWindow";
import ConfirmDocs from "../../profile/ConfirmDocs";
import SupportModal from "../../shared/SupportModal";
import cn from "classnames";
import {useAmplitude} from "../../../hooks/useAmplitude";

const BannerWarning = () => {
  const { amplitude } = useAmplitude()
  const {pathname} = useLocation();
  const [isNotDocs, changeDisplay] = useState(false)
  const [isDisplayModal, changeDisplayModal] = useState(false)
  const { user } = useSelector(state => state);
  const [isModeration, changeModeration] = useState(false)

  const fetchData = async () => {
    try {
      const { data } = await File.checkDocApp(user.id)
      changeDisplay(!data?.isExistDocs)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchData()
      changeModeration(user.state === 'Moderation')
    }
  }, [user])

  const onChangeFunc = () => {
    location.reload()
  }

  return (
    <div id="BannerWarning" className={cn(style.wrapper, { [style.display]: isNotDocs || isModeration })} data-display={`${isNotDocs || isModeration && !isNotDocs}`}>

      <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M11.9 1.93385C12.5807 1.54085 13.4193 1.54085 14.1 1.93385L22.0336 6.5143C22.7143 6.90729 23.1336 7.63357 23.1336 8.41955V17.5805C23.1336 18.3664 22.7143 19.0927 22.0336 19.4857L14.1 24.0662C13.4193 24.4591 12.5807 24.4591 11.9 24.0662L3.96643 19.4857C3.28575 19.0927 2.86643 18.3664 2.86643 17.5805V8.41955C2.86643 7.63357 3.28575 6.90729 3.96643 6.5143L11.9 1.93385Z" stroke="#141619" strokeWidth="1.6"/>
        <path d="M13.9287 7.01953L13.7814 15.282H12.2127L12.0655 7.01953H13.9287ZM12.9999 18.7252C12.6865 18.7252 12.4185 18.6157 12.1957 18.3968C11.973 18.174 11.8635 17.906 11.8673 17.5926C11.8635 17.283 11.973 17.0187 12.1957 16.7998C12.4185 16.577 12.6865 16.4656 12.9999 16.4656C13.3057 16.4656 13.57 16.577 13.7927 16.7998C14.0155 17.0187 14.1288 17.283 14.1325 17.5926C14.1288 17.8002 14.074 17.9909 13.9683 18.1646C13.8664 18.3345 13.7305 18.4704 13.5606 18.5723C13.3907 18.6742 13.2038 18.7252 12.9999 18.7252Z" fill="#141619"/>
      </svg>

      <span className={cn('is-moderation', { [style.hide]: !isModeration })}>
        Документы на модерации. Скоро вы сможете продолжить управлять заказами.
      </span>
      <span className={cn('is-need-docs', { [style.hide]: !isNotDocs })}>
        Загрузите документы для верификации аккаунта и получите полный доступ к сайту
      </span>

      <button className={cn(style.link, 'is-moderation', { [style.hide]: !isModeration })} onClick={onChangeFunc}>
        Обновить страницу
      </button>
      <Link
        className={cn(style.link, 'is-need-docs', { [style.hide]: !isNotDocs })}
        to={"/verify-docs?redirectUrl=" + pathname}
        onClick={() => {
          amplitude.toUploadDocs()
        }}
      >
        Загрузить документы
      </Link>

      {isDisplayModal && (
        <ModalWindow
          contentFull
          bgTransparent={false}
          onClose={() => changeDisplayModal(false)}
          footerSlot={<SupportModal />}
        >
          <ConfirmDocs userId={user?.id} updateData={() => {
            changeModeration(true)
            changeDisplay(false)
          }} onClose={() => changeDisplayModal(false)}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default BannerWarning;