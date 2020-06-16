const initialState ={
  status: false,
  profile:{
    is_clinic:false,
    first_name: null
  },
  token:{}


}

export default (state = initialState, action) => {
  
  
  switch (action.type) {
    case 'LOGIN':
      return {
        // ...state,
        token: action.tokenData,
        profile: action.profileData,
        status: action.tokenResponse.status
      }


      
      
  default:
    return state
  }
}