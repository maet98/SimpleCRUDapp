import api from "./api"
import {
    ACTION_TYPES
} from "./Actions_Types";

export const fetchAll = () => dispatch => {
    api.project().fetchAll()
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL_PROJECT,
                    payload: response.data
                })
            }
        ).catch(err => console.log(err))
}

export const getById = (id) => dispatch => {
    api.project().fetchById(id)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_BY_ID_PROJECT,
                    payload: response.data
                })
            }
        ).catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    console.log(data);
    api.project().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE_PROJECT,
                payload: data
            })
            onSuccess()
        })
        .catch(err => console.log(err));
}

export const update = (data, onSuccess) => dispatch => {
    console.log(data);
    api.project().update(data)
        .then(res => {
            api.project().fetchAll().then(res => {
                dispatch({
                    type: ACTION_TYPES.UPDATE_PROJECT,
                    payload: res.data
                })
                onSuccess()

            })
        }).catch(err => console.log(err));
}

export const Delete = (id, onSuccess) => dispatch => {
    api.project().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_PROJECT,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err));
}

export const addEmployee = (projectId, employeeId) => dispatch => {
    api.project().addEmployee(projectId, employeeId)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.ADD_EMPLOYE_PROJECT,
                payload: {
                    employeeId,
                    projectId
                }
            })
        })
        .catch(err => console.log(err));
}

export const deleteEmployee = (projectId, employeeId) => dispatch => {
    api.project().deleteEmployee(projectId, employeeId)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_EMPLOYE_PROJECT,
                payload: {
                    employeeId,
                    projectId
                }
            })
        })
        .catch(err => console.log(err));
}

export const fetchEmployeeIds = (id) => dispatch => {
    api.project().fetchById(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_EMPLOYEE_IDS,
                payload: res.employees_ids
            })
        })
        .catch(err => console.log(err));
}