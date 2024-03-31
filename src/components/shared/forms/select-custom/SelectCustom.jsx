import React from 'react';
import Select from 'react-select';
import cn from "classnames";
import "./custom-select.scss"

const selectStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected, ...rest }) => {
    return {
      ...styles,
      // fontSize: '16px',
      // color: '#141619',
      // cursor: isDisabled ? 'not-allowed' : 'default',
      // ':hover': {
      //   backgroundColor: "#FAFAFA",
      // }
    };
  },
};

const CLASS_NAMES = {
  name: "select-custom-wrapper",
  root: "custom-select",
}
const SelectCustom = ({
  placeholder = "Выберите вариант",
  keyId = "id",
  keyName = "name",
  isDisabled = false,
  returnObject = false,
  bgGray = false,
  defaultValue = null,
  IconStart = null,
  options = [],
  onSubmit
}) => {

  const onOptionChangeHandler = option => {
    if (returnObject) {
      onSubmit(option)
    } else {
      onSubmit(option[keyId])
    }
  }

  return (
    <div
      className={cn(CLASS_NAMES.root, {
        [CLASS_NAMES.root + "__bgGray"]: bgGray,
        [CLASS_NAMES.root + "__withIcon"]: IconStart,
      })}
    >
      <div
        className={cn(CLASS_NAMES.root + "__icon", {
          [CLASS_NAMES.root + "__icon_selected"]: defaultValue
        })}
        style={{display: IconStart ? "" : "none"}}
      >
        {IconStart}
      </div>
      <Select
        defaultValue={defaultValue}
        onChange={onOptionChangeHandler}
        placeholder={placeholder}
        className={CLASS_NAMES.name}
        classNamePrefix={CLASS_NAMES.name + "__content"}
        getOptionLabel={option => option[keyName]}
        styles={selectStyles}
        isOptionSelected={option => {
          if (!defaultValue) {
            return false
          }
          return defaultValue[keyId] === option[keyId];
        }}
        value={defaultValue}
        options={options}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default SelectCustom;