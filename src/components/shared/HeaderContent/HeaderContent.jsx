import React from 'react';
import cn from "classnames";
import style from "../../orders/title/style.module.scss";
import {Link} from "react-router-dom";
import Logotype from "../icons/Logotype";
import Badge from "../Badge";

const HeaderContent = ({ title, displayLogo, renderOptions, count, badgeType }) => {
  return (
    <div
      className={cn(style.wrapper, "d-flex align-items-center")}
    >
      <h1 className={style.title}>
        <span>{title}</span>
        {count !== undefined && (
          <Badge
            className={style.badge}
            type={badgeType}
            text={count}
          />
        )}
      </h1>
      { renderOptions && (<div className={style.wrapperOptions}>{renderOptions()}</div>) }
      {
        displayLogo && (
          <Link to="/" className="ms-auto">
            <Logotype />
          </Link>
        )
      }
    </div>
  );
};

export default HeaderContent;