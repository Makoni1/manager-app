import React from 'react';
import style from "./index.module.scss"
import LupeIcon from "../../icons/LupeIcon";
import {onDebounce} from "../../../../utils";

const InputSearch = ({ placeholder = 'Поиск', onGetText }) => {
  const updateText = event => {
    onDebounce(() => onGetText(event.target.value))
  }
  return (
    <div className={style.wrapper}>
      <label className={style.icon} htmlFor="InputSearch">
        <LupeIcon />
      </label>
      <input
        id="InputSearch"
        className={style.input}
        placeholder={placeholder}
        onChange={updateText}
      />
    </div>
  );
};

export default InputSearch;