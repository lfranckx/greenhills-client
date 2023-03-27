import config from "../config";
import TokenService from "./TokenService";

const TicketsApiService = {
    getTickets() {
        console.log('getting tickets from...', `${config.API_ENDPOINT}/tickets`);
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
        console.log('getting tickets by location id...', `${config.API_ENDPOINT}/tickets/location/${location_id}`);
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
        console.log('getting ticket by ticket id...', `${config.API_ENDPOINT}/tickets/${id}`);
        fetch(`${config.API_ENDPOINT}/tickets/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()    
        });
    },
    addNewTickets(tickets) {
        console.log(`Adding a new ticket...`, tickets);
        console.log(`sending new ticket to...`, `${config.API_ENDPOINT}/tickets`);
        fetch(`${config.API_ENDPOINT}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(tickets)
        })
        .then(res =>
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        );
    },
    deleteTicket(ticketId) {
        console.log('Deleting ticket by id...', `${config.API_ENDPOINT}/tickets/${ticketId}`);
        fetch(`${config.API_ENDPOINT}/tickets`, {
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