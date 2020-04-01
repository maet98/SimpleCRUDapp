import React from 'react'
import ProjectList from './ProjectList'
import {fetchAll as fetchAllEmployee} from "../../actions/employee"
import AddIcon from "@material-ui/icons/Add";
import {connect} from "react-redux"
import {TableContainer,Button,Table,TableCell,TableBody,TableRow,TableHead} from "@material-ui/core"

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
}

function EmployeeList(props) {
    const [active,setActive] = React.useState(false);
    const myemployee = props.projectList.find(x => x.id == props.id).employees_ids;

    React.useEffect(()=>{
        props.fetchAllEmployee()
    },[])

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            inList(props.employeeList,myemployee).map((record,index) =>{
                                return (
                                <TableRow key={index}>
                                    <TableCell>{record.first_name}</TableCell>
                                    <TableCell>{record.last_name}</TableCell>
                                    <TableCell>{record.salary}</TableCell>
                                </TableRow>
                                )
                            })
                        }
                        <TableRow>
                            <TableCell>
                                <AddIcon >
                                    <Button onClick={setActive(true)}/>
                                </AddIcon>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        employeeList: state.employee.list,
        projectList: state.project.list
    }
}

const mapActionToProps = {
    fetchAllEmployee: fetchAllEmployee
}

export default connect(mapStateToProps,mapActionToProps)(EmployeeList);