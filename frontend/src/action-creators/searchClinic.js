export const searchClinic = (clinic) =>{

    console.log("token from storgae --->",localStorage.getItem('access'))

    return async dispatch =>{

        const clinicResponse = await fetch(`http://localhost:8000/search/clinic/${clinic}`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('access')}`,
                'Content-Type':'application/json', 
            }
        })

        
        let clinics
        if(clinicResponse.status===404){
     
            clinics = []
        }
        else{
            clinics = await clinicResponse.json()
        }
        
        console.log("list of clinics=============", clinics)
    
        
        dispatch({            
            type: 'SEARCH_CLINIC',
            clinics
        })

        }

}