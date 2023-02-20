import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function AddEmployee(props) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [buttonState, handleButtonState] = useState('Submit');
    const [buttonDisabled, handleButtonDisabled] = useState(false);
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{8,}/;

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                className='page-width'
            >
                <main id='add-employee-page'>
                    <div className='form-wrap'>
                        <Formik >
                            <Form id='add_employee-form'>
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
                                    <label htmlFor='email'>Email</label>
                                    <Field 
                                        type="text" 
                                        name='email' 
                                        aria-label='email'
                                        className='email'
                                        id='email' 
                                    />
                                    <ErrorMessage component="div" className='error' name='email' />
                                </div>

                                <div className='field-wrap'>
                                    <label htmlFor='password'>Enter Manager Password</label>
                                    <Field 
                                        type="text" 
                                        name='password' 
                                        aria-label='password'
                                        className='password'
                                        id='password' 
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