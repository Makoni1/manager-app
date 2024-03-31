import React from 'react';
import styles from "./style.module.scss";
import TickIcon from "../../../shared/icons/TickIcon";
import NotVerifiedIcon from "../../../shared/icons/NotVerifiedIcon";
import {File} from "../../../../services";

const ProfileDocuments = ({user, onOpenModal, openDocument}) => {
    return (
        <div className={styles['profile__documents']}>
            <div className={styles['profile__documents-title']}>Документы</div>
            <hr className={styles['profile__documents-hr']}></hr>
            <div className={styles['profile__documents-details']}>
                <div className={styles['profile__documents-subtitle']} onClick={() => openDocument('0')}>Свидетельство о регистрации</div>
                {user && user.state === "Confirmed" ?
                    <div className={styles['profile__documents-img']}><TickIcon /></div>
                    : (
                        <div className={styles['profile__documents-img']}><NotVerifiedIcon /></div>
                    )
                }
            </div>
            <div className={styles['profile__documents-details']}>
                <div className={styles['profile__documents-subtitle']} onClick={() => openDocument('2')} >Приказ о назначении</div>
                {user && user.state === "Confirmed" ?
                    <div className={styles['profile__documents-img']}><TickIcon /></div>
                    : (
                        <div className={styles['profile__documents-img']}><NotVerifiedIcon /></div>
                    )
                }
            </div>
            {user && user.state === "Confirmed" ?
                null
                : (
                    <button className={styles['profile__documents-btn']} onClick={() => onOpenModal()}>Загрузить документы</button>
                )
            }
        </div>
    );
};

export default ProfileDocuments;