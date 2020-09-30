import React from "react";
import {
  ColumnBaseDiv,
  LineFlexBaseDiv,
} from "src/components/generic/styles/Containers";
import { Title, TitleDiv } from "src/components/generic/styles/Title";
import { NextBtn } from "src/components/generic/styles/Buttons";
import styled from "styled-components";

// In order to be consistent and to have styled components I have called the wrapping div "SelectWeekDiv"
// If you prefer you could just place a div tag with and in order to display:none when Next clicked
const SelectWeekDiv = styled.div``;

/* As we are using dropdown on several places here options are hard coded for the sake of reviewing the UI
 * Placeholder should be hardcoded for every dropdown individually where dropdown component is used*/

export const DropDown = () => {
  const options = [
    { value: "week-1", label: "week-1" },
    { value: "week", label: "week" },
    { value: "week+1", label: "week+1" },
    { value: "week+2", label: "week+2" },
  ];
  const placeholder = "Select a week";
  return (
    <SelectWeekDiv>
      <ColumnBaseDiv>
        <TitleDiv>
          <Title>Create new timesheet:</Title>
        </TitleDiv>
        <DropDown options={options} placeholder={placeholder} />
        <LineFlexBaseDiv>
          <NextBtn>Next</NextBtn>
        </LineFlexBaseDiv>
      </ColumnBaseDiv>
    </SelectWeekDiv>
  );
};
