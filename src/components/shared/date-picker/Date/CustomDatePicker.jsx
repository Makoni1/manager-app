import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import "./CustomDatePicker.scss"
import cn from "classnames";

const CustomDatePicker = ({
  dateFormat,
  placeholderText = "00.00.00",
  bgGray = false,
  withBorder = false,
  IconStart = null,
  ...rest
}) => {
  return (
    <div
      className={cn("CustomDatePicker-wrapper", {
        ['CustomDatePicker-wrapper__border']: withBorder,
        ['CustomDatePicker-wrapper__bgGray']: bgGray,
        ['CustomDatePicker-wrapper__withIcon']: IconStart,
      }
    )}
    >
      <div
        className={cn("CustomDatePicker-wrapper__icon", {
          ["CustomDatePicker-wrapper__icon_selected"]: rest.selected
        })}
        style={{display: IconStart ? "" : "none"}}
      >
        {IconStart}
      </div>
      <DatePicker
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholderText}
        locale={ru}
        {...rest}
      />
    </div>
  );
};

export default CustomDatePicker;