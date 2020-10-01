import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  ColumnBaseDiv,
  LineFlexBaseDiv,
} from "src/components/generic/styles/Containers";
import { Title, TitleDiv } from "src/components/generic/styles/Title";
import { NextBtn } from "src/components/generic/styles/Buttons";
import { DropDown } from "../../components/generic/Dropdown/DropDown";

export const CreateTimesheet = () => {
  const history = useHistory();
  const [options, setOptions] = useState([
    { value: "10-1-2020", label: "10/1/2020" },
    { value: "10-2-2020", label: "10/2/2020" },
  ]);

  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    // async () => {
    //   try {
    //     const newOptions = await api.getOptions;
    //     setOptions(newOptions);
    //   } catch (error) {}
    // };
  }, []);

  const nextBtnClick = async () => {
    try {
      // await api.CreateTimesheet
      history.push(`/timesheet/${startDate}`);
    } catch (error) {}
  };

  const handleChange = (e) => {
    setStartDate(e.value);
  };

  return (
    <div>
      <ColumnBaseDiv>
        <TitleDiv>
          <Title>Create new timesheet:</Title>
        </TitleDiv>
        <DropDown
          options={options}
          placeholder="Select a week"
          onChange={handleChange}
        />
        <LineFlexBaseDiv>
          <NextBtn onClick={nextBtnClick}>Next</NextBtn>
        </LineFlexBaseDiv>
      </ColumnBaseDiv>
    </div>
  );
};
