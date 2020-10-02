import React, { useEffect } from "react";
//import {Table as TableBootstrap} from "react-bootstrap";
import { Tbl, TblData, TblHeading } from "../generic/Table";
import {
  DeleteBtn,
  EditBtn,
  IconBtnDiv,
  ViewBtn,
} from "../generic/styles/Buttons";
import { RiDeleteBinFill, RiEdit2Fill, RiFileSearchLine } from "react-icons/ri";
import { fetchUserTimesheets } from "../../store/slice/timesheet";
import { connect } from "react-redux";

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
          <TblHeading>Week</TblHeading>
          <TblHeading>Status</TblHeading>
          <TblHeading>Manage</TblHeading>
        </tr>
        {userTimesheets.map((timesheet) => {
          return (
            <tr key={timesheet.id}>
              <TblData>{timesheet.name}</TblData>
              <TblData>{timesheet.isSubmitted ? "Submitted" : "Open"}</TblData>
              <TblData>
                {timesheet.isSubmitted ? (
                  <ViewBtn>
                    <RiFileSearchLine color="white" />
                  </ViewBtn>
                ) : (
                  <IconBtnDiv>
                    <EditBtn>
                      <RiEdit2Fill color="white" />
                    </EditBtn>
                    <DeleteBtn onClick={handleOpen}>
                      <RiDeleteBinFill color="white" />
                    </DeleteBtn>
                  </IconBtnDiv>
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
