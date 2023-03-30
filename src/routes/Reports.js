import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ApplicationContext } from '../context';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TicketRows from '../components/TicketRows';
import TicketsApiService from '../services/TicketsApiService';

export default function Reports(props) {
    let params = useParams();
    const locationId = parseInt(params.locationId);

    const { setLocation_id } = useContext(ApplicationContext);
    const [date, setDate ] = useState(new Date());
    const [error, setError] = useState(null);
    const [tickets, setTickets] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setLocation_id(locationId);

        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        }
    }, []);

    const submitForm = (values) => {
        TicketsApiService.getTicketsBySelectedDates(values, locationId)
        .then(setTickets)
        .catch(setError);
    }

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    const renderReport = () => {
        if (!tickets && showLoader) {
            return (
                <div className='loader'>
                    <div className='spinner'></div>
                </div>
            );
        }
        if (tickets) {
            return (
                <div className='reports-window'>
                    <div className='table-header'><h2>Total Tickets: {tickets.length}</h2></div>
                    <div className='row row-1'>
                        <p>Ticket ID</p>
                        <p>Employee #</p>
                        <p>Employee Name</p>
                        <p>Location</p>
                        <p>Date</p>
                    </div>
                    {tickets.map((ticket) => {
                        return <TicketRows key={ticket.id} ticket={ticket} />
                    })}
                    
                </div>
            );
        }
    }

    return (
        <>
            <motion.div
                className='page-width'
                initial="hidden"
                animate="visible"
                variants={variants}
            >
                <main id='reports-page'>
                    <div className='page-header'>
                        <div className='wrap'>
                            <h2>{locationId === 1 ? "Green Hills - Clyde, OH" :  "Woussickett - Sandusky, OH"}</h2>
                            <h3><span className='date_stamp'>{date.toLocaleDateString()}</span> - <span className='time_stamp'>{date.toLocaleTimeString()}</span></h3>

                            <div className='form-wrap'>
                                <Formik
                                    initialValues={{ from_date: "", to_date: "" }}
                                    validationSchema={Yup.object().shape({ 
                                        from_date: Yup.date().required('* Selecting a starting date is required'), 
                                        to_date: Yup.date().required('* Selecting an ending date is required') })}
                                    onSubmit={submitForm}
                                >
                                    <Form id='reports-form'>
                                        <div className='content-wrap'>
                                            <h3>Select Dates</h3>
                                            <div className='flex'>
                                                <div className='field-wrap'>
                                                    <label htmlFor='from_date'>From:</label>
                                                    <Field 
                                                        type="date"
                                                        name="from_date"
                                                        aria-label='from_date'
                                                        className='from_date'
                                                        id='from_date' 
                                                    />
                                                    <ErrorMessage component="div" className='error' name='from_date' />
                                                </div>

                                                <div className='field-wrap'>
                                                    <label htmlFor='to_date'>To:</label>
                                                    <Field 
                                                        type="date"
                                                        name="to_date"
                                                        aria-label='to_date'
                                                        className='to_date'
                                                        id='to_date' 
                                                    />
                                                    <ErrorMessage component="div" className='error' name='to_date' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='btn-wrap'>
                                            <button className='btn orange' type='submit'>Run Report</button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>

                    <section className='main-content'>
                        {error ? <h2>There was an error. Try again.</h2> : renderReport()}
                    </section>
                </main>
            </motion.div>
        </>
    );
}