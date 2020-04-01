import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ButtonGroup,InputLabel, Select, MenuItem, FormControl, Grid, TableContainer,Button,Table,TableCell,TableBody,TableRow,TableHead} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts} from "react-toast-notifications";
import {Delete} from "../../actions/project";
import {connect} from "react-redux"
import AddIcon from "@material-ui/icons/Add";

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

function ProjectView(props) {
    const [status,setStatus] = React.useState("");
    const {addToast} = useToasts();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = panel => (event, isExpanded) =>{
        console.log(props.projectList);
        setExpanded( isExpanded ? panel: false);
    }



    const onDelete =id =>{
        if(window.confirm("Are you sure to delete this project?")){
            props.deleteProject(id,()=>addToast("Deleted successsfully",{apperance: 'info'}));
        }
    } 

    return (
        <div className={classes.root}>
            {
                props.projectList.map((record,index)=>{
                    return (
                        <ExpansionPanel key={index} expanded={expanded === record.id}
                            onChange={handleChange(record.id)}
                        >
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={classes.heading}>{record.id+": "+record.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid item spacing={10}>
                                        <p><strong>Budget:</strong> {record.budget}</p><br></br>
                                        <p><strong>Leader:</strong> {record.leader_id}</p><br></br>
                                        <p><strong>Type:</strong> {convert(record.project_type)}</p><br></br>
                                        <strong>List of employee:</strong>
                                        {
                                            inList(props.employeeList,record.employees_ids).map((other, id)=>{
                                                return(
                                                    <p key={id}>{other.id+": "+other.first_name + " " + other.last_name}</p>
                                                )
                                            })

                                        }
                                        <form>
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
                                                available(props.employeeList,record.employees_ids).map((other,id) =>{
                                                    return (
                                                    <MenuItem key={id} value={other.id}>{other.id+": "+other.first_name+" "+other.last_name}</MenuItem>
                                                    )
                                                })
                                            }
                                            </Select>
                                        </FormControl>
                                        </form>
                                    </Grid>
                                </Grid>

                            <ButtonGroup>
                                <Grid item >
                                    <Button>
                                        <EditIcon color="primary" onClick={()=>props.setCurrentId(record.id)}></EditIcon>
                                    </Button>
                                    <Button>
                                        <DeleteIcon color="secondary" onClick={()=>onDelete(record.id)}>
                                        </DeleteIcon>
                                    </Button>
                                </Grid>
                            </ButtonGroup>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
            }
        </div>
    );
}
const mapStateToProps = state =>{
    return {
        employeeList: state.employee.list,
        projectList: state.project.list
    }
}

const mapActionToProps = {
    deleteProject: Delete
}

export default connect(mapStateToProps,mapActionToProps)(ProjectView);

/*<TableContainer>
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
                                                    record.employees_ids.map((record,index) =>{
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

                                                    </TableCell>
                                                    <TableCell>
                                                        <AddIcon >
                                                            <Button onClick={setActive(true)}/>
                                                        </AddIcon>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    </Grid>
                                    */