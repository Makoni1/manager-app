import React from 'react';
import cn from "classnames";
import ArrowRightIcon from "../../../shared/icons/ArrowRightIcon";
import style from "../common.module.scss"

const OrdersSectionItemInfoColumn = ({
  title = "",
  children,
  withArrowRight = false,
  isTextBig = false,
  textColor = "",
  isFullWidth = false,
  contentGridColumn = 0,
  contentGridGap = 10,
  onClick
}) => {
  return (
    <div className={cn(style.infoColumn, { [style.infoColumn_full]: isFullWidth })}>
      {title && <h5 className={style.infoColumn__title}>{title}</h5> }
      <div
        className={cn(style.infoColumn__wrapper, {
          [style.infoColumn__wrapper_big]: isTextBig,
          'd-grid': contentGridColumn
        })}
        style={{
          gridTemplateColumns: contentGridColumn ? `repeat(${contentGridColumn}, 1fr)` : '',
          gridColumnGap: contentGridColumn ? `${contentGridGap}px` : '',
          color: textColor,
        }}
        onClick={e => {
          if (onClick) {
            onClick(e)
          }
        }}
      >
        { children }
        { withArrowRight && <ArrowRightIcon className={cn(style.arrowRight, { [style.arrowRight_withColumn]: contentGridColumn })} /> }
      </div>
    </div>
  );
};

export default OrdersSectionItemInfoColumn;