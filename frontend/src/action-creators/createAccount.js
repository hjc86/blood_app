export const createAccount = (create) => dispatch => {
    console.log(create)
    fetch("http://localhost:8000/users/", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(create)
    }).
    then(res =>{
      console.log("res-----",res.status)
      dispatch({
        type: 'CREATE_APP_SLOTS',
        payload: res
      })  
    })
}


