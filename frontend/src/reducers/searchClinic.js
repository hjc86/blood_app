const initialState ={
    status:false,
    clinics:[],
}
  
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_CLINIC':
            return {
            ...state,
            clinics: action.clinics
            }
        default:
            return state    
    }
}