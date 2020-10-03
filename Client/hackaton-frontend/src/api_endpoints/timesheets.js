import { httpClient } from "src/config";

export const getDates = async () => {
  const res = await httpClient.get("/timesheets/getDates");
  return res.data;
};

export const createTimesheet = async ({ name, startDate }) => {
  const res = await httpClient.post("/timesheets", { name, startDate });
  return res.data;
};

export const getProjects = async () => {
  const res = await httpClient.get("/timesheets/getProjects");
  return res.data;
};

export const getCurrentTimesheet = async (name) => {
  const res = await httpClient.get(`/timesheets/${name}`);
  return res.data;
};

export const saveCurrentTimesheet = async ({ id, isSubmitted, rows }) => {
  const res = await httpClient.patch(`/timesheets/${id}`, {
    isSubmitted,
    rows,
  });
  return res.data;
};

export const deleteCurrentTimesheet = async (id) => {
  const res = await httpClient.delete(`/timesheets/${id}`);
  return res.data;
};
