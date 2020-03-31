import React, {useState ,useEffect} from 'react'
import PhoneForm from "./PhoneForm";
import { connect } from 'react-redux'
import {fetchAll, Delete} from "../../actions/phone";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts} from "react-toast-notifications";
import { Grid, Paper,Button, TableContainer,TableBody, Table, TableCell, TableRow, TableHead, withStyles, ButtonGroup} from "@material-ui/core";

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

function Phone({classes,...props}) {
    const {addToast} = useToasts;
    const [currentId, setCurrentId] = useState(0);
    
    useEffect(() =>{
        props.fetchAllPhone()
    }, [])

    const onDelete =id =>{
        if(window.confirm("Are you sure to delete this phone?")){
            props.deletePhone(id,()=>addToast("Deleted successsfully",{apperance: 'info'}));
        }
    } 

    return (
        <Paper className={classes.paper}>
            <h3>Phone Form:</h3>
            <Grid container>
                <PhoneForm {...({currentId,setCurrentId})}/>
            </Grid>
            <h3>List of Phone:</h3>
            <Grid container spacing={3}>
                <Grid item xs={14}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Area Code</TableCell>
                                    <TableCell>Owner</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.PhoneList.map((record, index) =>{
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{record.phone_type}</TableCell>
                                                <TableCell>{record.phone_number}</TableCell>
                                                <TableCell>{record.area_code}</TableCell>
                                                <TableCell>{record.owner_id}</TableCell>
                                                <ButtonGroup>
                                                    <Button>
                                                        <EditIcon color="primary" onClick={()=>setCurrentId(record.id)}></EditIcon>
                                                    </Button>
                                                    <Button>
                                                        <DeleteIcon color="secondary" onClick={()=>onDelete(record.id)}>

                                                        </DeleteIcon>
                                                    </Button>
                                                    </ButtonGroup>
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
        PhoneList: state.phone.list
    }
}

const mapActionToProps = {
    fetchAllPhone: fetchAll,
    deletePhone: Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Phone));