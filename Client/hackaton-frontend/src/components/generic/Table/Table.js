import React, { useEffect, useState } from "react";
import { uuid } from "short-uuid";
import {
  getProjects,
  saveCurrentTimesheet,
  deleteCurrentTimesheet,
} from "src/api_endpoints/timesheets";
import { useHistory } from "react-router-dom";
import { DropDown } from "../Dropdown/DropDown";
import {
  DeleteBtn,
  SaveBtn,
  SubmitBtn,
  YesBtn,
  NoBtn,
} from "src/components/generic/styles/Buttons";
import { BtnGroupFlexDiv } from "src/components/generic/styles/Containers";
import { ThirdTitle } from "src/components/generic/styles/Title";
import { Alert, Modal } from "react-bootstrap";
import {
  DeleteIconBtn,
  IconBtnDiv,
} from "src/components/generic/styles/Buttons";
import { Container } from "react-bootstrap";
import {
  Tbl,
  TblHeading,
  TblData,
  InputHours,
  DropDownDiv,
} from "./table.styles";
import { RiDeleteBinFill } from "react-icons/ri";

export const Table = ({ timesheetObj }) => {
  const history = useHistory();
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
  const [requestError, setRequestError] = useState(null);
  const [hoursError, setHoursError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!timesheetObj.isSubmitted) {
      setTableRows([...timesheetObj.TimesheetRow, initialRow]);
    } else {
      setTableRows([...timesheetObj.TimesheetRow]);
    }
  }, []);

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
      } catch (err) {
        setRequestError(
          "Something went wrong, please try again in a few minutes."
        );
      }
      setOptions(projectsOptions);
    };
    fetchProjects();
  }, []);

  const projectChange = (e, idx) => {
    const rows = [...tableRows];
    rows[idx].projectId = +e.value;
    setTableRows(rows);
  };

  const taskChange = (e, idx) => {
    const rows = [...tableRows];
    rows[idx].taskId = +e.value;
    if (idx === rows.length - 1) {
      const newRow = { ...initialRow, id: uuid() };
      setTableRows([...rows, newRow]);
    }
  };

  const inputChange = (e, idx) => {
    const rows = [...tableRows];
    rows[idx][`${e.target.name}`] = +e.target.value;
    if (
      rows.map((row) => row[`${e.target.name}`]).reduce((a, b) => a + b) > 24
    ) {
      setHoursError(
        `${e.target.name.toUpperCase()} cannot have more than 24 hours.`
      );
    } else setHoursError(null);
    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    } = rows[idx];
    rows[idx].totalRowHours =
      monday + tuesday + wednesday + thursday + friday + saturday + sunday;
    setTableRows(rows);
  };

  const deleteRow = (idx) => {
    if (tableRows.length === 1 || idx === tableRows.length - 1) return;
    const rows = [...tableRows];
    rows.splice(idx, 1);
    setTableRows(rows);
  };

  const validateRows = () => {
    const rows = [...tableRows];
    rows.pop();
    return rows;
  };

  const deleteTimesheet = async () => {
    try {
      const res = await deleteCurrentTimesheet(timesheetObj.id);
      history.push("/dashboard");
      console.log(res);
    } catch (err) {
      setRequestError(
        "Something went wrong, please try again in a few minutes."
      );
    }
  };

  const saveTimesheet = async (isSubmitted) => {
    try {
      const res = await saveCurrentTimesheet({
        isSubmitted: isSubmitted,
        id: timesheetObj.id,
        rows: validateRows(),
      });
      console.log(res);
      if (isSubmitted) history.push("/dashboard");
    } catch (err) {
      setRequestError(
        "Something went wrong, please try again in a few minutes."
      );
    }
  };

  const getWeekDays = (startDate, day = 0) => {
    const weekStartDate = new Date(startDate);

    const newDate = new Date(
      weekStartDate.getFullYear(),
      weekStartDate.getMonth() + 1,
      weekStartDate.getDate() + day
    );

    return newDate.toDateString().split(" ")[2];
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {
    deleteTimesheet();
    setIsOpen(false);
  };

  return (
    <Container>
      {timesheetObj && !timesheetObj.isSubmitted ? (
        hoursError || requestError ? (
          hoursError ? (
            <Alert variant="danger">
              <Alert.Heading>{`${hoursError}`}</Alert.Heading>
            </Alert>
          ) : (
            <Alert
              variant="danger"
              dismissible
              onClick={() => setRequestError(null)}
            >
              <Alert.Heading>{`${requestError}`}</Alert.Heading>
            </Alert>
          )
        ) : (
          <Container>
            <BtnGroupFlexDiv>
              <DeleteBtn onClick={handleOpen}>
                <BaseDivTopZero>
                  Delete <RiDeleteBinFill />
                </BaseDivTopZero>
              </DeleteBtn>
              <SaveBtn
                onClick={() => {
                  saveTimesheet(false);
                  setTimeout(() => {
                    setRequestError(null);
                  }, 3000);
                }}
              >
                <BaseDivTopZero>
                  Save <VscSave />
                </BaseDivTopZero>
              </SaveBtn>
              <SubmitBtn
                onClick={() => {
                  saveTimesheet(true);
                  setTimeout(() => {
                    setRequestError(null);
                  }, 3000);
                }}
              >
                <BaseDivTopZero>
                  Submit <RiUploadCloud2Line />
                </BaseDivTopZero>
              </SubmitBtn>
            </BtnGroupFlexDiv>
          </Container>
        )
      ) : (
        <h1>Submitted</h1>
      )}
      <Tbl responsive="lg">
        <tbody>
          <tr>
            <TblHeading></TblHeading>
            <TblHeading>Project</TblHeading>
            <TblHeading>Task</TblHeading>
            <TblHeading>
              {getWeekDays(timesheetObj?.name.split(" ")[0])} Mon
            </TblHeading>
            <TblHeading>
              {getWeekDays(timesheetObj?.name.split(" ")[0], 1)} Tue
            </TblHeading>
            <TblHeading>
              {getWeekDays(timesheetObj?.name.split(" ")[0], 2)} Wed
            </TblHeading>
            <TblHeading>
              {getWeekDays(timesheetObj?.name.split(" ")[0], 3)} Thu
            </TblHeading>
            <TblHeading>
              {getWeekDays(timesheetObj?.name.split(" ")[0], 4)} Fri
            </TblHeading>
            <TblHeading>
              {getWeekDays(timesheetObj?.name.split(" ")[0], 5)} Sat
            </TblHeading>
            <TblHeading>
              {getWeekDays(timesheetObj?.name.split(" ")[0], 6)} Sun
            </TblHeading>
            <TblHeading>Total</TblHeading>
          </tr>
          {tableRows.map((row, idx) => (
            <tr key={row.id}>
              <TblData>
                <IconBtnDiv>
                  <DeleteIconBtn
                    onClick={() => deleteRow(idx)}
                    hidden={
                      idx === tableRows.length - 1 || timesheetObj.isSubmitted
                    }
                  >
                    <RiDeleteBinFill />
                  </DeleteIconBtn>
                </IconBtnDiv>
              </TblData>
              <TblData>
                <DropDownDiv>
                  <DropDown
                    disabled={timesheetObj && timesheetObj.isSubmitted}
                    options={options}
                    placeholder="Project..."
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    onChange={(e) => projectChange(e, idx)}
                    value={
                      row.projectId === null
                        ? "Project..."
                        : {
                            value: +row.projectId,
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
                    disabled={
                      (timesheetObj && timesheetObj.isSubmitted) ||
                      row.projectId === null
                    }
                    options={
                      options.find((project) => project.value === row.projectId)
                        ?.tasks
                    }
                    placeholder="Task..."
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    onChange={(e) => taskChange(e, idx)}
                    value={
                      row.taskId === null
                        ? "Task..."
                        : {
                            value: +row.projectId,
                            label: options
                              .find(
                                (project) => project.value === row.projectId
                              )
                              ?.tasks.find((task) => task.value === row.taskId)
                              ?.label,
                          }
                    }
                  />
                </DropDownDiv>
              </TblData>
              <TblData>
                <InputHours
                  type="number"
                  name="monday"
                  min={0}
                  max={24}
                  disabled={
                    (timesheetObj && timesheetObj.isSubmitted) ||
                    row.taskId === null
                  }
                  onChange={(e) => inputChange(e, idx)}
                  defaultValue={row.monday}
                />
              </TblData>
              <TblData>
                <InputHours
                  type="number"
                  min={0}
                  max={24}
                  name="tuesday"
                  disabled={
                    (timesheetObj && timesheetObj.isSubmitted) ||
                    row.taskId === null
                  }
                  onChange={(e) => inputChange(e, idx)}
                  defaultValue={row.tuesday}
                />
              </TblData>
              <TblData>
                <InputHours
                  type="number"
                  min={0}
                  max={24}
                  name="wednesday"
                  disabled={
                    (timesheetObj && timesheetObj.isSubmitted) ||
                    row.taskId === null
                  }
                  onChange={(e) => inputChange(e, idx)}
                  defaultValue={row.wednesday}
                />
              </TblData>
              <TblData>
                <InputHours
                  type="number"
                  min={0}
                  max={24}
                  name="thursday"
                  disabled={
                    (timesheetObj && timesheetObj.isSubmitted) ||
                    row.taskId === null
                  }
                  onChange={(e) => inputChange(e, idx)}
                  defaultValue={row.thursday}
                />
              </TblData>
              <TblData>
                <InputHours
                  type="number"
                  min={0}
                  max={24}
                  name="friday"
                  disabled={
                    (timesheetObj && timesheetObj.isSubmitted) ||
                    row.taskId === null
                  }
                  onChange={(e) => inputChange(e, idx)}
                  defaultValue={row.friday}
                />
              </TblData>
              <TblData>
                <InputHours
                  type="number"
                  min={0}
                  max={24}
                  name="saturday"
                  disabled={
                    (timesheetObj && timesheetObj.isSubmitted) ||
                    row.taskId === null
                  }
                  onChange={(e) => inputChange(e, idx)}
                  defaultValue={row.saturday}
                />
              </TblData>
              <TblData>
                <InputHours
                  type="number"
                  min={0}
                  max={24}
                  name="sunday"
                  disabled={
                    (timesheetObj && timesheetObj.isSubmitted) ||
                    row.taskId === null
                  }
                  onChange={(e) => inputChange(e, idx)}
                  defaultValue={row.sunday}
                />
              </TblData>
              <TblData>{row && <label>{row.totalRowHours}</label>}</TblData>
            </tr>
          ))}
          <tr>
            <TblHeading></TblHeading>
            <TblHeading></TblHeading>
            <TblHeading></TblHeading>
            <TblHeading>
              {tableRows.map((row) => row.monday).reduce((a, b) => a + b)}
            </TblHeading>
            <TblHeading>
              {tableRows.map((row) => row.tuesday).reduce((a, b) => a + b)}
            </TblHeading>
            <TblHeading>
              {tableRows.map((row) => row.wednesday).reduce((a, b) => a + b)}
            </TblHeading>
            <TblHeading>
              {tableRows.map((row) => row.thursday).reduce((a, b) => a + b)}
            </TblHeading>
            <TblHeading>
              {tableRows.map((row) => row.friday).reduce((a, b) => a + b)}
            </TblHeading>
            <TblHeading>
              {tableRows.map((row) => row.saturday).reduce((a, b) => a + b)}
            </TblHeading>
            <TblHeading>
              {tableRows.map((row) => row.sunday).reduce((a, b) => a + b)}
            </TblHeading>
            <TblHeading>
              {tableRows
                .map((row) => row.totalRowHours)
                .reduce((a, b) => a + b)}
            </TblHeading>
          </tr>
        </tbody>
      </Tbl>
      <Modal
        size="md"
        show={isOpen}
        onHide={() => setIsOpen(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <ThirdTitle>
              Are you sure you want to delete the timesheet for week{" "}
              {timesheetObj?.name}?
            </ThirdTitle>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IconBtnDiv>
            <YesBtn onClick={handleDelete}>Yes</YesBtn>
            <NoBtn onClick={handleClose}>No</NoBtn>
          </IconBtnDiv>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
