import React, {useEffect, useState} from 'react';
import style from "./style.module.scss"
import {useWindowSize} from "../../../hooks/useWindowSize";

const OrdersContent = ({ children, column = 1, withAdaptive = false }) => {
  const [sizeContent, setSizeContent] = useState(`repeat(${column}, 1fr)`)
  const { isDesktop, isMobile } = useWindowSize()
  useEffect(() => {
    if (window.innerWidth > 1600) {
      return
    }
    if (withAdaptive && column > 1) {
      if (isDesktop) {
        if (column === 2) {
          setSizeContent("1fr 0.8fr")
        }
      } else {
        if (column === 2) {
          setSizeContent("1fr")
        }
      }
    }
  }, [withAdaptive, isDesktop, isMobile])
  return (
    <div className={style.wrapper} style={{ gridTemplateColumns: sizeContent}}>
      { children }
    </div>
  );
};

export default OrdersContent;