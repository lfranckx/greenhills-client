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
        .then(res => 
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        );
    }
}

export default EmployeesApiService;