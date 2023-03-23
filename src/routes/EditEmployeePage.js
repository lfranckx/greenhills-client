import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EmployeesApiService from '../services/EmployeesApiService';

export default function EditEmployeePage(props) {

    useEffect(() => {
        window.scrollTo(0,0);
        console.log('employeeId', employeeId);
        EmployeesApiService.getEmployeeById(employeeId)
            .then(setEmployee)
            .catch(setError)
    }, []);

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    let params = useParams();
    const employeeId = params.employeeId;

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [buttonState, handleButtonState] = useState('Submit');
    const [buttonDisabled, handleButtonDisabled] = useState(false);
    const [employee, setEmployee] = useState(null);

    console.log('employee from state...', employee);

    const location_field = {
        green_hills: "Green Hills",
        woussickett: "Woussickett"
    };

    const formSchema = Yup.object().shape({
        first_name: Yup.string().max(30, "* 30 maximum characters"),
        last_name: Yup.string().max(30, "* 30 maximum characters"),
        location: Yup.string().oneOf(Object.values(location_field), '* Must select one of the valid options').required('* Required')
    });

    const submitForm = (values) => {
        console.log('submitForm values...', values);
        let locationValue;
        if (values.location === "Green Hills") {
            locationValue = 1;
        }
        if (values.location === "Woussickett") {
            locationValue = 2;
        }

        const name = `${values.first_name} ${values.last_name}`;

        const updatedEmployee = {
            name: name,
            score: values.score,
            location_id: locationValue,
            password: values.password
        }

        console.log('submitting updatedEmployee', updatedEmployee);
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
                        <h2 className='text-center'>Edit Employee</h2>
                        <Formik 
                            initialValues={{ id: employeeId, first_name: "", last_name: "", password: "", location: "" }}
                            validationSchema={formSchema}
                            onSubmit={submitForm}
                        >
                            <Form id='edit-employee-form'>
                                <div className='field-wrap'>
                                    <label htmlFor='first_name'>First Name</label>
                                    <Field 
                                        type="text" 
                                        name='first_name' 
                                        aria-label='first_name'
                                        className='first_name'
                                        id='first_name' 
                                        required
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
                    </div>
                </main>
            </motion.div>
        </>
    )
}