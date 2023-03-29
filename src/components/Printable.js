import React, { useEffect } from 'react';

export default function Printable(props) {
    const { ticket, location_id, } = props;
    console.log(location_id);
    let location = "";
    if (parseInt(location_id) === 1) {
        location = "Green Hills";
    }
    if (parseInt(location_id) === 2) {
        location = "Woussickett";
    }
    
    return (
        <div id='printable' className='ticket text-center'>
            <div className='ticket-code'>
                <h1>{ticket.id}</h1>
            </div>

            <div className='ticket-date-time'>
                <p>{location} Golf Course Hole #7</p>
                <p>{ticket.date_created}</p>
            </div>

            <div className='default-message text-center'>
                <p className='uppercase'>You can't lose!</p>
                <div className='spacer'></div>
                <p>Keep this ticket to receive your 1st drink free</p>
                <p>(Non-Premium Draft, Fountain Soda)</p>
                <div className='spacer'></div>
                <p className='uppercase'>Good luck and shoot for the pin on Hole 7!!!</p>
                <div className='spacer'></div>
                <div className='line'></div>
                <div className='spacer'></div>
                <p>-- GRATUITY NOT INCLUDED --</p>
                <p>-- REMEMBER TO TIP YOUR SERVER --</p>
            </div>
            
            <div className='custom-message'>
                <p>{ticket.custom_message}</p>
            </div>
        </div>
    );
}