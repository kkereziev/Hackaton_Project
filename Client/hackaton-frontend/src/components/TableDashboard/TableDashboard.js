import React, { useEffect } from "react";
import { Tbl, TblData, TblHeading } from "../generic/Table";
import {
  EditIconBtn,
  DeleteIconBtn,
  ViewIconBtn,
} from "../generic/styles/Buttons";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import { fetchUserTimesheets } from "../../store/slice/timesheet";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../generic/Spinner";

const TableDashboard = ({
  handleOpen,
  userTimesheets,
  fetchUserTimesheets,
}) => {
  useEffect(() => {
    fetchUserTimesheets();
  }, []);
  const { isLoading } = useSelector((state) => state.timesheet);
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : userTimesheets.length === 0 ? (
        <div>
          <h3 style={{ textAlign: "center" }}>
            You don't have any timesheets yet.
          </h3>
        </div>
      ) : (
        <Tbl responsive>
          <tbody>
            <tr>
              <TblHeading> </TblHeading>
              <TblHeading>Week</TblHeading>
              <TblHeading>Status</TblHeading>
              <TblHeading> </TblHeading>
            </tr>
            {userTimesheets.map((timesheet) => {
              return (
                <tr key={timesheet.id}>
                  {!timesheet.isSubmitted ? (
                    <TblData>
                      <DeleteIconBtn
                        as={Link}
                        onClick={() => handleOpen(timesheet)}
                      >
                        <RiDeleteBinFill />
                      </DeleteIconBtn>
                    </TblData>
                  ) : (
                    <TblData></TblData>
                  )}
                  <TblData>{timesheet.name}</TblData>
                  <TblData>
                    {timesheet.isSubmitted ? "Submitted" : "Open"}
                  </TblData>
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
      )}
    </div>
  );
};

const ConnectedTableDashboard = connect(
  (state) => ({
    userTimesheets: state.timesheet.userTimesheets,
  }),
  (dispatch) => ({ fetchUserTimesheets: () => dispatch(fetchUserTimesheets()) })
)(TableDashboard);

export { ConnectedTableDashboard as TableDashboard };
