const initialState ={
  status:false,
  donors:[],
  following:[]

}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_DONOR':
      return {
        ...state,
        donors: action.donors
      }
    case 'FOLLOW_DONOR':
      return {
       
        status: action.status
      }        
    case 'UNFOLLOW_DONOR':
      return {
       
        status: action.status
      }
    case 'FOLLOWING':
      return {
        ...state,
        following: action.following
      }
    default:
      return state
    }
}