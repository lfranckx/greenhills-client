import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

export default function AddUser(props) {
    useEffect(() => {
        window.scrollTo(0,0);
    });

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [buttonState, handleButtonState] = useState('Submit');
    const [buttonDisabled, handleButtonDisabled] = useState(false);
    const REQEX_UPPER_LOWER_NUMBER = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;

    const location_field = {
        green_hills: "Green Hills",
        woussickett: "Woussickett"
    }

    const addUserFormSchema = Yup.object().shape({
        username: Yup.string().min(3, '* Name is too short').max(20, "* 20 maximum characters").required('* Required'),
        password: Yup.string().min(3, 'Password is too short').max(72, 'Password is too long').matches(REQEX_UPPER_LOWER_NUMBER, 'Password must container at least one uppercase, one lowercase, and one number').required('* Required'),
        location: Yup.string().oneOf(Object.values(location_field), '* Must select one of the valid options').required('* Required')
    });

    const submitForm = (values) => {
        handleButtonState('Sending...');

        let locationValue;
        if (values.location === "Green Hills") {
            locationValue = 1;
        }
        if (values.location === "Woussickett") {
            locationValue = 2;
        }

        const newValues = {
            username: values.username,
            password: values.password,
            location: locationValue
        }

        console.log(newValues);
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
                        <h2 className='text-center'>Add a new user</h2>
                        <Formik
                            initialValues={{ username: "", password: "", location: "" }}
                            validationSchema={addUserFormSchema}
                            onSubmit={submitForm}
                        >
                            <Form id='add-user-form'>
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
                                        type="text" 
                                        name='password' 
                                        aria-label='password'
                                        className='password'
                                        id='password' 
                                        required
                                    />
                                    <ErrorMessage component="div" className='error' name='password' />
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

                                <div className='btn-wrap'>
                                    <button className='btn blue' type='submit' disabled={buttonDisabled}>
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