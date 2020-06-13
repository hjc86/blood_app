export const update = (profile,tokenData) =>{
    return async dispatch =>{

        const updateResponse = await fetch(`http://localhost:8000/user/${tokenData.id}`, {
            method: 'PUT',
            headers: {
                'Authorization':`Bearer ${tokenData.access}`,
                'Content-Type':'application/json', 
            },
            body: JSON.stringify(profile)
        })

        const updateStatus = await updateResponse.status
        //console.log(updateResponse.status)
    
        dispatch({            
            type: 'UPDATE',
            payload: updateStatus
        })

        }

}

