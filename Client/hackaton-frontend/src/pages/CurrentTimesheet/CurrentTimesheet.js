import React, { useState, useEffect } from "react";
import { Title } from "src/components/generic/styles/Title";
import { Table } from "src/components/generic/Table/Table";
import { TitleWithBtnsDiv } from "src/components/generic/styles/Containers";
import { useParams } from "react-router-dom";
import { getCurrentTimesheet } from "src/api_endpoints/timesheets";

export const CurrentTimesheet = () => {
  const { name } = useParams();
  const [timesheet, setTimesheet] = useState();

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const timesheet = await getCurrentTimesheet(name);
        setTimesheet(timesheet);
      } catch (error) {}
    };
    fetchRows();
  }, []);

  return (
    <div>
      <TitleWithBtnsDiv>
        <Title>Timesheet for week {name}</Title>
      </TitleWithBtnsDiv>
      <Table name={name} timesheetObj={timesheet} />
    </div>
  );
};
