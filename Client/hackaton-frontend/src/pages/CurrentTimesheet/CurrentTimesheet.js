import React from "react";
import { Title } from "src/components/generic/styles/Title";
import {
  DeleteBtn,
  SaveBtn,
  SubmitBtn,
  NextBtn,
} from "src/components/generic/styles/Buttons";
import { Table } from "src/components/generic/Table/Table";
import {
  BtnGroupFlexDiv,
  TitleWithBtnsDiv,
} from "src/components/generic/styles/Containers";

/* As we are using dropdown on several places here options are hard coded for the sake of reviewing the UI
 * Placeholder should be hardcoded for every dropdown individually where dropdown component is used*/

export const CurrentTimesheet = () => {
  return (
    <div>
      <TitleWithBtnsDiv>
        <Title>Timesheet for week 05/13/2020</Title>
        <BtnGroupFlexDiv>
          <DeleteBtn>Delete</DeleteBtn>
          <SaveBtn>Save</SaveBtn>
          <SubmitBtn>Submit</SubmitBtn>
        </BtnGroupFlexDiv>
      </TitleWithBtnsDiv>
      <Table />
    </div>
  );
};
