import React, { useEffect, useState } from "react";
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
  console.log("rerender");
  const initialRow = {
    project: null,
    task: null,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
    total: 0,
  };

  const [tableRows, setTableRows] = useState([initialRow]);

  const projectOptions = [
    { value: "project1", label: "project1" },
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

  const projectChange = (e, idx) => {
    const rows = [...tableRows];
    rows[idx].project = e.value;
    setTableRows(rows);
  };

  const taskChange = (e, idx) => {
    const rows = [...tableRows];
    rows[idx].task = e.value;
    setTableRows([...rows, initialRow]);
  };

  const inputChange = (e, idx) => {
    const rows = [...tableRows];
    rows[idx][`${e.target.name}`] = +e.target.value;
    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    } = rows[idx];
    rows[idx].total =
      monday + tuesday + wednesday + thursday + friday + saturday + sunday;
    setTableRows(rows);
  };

  const deleteRow = (idx) => {
    const rows = [...tableRows];
    rows.splice(idx, 1);
    setTableRows(rows);
    console.log(rows);
  };

  return (
    <TableDiv>
      <Tbl>
        <tbody>
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
          {tableRows.map((row, idx) => (
            <tr key={idx}>
              <TblData>
                <NextBtn onClick={() => deleteRow(idx)}>Delete</NextBtn>
              </TblData>
              <TblData>
                <DropDownDiv>
                  <DropDown
                    row={row}
                    options={projectOptions}
                    placeholder="Project..."
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    onChange={(e) => projectChange(e, idx)}
                    defaultValue={row.project}
                  />
                </DropDownDiv>
              </TblData>
              <TblData>
                <DropDownDiv>
                  <DropDown
                    row={row}
                    options={taskOptions}
                    placeholder="Task..."
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    onChange={(e) => taskChange(e, idx)}
                    disabled={row.project === null}
                    defaultValue={row.task}
                  />
                </DropDownDiv>
              </TblData>
              <TblData>
                <InputHours
                  name="monday"
                  disabled={row.task === null}
                  onChange={(e) => inputChange(e, idx)}
                  defaultValue={5}
                />
              </TblData>
              <TblData>
                <InputHours
                  name="tuesday"
                  disabled={row.task === null}
                  defaultValue={5}
                  onChange={(e) => inputChange(e, idx)}
                />
              </TblData>
              <TblData>
                <InputHours
                  name="wednesday"
                  disabled={row.task === null}
                  onChange={(e) => inputChange(e, idx)}
                />
              </TblData>
              <TblData>
                <InputHours
                  name="thursday"
                  disabled={row.task === null}
                  onChange={(e) => inputChange(e, idx)}
                />
              </TblData>
              <TblData>
                <InputHours
                  name="friday"
                  disabled={row.task === null}
                  onChange={(e) => inputChange(e, idx)}
                />
              </TblData>
              <TblData>
                <InputHours
                  name="saturday"
                  disabled={row.task === null}
                  onChange={(e) => inputChange(e, idx)}
                />
              </TblData>
              <TblData>
                <InputHours
                  name="sunday"
                  disabled={row.task === null}
                  onChange={(e) => inputChange(e, idx)}
                />
              </TblData>
              <TblData>{row && <label>{row.total}</label>}</TblData>
            </tr>
          ))}

          <tr style={{ height: "50px" }}></tr>
        </tbody>
      </Tbl>
    </TableDiv>
  );
};
