export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.payload
      }
    // case 'LOGIN_PART2':
    //   return {
    //     profile: action.payload
    //   }
  default:
    return state
  }
}