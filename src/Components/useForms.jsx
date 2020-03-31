import { useState } from 'react'

export default function useForms(initialFieldValues, validate, setCurrentId) {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        console.log(name+"\n"+value);
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const resetForm = () =>{
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        resetForm,
        handleInputChange
    }
}
