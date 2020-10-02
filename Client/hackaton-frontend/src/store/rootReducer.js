import { combineReducers } from "redux";
import auth from "./slice/auth";
import timesheet from "./slice/timesheet";

const appReducer = combineReducers({
  auth,
  timesheet,
});
export const rootReducer = (state, action) => {
  //if (action.type === signout.toString()) {
  //state = undefined;
  //}
  return appReducer(state, action);
};
