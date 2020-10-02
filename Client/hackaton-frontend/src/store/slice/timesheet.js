import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserTimesheets = createAsyncThunk(
  "timesheet/fetchUserTimesheets",
  async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/timesheets/getAll`, {
        withCredentials: true,
      })
      .catch((err) => {
        throw new Error(err.response.data.error);
      });
    return response.data;
  }
);

export const deleteTimesheet = createAsyncThunk(
  "timesheet/deleteTimesheet",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/timesheets/${id}`,
      { withCredentials: true }
    );

    dispatch(fetchUserTimesheets());
    return response.data;
  }
);

const timesheetSlice = createSlice({
  name: "timesheet",
  initialState: { userTimesheets: [] },
  reducers: {},
  extraReducers: {
    [fetchUserTimesheets.fulfilled]: (state, action) => {
      state.userTimesheets = action.payload;
    },
  },
});

export default timesheetSlice.reducer;
