import React from 'react';
import { Link } from 'react-router-dom';

export default function EditEmployeesListItem(props) {
    const { employee } = props;

    return (
        <>
            <li className='employees-list-item'>
                <div className='flex'>
                    <h3>{employee.name}</h3>
                    <h3>E{employee.id}</h3>
                </div>
                <div className='flex'>
                    <h4>Total Score:</h4>
                    <p>{employee.score}</p>
                </div>
                <div className='btn-wrap'>
                    <Link to={`/edit-employee/${employee.id}`} className='btn blue'>Edit Employee</Link>
                </div>
            </li>
        </>
    );
}