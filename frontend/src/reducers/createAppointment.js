const initialState ={
    status: false,
    appointment: false
}
  
export default (state=initialState, action) => {
    switch (action.type) {
      case 'CREATE_APPOINTMENT':
        return {
          appointment: action.appointment
        }
      default:
        return state
      }
}