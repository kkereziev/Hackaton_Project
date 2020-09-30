import React from "react";
//import {styles} from "./Table.module.css"
import { DropDown } from "../Dropdown/DropDown";

import {
  TableDiv,
  Tbl,
  TblHeading,
  TblData,
  InputHours,
  DropDownDiv,
} from "./table.styles";

export const Table = ({ date }) => {
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
          <TblHeading>Mon {date}</TblHeading>
          <TblHeading>Tue</TblHeading>
          <TblHeading>Wed</TblHeading>
          <TblHeading>Thu</TblHeading>
          <TblHeading>Fri</TblHeading>
          <TblHeading>Sat</TblHeading>
          <TblHeading>Sun</TblHeading>
          <TblHeading>Total</TblHeading>
        </tr>
        <tr>
          <TblData>btn</TblData>
          <TblData>
            <DropDownDiv>
              <DropDown
                options={projectOptions}
                placeholder={projectsPlaceholder}
              />
            </DropDownDiv>
          </TblData>
          <TblData>
            <DropDownDiv>
              <DropDown options={taskOptions} placeholder={tasksPlaceholder} />
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
