import api from "./api"
import { ACTION_TYPES } from "./Actions_Types";

export const fetchAll = () => dispatch =>
{
    api.project().fetchAll()
    .then(
        response =>{
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_PROJECT,
                payload: response.data
            })
        }
    ).catch(err => console.log(err))   
}

export const getById = (id) => dispatch =>
{
    api.project().fetchById(id)
    .then(
        response =>{
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID_PROJECT,
                payload: response.data
            })
        }
    ).catch(err => console.log(err))   
}

export const create = (data, onSuccess) => dispatch =>{
    console.log(data);
    api.project().create(data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.CREATE_PROJECT,
            payload: data
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}

export const update = (id, data, onSuccess) => dispatch =>{
    api.project().update(id,data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.UPDATE_PROJECT,
            payload: {id,...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}

export const Delete = (id, onSuccess) => dispatch =>{
    api.project().delete(id)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.DELETE_PROJECT,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}

export const addEmployee =(projectid, employeeId) => dispatch =>{
    api.project().addEmployee(projectid,employeeId)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.ADD_EMPLOYEE_PROJECT,
            payload: employeeId
        })
    })
    .catch(err => console.log(err));
}

export const deleteEmployee =(projectid, employeeId) => dispatch =>{
    api.project().deleteEmployee(projectid,employeeId)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.DELETE_EMPLOYEE_PROJECT,
            payload: employeeId
        })
    })
    .catch(err => console.log(err));
}

export const fetchEmployeeIds =(id) => dispatch =>{
    api.project().fetchById(id)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.DELETE_EMPLOYEE_PROJECT,
            payload: res.employees_ids
        })
    })
    .catch(err => console.log(err));
}