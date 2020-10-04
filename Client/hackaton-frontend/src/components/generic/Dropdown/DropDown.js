import React from "react";
import Select from "react-select";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
    padding: 20,
    font: 14,
  }),
};

export const DropDown = ({
  placeholder,
  options,
  onChange,
  disabled,
  value,
}) => {
  return (
    <Select
      className="select"
      value={value}
      styles={customStyles}
      options={options}
      placeholder={placeholder}
      menuContainerStyle={{ zIndex: 5 }}
      onChange={onChange}
      isOptionDisabled={(option) => option.disabled === true}
      isDisabled={disabled}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#ccffff",
          primary: "#669999",
        },
      })}
    />
  );
};
