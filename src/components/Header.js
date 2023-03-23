import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context';
import logo from '../images/logo-greenhills.png';
import '../styles/Header.scss';
import TokenService from '../services/TokenService';
import IdleService from '../services/IdleService';

export default function Header(props) {
    useEffect(() => {
        
    }, []);

    const handleLogOut = () => {
        window.sessionStorage.removeItem('location_id');
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        setActive(!active)
    }

    const { location_id, setLocation_id } = useContext(ApplicationContext);
    const [active, setActive] = useState(false);

    console.log('getting location_id inside header compnent...', location_id);

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
                            <Link to={`/location/${location_id}`} onClick={() => {setActive(!active)}} className='btn green'>Print Tickets</Link>
                        </li>
                        <li>
                            <Link to={`/edit-employees/${location_id}`} onClick={() => {setActive(!active)}} className='btn blue'>Edit Employees</Link>
                        </li>
                        <li>
                            <Link to="/add-employee" onClick={() => {setActive(!active)}} className='btn blue'>Add Employee</Link>
                        </li>
                        <li>
                            <Link to="/reports" onClick={() => {setActive(!active)}} className='btn orange'>Reports</Link>
                        </li>
                        <li>
                            <Link to="/add-user" onClick={() => {setActive(!active)}} className='btn blue'>Add New Login</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={handleLogOut} className='btn black'>Sign Out</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}