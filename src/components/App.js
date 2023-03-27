import React from 'react';
import '../styles/App.scss';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../routes/utils/PrivateRoutes';
import PublicOnlyRoutes from '../routes/utils/PublicOnlyRoutes';
import Header from './Header';
import LoginPage from '../routes/LoginPage';
import Dashboard from '../routes/Dashboard';
import DashboardEdit from '../routes/DashboardEdit';
import AddUserPage from '../routes/AddUser';
import AddEmployee from '../routes/AddEmployee';
import EditEmployee from '../routes/EditEmployee';
import PrintTickets from '../routes/PrintTickets';

function App() {
  return (
    <div id='app'>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path='/location/:locationId' element={<Dashboard />} />
          <Route path='/edit-employees/:locationId' element={<DashboardEdit />} />
          <Route path='/add-user/:locationId' element={<AddUserPage />} />
          <Route path='/edit-employee/:employeeId' element={<EditEmployee />} />
          <Route path='/add-employee/:locationId' element={<AddEmployee />} />
          <Route path='/print-tickets/:employeeId' element={<PrintTickets />} />
        </Route>

        <Route element={<PublicOnlyRoutes />} >
          <Route path='/' element={<LoginPage />} />
        </Route>
      </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
