import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EmployeesApiService from '../services/EmployeesApiService';
import { ApplicationContext } from '../context';

export default function EditEmployeePage(props) {

    let params = useParams();
    const employeeId = params.employeeId;
    const locationId = window.sessionStorage.getItem('location_id');

    const navigate = useNavigate();
    const { setLocation_id, setEmployees } = useContext(ApplicationContext);
    const [error, setError] = useState(null);
    const [buttonState, handleButtonState] = useState('Submit');
    const [buttonDisabled, handleButtonDisabled] = useState(false);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        window.scrollTo(0,0);
        console.log('employeeId', employeeId);
        setLocation_id(locationId);
        EmployeesApiService.getEmployeeById(employeeId)
            .then(setEmployee)
            .catch(setError);
    }, []);

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const location_field = {
        green_hills: "Green Hills",
        woussickett: "Woussickett"
    };
    const REQEX_UPPER_LOWER_NUMBER = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;

    const formSchema = Yup.object().shape({
        order_number: Yup.number().integer("* Employee Order Number must be an integer").positive(" * Employee Order Number must be a positive number").required('* Required'),
        first_name: Yup.string().max(30, "* 30 maximum characters").required('* Required'),
        last_name: Yup.string().max(30, "* 30 maximum characters").required('* Required'),
        score: Yup.number().integer("* Score must be a number").required('* Required'),
        location: Yup.string().oneOf(Object.values(location_field), '* Must select one of the valid options').required('* Required'),
        password: Yup.string().min(3, 'Password is too short').max(72, 'Password is too long').matches(REQEX_UPPER_LOWER_NUMBER, 'Password must container at least one uppercase, one lowercase, and one number').required('* Required')
    });

    const submitForm = (values) => {
        console.log('submitForm values...', values);
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

        const updatedEmployee = {
            id: employee.id,
            order_number: values.order_number,
            name: name,
            score: values.score,
            location_id: locationValue,
            password: values.password
        }

        console.log('submitting updatedEmployee', updatedEmployee);
        EmployeesApiService.updateEmployee(updatedEmployee)
            .then(res => {
                console.log('response from server...', res);
                EmployeesApiService.getEmployeeById(employeeId)
                    .then(setEmployee)
                    .then(navigate(`/location/${employee.location_id}`))
                    .catch(setError);
            })
    }

    const handleDeleteEmployee = () => {
        EmployeesApiService.deleteEmployee(employee.id)
            .then(
                EmployeesApiService.getEmployeesByLocationId(locationId)
                    .then(setEmployees)
                    .catch(setError)
            )
            .then(navigate(`/location/${locationId}`))
            .catch(setError)
    }

    console.log('employee from state...', employee);

    if (employee) {
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
                                initialValues={{ 
                                    order_number: employee?.order_number || '', 
                                    first_name: employee?.nameArr[0] || '', 
                                    last_name: employee?.nameArr[1] || '', 
                                    score: employee?.score || 0,
                                    location: employee?.location || '',
                                    password: ""
                                }}
                                validationSchema={formSchema}
                                onSubmit={submitForm}
                            >
                                {({ values, handleChange }) => (
                                    <Form id='edit-employee-form'>
                                        <div className='field-wrap'>
                                            <label htmlFor='id'>Employee Order Number</label>
                                            <Field 
                                                type="number" 
                                                name='order_number' 
                                                aria-label='order_number'
                                                className='order_number'
                                                id='order_number' 
                                                autoComplete="order_number"
                                                value={values.order_number}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component="div" className='error' name='order_number' />
                                        </div>

                                        <div className='field-wrap'>
                                            <label htmlFor='first_name'>First Name</label>
                                            <Field 
                                                type="text" 
                                                name='first_name' 
                                                aria-label='first_name'
                                                className='first_name'
                                                id='first_name' 
                                                autoComplete="given-name"
                                                value={values.first_name}
                                                onChange={handleChange}
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
                                                autoComplete="surname"
                                                value={values.last_name}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component="div" className='error' name='last_name' />
                                        </div>

                                        <div className='field-wrap'>
                                            <label htmlFor='score'>Score</label>
                                            <Field 
                                                type="number" 
                                                name='score' 
                                                aria-label='score'
                                                className='score'
                                                id='score' 
                                                autoComplete="score"
                                                value={values.score}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component="div" className='error' name='score' />
                                        </div>

                                        <div className='field-wrap'>
                                            <label htmlFor='location'>Location</label>
                                            <Field 
                                                as='select'
                                                name='location' 
                                                aria-label='location'
                                                className='location'
                                                id='location' 
                                                autoComplete="location"
                                                value={values.location}
                                                onChange={handleChange}
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
                                                autoComplete="current-password"
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage component="div" className='error' name='password' />
                                        </div>

                                        <div className='btn-wrap'>
                                            <button className="btn blue" type="submit" disabled={buttonDisabled}>
                                                {buttonState}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            
                            {error && <p className='error'>{error}</p>}
                        </div>


                        <div className='btn-wrap delete--btn-wrap'>
                            <Link onClick={handleDeleteEmployee} to={`/location/${locationId}`} className="btn black">Delete Employee</Link>
                        </div>
                    </main>
                </motion.div>
            </>
        );
    }
    return (
        <div className='loader'>
            <div className='spinner'></div>
        </div>
    );
}