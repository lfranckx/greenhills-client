import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EmployeesApiService from '../services/EmployeesApiService';
import { ApplicationContext } from '../context';

export default function AddEmployee(props) {
    
    let params = useParams()
    const locationId = parseInt(params.locationId);

    const { setLocation_id, setEmployees } = useContext(ApplicationContext);

    useEffect(() => {
        window.scrollTo(0,0);
        console.log('addEmployeePage - locationId', locationId);
        setLocation_id(locationId);
    }, []);

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [buttonState, handleButtonState] = useState('Submit');
    const [buttonDisabled, handleButtonDisabled] = useState(false);

    const location_field = {
        green_hills: "Green Hills",
        woussickett: "Woussickett"
    }
    const REQEX_UPPER_LOWER_NUMBER = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;

    const formSchema = Yup.object().shape({
        first_name: Yup.string().max(30, "* 30 maximum characters").required('* Required'),
        last_name: Yup.string().max(30, "* 30 maximum characters").required('* Required'),
        location: Yup.string().oneOf(Object.values(location_field), '* Must select one of the valid options').required('* Required'),
        password: Yup.string().min(3, 'Password is too short').max(72, 'Password is too long').matches(REQEX_UPPER_LOWER_NUMBER, 'Password must container at least one uppercase, one lowercase, and one number').required('* Required')
    });

    const submitForm = (values) => {
        console.log(values);
        handleButtonState('Sending...');
        handleButtonDisabled(true);

        let locationValue;
        if (values.location === "Green Hills") {
            locationValue = 1;
        }
        if (values.location === "Woussickett") {
            locationValue = 2;
        }

        const name = `${values.first_name} ${values.last_name}`;

        const newEmployee = {
            name: name,
            score: 0,
            location_id: locationValue,
            password: values.password
        }

        console.log('submitting newEmployee...', newEmployee);
        EmployeesApiService.addNewEmployee(newEmployee)
            .then(
                EmployeesApiService.getEmployeesByLocationId(locationId)
                .then(setEmployees)
                .catch(setError)
            )
            .then(navigate(`/location/${locationId}`))
            .catch(setError)
    }

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                className='page-width'
            >
                <main id='form-page'>
                    <div className='form-wrap'>
                        <h2 className='text-center'>Add a new employee</h2>
                        <Formik
                            initialValues={{ first_name: "", last_name: "", password: "", location: "" }}
                            validationSchema={formSchema}
                            onSubmit={submitForm}
                        >
                            <Form id='add-employee-form'>
                                <div className='field-wrap'>
                                    <label htmlFor='first_name'>First Name</label>
                                    <Field 
                                        type="text" 
                                        name='first_name' 
                                        aria-label='first_name'
                                        className='first_name'
                                        id='first_name' 
                                        required
                                        autoComplete='given-name'
                                    />
                                    <ErrorMessage component="div" className='error' name='first_name' />
                                </div>

                                <div className='field-wrap'>
                                    <label htmlFor='last_name'>Last Name</label>
                                    <Field 
                                        type="text" 
                                        name='last_name' 
                                        aria-label='last_name'
                                        className='last_name'
                                        id='last_name' 
                                        required
                                        autoComplete='surname'
                                    />
                                    <ErrorMessage component="div" className='error' name='last_name' />
                                </div>

                                <div className='field-wrap'>
                                    <label htmlFor='location'>Location</label>
                                    <Field 
                                        as='select'
                                        name='location' 
                                        aria-label='location'
                                        className='location'
                                        id='location' 
                                        required
                                        autoComplete="location"
                                    >
                                        <option value=''>Select an Option</option>
                                        <option value='Green Hills'>Green Hills</option>
                                        <option value='Woussickett'>Woussickett</option>
                                    </Field>
                                    <ErrorMessage component="div" className='error' name='location' />
                                </div>

                                <div className='field-wrap'>
                                    <label htmlFor='password'>Manager Password</label>
                                    <Field 
                                        type="password" 
                                        name='password' 
                                        aria-label='password'
                                        className='password'
                                        id='password' 
                                        required
                                        autoComplete="current-password"
                                    />
                                    <ErrorMessage component="div" className='error' name='password' />
                                </div>

                                <div className='btn-wrap'>
                                    <button className="btn blue" type="submit" disabled={buttonDisabled}>
                                        {buttonState}
                                    </button>
                                </div>
                            </Form>
                        </Formik>

                        {error && <p className='error'>{error}</p>}
                    </div>
                </main>
            </motion.div>
        </>
    );
}