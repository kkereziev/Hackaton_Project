import React from "react";
import Select from "react-select";

export const DropDown = ({ placeholder, options }) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
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
