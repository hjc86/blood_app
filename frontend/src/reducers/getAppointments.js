const initialState ={
    status: false,
    appointments: false
}
  
export default (state=initialState, action) => {
    switch (action.type) {
      case 'GET_APPOINTMENTS':
        return {
          appointments: action.appointment
        }
      default:
        return state
      }
}