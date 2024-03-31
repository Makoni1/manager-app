import React from 'react';
import styles from './style.module.scss';
import ModalWindow from "../../../shared/ModalWindow";
import SupportModal from "../../../shared/SupportModal";
import ConfirmDocs from "../../../profile/ConfirmDocs";

const ProfilePassword = ({user,onOpenModal, closeModal, isModalOpen, changePassword, changeDisplay, changeModeration}) => {
  const handleLogout = event => {
    event.preventDefault()
    event.stopPropagation()
    localStorage.removeItem('authData')
    window.location.href = '/login';
  };
    return (
        <div className={styles['profile__password']}>
            <div className={styles['profile__password-title']}>Настройки</div>
            <hr className={styles['profile__password-hr']}></hr>
            <div className={styles['profile__password-subtitle']} onClick={changePassword}>Сменить пароль</div>
            <button className={styles['profile__password-subtitle']} onClick={() => onOpenModal()}>Загрузить документы</button>
            {isModalOpen  && (
                <ModalWindow
                    contentFull
                    bgTransparent={false}
                    onClose={closeModal}
                    footerSlot={<SupportModal />}
                >
                    <ConfirmDocs
                        userId={user?.id}
                        updateData={() => {

                          changeModeration(true)
                            changeDisplay(false)
                        }}
                        onClose={closeModal}
                        isDisplayModal={isModalOpen}
                    />
                </ModalWindow>
            )}
            <button className={styles['profile__password-subtitle']} onClick={handleLogout} >Выйти из аккаунта</button>
        </div>
    );
};

export default ProfilePassword;