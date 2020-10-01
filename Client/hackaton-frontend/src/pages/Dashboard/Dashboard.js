import React from "react";
import { Title, TitleDiv } from "src/components/generic/styles/Title";
import {
  ColumnBaseDiv,
  BaseDivTopZero,
} from "../../components/generic/styles/Containers";
import { TableDashboard } from "src/components/TableDashboard";

export const Dashboard = () => {
  return (
    <BaseDivTopZero>
      <ColumnBaseDiv>
        <TitleDiv>
          <Title>Your Timesheets:</Title>
        </TitleDiv>
        <TableDashboard />
      </ColumnBaseDiv>
    </BaseDivTopZero>
  );
};
