import React, { useEffect } from 'react'
import { Grid, TextField,Button, withStyles,FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import useForm from "../useForms";
import {Delete,update, create} from "../../actions/phone";
import { connect } from 'react-redux';
import { useToasts} from "react-toast-notifications";
import { fetchAll} from "../../actions/employee"
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';

const styles = theme =>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    smMargin: {
        margin: 5
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
})

const initialFieldValues ={
    phone_type: "",
    owner_id: 0
}

function PhoneForm({classes,...props}) {
    const {addToast} = useToasts;

    const validate = (fieldValues = values) =>{
        let temp ={}
        if(fieldValues.hasOwnProperty("phone_number")){
            temp.phone_number = fieldValues.phone_number ? "": "This field is required."
        }
        if(fieldValues.hasOwnProperty("phone_type"))
        temp.phone_type = fieldValues.phone_type ? "": "This field is required." 
        if(fieldValues.hasOwnProperty("owner_id")){
            temp.owner_id = fieldValues.owner_id !== 0 ? "":"This field is required." 
        }
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x =="");
    }

    const [phone_number,setPhone_number] = React.useState();
    const employeeLabel = React.useRef(null);
    const [employee, setEmployee] = React.useState(0);
    
    useEffect(() =>{
        props.fetchAllEmployee()
    },[]);

    useEffect(()=>{
        if(props.currentId!= 0){
            setValues({
                ...props.phoneList.find(x => x.id == props.currentId)
            })
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
        console.log(props.currentId);
        e.preventDefault()
        const ac = {
            phone_number: phone_number,
            phone_type: values.phone_type,
            area_code: "+1",
            owner_id: values.owner_id
            
        }
        console.log(ac);
        if(validate()){
            const onSuccess = () => {
                resetForm();
                addToast("Submitted successfully", {appearance:'success'})
            }
            const onUpdated = () => {
                resetForm()
                addToast("Updated successfully", {appearance:'success'})
            }
            console.log("asd");
            if(props.currentId == 0){
                props.createPhone(ac, onSuccess)
            }
            else{
                props.updatePhone(props.currentId,ac,onUpdated)
            }
        }
        
    }

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid item xs={10}>
                <PhoneInput
                    name="phone_number"
                    country="US" 
                    value ={phone_number}
                    onChange={setPhone_number}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Phone Type</InputLabel>
                    <Select
                    name="phone_type"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.phone_type}
                    onChange={handleInputChange}
                    >
                    <MenuItem value="Choose Type..">Choose Type..</MenuItem>
                    <MenuItem value="local_phone">Local</MenuItem>
                    <MenuItem value="cell_phone">Cell</MenuItem>
                    </Select>
                </FormControl>
                {errors.phone_type && <FormHelperText>{errors.phone_type}</FormHelperText>}
            </Grid>
            <Grid item xs={10}>
                <FormControl variant="outlined"
                    className={classes.formControl}>

                    <InputLabel ref={employeeLabel}>Employee</InputLabel>
                    <Select
                        name="owner_id"
                        value={values.owner_id}
                        onChange={handleInputChange}
                        labelWidth={employee}
                    >
                    {
                        props.employeeList.map((record,index) =>{
                            return (
                                <MenuItem value={record.id} key={index}>{record.first_name + " " +record.last_name}</MenuItem>
                            )
                        })   
                    }
                    </Select>
                    {errors.owner_id && <FormHelperText>{errors.owner_id}</FormHelperText>}
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
        phoneList: state.phone.list,
        employeeList: state.employee.list
    }
}

const mapActionToProps = {
    createPhone : create,
    updatePhone : update,
    fetchAllEmployee: fetchAll
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(PhoneForm))