const initialState ={
  status: false
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
      return {
        // ...state,
        status: action.payload.status
        
      }
    default:
      return state
    }
}