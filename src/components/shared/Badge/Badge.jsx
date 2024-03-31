import React from 'react';
import style from "./index.module.scss"
import cn from "classnames";

const Badge = ({ text, type, className}) => {

  return (
    <span
      className={cn(style.badge, {
        [style.badge_blue]: type === "blue",
        [style.badge_green]: type === "green",
        [style.badge_gray]: type === "gray",
        [style.badge_brand]: type === "brand"

      }, className)}
    >
      {text}
    </span>
  );
};

export default Badge;