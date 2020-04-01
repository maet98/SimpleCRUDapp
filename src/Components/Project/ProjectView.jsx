import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts} from "react-toast-notifications";
import {Delete} from "../../actions/project";
import {connect} from "react-redux"
import EmployeeList from "./EmployeeList";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

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
    const {addToast} = useToasts;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = panel => (event, isExpanded) =>{
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
                            <ButtonGroup>
                                <Grid container>
                                    <Grid item spacing={10}>
                                        <p><strong>Budget:</strong> {record.budget}</p><br></br>
                                        <p><strong>Leader:</strong> {record.leader_id}</p><br></br>
                                        <p><strong>Type:</strong> {convert(record.project_type)}</p><br></br>
                                        <strong>List of employee:</strong>
                                        <EmployeeList id={record.id}/>
                                    </Grid>
                                    <Grid item >
                                        <Button>
                                            <EditIcon color="primary" onClick={()=>props.setCurrentId(record.id)}></EditIcon>
                                        </Button>
                                        <Button>
                                            <DeleteIcon color="secondary" onClick={()=>onDelete(record.id)}>
                                            </DeleteIcon>
                                        </Button>
                                    </Grid>
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
    }
}

const mapActionToProps = {
    deleteProject: Delete
}

export default connect(mapStateToProps,mapActionToProps)(ProjectView);