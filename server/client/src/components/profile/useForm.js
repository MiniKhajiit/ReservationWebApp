 import { useState, useEffect } from 'react';
 import axios from 'axios';
 

const useForm = (callback, pwCallback, Validate) => {

    const [values, setValues] = useState({});
    //const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    //duplicates
    const [users, setUsers] = useState([]);
    useEffect(() => {
        FetchUsers();
    }, [])
    //console.log(users[1])
    //Data fetching
    const FetchUsers = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_SRVR_URL}/users/all`)
            setUsers(res.data);
        } catch (error) {
            console.log('There was an error while loading the user data, form validation may be affected.')
        }
    }
    //duplicates

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
            if (values.ctrlPassword && values.password) {
                pwCallback();
            }
        }
    }, [errors]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(Validate(values, users));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    const handleReset = (event) => {
        if (event) event.preventDefault();
        setValues({})
    }

    return {
        handleChange,
        handleSubmit,
        handleReset,
        values,
        errors,
    }
};

export default useForm;
