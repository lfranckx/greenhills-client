import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-greenhills.png';
import '../styles/Header.scss';

export default function Header(props) {
    const [active, setActive] = useState(false);
    return (
        <>
            <div className='header-wrap page-width'>
                <header>
                    <Link className='logo-link' to='/'>
                        <div className='logo-wrap'>
                            <img className='logo' src={logo} alt='logo' />
                        </div>
                    </Link>

                    <div 
                        className='toggler'
                        onClick={() => {setActive(!active)}}
                    >
                        <div className={`hamburger ${active ? 'active' : ''}`} >
                            <div className='line'></div>
                        </div>
                    </div>
                </header>
            </div>

            <div className={`nav_menu-wrap ${active ? 'active' : ''}`}>
                <nav>
                    <ul className='nav_menu'>
                        <li>
                            <Link to="/" onClick={() => {setActive(!active)}} className='btn green'>Print Tickets</Link>
                        </li>
                        <li>
                            <Link to="/add-employee" onClick={() => {setActive(!active)}} className='btn blue'>Add Employee</Link>
                        </li>
                        <li>
                            <Link to="/edit-employees" onClick={() => {setActive(!active)}} className='btn blue'>Edit Employees</Link>
                        </li>
                        <li>
                            <Link to="/reports" onClick={() => {setActive(!active)}} className='btn orange'>Reports</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={() => {setActive(!active)}} className='btn black'>Sign Out</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}