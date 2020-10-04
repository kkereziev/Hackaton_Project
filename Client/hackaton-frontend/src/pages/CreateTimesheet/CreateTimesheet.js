import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  ColumnBaseDiv,
  LineFlexBaseDiv,
} from "src/components/generic/styles/Containers";
import { Title, TitleDiv } from "src/components/generic/styles/Title";
import { NextBtn } from "src/components/generic/styles/Buttons";
import { DropDown } from "../../components/generic/Dropdown/DropDown";
import { getDates, createTimesheet } from "src/api_endpoints/timesheets";

export const CreateTimesheet = () => {
  const history = useHistory();
  const [options, setOptions] = useState([]);

  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const fetchDates = async () => {
      const datesOptions = [];
      const dates = await getDates();
      dates.map((date) => {
        datesOptions.push({
          value: date.startDate,
          label: date.isSubmitted ? `${date.name} already created` : date.name,
          disabled: date.isSubmitted,
        });
      });
      setOptions(datesOptions);
    };
    fetchDates();
  }, []);

  const nextBtnClick = async () => {
    try {
      await createTimesheet(startDate);
      history.push(`/timesheet/${startDate.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setStartDate({ name: e.label, startDate: e.value });
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
          <NextBtn onClick={nextBtnClick} disabled={startDate === null}>
            Next
          </NextBtn>
        </LineFlexBaseDiv>
      </ColumnBaseDiv>
    </div>
  );
};
