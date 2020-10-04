import React, { useState, useEffect, Fragment } from "react";
import { Table } from "src/components/generic/Table/Table";
import { useParams, useHistory } from "react-router-dom";
import { getCurrentTimesheet } from "src/api_endpoints/timesheets";
import {
  SecondTitle,
  Title,
  ColumnTitlesDiv,
} from "src/components/generic/styles/Title";
import { TitleWithBtnsDiv } from "src/components/generic/styles/Containers";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { LoadingSpinner } from "src/components/generic/Spinner";

/* As we are using dropdown on several places here options are hard coded for the sake of reviewing the UI
 * Placeholder should be hardcoded for every dropdown individually where dropdown component is used*/

export const CurrentTimesheet = () => {
  const { name } = useParams();
  const history = useHistory();
  const [timesheet, setTimesheet] = useState();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const timesheet = await getCurrentTimesheet(name);
        if (timesheet.result === null) history.push("/dashboard");
        setTimesheet(timesheet.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchRows();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <TitleWithBtnsDiv>
            <Container>
              <ColumnTitlesDiv>
                <Title>Timesheet for week {name}</Title>
                <SecondTitle>User: {user?.username}</SecondTitle>
              </ColumnTitlesDiv>
            </Container>
          </TitleWithBtnsDiv>
          <Table timesheetObj={timesheet} />
        </Fragment>
      )}
    </div>
  );
};
