import config from '../config';
import TokenService from './TokenService';
import IdleService from './IdleService';

const AuthApiService = {
    postUser(user) {
        console.log('AuthApiService - Sending new user...', user);
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    },
    postLogin(credentials) {
        console.log('AuthApiService - logging in with credentials...', credentials);
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
        .then(res => {
            /*
                whenever a login is performed:
                1. save the token in local storage
                2. queue auto logout when the user goes idle
                3. queue a call to the refresh endpoint based on the JWT's exp value
            */
           console.log('res from submitting credentials...', res);
           console.log('res.authToken...', res.authToken);
            TokenService.saveAuthToken(res.authToken);
            IdleService.regiserIdleTimerResets();
            TokenService.queueCallbackBeforeExpiry(() => {
                AuthApiService.postRefreshToken();
            });
            return res;
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