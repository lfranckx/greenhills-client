import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context';
import { dataObject, dataArray } from '../misc/dummy_data';
import '../styles/MainContent.scss';
import EmployeesListItem from './EditEmployeesListItem';

export default function EditEmployeesPage(props) {
    
    const { error, setError, employees, setEmployees } = useContext(ApplicationContext);
    const [date, setDate ] = useState(new Date());

    useEffect(() => {
        setEmployees(dataArray);
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        }
    }, [])

    console.log(employees);

    const renderEmployees = () => {
        if (!employees) {
            return (
                <div className='loader'>
                    <div className='spinner'></div>
                </div>
            );
        }

        if (employees.length > 0) {
            return (
                <ul className='employees-list'>
                    {employees.map((employee, key) => 
                        <EmployeesListItem 
                            key={key}
                            employee={employee}
                        />
                    )}
                </ul>
            )
        }
        
    }

    return (
        <>
            <div className='page-width'>
                <main id='print-page'>
                    <div className='page-header'>
                        <div className='wrap'>
                            <h2>Green Hills - Clyde, OH</h2>
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
            </div>
        </>
    )
}