import {ACTION_TYPES} from "../actions/Actions_Types"

const initialState = {
    list:[]
}

export const phone = (state=initialState,action) =>{
    switch(action.type){
        case ACTION_TYPES.FETCH_ALL_PHONE:
            return {
                ...state,
                list:[...action.payload]
            }
        case ACTION_TYPES.CREATE_PHONE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case ACTION_TYPES.UPDATE_PHONE:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload: x)
            }
        case ACTION_TYPES.DELETE_PHONE:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }
        default:
            return state
    }
}