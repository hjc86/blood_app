export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
    return {
      createAccount: action.payload
    }
  default:
    return state
  }
}