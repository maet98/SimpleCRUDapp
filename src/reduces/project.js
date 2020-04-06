import {
    ACTION_TYPES
} from "../actions/Actions_Types"

const initialState = {
    list: []
}

export const project = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_PROJECT:
        case ACTION_TYPES.UPDATE_PROJECT:
            return {
                ...state,
                list: [...action.payload]
            }
            break;
        case ACTION_TYPES.CREATE_PROJECT:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
            break;
        case ACTION_TYPES.DELETE_PROJECT:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }
            break;
        case ACTION_TYPES.ADD_EMPLOYE_PROJECT:
            const y = state.list.find(x => x.id === action.payload.projectId);
            console.log(y);
            y.employees_ids.push(action.payload.employeeId)
            console.log(y);
            return {
                ...state,
                list: state.list.map(x => x.id === action.payload.projectId ? y : x)
            }
            break;
        case ACTION_TYPES.DELETE_EMPLOYE_PROJECT:
            var changes = state.list.find(x => x.id === action.payload.projectId);
            console.log(changes);
            changes.employees_ids = changes.employees_ids.filter(x => x.action.payload.employeeId);
            return {
                ...state,
                list: state.list.map(x => x.id === action.payload.projectId ? changes : x)
            }
            break;
        default:
            return state
    }
}