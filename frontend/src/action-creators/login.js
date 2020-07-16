export const login = (credentials) =>{

  return async dispatch =>{

    console.log(credentials)
    const tokenResponse = await fetch("http://localhost:8000/login/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })

    const tokenData = await tokenResponse.json()

    console.log("login token: ",localStorage.getItem('access'))
    if(!localStorage.getItem('access')){
      localStorage.setItem('id',tokenData.id)
      localStorage.setItem('refresh',tokenData.refresh)
      localStorage.setItem('access',tokenData.access)
    }

    const profileResponse = await fetch (`http://localhost:8000/users/${tokenData.id}`, {
      method: 'GET',
      headers: {
        'Authorization':`Bearer ${tokenData.access}`,
        'Content-Type':'application/json', 
      }
    })
    

    const profileData = await profileResponse.json()
  
    dispatch({
      type: 'LOGIN',
      tokenData, 
      profileData,
      tokenResponse

    })



  }


  
  
}