import React, { useContext } from 'react';

export default function PrintWindow(props) {
    const { employee_name, custom_message, ticket, location_id, date } = props;
    let location = "";
    if (location_id === 1) {
        location = "Green Hills";
    }
    if (location_id === 2) {
        location = "Woussickett";
    }

    return (
        <main id='print-page'>
            <div className='ticket'>
                <div className='ticket-code'>
                    <h1>{ticket.id}</h1>
                </div>

                <div className='ticket-date-time'>
                    <p>{location} GC Hole #7</p>
                    <p>{date}</p>
                </div>

                <div className='default-message text-center'>
                    <p>YOU CAN'T LOSE!</p>
                    <div className='spacer'></div>
                    <p>KEEP THIS TICKET TO RECEIVE YOUR 1ST DRINK AFTER YOUR ROUND FOR FREE</p>
                    <p>(NON-PREMIUM DRAFT, FOUNTAIN SODA)</p>
                    <div className='spacer'></div>
                    <p>GOOD LUCK AND SHOOT FOR THE PIN ON HOLE 7!!!</p>
                    <div className='spacer'></div>
                    <div className='line'></div>
                    <div className='spacer'></div>
                    <p>-- GRATUITY NOT INCLUDED --</p>
                    <p>-- REMEMBER TO TIP YOUR SERVER --</p>
                </div>
                
                <div className='custom-message'>
                    <p>{custom_message}</p>
                </div>

                
            </div>
        </main>
    );
}