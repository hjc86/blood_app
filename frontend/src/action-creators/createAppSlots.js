// export const createAppSlots = (clinicId) => dispatch => {
    
//     fetch(`http://localhost:8000/available_appointments/${clinicId}`, {
//         method: 'GET',
//         headers: {
//             'Authorization':`Bearer ${localStorage.getItem('access')}`,
//             'Content-Type':'application/json', 
//         },
//     }).
//     then(res =>{
//       console.log("res-----",res.status)
//       dispatch({
//         type: 'CREATE_ACCOUNT',
//         payload: res
//       })  
//     })
// }


export const createAppSlots = (clinicId) => {
    return async dispatch =>{

        const slots = await fetch(`http://localhost:8000/available_appointments/${clinicId}/${localStorage.getItem('id')}`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('access')}`,
                'Content-Type':'application/json', 
            }
        })

        const slotsData = await slots.json()
        console.log(slotsData)
    
        dispatch({            
            type: 'CREATE_APP_SLOTS',
            slotsData
        })

    }

}

