import config from '../config';
import TokenService from './TokenService';
import IdleService from './IdleService';

const AuthApiService = {
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    },
    postLogin(credentials) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
        .then(data => {
            /*
                whenever a login is performed:
                1. save the token in local storage
                2. queue auto logout when the user goes idle
                3. queue a call to the refresh endpoint based on the JWT's exp value
            */
           console.log('postLogin() response data...', data);
            window.sessionStorage.setItem('location_id', data.location_id)
            TokenService.saveAuthToken(data.authToken);
            document.addEventListener('DOMContentLoaded', () => {
                IdleService.registerIdleTimerResets();
                TokenService.queueCallbackBeforeExpiry(() => {
                    AuthApiService.postRefreshToken();
                });
            });
            
            return data;
        });
    },
    postRefreshToken() {
        return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
        .then(res => {
            /*
              similar logic to whenever a user logs in, the only differences are:
              - we don't need to queue the idle timers again as the user is already logged in.
              - we'll catch the error here as this refresh is happening behind the scenes
            */
            console.log('postRefreshToken() response data...', res);
            TokenService.saveAuthToken(res.authToken);
            TokenService.queueCallbackBeforeExpiry(() => {
                AuthApiService.postRefreshToken();
            });
            return res;
        })
        .catch(err => {
            this.context.setError(err);
        });
    }
}

export default AuthApiService;