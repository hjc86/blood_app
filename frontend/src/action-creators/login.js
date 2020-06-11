
export const login = (credentials) =>{

  return async dispatch =>{

    console.log(credentials)
    const tokenResponse = await fetch("http://localhost:8000/login/", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })


    const tokenData = await tokenResponse.json()
    const profileResponse = await fetch (`http://localhost:8000/user/${tokenData.id}`, {
      method: 'get',
      headers: {
        'Authorization':`Bearer ${tokenData.access}`,
        'Content-Type':'application/json', 
      }
    })
    
    const profileData = await profileResponse.json()


    dispatch({
      type: 'LOGIN',
      payload: {tokenData, profileData}
    })



  }


  
  
}