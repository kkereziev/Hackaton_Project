import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIn } from "formik";
import axios from "axios";

const FATAL_ERROR_MESSAGE = "Something went wrong. Please try again later.";

export const fetchUserTimesheets = createAsyncThunk(
  "timesheet/fetchUserTimesheets",
  async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/timesheets/getAll`, {
        withCredentials: true,
      })
      .catch((err) => {
        throw new Error(
          getIn(err, "response.data.error") || FATAL_ERROR_MESSAGE
        );
      });
    return response.data;
  }
);

export const deleteTimesheet = createAsyncThunk(
  "timesheet/deleteTimesheet",
  async (id, { dispatch }) => {
    const response = await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/timesheets/${id}`, {
        withCredentials: true,
      })
      .catch((err) => {
        throw new Error(
          getIn(err, "response.data.error") || FATAL_ERROR_MESSAGE
        );
      });

    dispatch(fetchUserTimesheets());
    return response.data;
  }
);

const timesheetSlice = createSlice({
  name: "timesheet",
  initialState: { userTimesheets: [], requestError: "", isLoading: false },
  reducers: {},
  extraReducers: {
    [fetchUserTimesheets.pending]: (state, action) => {
      state.isLoading = true;
      state.requestError = "";
    },
    [fetchUserTimesheets.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userTimesheets = action.payload;
    },
    [fetchUserTimesheets.rejected]: (state, action) => {
      state.isLoading = false;
      state.requestError = action.error.message;
    },
    [deleteTimesheet.pending]: (state, action) => {
      state.authError = "";
    },
    [deleteTimesheet.rejected]: (state, action) => {
      state.requestError = action.error.message;
    },
  },
});

export default timesheetSlice.reducer;
