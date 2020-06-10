export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
    return {
      result: action.payload
    }
  default:
    return state
  }
}