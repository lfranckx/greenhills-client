import React from 'react';
import '../styles/App.scss';
import { Routes, Route } from 'react-router-dom';
import PrintTicketsPage from '../routes/PrintTicketsPage';
import EditEmployeesPage from '../routes/EditEmployeesPage';
import AddEmployee from '../routes/AddEmployee';
import Header from './Header';

function App() {
  return (
    <div id='app'>
      <Header />
      <Routes>
        <Route path='/' element={<PrintTicketsPage />} />
        <Route path='/edit-employees' element={<EditEmployeesPage />} />
        <Route path='/add-employee' element={<AddEmployee />} />
      </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
