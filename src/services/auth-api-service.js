import config from '../config';

const AuthApiService = {
    postUser(user) {
        console.log('Sending user...', user);
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    },
    postLogin(credentials) {
        console.log('logging in with credentials...', credentials);
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
    }
}

export default AuthApiService;