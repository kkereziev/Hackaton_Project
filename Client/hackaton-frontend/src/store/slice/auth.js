import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, history }, { dispatch }) => {
    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, {
        username,
        password,
      })
      .catch((err) => {
        throw new Error(err.response.data.error);
      });
    dispatch(login({ username, password, history }));
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password, history }) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        throw new Error(err.response.data.error);
      });
    return response.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
        withCredentials: true,
      })
      .catch((err) => {
        throw new Error(err.response.data.error);
      });
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/logout`,
      {},
      { withCredentials: true }
    )
    .catch((err) => {
      throw new Error(err.response.data.error);
    });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { authError: "" },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {},
    [register.rejected]: (state, action) => {
      state.authError = action.error.message;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.authError = "";
    },
    [login.rejected]: (state, action) => {
      state.user = null;
      state.authError = action.error.message;
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null;
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [fetchCurrentUser.rejected]: (state) => {
      state.user = null;
    },
  },
});

export default authSlice.reducer;
