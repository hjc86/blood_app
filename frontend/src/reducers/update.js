export default (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE':
        return {
          update: action.payload
        }
    default:
      return state
    }
  }