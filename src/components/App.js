import React from 'react';
import '../styles/App.scss';
import { Routes, Route } from 'react-router-dom';
import PrintTicketsPage from './PrintTicketsPage';
import EditEmployeesPage from './EditEmployeesPage';
import Header from './Header';

function App() {
  return (
    <div id='app'>
      <Header />
      <Routes>
        <Route path='/' element={<PrintTicketsPage />} />
        <Route path='/edit-employees' element={<EditEmployeesPage />} />
      </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
