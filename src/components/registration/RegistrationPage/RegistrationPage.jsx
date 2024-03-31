import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import cn from "classnames";

import RegistrationFormComponent from '../components/RegistrationForm/RegistrationForm';
import RegistrationTypeUserComponent, {SUMMARY_TEXT} from "../components/RegistrationTypeUser/RegistrationTypeUser";
import RegistrationSlider from "../components/RegistrationSlider";

import styles from "./page.module.scss"

let appendFP = false
const PageRegistration = () => {
  const rootEl = useRef(null);
  const [step, setStep] = useState(localStorage.getItem('step') ? Number(localStorage.getItem('step')) : 1); // => 1
  const [data, setData] = useState({})

  // Meta Pixel Code
  useEffect(() => {
    if (rootEl && !appendFP) {
      const scriptBody = `
        !function(f,b,e,v,n,t,s) { if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1048831292922421');
        fbq('track', 'PageView');
      `
      const s = document.createElement("script");
      s.type = 'text/javascript';
      s.async = true;
      s.innerHTML = scriptBody;
      rootEl.current.appendChild(s);

      const noS = document.createElement("noscript");
      const img = document.createElement("img");
      img.src = "https://www.facebook.com/tr?id=1048831292922421&ev=PageView&noscript=1"
      img.width = 1
      img.height = 1
      img.style.display = "none"
      noS.appendChild(img);
      rootEl.current.appendChild(noS);
      appendFP = true
    }
  }, [rootEl])
  // End Meta Pixel Code

  const renderContent = () => {
    switch(step) {
      case 1:
        return <RegistrationTypeUserComponent updateStep={(step) => setStep(step)} setData={(newData)=>{setData({...data, ...newData})}} data={data} />
      case 2:
        return <RegistrationFormComponent updateStep={(step) => setStep(step)} setData={(newData)=>{setData({...data, ...newData})}} data={data} />
    }
  }

  return (
    <div ref={rootEl} className={styles.registration}>

      {/* Form Content */}
      <div className={cn(styles.wrapper, { [styles.wrapper_step_first]: step === 1})}>

        {/* Logo */}
        <a href="https://biny.co/" target="_blank" className={styles.logo}>
          <img src="/icons/logo.svg" alt="logo" />
        </a>

        {/* Header */}
        <div className={styles.header}>
          <h1>Регистрация клиента</h1>
          { step === 2 && <p>Создайте аккаунт <b style={{ fontWeight: 500, color: '#9e1e62' }}>«{SUMMARY_TEXT[data?.type]}»</b></p> }
        </div>

        {/* Content */}
        <div className={styles.content}>
          {renderContent()}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            Уже есть аккаунт? <br />
            <Link to="/login"> Войти</Link>
          </p>
        </div>

      </div>

      {/* Slider */}
      <div className={styles.slider}>
        <RegistrationSlider />
      </div>

    </div>
  );
}

export default PageRegistration;