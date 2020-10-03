import React from "react";
import {
  SecondTitle,
  Title,
  ColumnTitlesDiv,
} from "src/components/generic/styles/Title";
import {
  DeleteBtn,
  SaveBtn,
  SubmitBtn,
} from "src/components/generic/styles/Buttons";
import { Table } from "src/components/generic/Table/Table";
import {
  TitleWithBtnsDiv,
  BtnGroupFlexDiv,
  BaseDivTopZero,
} from "src/components/generic/styles/Containers";
import { RiDeleteBinFill, RiUploadCloud2Line } from "react-icons/ri";
import { VscSave } from "react-icons/vsc";
import { Container } from "react-bootstrap";

/* As we are using dropdown on several places here options are hard coded for the sake of reviewing the UI
 * Placeholder should be hardcoded for every dropdown individually where dropdown component is used*/

export const CurrentTimesheet = () => {
  return (
    <div>
      <Container>
        <ColumnTitlesDiv>
          <Title>Timesheet for week {}</Title>
          <SecondTitle>User: {}</SecondTitle>
        </ColumnTitlesDiv>
        <BtnGroupFlexDiv>
          <DeleteBtn>
            <BaseDivTopZero>
              Delete <RiDeleteBinFill />
            </BaseDivTopZero>
          </DeleteBtn>
          <SaveBtn>
            <BaseDivTopZero>
              Save <VscSave />
            </BaseDivTopZero>
          </SaveBtn>
          <SubmitBtn>
            <BaseDivTopZero>
              Submit <RiUploadCloud2Line />
            </BaseDivTopZero>
          </SubmitBtn>
        </BtnGroupFlexDiv>
      </Container>

      <Table />
    </div>
  );
};
