import React from "react";
//import {Table as TableBootstrap} from "react-bootstrap";
import { Tbl, TblData, TblHeading } from "../generic/Table";
import {
  DeleteBtn,
  EditBtn,
  IconBtnDiv,
  ViewBtn,
} from "../generic/styles/Buttons";
import { RiDeleteBinFill, RiEdit2Fill, RiFileSearchLine } from "react-icons/ri";

//@Preslava, the only warnings left are on line 36 and 46 and when I delete {" "} which you have left the warnings are gone
export const TableDashboard = ({ handleOpen }) => {
  return (
    <Tbl responsive>
      <tbody>
        <tr>
          <TblHeading>Week</TblHeading>
          <TblHeading>Status</TblHeading>
          <TblHeading>Manage</TblHeading>
        </tr>
        <tr>
          <TblData>Week 05/06</TblData>
          <TblData>Open</TblData>
          <TblData>
            <IconBtnDiv>
              <EditBtn>
                <RiEdit2Fill color="white" />
              </EditBtn>
              <DeleteBtn onClick={handleOpen}>
                <RiDeleteBinFill color="white" />
              </DeleteBtn>
            </IconBtnDiv>
          </TblData>
        </tr>
        <tr>
          {" "}
          <TblData>Week 05/13</TblData>
          <TblData>Submitted</TblData>
          <TblData>
            <ViewBtn>
              <RiFileSearchLine color="white" />
            </ViewBtn>
          </TblData>
        </tr>
        <tr>
          {" "}
          <TblData>Week 05/20</TblData>
          <TblData>Submitted</TblData>
          <TblData>
            <ViewBtn>
              <RiFileSearchLine color="white" />
            </ViewBtn>
          </TblData>
        </tr>
      </tbody>
    </Tbl>
  );
};
