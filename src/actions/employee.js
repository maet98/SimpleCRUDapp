import api from "./api"
import { ACTION_TYPES } from "./Actions_Types";

const formatData = data =>({
    ...data,

})

export const fetchAll = () => dispatch =>
{
    api.employee().fetchAll()
    .then(
        response =>{
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        }
    ).catch(err => console.log(err))   
}

export const create = (data, onSuccess) => dispatch =>{
    console.log(data);
    api.employee().create(data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: data
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}

export const update = (id, data, onSuccess) => dispatch =>{
    api.employee().update(id,data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id,...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}

export const Delete = (id, onSuccess) => dispatch =>{
    api.employee().delete(id)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err));
}