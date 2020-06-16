const initialState ={
  status:false,
  donors:["test"]

}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_DONOR':
        return {
          donors: action.donors,
        }    
    default:
      return state
    }
}