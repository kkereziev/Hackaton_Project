import React from "react";
import { Table as TableBootstrap } from "react-bootstrap";
import { Tbl, TblData, TblHeading } from "../generic/Table";
import {
  DeleteBtn,
  EditBtn,
  IconBtnDiv,
  ViewBtn,
} from "../generic/styles/Buttons";
import { RiDeleteBinFill, RiEdit2Fill, RiFileSearchLine } from "react-icons/ri";

export const TableDashboard = () => {
  return (
    <TableBootstrap responsive>
      <Tbl>
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
              <DeleteBtn>
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
      </Tbl>
    </TableBootstrap>
  );
};
