import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux"
import DeleteIcon from '@material-ui/icons/Delete'
import { addEmployee,deleteEmployee, getById } from "../../actions/project";
import {Grid, FormControl, InputLabel, Select, MenuItem, Button, ButtonGroup} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add";


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

function available(all, list){
    var arr = []
    for(let i = 0;i < all.length;i++){
        let x = list.find(x => x == all[i].id);
        if(!x){
            arr.push(all[i]);
        }
    }
    return arr;
}

function convert(type){
    var ans = ""
    ans += type.charAt(0);
    ans = ans.toUpperCase();
    for(let i = 1;i < type.length;i++){
        if(type.charAt(i) === '_'){
            break;
        }
        ans += type.charAt(i);
    }
    return ans;
}

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 230,
      },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

function EmployeeList(props) {
    const [status,setStatus] = React.useState(0);
    const classes = useStyles();

    const onDelete = (id) =>{
        props.deleteEmployee(props.record.id,id);
    }

    const onAdd = () =>{
        console.log(status);
        let id = status;
        if(status !== 0){
            props.addEmployee(props.record.id,id,setStatus(0));
        }
    }
      
    return (
        <div>
            <Grid container>
                <Grid item spacing={10}>
                    <p><strong>Budget:</strong> {props.record.budget}</p><br></br>
                    <p><strong>Leader:</strong> {props.record.leader_id}</p><br></br>
                    <p><strong>Type:</strong> {convert(props.record.project_type)}</p><br></br>
                    <strong>List of employee:</strong><br></br>
                    {
                        inList(props.employeeList,props.record.employees_ids).map((other, id)=>{
                            return(
                                <div>
                                    <p key={id}>{other.id+": "+other.first_name + " " + other.last_name}</p>
                                    <Button onClick={()=>onDelete(other.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </div>
                            )
                        })

                    }
                    <FormControl className={classes.formControl}>
                        <InputLabel id="Type">Type</InputLabel>
                        <Select
                        name="type"
                        labelId="type"
                        id="type_select"
                        value={status}
                        onChange={(event)=>{setStatus(event.target.value)}}
                        >
                        {
                            available(props.employeeList,props.record.employees_ids).map((other,id) =>{
                                return (
                                <MenuItem key={id} value={other.id}>{other.id+": "+other.first_name+" "+other.last_name}</MenuItem>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={onAdd}
                    >
                        <AddIcon />
                    </Button>
                </Grid>
            </Grid>
    </div>
    )
}

const mapStateToProps = state =>{
    return {
    }
}

const mapActionToProps = {
    addEmployee: addEmployee,
    getById: getById,
    deleteEmployee: deleteEmployee
}

export default connect(mapStateToProps,mapActionToProps)(EmployeeList);