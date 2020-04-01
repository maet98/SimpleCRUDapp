import React, {useState ,useEffect} from 'react';
import ProjectForm from "./ProjectForm";
import { connect } from 'react-redux';
import { fetchAll} from "../../actions/project"
import { fetchAll as fetchAllEmployee} from "../../actions/employee"
import { useToasts} from "react-toast-notifications";
import { Grid, Paper, withStyles, ButtonGroup} from "@material-ui/core";
import { Delete} from "../../actions/project"
import ProjectView from "./ProjectView";

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

function ProjectList({classes,...props}) {
    const {addToast} = useToasts();
    const [currentId, setCurrentId] = useState(0);
    
    useEffect(() =>{
        props.fetchAllProject()
    }, [])

    return (
        <Paper className={classes.paper}>
            <h3>Project Form:</h3>
            <Grid container>
                <ProjectForm {...({currentId,setCurrentId})}/>
            </Grid>
            <h3>List of Project:</h3>
            <ProjectView {...({currentId,setCurrentId})} />
            <Grid container spacing={3}>
                <Grid item xs={14}>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state =>{
    return {
        projectList: state.project.list
    }
}

const mapActionToProps = {
    fetchAllProject: fetchAll,
    fetchAllEmployee: fetchAllEmployee,
    deleteProject: Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(ProjectList));