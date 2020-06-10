// export const login = (credentials) => dispatch => {
//   console.log(credentials)
//   fetch("http://localhost:8000/login/", {
//       method: 'post',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(credentials)
//   }).
//   then(res => res.json()).
//   then(res =>{
//     console.log(" login",res)
//     dispatch({
//       type: 'LOGIN_PART1',
//       payload: res
//     })
//     return res
//   }).
//   then(res=> fetch(`http://localhost:8000/user/${res.id}`,{
//       method: 'get',
//       headers: {
//         'Authorization':`Bearer ${res.access}`,
//         'Content-Type':'application/json', 
//     },
//     })).
//     then(res =>res.json()).
//     then(res => {
//         console.log('user ',res)
//         dispatch({
//             type: 'LOGIN_PART2',
//             payload: res
//         })

import { Profiler } from "react"

    
//     })

// }

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
      payload: {tokenData,profileData}
    })



  }


  
  
}