import * as actionType from '../action/actionType'

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
};

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionType.AUTH_START:
            return{
                ...state,
                loading: true
            };
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                token:action.token,
                userId:action.userId,
                loading: false
            };
        case actionType.AUTH_FAILED:
            return{
                ...state,
                error:action.error,
                loading: false
            };
        case actionType.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userId: null
            };
        case actionType.AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath:action.path
            };
        default:
            return state
    }
};

export default reducer