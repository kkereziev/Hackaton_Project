import React, { useState } from "react";
import {
  Title,
  TitleDiv,
  SecondTitle,
} from "src/components/generic/styles/Title";
import {
  ColumnBaseDiv,
  BaseDivTopZero,
} from "../../components/generic/styles/Containers";
import { TableDashboard } from "src/components/TableDashboard";
import { Modal } from "react-bootstrap";
import {
  NextBtn,
  NoBtn,
  IconBtnDiv,
} from "../../components/generic/styles/Buttons";

export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <BaseDivTopZero>
      <ColumnBaseDiv>
        <TitleDiv>
          <Title>Your Timesheets:</Title>
        </TitleDiv>
        <TableDashboard handleOpen={handleOpen} />
      </ColumnBaseDiv>

      <Modal
        size="sm"
        show={isOpen}
        onHide={() => setIsOpen(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <SecondTitle>
              Are you sure you want to delete the timesheet for week ...?
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
