import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, history }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
      {
        username,
        password,
      }
    );
    history.push("/login");
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password, history }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    history.push("/dashboard");
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, authError: "" },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {},
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.authError = "";
    },
  },
});

export default authSlice.reducer;
