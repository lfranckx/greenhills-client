import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApplicationContext } from '../context';
import { motion } from 'framer-motion';
import '../styles/MainContent.scss';
import EditEmployeesListItem from '../components/EditEmployeesListItem';
import EmployeesApiService from '../services/EmployeesApiService';


export default function EditEmployeesPage(props) {

    let params = useParams();
    const locationId = parseInt(params.locationId);

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }
    
    const { error, setError, employees, setEmployees, location_id, setLocation_id } = useContext(ApplicationContext);
    const [date, setDate ] = useState(new Date());

    useEffect(() => {
        setLocation_id(locationId);
        EmployeesApiService.getEmployeesByLocationId(locationId)
            .then(setEmployees)
            .catch(setError)
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        }
    }, []);

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
                        <EditEmployeesListItem 
                            key={key}
                            employee={employee}
                        />
                    )}
                </ul>
            )
        }
    }

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={variants}
            className='page-width'
        >
            <main id='print-page'>
                <div className='page-header'>
                    <div className='wrap'>
                    <h2>{locationId === 1 ? "Green Hills - Clyde, OH" :  "Woussickett - Sandusky, OH"}</h2>
                        <h3><span className='date_stamp'>{date.toLocaleDateString()}</span> - <span className='time_stamp'>{date.toLocaleTimeString()}</span></h3>
                    </div>
                    <div className='btn-wrap'>
                        <Link className='btn green' to='/'>Print Tickets</Link>
                    </div>
                </div>

                <section className='main-content'>
                    {error ? <h2>There was an error try again.</h2> : renderEmployees()}
                </section>
            </main>
        </motion.div>
    );
}