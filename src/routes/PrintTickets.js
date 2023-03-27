import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ApplicationContext } from '../context';
import EmployeesApiService from '../services/EmployeesApiService';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function PrintTickets(props) {

    const navigate = useNavigate();
    let params = useParams();
    const employeeId = params.employeeId;
    const locationId = window.sessionStorage.getItem('location_id');
    
    const { setLocation_id, setEmployees } = useContext(ApplicationContext);
    
    const [error, setError] = useState(null);
    const [buttonDisabled, handleButtonDisabled] = useState(false);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        window.scrollTo(0,0);
        console.log('employeeId...', employeeId);
        setLocation_id(locationId);
        EmployeesApiService.getEmployeeById(employeeId)
            .then(setEmployee)
            .catch(setError);
    }, []);

    const formSchema = Yup.object().shape({
        custom_message: Yup.string().max(800, "* Message is too long.")
    });

    const submitForm = (values) => {
        console.log('submiting form values...', values);
        handleButtonDisabled(true);
    }

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

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
                        <div className='form-wrap cream'>
                            <h2>Print Tickets for {employee.name}</h2>
                            <h3>Current Score: {employee.score}</h3>

                            <Formik 
                                initialValues={{ 
                                    custom_message: '',
                                    score: employee?.score || 0
                                }}
                                validationSchema={formSchema}
                                onSubmit={submitForm}
                            >
                                <div className='btn-wrap'>
                                    <button onClick={setEmployee(employee.score += 1)} className='btn green' type='submit' disabled={buttonDisabled}>1 Ticket</button>
                                </div>

                                <div className='btn-wrap'>
                                    <button onClick={setEmployee(employee.score += 10)} className='btn green large' type='submit' disabled={buttonDisabled}>10 Tickets</button>
                                </div>

                                <div className='field-wrap'>
                                <label htmlFor='custom_message'>Custom Message</label>
                                    <Field 
                                        as='textarea'
                                        rows='10'
                                        name='custom_message'
                                        aria-label='custom_message'
                                        className='custom_message'
                                        id='custom_message'
                                        placeholder='Write a custom message to print onto the ticket'
                                    />
                                    <ErrorMessage component="div" className='error' name='custom_message' />
                                </div>
                            </Formik>
                            {error && <p className='error'>{error}</p>}
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