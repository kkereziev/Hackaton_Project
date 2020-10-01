import React from "react";
import { DropDown } from "../Dropdown/DropDown";
import { NextBtn } from "src/components/generic/styles/Buttons";

import {
  TableDiv,
  Tbl,
  TblHeading,
  TblData,
  InputHours,
  DropDownDiv,
} from "./table.styles";

export const Table = () => {
  const projectOptions = [
    { value: "project1", label: "project1project1project1project1project1" },
    { value: "project2", label: "project2" },
    { value: "project3", label: "project3" },
    { value: "project4", label: "project4" },
  ];
  const taskOptions = [
    { value: "task1", label: "task1" },
    { value: "task2", label: "task2" },
    { value: "task3", label: "task3" },
    { value: "task4", label: "task4" },
  ];
  const projectsPlaceholder = "Project...";
  const tasksPlaceholder = "Task...";

  return (
    <TableDiv>
      <Tbl>
        <tr>
          <TblHeading></TblHeading>
          <TblHeading>Project</TblHeading>
          <TblHeading>Task</TblHeading>
          <TblHeading>13 Mon</TblHeading>
          <TblHeading>14 Tue</TblHeading>
          <TblHeading>15 Wed</TblHeading>
          <TblHeading>16 Thu</TblHeading>
          <TblHeading>17 Fri</TblHeading>
          <TblHeading>18 Sat</TblHeading>
          <TblHeading>19 Sun</TblHeading>
          <TblHeading>Total</TblHeading>
        </tr>
        <tr>
          <TblData>
            <NextBtn>Delete</NextBtn>
          </TblData>
          <TblData>
            <DropDownDiv>
              <DropDown
                options={projectOptions}
                placeholder={projectsPlaceholder}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </DropDownDiv>
          </TblData>
          <TblData>
            <DropDownDiv>
              <DropDown
                options={taskOptions}
                placeholder={tasksPlaceholder}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </DropDownDiv>
          </TblData>
          <TblData>
            <InputHours />
          </TblData>
          <TblData>
            <InputHours />
          </TblData>
          <TblData>
            <InputHours />
          </TblData>
          <TblData>
            <InputHours />
          </TblData>
          <TblData>
            <InputHours />
          </TblData>
          <TblData>
            <InputHours />
          </TblData>
          <TblData>
            <InputHours />
          </TblData>
        </tr>
        <tr style={{ height: "50px" }}> </tr>
      </Tbl>
    </TableDiv>
  );
};
