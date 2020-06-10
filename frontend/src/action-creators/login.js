export const login = (credentials) => dispatch => {
  console.log(credentials)
  fetch("http://localhost:8000/login/", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
  }).
  then(res => res.json()).
  then(res =>{
    console.log(" login",res)
    dispatch({
      type: 'LOGIN_PART1',
      payload: res
    })
    return res
  }).
  then(res=> fetch(`http://localhost:8000/user/${res.id}`,{
      method: 'get',
      headers: {
        'Authorization':`Bearer ${res.access}`,
        'Content-Type':'application/json', 
    },
    })).
    then(res =>res.json()).
    then(res => {
        console.log('user ',res)
        dispatch({
            type: 'LOGIN_PART2',
            payload: res
        })
    
    })

}

// export const login = async (credentials) => dispatch => {
//   console.log(credentials)
//   await fetch("http://localhost:8000/login/", {
//       method: 'post',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(credentials)
//   }).
//   then(res => res.json()).
//   then(res =>{
//     console.log(" login",res)
//     dispatch({
//       type: 'LOGIN',
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
//             type: 'LOGIN',
//             payload: res
//         })
    
//     })

// }