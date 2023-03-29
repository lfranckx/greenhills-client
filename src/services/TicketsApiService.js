import config from "../config";
import TokenService from "./TokenService";

const TicketsApiService = {
    getTickets() {
        return fetch(`${config.API_ENDPOINT}/tickets`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()    
        });
    },
    getTicketsByLocationId(location_id) {
        return fetch(`${config.API_ENDPOINT}/tickets/location/${location_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()    
        });
    },
    getTicketById(id) {
        return fetch(`${config.API_ENDPOINT}/tickets/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()    
        });
    },
    getTicketsBySelectedDates(dates, location_id) {
        return fetch(`${config.API_ENDPOINT}/tickets/location/${location_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(dates)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            return res.json();  
        })
        .then(data => {
            return data;
        })
    },
    addNewTickets(tickets) {
        return fetch(`${config.API_ENDPOINT}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(tickets)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            return res.json();  
        });
    },
    deleteTicket(ticketId) {
        return fetch(`${config.API_ENDPOINT}/tickets`, {
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

export default TicketsApiService;