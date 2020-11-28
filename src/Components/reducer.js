export const initialState = {
    user: null,
    // user_det: null,
};



function reducer(state, action) {
    console.log(action);

    switch (action.type) {

        case "SET_USER":
            console.log(state.user)
            return {
                user: action.item,
            }
        // case "SET_USER_DET":
        //     return{
        //         user_det: action.item,
        //     }
        case "REM_USER":
            return{
                user: null,
                // user_det: null,
            }
        default:
            
            return state;
    }
}

export default reducer;
// 