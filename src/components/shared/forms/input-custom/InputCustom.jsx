import React from 'react';
import style from "./index.module.scss"
import cn from "classnames";

const InputCustom = ({
  onChangeValue = () => void(0),
  inputType = "text",
  isDisabled = false,
  defaultValue,
  paddingLeft = "",
  prefixStart = "",
  prefixEnd = "",
  maxLength = "",
  placeholder = ""
}) => {
  const getValue = event => {
    onChangeValue(event.target.value)
  }

  return (
    <div className={style.wrapper}>
      { prefixStart && <span className={style.prefixStart}>{prefixStart}</span>}
      <input
        type={inputType}
        className={cn(style.input, {
          [style.input_pdLeft40]: prefixStart,
          [style.input_pdRight]: prefixEnd,
          [style.input_disabled]: isDisabled
        })}
        readOnly={isDisabled}
        disabled={isDisabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={getValue}
        maxLength={maxLength}
        onWheel={(event) => event.target.blur()}
      />
      { prefixEnd && <span className={style.prefixEnd}>{prefixEnd}</span>}
    </div>
  );
};

export default InputCustom;