import React from 'react';
import cn from "classnames";
import moment from "moment/moment";
import { isMobile } from 'react-device-detect';
import style from "./style.module.scss"
import CustomDatePicker from "../../shared/date-picker/Date";
import CustomDateTime from "../../shared/date-picker/Time";
import ClockIcon from "../../shared/icons/ClockIcon";
import CalendarIcon from "../../shared/icons/CalendarIcon";

const OrdersDatePicker = ({
  date,
  timeStart,
  timeEnd,
  isEditable = false,
  isSender = false,
  minDate,
  setDate,
  setTimeStart,
  setTimeEnd,
  detect
}) => {
  const prefixTimeType = isSender ? 'погрузки' : 'выгрузки'
  const setPlaceholderTime = time => {
    return time ? moment(time).format("HH:mm") : '__:__'
  }
  const filterPassedTime = (time) => {
    const currentDate = timeStart || new Date(new Date().setHours(0));
    const selectedDate = new Date(time);
    return currentDate?.getTime() < selectedDate?.getTime();
  };
  const setChangeStart = (date, ignoreSave = false ) => {
    setTimeStart(date)
    // setTimeEnd(null)
    if (detect && !ignoreSave) detect()
  }

  const onChangeDate = (date) => {
    setDate(date)
    if (!timeStart) {
      setChangeStart(new Date(date.setHours(9)), true)
    }
    if (!timeEnd) {
      setTimeEnd(new Date(date.setHours(18)))
    }
    if (detect) detect()
  }

  const ContentItemEditable = (type) => {
    let input = ""
    if (type === "date") {
      input = <CustomDatePicker
        selected={date}
        dateFormat="dd.MM.yyyy"
        placeholderText="00.00.00"
        monthsShown={isMobile ? 1 : 2}
        minDate={minDate}
        onChange={onChangeDate}
        withPortal={isMobile}
      />
    } else if (type === "time-start") {
      input = <CustomDateTime
        selected={timeStart}
        timeCaption={`Время ${prefixTimeType} с ${setPlaceholderTime(timeStart)}`}
        onChange={setChangeStart}
      />
    } else if (type === "time-before") {
      input = <CustomDateTime
        selected={timeEnd}
        filterTime={filterPassedTime}
        timeCaption={`Время ${prefixTimeType} до ${setPlaceholderTime(timeEnd)}`}
        onChange={setTimeEnd}
      />
    }

    return input
  }

  return (
    <div
      className={cn(
        style.wrapper,
        'd-flex align-items-center flex-wrap flex-sm-nowrap', {
          'justify-content-between': !isMobile
        }
      )}
      style={{
        gap: isMobile ? '10px' : ''
      }}
    >
      <div className={cn('d-flex align-items-center', { [style.editable]: isEditable })}>
        <CalendarIcon />
        {isEditable ? ContentItemEditable("date") : ContentItem("date", date)}
      </div>
      <div className={cn('d-flex align-items-center', { [style.editable]: isEditable })}>
        <ClockIcon />
        {isEditable ? ContentItemEditable("time-start", "c ") : ContentItem("time", timeStart, "c ")}
      </div>
      <div className={cn('d-flex align-items-center', { [style.editable]: isEditable })}>
        <ClockIcon />
        {isEditable ? ContentItemEditable("time-before", "до ") : ContentItem("time", timeEnd, "до ")}
      </div>
    </div>
  );
};
const ContentItem = (type = "", value, prefixStart = "") => {
  let text = ""

  if (type === "date") {
    text = moment.utc(value).format('DD.MM.YYYY')
  } else if (type === "time") {
    text = moment.utc(value).format('HH:mm')
  }

  return <span className="ms-1">{prefixStart}{text}</span>
}

export default OrdersDatePicker;