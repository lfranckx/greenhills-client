import React from 'react';
import '../styles/App.scss';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../routes/utils/PrivateRoutes';
import PublicOnlyRoutes from '../routes/utils/PublicOnlyRoutes';
import Header from './Header';
import LoginPage from '../routes/LoginPage';
import Dashboard from '../routes/Dashboard';
import EditEmployeePage from '../routes/EditEmployeePage';
import AddEmployee from '../routes/AddEmployee';
import AddUserPage from '../routes/AddUser';

function App() {
  return (
    <div id='app'>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path='/location/:locationId' element={<Dashboard />} />
          <Route path='/add-user' element={<AddUserPage />} />
          <Route path='/edit-employee' element={<EditEmployeePage />} />
          <Route path='/add-employee' element={<AddEmployee />} />
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
