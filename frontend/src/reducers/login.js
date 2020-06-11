export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.payload
      }
      
  default:
    return state
  }
}