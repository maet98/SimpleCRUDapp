import React from 'react'

import {} from "@material-ui/core"

/*
function available(all, list){
    var arr = []
    for(let i = 0;i < all.length;i++){
        if(!list.find(x => x.id === all[i].id)){
            arr.push(all[i]);
        }
    }
    return arr;
}

function inList(all, list){
    var arr = []
    for(let i = 0;i < list.length;i++){
        let x = all.find(x => x.id == list[i]);
        if(x){
            arr.push(x);
        }
    }
    return arr;
}*/


function EmployeeList(props) {

    const myemployee = props.project.employees_ids;
    
    
    return (
        <div>
            
        </div>
    )
}

export default EmployeeList;