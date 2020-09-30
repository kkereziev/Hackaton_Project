import { combineReducers } from "redux";
//import { authReducer, signout } from "./slices/auth";

const appReducer = combineReducers({
  //  auth: authReducer,
});
export const rootReducer = (state, action) => {
  //if (action.type === signout.toString()) {
  //state = undefined;
  //}
  return appReducer(state, action);
};
