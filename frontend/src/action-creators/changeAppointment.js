export const changeAppointment = (appId,timeSlot) => {
    return async dispatch =>{
        const appointment = await fetch(`http://localhost:8000/appointment/${appId}`, {
            method: 'PUT',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('access')}`,
                'Content-Type':'application/json', 
            },
            body: JSON.stringify({
                    //"donor_id": localStorage.getItem('id'),
                    // "clinic_id": clinicId,
                    "appointment_time": timeSlot,
                    "attended": false
                    })
        })

        const appointmentData = await appointment.json()
        console.log(appointmentData)
    
        dispatch({            
            type: 'CHANGE_APPOINTMENT',
            appointmentData
        })

    }

}
