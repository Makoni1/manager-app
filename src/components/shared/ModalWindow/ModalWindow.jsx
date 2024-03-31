import React from 'react';
import cn from "classnames"
import style from "./style.module.scss"
import CloseIcon from "../icons/CloseIcon";
const ModalWindow = ({
  children,
  closeBtnWithBg = false,
  bgTransparent = true,
  padding,
  footerSlot = null,
  maxWidth = null,
  onClose
}) => {
  return (
    <div
      className={cn(style.wrapper, {
        [style.bgTrans]: bgTransparent
      })}
    >
      <span className={style.overflow} onClick={onClose}></span>
      <div
        className={cn(
          style.content, {
            [style.content_middle]: padding === "middle",
            [style.content_p_none]: padding === "none"
          }
        )}
        style={{ maxWidth: maxWidth }}
      >
        <button
          type={"button"}
          className={cn(style.btn_close, {
            [style.btn_close_bg]: closeBtnWithBg
          })}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        { children }
      </div>
      { footerSlot && <div className={style.footer}>{footerSlot}</div> }
    </div>
  );
};

export default ModalWindow;