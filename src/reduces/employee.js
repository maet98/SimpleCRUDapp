import {ACTION_TYPES} from "../actions/Actions_Types"

const initialState = {
    list:[]
}

export const employee = (state=initialState,action) =>{
    switch(action.type){
        case ACTION_TYPES.FETCH_ALL_EMPLOYEE:
            return {
                ...state,
                list:[...action.payload]
            }
        case ACTION_TYPES.CREATE_EMPLOYEE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case ACTION_TYPES.UPDATE_EMPLOYEE:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload: x)
            }
        case ACTION_TYPES.DELETE_EMPLOYEE:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }
        default:
            return state
    }
}