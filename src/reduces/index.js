import { combineReducers } from "redux";
import { employee } from "./employee";
import { phone } from "./phone";
import { project} from "./project"

export const reducers = combineReducers({
    employee,
    phone,
    project
})