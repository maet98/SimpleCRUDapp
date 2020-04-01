import api from "./api"
import {ACTION_TYPES} from "./Actions_Types";

export const fetchAll = () => dispatch =>
{
    api.phone().fetchAll()
    .then(
        response =>{
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_PHONE,
                payload: response.data
            })
        }
    ).catch(err => console.log(err))   
}

export const create = (data, onSuccess) => dispatch =>{
    api.phone().create(data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.CREATE_PHONE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}

export const update = (id, data, onSuccess) => dispatch =>{
    api.phone().update(id,data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.UPDATE_PHONE,
            payload: {id,...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}

export const Delete = (id, onSuccess) => dispatch =>{
    api.phone().delete(id)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.DELETE_PHONE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}