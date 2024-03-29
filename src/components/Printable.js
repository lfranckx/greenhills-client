import React from 'react';

export default function Printable(props) {
    const { ticket, location_id, } = props;
    let location = "";
    if (parseInt(location_id) === 1) {
        location = "Green Hills";
    }
    if (parseInt(location_id) === 2) {
        location = "Woussickett";
    }

    const dateCreated = new Date(ticket.date_created);
    const formattedDate = dateCreated.toLocaleString();
    
    return (
        <div id='printable' className='ticket text-center'>
            <div className='ticket-code'>
                <h1>{ticket.id}</h1>
            </div>

            <div className='ticket-date-time'>
                {parseInt(location_id) === 1 && <p><span className='large-text'>{location} Golf Course</span> <br/><span className='medium-text'>Hole #7</span></p>}
                {parseInt(location_id) === 2 && <p><span className='large-text'>{location} Golf Course</span> <br/><span className='medium-text'>Hole #12</span></p>}
                <p>{formattedDate}</p>
            </div>

            <div className='default-message text-center'>
                <p className='uppercase'>You can't lose!</p>
                <div className='spacer'></div>
                <p>Keep this ticket to receive your 1st drink free</p>
                <p>(Domestic Beer, Fountain Soda)</p>
                <div className='spacer'></div>
                {parseInt(location_id) === 1 && <p className='uppercase'>Good luck and shoot for the pin on Hole 7!!!</p>}
                {parseInt(location_id) === 2 && <p className='uppercase'>Good luck and shoot for the pin on Hole 12!!!</p>}
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