import { combineReducers } from "redux";
import { employee } from "./employee";
import { phone } from "./phone";

export const reducers = combineReducers({
    employee,
    phone
})