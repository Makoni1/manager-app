import React, {useState} from 'react';
import style from "./index.module.scss"
import ArrowDownIcon from "../icons/ArrowDownIcon";
import cn from "classnames";

const Collapse = ({
  gridCol = 1,
  gridGap = 10,
  minHeight,
  children,
  classNameBtn = "",
  isDisplay = false,
  text = "Подробная информация"
}) => {
  const [isOpen, setDisplay] = useState(isDisplay)
  return (
    <div className={style.wrapper}>
      <div
        className={cn(style.content, {[style.content_open]: isOpen} )}
        style={{ gridTemplateColumns: `repeat(${gridCol}, 1fr)`, gap: `${gridGap}px`, minHeight: minHeight ? minHeight + "px" : ""}}
      >
        {children}
      </div>
      {/*<button className={cn(style.button, classNameBtn)} type="button" onClick={() => setDisplay(!isOpen) } style={{ marginTop: isOpen ? '' : '0' }}>*/}
      {/*  <span>*/}
      {/*    { isOpen ? 'Скрыть' : text }*/}
      {/*  </span>*/}
      {/*  <ArrowDownIcon style={{ transform: isOpen ? 'scale(-1)' : '' }} />*/}
      {/*</button>*/}
    </div>
  );
};

export default Collapse;