import axios from "axios";

const baseUrl = "https://project-management-bd2.herokuapp.com"

export default {

    employee(url= baseUrl + "/employee"){
        return {
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url+'/'+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url+'/'+id,updateRecord),
            delete: id => axios.delete(url +'/'+ id)
        }
    },
    phone(url = baseUrl +"/phone"){
        return {
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url+'/'+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url+'/'+id,updateRecord),
            delete: id => axios.delete(url +'/'+ id)   
        }
    },
    project(url = baseUrl +"/project"){
        return {
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url+'/'+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url+'/'+id,updateRecord),
            delete: id => axios.delete(url +'/'+ id),
            addEmployee: (projectId,id) => axios.post(url+`/${projectId}/employee/${id}`),
            deleteEmployee: (projectId,id) => axios.delete(url+`/${projectId}/employee/${id}`)
        }
    }
}