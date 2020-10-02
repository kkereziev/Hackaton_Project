import React, { useState } from "react";
import {
  Title,
  TitleDiv,
  SecondTitle,
} from "src/components/generic/styles/Title";
import {
  ColumnDivWider,
  BaseDivTopZero,
} from "../../components/generic/styles/Containers";
import { TableDashboard } from "src/components/TableDashboard";
import { Modal } from "react-bootstrap";
import {
  NextBtn,
  NoBtn,
  IconBtnDiv,
} from "../../components/generic/styles/Buttons";
import { connect } from "react-redux";
import { deleteTimesheet } from "../../store/slice/timesheet";

const Dashboard = ({ deleteTimesheet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timesheetId, setTimesheetId] = useState(null);
  const [timesheetName, setTimesheetName] = useState("");
  const handleClose = () => {
    setIsOpen(false);
    deleteTimesheet(timesheetId);
    setTimesheetId(null);
  };

  const handleOpen = (timesheet) => {
    setTimesheetId(timesheet.id);
    setTimesheetName(timesheet.name);
    setIsOpen(true);
  };

  return (
    <BaseDivTopZero>
      <ColumnDivWider>
        <TitleDiv>
          <Title>Your Timesheets:</Title>
        </TitleDiv>
        <TableDashboard handleOpen={handleOpen} />
      </ColumnDivWider>

      <Modal
        size="sm"
        show={isOpen}
        onHide={() => setIsOpen(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <SecondTitle>
              Are you sure you want to delete the timesheet for week{" "}
              {timesheetName}?
            </SecondTitle>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IconBtnDiv>
            <NextBtn onClick={handleClose}>Yes</NextBtn>
            <NoBtn onClick={handleClose}>No</NoBtn>
          </IconBtnDiv>
        </Modal.Body>
      </Modal>
    </BaseDivTopZero>
  );
};

const ConnectedDashboard = connect(null, (dispatch) => ({
  deleteTimesheet: (id) => dispatch(deleteTimesheet(id)),
}))(Dashboard);

export { ConnectedDashboard as Dashboard };
