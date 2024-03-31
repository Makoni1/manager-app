import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import "./CustomDateTime.scss"

const CustomDateTime = ({ ...rest }) => {
  return (
    <div className="CustomDateTime-wrapper">
      <DatePicker
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="HH:mm"
        placeholderText="00:00"
        locale={ru}
        {...rest}
      />
    </div>
  );
};

export default CustomDateTime;