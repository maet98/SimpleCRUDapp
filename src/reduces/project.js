import {ACTION_TYPES} from "../actions/Actions_Types"

const initialState = {
    list:[]
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
        case ACTION_TYPES.ADD_EMPLOYE_PROJECT:
            console.log(action.payload)
            state.list[action.payload.projectId].employees_ids.push(action.payload.employeeId);
            return {
                ...state,
                list: state.list
            }
        case ACTION_TYPES.DELETE_EMPLOYE_PROJECT:
            console.log(state.list.length);
            state.list[action.payload.projectId].employees_ids.filter(x => x === action.payload.employeeId);
            return {
                ...state,
                list: state.list
            }
        default:
            return state
    }
}