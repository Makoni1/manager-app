import React, { useEffect } from 'react';
import styles from './style.module.scss'
import NotVerifiedIcon from "../../../shared/icons/NotVerifiedIcon";
const NotVerified = ({onOpenModal}) => {

    return (
        <div className={styles['profile__verification']}>
            <div className={styles['profile__verification-icon']}>
                <NotVerifiedIcon/>
            </div>
            <div className={styles['profile__verification-text']}>
                Аккаунт не верифицирован. Загрузите <br/>
                документы и получите полный доступ к сайту
            </div>
            <button className={styles['profile__verification-btn']}
                    onClick={() => onOpenModal()}>
                Загрузить документы
            </button>
        </div>
    );
};

export default NotVerified;