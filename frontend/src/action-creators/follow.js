// export const followDonor = (donor,tokenData) =>{
//     return async dispatch =>{

//         const addDonorResponse = await fetch(`http://localhost:8000/follow/`, {
//             method: 'POST',
//             headers: {
//                 'Authorization':`Bearer ${tokenData.access}`,
//                 'Content-Type':'application/json', 
//             },
//             body: JSON.stringify({
//                 follower:tokenData.id,
//                 follower:donor
//             })
//         })

//         const updateStatus = await updateResponse.status

//         dispatch({            
//             type: 'addDonor',
//             payload: updateStatus
//         })

//         }

// }

// export const unfollowDonor = (donor,tokenData) =>{
//     return async dispatch =>{

//         const updateResponse = await fetch(`http://localhost:8000/user/${tokenData.id}/${donor}`, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization':`Bearer ${tokenData.access}`,
//                 'Content-Type':'application/json', 
//             }
//             // body: JSON.stringify(profile)
//         })

//         const updateStatus = await updateResponse.status
    
//         dispatch({            
//             type: 'removeDonor',
//             payload: updateStatus
//         })

//         }

// }


export const searchDonor = (donor,tokenData) =>{
    return async dispatch =>{

        const donorResponse = await fetch(`http://localhost:8000/search/donor/${donor}`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${tokenData.access}`,
                'Content-Type':'application/json', 
            }
            // body: JSON.stringify(profile)
        })

        // const updateStatus = await updateResponse.status  

        const donors = await donorResponse.json()
        console.log("list of donors=============", donors)
        
        
        dispatch({            
            type: 'SEARCH_DONOR',
            // updateStatus,
            donors


        })

        }

}
