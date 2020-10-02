import React, { useEffect } from "react";
import { Tbl, TblData, TblHeading } from "../generic/Table";
import {
  EditIconBtn,
  DeleteIconBtn,
  ViewIconBtn,
  IconBtnDiv,
} from "../generic/styles/Buttons";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import { fetchUserTimesheets } from "../../store/slice/timesheet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//@Preslava, the only warnings left are on line 36 and 46 and when I delete {" "} which you have left the warnings are gone
const TableDashboard = ({
  handleOpen,
  userTimesheets,
  fetchUserTimesheets,
}) => {
  useEffect(() => {
    fetchUserTimesheets();
  }, []);
  return (
    <Tbl responsive>
      <tbody>
        <tr>
          <TblHeading> </TblHeading>
          <TblHeading>Week</TblHeading>
          <TblHeading>Status</TblHeading>
          <TblHeading>Manage</TblHeading>
        </tr>
        {userTimesheets.map((timesheet) => {
          return (
            <tr key={timesheet.id}>
              <TblData>
                <IconBtnDiv>
                  <DeleteIconBtn onClick={() => handleOpen(timesheet)}>
                    <RiDeleteBinFill />
                  </DeleteIconBtn>
                </IconBtnDiv>
              </TblData>
              <TblData>{timesheet.name}</TblData>
              <TblData>{timesheet.isSubmitted ? "Submitted" : "Open"}</TblData>
              <TblData>
                {timesheet.isSubmitted ? (
                  <ViewIconBtn
                    as={Link}
                    to={`/timesheet/${timesheet.name.split(" ")[0]}`}
                  >
                    <BsFillEyeFill />
                  </ViewIconBtn>
                ) : (
                  <EditIconBtn
                    as={Link}
                    to={`/timesheet/${timesheet.name.split(" ")[0]}`}
                  >
                    <RiEdit2Fill />
                  </EditIconBtn>
                )}
              </TblData>
            </tr>
          );
        })}
      </tbody>
    </Tbl>
  );
};

const ConnectedTableDashboard = connect(
  (state) => ({
    userTimesheets: state.timesheet.userTimesheets,
  }),
  (dispatch) => ({ fetchUserTimesheets: () => dispatch(fetchUserTimesheets()) })
)(TableDashboard);

export { ConnectedTableDashboard as TableDashboard };
