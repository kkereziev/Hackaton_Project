import React, { useEffect, useState } from "react";
import { DropDown } from "../Dropdown/DropDown";
import {
  getProjects,
  saveCurrentTimesheet,
} from "src/api_endpoints/timesheets";
import { uuid } from "short-uuid";
import { NextBtn } from "src/components/generic/styles/Buttons";
import { BtnGroupFlexDiv } from "src/components/generic/styles/Containers";

import {
  TableDiv,
  Tbl,
  TblHeading,
  TblData,
  InputHours,
  DropDownDiv,
} from "./table.styles";

export const Table = ({ timesheetObj }) => {
  const initialRow = {
    id: uuid(),
    projectId: null,
    taskId: null,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
    totalRowHours: 0,
  };

  const [tableRows, setTableRows] = useState([initialRow]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (timesheetObj) {
      setTableRows([...timesheetObj.TimesheetRow, initialRow]);
    }
  }, [timesheetObj]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsOptions = [];
      try {
        const response = await getProjects();

        response.UserProject.map((project) => {
          projectsOptions.push({
            value: project.id,
            label: project.name,
            tasks: project.ProjectTask.map((task) => ({
              value: task.id,
              label: task.name,
            })),
          });
        });
      } catch (error) {}
      setOptions(projectsOptions);
    };
    fetchProjects();
  }, []);

  const projectChange = (e, idx) => {
    const rows = [...tableRows];
    rows[idx].projectId = e.value;
    setTableRows(rows);
  };

  const taskChange = (e, idx) => {
    const rows = [...tableRows];
    rows[idx].taskId = e.value;
    if (idx === rows.length - 1) {
      const newRow = { ...initialRow, id: uuid() };
      setTableRows([...rows, newRow]);
    }
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
  };

  const deleteTimesheet = () => {
    console.log(timesheetObj);
  };

  const saveTimesheet = async () => {
    try {
      const res = await saveCurrentTimesheet({
        isSubmitted: false,
        id: timesheetObj.id,
        rows: tableRows,
      });
      console.log(res);
    } catch (error) {}
  };

  return (
    <div>
      <BtnGroupFlexDiv>
        <NextBtn onClick={deleteTimesheet}>Delete</NextBtn>
        <NextBtn onClick={saveTimesheet}>Save</NextBtn>
        <NextBtn>Submit</NextBtn>
      </BtnGroupFlexDiv>
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
              <tr key={row.id}>
                <TblData>
                  <NextBtn onClick={() => deleteRow(idx)}>Delete</NextBtn>
                </TblData>
                <TblData>
                  <DropDownDiv>
                    <DropDown
                      options={options}
                      placeholder="Project..."
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      onChange={(e) => projectChange(e, idx)}
                      defaultValue={
                        row.projectId === null
                          ? "Project..."
                          : {
                              value: row.projectId,
                              label: options.find(
                                (project) => project.value === row.projectId
                              )?.label,
                            }
                      }
                    />
                  </DropDownDiv>
                </TblData>
                <TblData>
                  <DropDownDiv>
                    <DropDown
                      options={
                        options.find(
                          (project) => project.value === row.projectId
                        )?.tasks
                      }
                      placeholder="Task..."
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      onChange={(e) => taskChange(e, idx)}
                      disabled={row.projectId === null}
                      defaultValue={
                        row.taskId === null
                          ? "Task..."
                          : {
                              value: row.projectId,
                              label: options
                                .find(
                                  (project) => project.value === row.projectId
                                )
                                ?.tasks.find(
                                  (task) => task.value === row.taskId
                                )?.label,
                            }
                      }
                    />
                  </DropDownDiv>
                </TblData>
                <TblData>
                  <InputHours
                    name="monday"
                    disabled={row.taskId === null}
                    onChange={(e) => inputChange(e, idx)}
                    defaultValue={row.monday}
                  />
                </TblData>
                <TblData>
                  <InputHours
                    name="tuesday"
                    disabled={row.taskId === null}
                    onChange={(e) => inputChange(e, idx)}
                    defaultValue={row.tuesday}
                  />
                </TblData>
                <TblData>
                  <InputHours
                    name="wednesday"
                    disabled={row.taskId === null}
                    onChange={(e) => inputChange(e, idx)}
                    defaultValue={row.wednesday}
                  />
                </TblData>
                <TblData>
                  <InputHours
                    name="thursday"
                    disabled={row.taskId === null}
                    onChange={(e) => inputChange(e, idx)}
                    defaultValue={row.thursday}
                  />
                </TblData>
                <TblData>
                  <InputHours
                    name="friday"
                    disabled={row.taskId === null}
                    onChange={(e) => inputChange(e, idx)}
                    defaultValue={row.friday}
                  />
                </TblData>
                <TblData>
                  <InputHours
                    name="saturday"
                    disabled={row.taskId === null}
                    onChange={(e) => inputChange(e, idx)}
                    defaultValue={row.saturday}
                  />
                </TblData>
                <TblData>
                  <InputHours
                    name="sunday"
                    disabled={row.taskId === null}
                    onChange={(e) => inputChange(e, idx)}
                    defaultValue={row.sunday}
                  />
                </TblData>
                <TblData>{row && <label>{row.totalRowHours}</label>}</TblData>
              </tr>
            ))}
            <tr style={{ height: "50px" }}></tr>
          </tbody>
        </Tbl>
      </TableDiv>
    </div>
  );
};
