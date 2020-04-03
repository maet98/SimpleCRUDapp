import React, { useEffect } from 'react'
import { Grid, TextField,Button,FormHelperText, withStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import useForm from "../useForms";
import {update, create, fetchAll as fetchAllProject} from "../../actions/project";
import {fetchAll} from "../../actions/employee";
import { connect } from 'react-redux';
import { useToasts} from "react-toast-notifications";

const styles = theme =>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: 5
    }
})

const initialFieldValues ={
    name:"",
    budget:"",
    type:"",
    leader_id:""
}

function ProjectForm({classes,...props}) {
    const {addToast} = useToasts();

    const validate = (fieldValues = values) =>{
        let temp = {}

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x ==="");
    }
    useEffect(() =>{
        props.fetchAllProject()
        props.fetchAllEmployee()
    },[])

    useEffect(()=>{
        if(props.currentId!== 0){
            let x = {...props.projectList.find(x => x.id === props.currentId)};
            const project = {
                name: x.name,
                budget: x.budget,
                type: x.project_type,
                leader_id: x.leader.id
            }
            setValues(
                {...project}
            )
            setErrors({})
        }
    }, [props.currentId])

    const {
        handleInputChange,
        setValues,
        errors,
        setErrors,
        values,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId);

    
    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){
            const onSuccess = () => {
                resetForm();
                addToast("Submitted successfully", {appearance:'success'})
            }
            const onUpdated = () => {
                resetForm()
                addToast("Updated successfully", {appearance:'success'})
            }
            values.budget = Number(values.budget);
            if(props.currentId === 0){
                props.createProject(values, onSuccess)
            }
            else{
                values.id = props.currentId;
                props.updateProject(values,onUpdated)
            }
        }
        
    }

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid containter spacing={3}>  
                <TextField name="name"
                    variant="outlined"
                    label="name"
                    type="name"
                    value={values.name}
                    onChange={handleInputChange}
                    {...(errors.name && {error:true, helperText: errors.name})}
                    />
                <TextField name="budget"
                    variant="outlined"
                    label="Budget"
                    type="number"
                    value={values.budget}
                    onChange={handleInputChange}
                    {...(errors.budget && {error:true, helperText: errors.budget})}
                    />
                <FormControl className={classes.formControl}>
                    <InputLabel id="Type">Type</InputLabel>
                    <Select
                    name="type"
                    labelId="type"
                    id="type_select"
                    value={values.type}
                    onChange={handleInputChange}
                    >
                        <MenuItem value="engineering_project">Engineering</MenuItem>
                        <MenuItem value="design_project">Design</MenuItem>
                        <MenuItem value="finance_project">Finance</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="leader_id">Leader</InputLabel>
                    <Select
                    name="leader_id"
                    labelId="leader_id_select"
                    id="leader_id_select"
                    value={values.leader_id}
                    onChange={handleInputChange}
                    >
                    {
                    props.employeeList.map((record,index) =>{
                        return (
                            <MenuItem value={record.id} key={index}>{record.first_name + " " +record.last_name}</MenuItem>
                        )
                        })   
                    }
                    </Select>
                </FormControl>
            </Grid>
            <div>
                <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.smMargin}
                >
                    Submit
                </Button>
                <Button
                variant="contained"
                className={classes.smMargin}
                onClick={resetForm}
                >
                    Reset
                </Button>
            </div>
        </form>
    )
}

const mapStateToProps = state =>{
    return {
        employeeList: state.employee.list,
        projectList: state.project.list,

    }
}

const mapActionToProps = {
    fetchAllProject: fetchAllProject,
    fetchAllEmployee: fetchAll,
    createProject : create,
    updateProject : update
}


export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(ProjectForm))