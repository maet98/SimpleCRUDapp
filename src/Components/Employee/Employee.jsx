import React, {useState ,useEffect} from 'react'
import EmployeeForm from './EmployeeForm'
import { connect } from 'react-redux'
import * as actions from "../../actions/employee"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts} from "react-toast-notifications";
import { 
    Grid,
    Paper,
    Button, 
    TableContainer,
    TableBody,
    Table,
    TableCell,
    TableRow, 
    TableHead, 
    withStyles, 
    ButtonGroup
} from "@material-ui/core";

const styles = theme =>({
    root:{
        "& .MuitableCell-head":{
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

function Employee({classes,...props}) {
    const {addToast} = useToasts;
    const [currentId, setCurrentId] = useState(0);
    
    useEffect(() =>{
        props.fetchAllEmployee()
    }, [])

    const onDelete =id =>{
        if(window.confirm("Are you sure to delete this record?")){
            props.deleteEmployee(id,()=>addToast("Deleted successsfully",{apperance: 'info'}));
        }
    }

    return (
        <Paper className={classes.paper}>
            <h3>Employee Form:</h3>
            <Grid container spacing={3}>
                <EmployeeForm {...({currentId,setCurrentId})}/>
            </Grid>
            <h3>List of employee:</h3>
            <Grid container spacing={4}>
                <Grid item xs={14}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>Street</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Province</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Post code</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.employeeList.map((record, index) =>{
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{record.first_name}</TableCell>
                                                <TableCell>{record.last_name}</TableCell>
                                                <TableCell>{record.salary}</TableCell>
                                                <TableCell>{record.start_date}</TableCell>
                                                <TableCell>{record.address.street}</TableCell>
                                                <TableCell>{record.address.city}</TableCell>
                                                <TableCell>{record.address.province}</TableCell>
                                                <TableCell>{record.address.country}</TableCell>
                                                <TableCell>{record.address.postcode}</TableCell>
                                                <TableCell><ButtonGroup>
                                                    <Button>
                                                        <EditIcon color="primary" onClick={()=>setCurrentId(record.id)}></EditIcon>
                                                    </Button>
                                                    <Button>
                                                        <DeleteIcon color="secondary" onClick={()=>onDelete(record.id)}>

                                                        </DeleteIcon>
                                                    </Button>
                                                    </ButtonGroup></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state =>{
    return {
        employeeList: state.employee.list
    }
}

const mapActionToProps = {
    fetchAllEmployee: actions.fetchAll,
    deleteEmployee: actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Employee));