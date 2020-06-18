export const followDonor = (id,donor,token) =>{
    return async dispatch =>{
   
        console.log("id--",id)
        console.log("donor--",donor)
        // console.log("token--",token.access)
        console.log("token from storgae --->",localStorage.getItem('access'))
        const addDonorResponse = await fetch(`http://localhost:8000/follow/`, {
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('access')}`,
                'Content-Type':'application/json', 
            },
            body: JSON.stringify({
                follower:id,
                followee:donor
            })
        })

        dispatch({            
            type: 'FOLLOW_DONOR',
            payload: addDonorResponse
        })

        }

}

export const unfollowDonor = (id,donor,token) =>{
    return async dispatch =>{

        const updateResponse = await fetch(`http://localhost:8000/follow/${id}/${donor}`, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('access')}`,
                'Content-Type':'application/json', 
            }
            // body: JSON.stringify(profile)
        })

        const updateStatus = await updateResponse.status
    
        dispatch({            
            type: 'UNFOLLOW_DONOR',
            payload: updateStatus
        })

          
        

        }

}


export const searchDonor = (donor,tokenData) =>{

    console.log("token from storgae --->",localStorage.getItem('access'))

    return async dispatch =>{

        const donorResponse = await fetch(`http://localhost:8000/search/donor/${localStorage.getItem('id')}/${donor}`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('access')}`,
                'Content-Type':'application/json', 
            }
        })

        
        let donors
        if(donorResponse.status===404){
     
           donors = []
        }
        else{
            donors = await donorResponse.json()
        }
        
        console.log("list of donors=============", donors)
    
        
        dispatch({            
            type: 'SEARCH_DONOR',
            donors
        })

        }

}

export const getFollowing = () =>{


    return async dispatch =>{

    
    const followingResponse = await fetch(`http://localhost:8000/follow/${localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${localStorage.getItem('access')}`,
            'Content-Type':'application/json', 
        }
    })

    const following = await followingResponse.json()
    // this.setState({following: following})

    dispatch({            
        type: 'FOLLOWING',
        following
    })

}

}
