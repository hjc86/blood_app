export const createAccount = (create) => dispatch => {
    console.log(create)
    fetch("http://localhost:8000/user/", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(create)
    }).
    then(res =>{
      dispatch({
        type: 'CREATE_ACCOUNT',
        payload: res
      })  
    })
}