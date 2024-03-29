import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApplicationContext } from '../context';
import { motion } from 'framer-motion';
import '../styles/MainContent.scss';
import EmployeesListItem from '../components/EmployeesListItem';
import EmployeesApiService from '../services/EmployeesApiService';

export default function PrintTicketsPage(props) {

    let params = useParams();
    const locationId = parseInt(params.locationId);

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }
    
    const { employees, setEmployees, setLocation_id } = useContext(ApplicationContext);
    const [date, setDate ] = useState(new Date());
    const [error, setError] = useState(null);

    useEffect(() => {
        setLocation_id(locationId);
        EmployeesApiService.getEmployeesByLocationId(locationId)
            .then(setEmployees)
            .catch(err => {
                setError({ message: err.message });
            })
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        }
    }, [locationId, setEmployees, setLocation_id]);

    const renderEmployees = () => {
        if (!employees) {
            return (
                <div className='loader'>
                    <div className='spinner'></div>
                </div>
            );
        }

        if (employees.length > 0) {
            // sort employees array by order_number property
            employees.sort((a, b) => a.order_number - b.order_number);
            
            return (
                <ul className='employees-list'>
                    {employees.map((employee, key) => 
                        <EmployeesListItem 
                            key={key}
                            employee={employee}
                        />
                    )}
                </ul>
            );
        }
    }

    return (
        <motion.div 
            className='page-width'
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <main id='print-page'>
                <div className='page-header'>
                    <div className='wrap'>
                        <h2>{locationId === 1 ? "Green Hills - Clyde, OH" :  "Woussickett - Sandusky, OH"}</h2>
                        <h3><span className='date_stamp'>{date.toLocaleDateString()}</span> - <span className='time_stamp'>{date.toLocaleTimeString()}</span></h3>
                    </div>
                    <div className='btn-wrap'>
                        <Link to={`/edit-employees/${locationId}`} className='btn blue'>Edit Employees</Link>
                    </div>
                </div>

                <section className='main-content'>
                    {error ? <h2 className='text-center error'>There was an error: {error.message}</h2> : renderEmployees()}
                </section>

                <div className='bottom'>
                    <div className='btn-wrap'>
                        <Link to={`/reports/${locationId}`} className='btn orange align-right'>Reports</Link>
                    </div>
                </div>
            </main>
        </motion.div>
    );
}