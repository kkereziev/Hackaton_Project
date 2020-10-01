import { combineReducers } from "redux";
import auth from "./slice/auth";

const appReducer = combineReducers({
  auth: auth,
});
export const rootReducer = (state, action) => {
  //if (action.type === signout.toString()) {
  //state = undefined;
  //}
  return appReducer(state, action);
};
