import { httpClient } from "src/config";

export const getDates = async () => {
  const res = await httpClient.get("/timesheets/getDates");
  return res.data;
};

export const createTimesheet = async ({ name, startDate }) => {
  const res = await httpClient.post("/timesheets", { name, startDate });
  return res.data;
};
