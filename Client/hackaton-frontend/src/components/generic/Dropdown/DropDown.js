import React from "react";
import Select from "react-select";
import {
  ColumnBaseDiv,
  LineFlexBaseDiv,
} from "src/components/generic/styles/Containers";
import { Title, TitleDiv } from "./dropdown.styles";
import { NextBtn } from "src/components/generic/styles/Buttons";
import styled from "styled-components";

const SelectWeekDiv = styled.div``;

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
