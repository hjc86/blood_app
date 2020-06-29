const initialState ={
  update: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE':
        return {
          update: action.payload
        }
    default:
      return state
    }
  }