import React, { useEffect, useState } from 'react';
import styles from "./index.module.scss";
import {useSelector} from "react-redux";
import {phoneNumberFormat} from "../../utils";
import {File, Order} from "../../services";
import {useNavigate} from "react-router-dom";
import ProfileCompanyCount from "./components/OrdersCount/ProfileCompanyCount";
import ProfileDocuments from "./components/UploadDocuments/ProfileDocuments";
import ProfilePassword from "./components/ProfilePassword/ProfilePassword";
import ChangeAvatar from "./components/ChangeAvatar/ChangeAvatar";
import {get} from "../../services/config";
import { motion } from "framer-motion";
import moment from 'moment';
import {useAnimationConfig} from "../../hooks/useAnimationConfig";

const ProfilePageComponentTwo = ({ changeDisplay, changeModeration}) => {
    const { user } = useSelector(state => state);
    const isExpeditor = user.type === "Expeditor";
    const navigate = useNavigate();
    const { routeVariants} = useAnimationConfig()
    const [binData, setBinData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ordersCount, setOrdersCount] = useState(null);
    useEffect(() => {
            Order.getCompletedOrdersCount().then((response) => {
                console.log(response.data);
                if(response.status == 200) {
                    setOrdersCount(response.data)
                }
            }).catch(error => {
                console.log(error);
            })
    }, [user]);
    const onOpenModal = (type) => {
        console.log(type)
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if(user?.businessIdentificationNumber)  {
            getInfoByBin(user.businessIdentificationNumber)
        }
    }, [user])


    const getInfoByBin = async (bin) => {
        try {
            const { data } = await get(`/v1/users/gov/juridical`, { params: {
                    bin, lang: "ru"
                }})
            if (!data.success) {
                throw data
            }
            setBinData(data.obj)
        } catch (e) {
            console.log("error", e)
        }
    }

    const openDocument = (type) => {
        File.get(type)
            .then(response => {

                console.log(response);

                const file = new Blob([response.data], {
                    type: response.data.type,
                });

                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);


            })
            .catch(error => {
                console.log(error);
                console.log('Произошла ошибка, попробуйте позже');
                alert('Произошла ошибка, попробуйте позже')
            });
    }

    const changePassword = () =>{
        navigate('/change-password')
    }

    console.log('USER ---->', user)

  const formattedDate = moment(user.createdAt).format('DD.MM.YYYY');

    return(
        <motion.div
          variants={routeVariants}
          initial="initial"
          animate="final"
          className={styles['profile__page']}
        >
            <div className={styles['profile__page-title']}>
              Профиль
              { isExpeditor ? " экспедитора" : " компании"}
            </div>
            <div className={styles['profile__company']}>
                <div className={styles['profile__company-title']}>Компания</div>
                    <hr className={styles['profile__company-hr']} />
                <div className={styles['profile__company-header']}>
                  <ChangeAvatar
                      onOpenModal={onOpenModal}
                      user={user}
                  />
                  <div className={styles['profile__company-content']}>
                      <div className={styles['profile__company-name']}>{user.name}</div>
                      <div className={styles['profile__company-bin']}>БИН/ИИН <span className={styles['profile__company-id']}>{user.businessIdentificationNumber} </span></div>
                  </div>
                </div>
               <ProfileCompanyCount totalCount={ordersCount?.totalCount} totalSum={ordersCount?.totalSum}/>
                <div className={styles['profile__contact']}>
                    <div className={styles['profile__contact-title']}>Номер телефона</div>
                    <div className={styles['profile__contact-subtitle']}>{user.phoneNumber && phoneNumberFormat(user.phoneNumber)}</div>

                    <div className={styles['profile__contact-title']}>Email</div>
                    <div className={styles['profile__contact-subtitle']}>{user.email}</div>

                    <div className={styles['profile__contact-title']}>Адрес организации</div>
                    <div className={styles['profile__contact-subtitle']}>{binData?.katoAddress}</div>

                    <div className={styles['profile__contact-title']}>
                        Зарегистрирован
                    </div>
                    <div className={styles['profile__contact-subtitle']}>
                      {formattedDate}
                    </div>
                </div>
            </div>
            <ProfileDocuments user={user} onOpenModal={onOpenModal} openDocument={openDocument}/>
            <ProfilePassword user={user} onOpenModal={onOpenModal} closeModal= {closeModal} isModalOpen={isModalOpen} changePassword={changePassword} changeDisplay={changeDisplay} changeModeration={changeModeration}/>
        </motion.div>
    )
}

export default ProfilePageComponentTwo;
