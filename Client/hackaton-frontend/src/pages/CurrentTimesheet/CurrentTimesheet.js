import React, { useState, useEffect } from "react";
import { Title } from "src/components/generic/styles/Title";
import { Table } from "src/components/generic/Table/Table";
import { TitleWithBtnsDiv } from "src/components/generic/styles/Containers";
import { useParams, useHistory } from "react-router-dom";
import { getCurrentTimesheet } from "src/api_endpoints/timesheets";

export const CurrentTimesheet = () => {
  const { name } = useParams();
  const history = useHistory();
  const [timesheet, setTimesheet] = useState();

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const timesheet = await getCurrentTimesheet(name);
        if (timesheet === null) history.push("/dashboard");
        console.log(timesheet);
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
