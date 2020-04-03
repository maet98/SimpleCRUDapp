import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ButtonGroup,InputLabel, Select, MenuItem, FormControl, Grid, TableContainer,Button,Table,TableCell,TableBody,TableRow,TableHead} from "@material-ui/core";
import EmployeeList from "./EmployeeList";
import { useToasts} from "react-toast-notifications";
import {Delete} from "../../actions/project";
import {connect} from "react-redux"
import {fetchAll} from "../../actions/employee"
import {addEmployee, deleteEmployee} from "../../actions/project"

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


function ProjectView(props) {
    const {addToast} = useToasts();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = panel => (event, isExpanded) =>{
        setExpanded( isExpanded ? panel: false);
    }

    const onDelete =id =>{
        if(window.confirm("Are you sure to delete this project?")){
            props.deleteProject(id,()=>addToast("Deleted successsfully",{appearance: 'info'}));
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
                                <EmployeeList employeeList={props.employeeList} record={record}/>
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
    fetchAllEmployees: fetchAll,
    deleteProject: Delete,
    addEmployee: addEmployee,
    deleteEmployee: deleteEmployee
}

export default connect(mapStateToProps,mapActionToProps)(ProjectView);