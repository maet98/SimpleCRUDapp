import React, { useEffect } from 'react'
import { Grid, TextField,Button,FormHelperText, withStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import useForm from "../useForms";
import {update, create} from "../../actions/employee";
import { connect } from 'react-redux';
import { useToasts} from "react-toast-notifications";
import axios from "axios";

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

function transformBack(employee){
    return {
        first_name: employee.first_name,
        last_name: employee.last_name,
        salary: employee.salary,
        start_date: employee.start_date,
        street: employee.address.street,
        city: employee.address.city,
        province: employee.address.province,
        country: employee.address.country,
        postcode: employee.address.postcode,
        id: employee.id,
        end_date: employee.end_date,
        address_id: employee.address.id
    }
}

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}

const initialFieldValues ={
    first_name: "",
    last_name: "",
    salary:  0.0,
    start_date: getFormattedDate(new Date()),
    street: "",
    city: "",
    province: "",
    country: "Choose Country..",
    postcode: ""
}

function EmployeeForm({classes,...props}) {
    const {addToast} = useToasts();
    const [countries,setCountries] = React.useState([]);
    const validate = (fieldValues = values) =>{
        let temp = {};
        if(fieldValues.hasOwnProperty("first_name")){
            temp.first_name = fieldValues.first_name ? "": "This field is required."
        }
        if('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name ? "": "This field is required." 
        if('salary' in fieldValues){
            temp.salary = (fieldValues.salary !== 0.0) ? "":"This field must be diferent than 0" 
        }
        if('city' in fieldValues){
            temp.city = fieldValues.city ? "": "This field is required."
        }
        if('country' in fieldValues){
            temp.city = fieldValues.city ? "": "This field is required."
        }
        if('street' in fieldValues){
            temp.street = fieldValues.street ? "": "This field is required."
        }
        if('postcode' in fieldValues){
            temp.postcode = fieldValues.postcode ? "": "This field is required."
        }

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x =="");
    }

    useEffect(() =>{
        axios.get("https://restcountries.eu/rest/v2/all")
        .then(res =>{
            setCountries(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    },[])

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect(()=>{
        if(props.currentId!= 0){
            var employee = {...props.employeeList.find(x => x.id == props.currentId)};
            console.log(employee);
            employee = transformBack(employee);
            console.log(employee);
            setValues(
                employee
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
            if(values.country === "Choose Country.."){
                values.country = null;
            }
            const data = {
                first_name:values.first_name,
                last_name: values.last_name,
                salary: values.salary,
                start_date: values.start_date,
                address: {
                    street: values.street,
                    city: values.city,
                    province: values.province,
                    country: values.country,
                    postcode: values.postcode
                }
            }
            console.log(data);
            if(props.currentId === 0){
                props.createEmployee(data, onSuccess)
            }
            else{
                data.id = values.id;
                data.end_date = values.end_date;
                data.address.id = values.address_id;
                console.log(props.currentId);
                props.updateEmployee(props.currentId,data,onUpdated)
            }
        }
        
    }

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid containter spacing={3}>  
                <TextField name="first_name"
                    variant="outlined"
                    label=" First Name"
                    value={values.first_name}
                    onChange={handleInputChange}
                    {...(errors.first_name && {error:true, helperText: errors.first_name})}
                    />
                    <TextField name="last_name"
                    variant="outlined"
                    label="Last Name"
                    value={values.last_name}
                    onChange={handleInputChange}
                    {...(errors.last_name && {error:true, helperText: errors.last_name})}
                    />
                    <TextField name="salary"
                    variant="outlined"
                    label="Salary"
                    value={values.salary}
                    onChange={handleInputChange}
                    {...(errors.salary && {error:true, helperText: errors.salary})}
                    />
                    <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    defaultValue={values.start_date}
                    onChange={handleInputChange}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    />
                    <TextField name="street"
                    variant="outlined"
                    label="Street"
                    value={values.street}
                    onChange={handleInputChange}
                    {...(errors.street && {error:true, helperText: errors.street})}
                    />
                    <TextField name="city"
                    variant="outlined"
                    label="city"
                    value={values.city}
                    onChange={handleInputChange}
                    {...(errors.city && {error:true, helperText: errors.city})}
                    />
                    <TextField name="province"
                    variant="outlined"
                    label="Province"
                    value={values.province}
                    onChange={handleInputChange}
                    {...(errors.province && {error:true, helperText: errors.province})}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.country && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Country</InputLabel>
                        <Select
                            label="Country"
                            name="country"
                            value={values.country}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="Choose Country..">Choose Country..</MenuItem>
                            {
                                countries.map((country,index) =>{
                                    return (
                                        <MenuItem key={index} value={country.name}>
                                            {country.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                        {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
                    </FormControl>
                    <TextField name="postcode"
                    varianzt="outlined"
                    label="PostCode"
                    value={values.postcode}
                    onChange={handleInputChange}
                    {...(errors.postcode && {error:true, helperText: errors.postcode})}
                    />
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
        employeeList: state.employee.list
    }
}

const mapActionToProps = {
    createEmployee : create,
    updateEmployee : update
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(EmployeeForm))