import React from "react";
import { Title } from "src/components/generic/styles/Title";
import { NextBtn } from "src/components/generic/styles/Buttons";
import { Table } from "src/components/generic/Table/Table";
import {
  BtnGroupFlexDiv,
  TitleWithBtnsDiv,
} from "src/components/generic/styles/Containers";
import { useParams } from "react-router-dom";

export const CurrentTimesheet = () => {
  const { name } = useParams();

  return (
    <div>
      <TitleWithBtnsDiv>
        <Title>Timesheet for week {name}</Title>
        <BtnGroupFlexDiv>
          <NextBtn>Delete</NextBtn>
          <NextBtn>Save</NextBtn>
          <NextBtn>Submit</NextBtn>
        </BtnGroupFlexDiv>
      </TitleWithBtnsDiv>
      <Table />
    </div>
  );
};
