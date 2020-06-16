export const createAccount = (create) => dispatch => {
    console.log(create)
    fetch("http://localhost:8000/user/", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(create)
    }).
    then(res =>{
      console.log("res-----",res.status)
      dispatch({
        type: 'CREATE_ACCOUNT',
        payload: res
      })  
    })
}