import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ApplicationContext } from '../context';
import EmployeesApiService from '../services/EmployeesApiService';
import TicketsApiService from '../services/TicketsApiService';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Printable from '../components/Printable';

export default function PrintTickets(props) {

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const navigate = useNavigate();
    let params = useParams();
    const employeeId = params.employeeId;
    const locationId = window.sessionStorage.getItem('location_id');
    
    const { setLocation_id, setTickets, tickets } = useContext(ApplicationContext);
    
    const [error, setError] = useState(null);
    const [buttonDisabled, handleButtonDisabled] = useState(false);
    const [showField, setShowField] = useState(false);
    const [showFieldBtnText, setShowFieldBtnText] = useState("Add Custom Message")
    const [employee, setEmployee] = useState(null);
    const [numOfTickets, setNumOfTickets] = useState(null);
    const [showPrintable, setShowPrintable] = useState(false);

    useEffect(() => {
        window.scrollTo(0,0);
        setLocation_id(locationId);
        EmployeesApiService.getEmployeeById(employeeId)
            .then(setEmployee)
            .catch(setError);

        if (showPrintable) {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [showPrintable]);

    const formSchema = Yup.object().shape({
        custom_message: Yup.string().max(800, "* Message is too long.")
    });

    const handleShowFieldButton = () => {
        setShowField(!showField);
        setShowFieldBtnText(showField ? 'Add Custom Message' : 'Cancel');
    }

    const submitForm = (values) => {
        handleButtonDisabled(true);
        const ticketsToPrint = {
            custom_message: values.custom_message,
            employee_name: employee.name,
            employee_id: employee.id,
            location_id: parseInt(employee.location_id),
            numOfTickets: numOfTickets
        }

        employee.password = 'Par71';
        employee.score = parseInt(employee.score);
        employee.score += parseInt(numOfTickets);
        
        TicketsApiService.addNewTickets(ticketsToPrint)
        .then(setTickets)
        .then(() => {
            EmployeesApiService.updateEmployee(employee)
            .then(setEmployee)
            .catch(setError)
        })
        .then(handleButtonDisabled(false))
        .then(() => setShowPrintable(true))
        .catch(setError);
    }

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
                            <h2 className='text-center'>Print Tickets for {employee.name}</h2>
                            <h3 className='text-center'>Current Score: {employee.score}</h3>

                            <Formik 
                                initialValues={{ 
                                    custom_message: '',
                                    score: employee?.score || 0
                                }}
                                validationSchema={formSchema}
                                onSubmit={submitForm}
                            >
                                {({values, handleChange}) => (
                                    <Form id='print-tickets-form'>
                                        <div className='form-content-wrap'>
                                            <div className='btn-wrap'>
                                                <button 
                                                    onClick={() => setNumOfTickets(1)} 
                                                    className='btn green' disabled={buttonDisabled} type='submit'
                                                >
                                                        1 Ticket
                                                </button>
                                            </div>

                                            <div className='btn-wrap'>
                                                <button 
                                                    onClick={() => setNumOfTickets(10)} 
                                                    className='btn green large' disabled={buttonDisabled} type='submit'
                                                >
                                                        10 Tickets
                                                </button>
                                            </div>

                                            <>
                                                {showField && <div className='field-wrap'>
                                                <label htmlFor='custom_message'>Custom Message</label>
                                                    <Field 
                                                        as='textarea'
                                                        rows='10'
                                                        name='custom_message'
                                                        aria-label='custom_message'
                                                        className='custom_message'
                                                        id='custom_message'
                                                        placeholder='Write a custom message to print onto the ticket'
                                                        value={values.custom_message}
                                                        onChange={handleChange}
                                                    />
                                                    <ErrorMessage component="div" className='error' name='custom_message' />
                                                </div>}
                                            </>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                            <div className='btn-wrap'>
                                <button className='btn blue' onClick={handleShowFieldButton}>{showFieldBtnText}</button>
                            </div>
                            
                            {error && <p className='error'>{error}</p>}
                        </div>

                        {showPrintable && <div className='printable-wrap'> 
                        {tickets.map((ticket) => (
                            <Printable key={ticket.id} ticket={ticket} location_id={locationId} />
                        ))}
                        </div>}
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