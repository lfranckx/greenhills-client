import config from '../config';
import TokenService from './TokenService';

const EmployeesApiService = {
    getEmployees() {
        return fetch(`${config.API_ENDPOINT}/employees`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => 
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()    
        );
    },
    getEmployeesByLocationId(location_id) {
        console.log('getting employees by location ID...', location_id);
        return fetch(`${config.API_ENDPOINT}/employees/location/${location_id}`, {
          headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`
          }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            // Add a check for an empty score string and set it to zero if empty
            return res.json().then(data => {
                return data.map(employee => {
                if (employee.score === '') {
                    employee.score = 0;
                }
                return employee;
                });
            });
        });
    },
    getEmployeeById(employeeId) {
        console.log('running getEmployeeById()...', `${config.API_ENDPOINT}/employees/${employeeId}`);

        return fetch(`${config.API_ENDPOINT}/employees/${employeeId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            // Add a check for an empty score string and set it to zero if empty
            return res.json().then(data => {
                return data.map(employee => {
                if (employee.score === '') {
                    employee.score = 0;
                }
                return employee;
                });
            });
        })
    }
}

export default EmployeesApiService;