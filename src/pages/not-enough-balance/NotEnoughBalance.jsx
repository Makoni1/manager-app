import React from 'react';
import style from "./index.module.css"
import SupportModal from "../../components/shared/SupportModal";

const NotEnoughBalance = () => {
  return (
    <div style={{ backgroundColor: '#333' }}>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <img src="/icons/logo-white.svg" style={{ height: '35px' }} />
        </div>
        <p style={{ fontWeight: '700', fontSize: '150%'}}>На вашем балансе недостаточно средств.</p>
        <p style={{ fontWeight: '700', fontSize: '150%'}}>Пополните баланс, чтобы продолжить работу в приложении «binY».</p>
      </div>
      <div style={{ marginTop: '-50px', width: "100%", textAlign: "center", position: "relative", zIndex: 1}}>
        <SupportModal  />
      </div>
    </div>
  );
};

export default NotEnoughBalance;