import {ACTION_TYPES} from "../actions/Actions_Types"

const initialState = {
    list:[],
    employeeIds: []
}

export const project = (state=initialState,action) =>{
    switch(action.type){
        case ACTION_TYPES.FETCH_ALL_PROJECT:
            return {
                ...state,
                list:[...action.payload]
            }
        case ACTION_TYPES.CREATE_PROJECT:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case ACTION_TYPES.UPDATE_PROJECT:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload: x)
            }
        case ACTION_TYPES.DELETE_PROJECT:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }
        case ACTION_TYPES.FETCH_ALL_EMPLOYEE_IDS:
            return {
                ...state,
                employeeIds: [...action.payload]
            }
        case ACTION_TYPES.ADD_EMPLOYE_PROJECT:
            return {
                ...state,
                employeeIds: [...state.employeeIds, action.payload]
            }
        case ACTION_TYPES.DELETE_EMPLOYE_PROJECT:
            return {
                ...state,
                employeeIds: state.employeeIds.filter(x => x.id != action.payload)
            }
        default:
            return state
    }
}