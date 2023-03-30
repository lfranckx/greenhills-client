import React from 'react';
import { motion } from 'framer-motion';

export default function TicketRows(props) {
    const { ticket } = props;
    let location = "";
    if (ticket.location_id === "1") {
        location = "Green Hills"
    }
    if (ticket.location_id === "2") {
        location = "Woussickett"
    }

    const dateCreated = new Date(ticket.date_created);
    const formattedDate = dateCreated.toLocaleString();

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    return (
        <motion.div
            
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <div className={`row row-${ticket.id}`}>
                <p>{ticket.id}</p>
                <p>{ticket.employee_id}</p>
                <p>{ticket.employee_name}</p>
                <p>{location}</p>
                <p>{formattedDate}</p>
            </div>
        </motion.div>
    )
}