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
            'Content-Type': 'application/json',
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
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            return res.json().then(employee => {
                // Add a check for an empty score string and set it to zero if empty
                if (employee.score === '') {
                    employee.score = 0;
                }

                // Split name for first name last name
                const nameArr = employee.name.split(" ");;
                employee.nameArr = nameArr;

                // Set location based on location_id
                if (employee.location_id === "1") {
                    employee.location = "Green Hills";
                }
                if (employee.location_id === "2") {
                    employee.location = "Woussickett";
                }
                return employee;
            });
        });
    },
    updateEmployee(employee) {
        console.log('running updateEmployee()...', `${config.API_ENDPOINT}/employees/${employee.id}`);
        console.log('sending employee data...', employee);
        return fetch(`${config.API_ENDPOINT}/employees/${employee.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(employee)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            return res.json().then(employee =>  {
                console.log('employee update response', employee);
                return employee;
            })
        });
    },
    addNewEmployee(employee) {
        console.log('running addNewEmployee()...', `${config.API_ENDPOINT}/employees`);
        console.log('sending employee data...', employee);

        return fetch(`${config.API_ENDPOINT}/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(employee)
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        );
    },
    deleteEmployee(id) {
        console.log('running deleteEmployee()...', `${config.API_ENDPOINT}/employees/${id}`);

        return fetch(`${config.API_ENDPOINT}/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        );
    }
}

export default EmployeesApiService;