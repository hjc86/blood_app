export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
    return {
      result: action.payload
    }
  default:
    return state
  }
}