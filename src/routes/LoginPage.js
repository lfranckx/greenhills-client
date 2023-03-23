import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../context';
import AuthApiService from '../services/AuthApiService';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function LoginPage(props) {
    useEffect(() => {
        window.scrollTo(0,0);
    });

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const navigate = useNavigate();
    const { setLocation_id } = useContext(ApplicationContext);
    const [error, setError] = useState(null);
    const [buttonState, handleButtonState] = useState('Submit');
    const [buttonDisabled, handleButtonDisabled] = useState(false);
    const REQEX_UPPER_LOWER_NUMBER = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;

    const formSchema = Yup.object().shape({
        username: Yup.string().min(3, '* Name is too short').max(20, "* 20 maximum characters").required('* Required'),
        password: Yup.string().min(3, 'Password is too short').max(72, 'Password is too long').matches(REQEX_UPPER_LOWER_NUMBER, 'Password must container at least one uppercase, one lowercase, and one number').required('* Required'),
    });

    const submitForm = (values) => {
        handleButtonState('Sending...');
        handleButtonDisabled(true);

        AuthApiService.postLogin({ username: values.username, password: values.password })
            .then(res => {
                console.log('response from AuthApiService...', res);
                setLocation_id(res.location_id)
                navigate(`/location/${res.location_id}`);
            })
            .catch(res => {
                setError({ error: res.error });
            });
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
                        <h2 className='text-center'>Login</h2>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            validationSchema={formSchema}
                            onSubmit={submitForm}
                        >
                            <Form id='login-form-page'>
                                <div className='field-wrap'>
                                    <label htmlFor='username'>Username</label>
                                    <Field 
                                        type="text" 
                                        name='username' 
                                        aria-label='username'
                                        className='username'
                                        id='username' 
                                        required
                                    />
                                    <ErrorMessage component="div" className='error' name='username' />
                                </div>

                                <div className='field-wrap'>
                                    <label htmlFor='password'>Password</label>
                                    <Field 
                                        type="password" 
                                        name='password' 
                                        aria-label='password'
                                        className='password'
                                        id='password' 
                                        autoComplete="on"
                                        required
                                    />
                                    <ErrorMessage component="div" className='error' name='password' />
                                </div>

                                <div className='btn-wrap'>
                                    <button className='btn blue' type='submit' disabled={buttonDisabled}>
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