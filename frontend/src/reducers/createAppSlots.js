const initialState ={
    status: false,
    slots: false
}
  
export default (state=initialState, action) => {
    switch (action.type) {
      case 'CREATE_APP_SLOTS':
        return {
          // ...state,
          // status: action.payload.status
          slots: action.slotsData
          //slots: [[{"id":1,"number":1},{"id":2,"number":2}]]
        }
      default:
        return state
      }
}