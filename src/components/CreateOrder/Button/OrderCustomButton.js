import React from 'react';
import styles from './OrderCustomButton.module.scss';
import cn from "classnames";

export default function OrderCustomButton ({ onClick, children, color, displayText = false, isMobile = false }) {
    // const buttonClass = color === 'light' ? styles['custom__button-light'] : styles['custom__button'];
    const buttonClass = styles[`custom__button${color ? '-' + color : ''}`];
    return (
        <div className={cn("d-flex align-items-center gap-4", { [styles.custom__button_isMobile]: isMobile })}>
            <button className={buttonClass}  onClick={onClick}>
                {children}
            </button>
          {displayText && (
            <span className={'d-flex align-items-center gap-2'} style={{ color: '#C5115E', lineHeight: 'normal' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" className={"d-inline-block"}>
                <path d="M8.3 1.38564C9.04256 0.956922 9.95744 0.956922 10.7 1.38564L15.9272 4.40359C16.6698 4.83231 17.1272 5.62461 17.1272 6.48205V12.5179C17.1272 13.3754 16.6698 14.1677 15.9272 14.5964L10.7 17.6144C9.95744 18.0431 9.04256 18.0431 8.3 17.6144L3.07276 14.5964C2.3302 14.1677 1.87276 13.3754 1.87276 12.5179V6.48205C1.87276 5.62461 2.3302 4.83231 3.07276 4.40359L8.3 1.38564Z" stroke="#C5115E" strokeWidth="1.2"/>
                <path d="M10.1996 5L10.0888 11.2173H8.90845L8.79766 5H10.1996ZM9.50078 13.8082C9.26499 13.8082 9.06328 13.7259 8.89567 13.5611C8.72805 13.3935 8.64567 13.1918 8.64851 12.956C8.64567 12.723 8.72805 12.5241 8.89567 12.3594C9.06328 12.1918 9.26499 12.108 9.50078 12.108C9.73089 12.108 9.92976 12.1918 10.0974 12.3594C10.265 12.5241 10.3502 12.723 10.3531 12.956C10.3502 13.1122 10.309 13.2557 10.2295 13.3864C10.1528 13.5142 10.0505 13.6165 9.92266 13.6932C9.79482 13.7699 9.65419 13.8082 9.50078 13.8082Z" fill="#C5115E"/>
              </svg>
              Страхование <br/>не включено
            </span>
          )}
        </div>

    );
};

