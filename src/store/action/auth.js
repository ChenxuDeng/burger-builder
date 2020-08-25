import * as actionType from './actionType'
import axios from 'axios'

export const authStart=()=>{
    return{
        type:actionType.AUTH_START
    }
};

export const authSuccess=(token,userId)=>{
    return{
        type:actionType.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
};

export const authFailed=(error)=>{
    return{
        type:actionType.AUTH_FAILED,
        error:error
    }
};

export const logout=()=>{
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return{
        type:actionType.AUTH_LOGOUT
    }
};

export const authCheckLogout=(expireTime)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(logout())
        },expireTime * 1000)
    }
};

export const auth=(email,password,isSignUp)=>{
    return (dispatch)=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN-tsoji2NFKt1jB1PDLOx6SG9JKY6Omg';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN-tsoji2NFKt1jB1PDLOx6SG9JKY6Omg'
        }
        axios.post(url,authData).then((response)=>{
            console.log(response);
            localStorage.setItem('userId',response.data.localId);
            localStorage.setItem('token',response.data.idToken);
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(authCheckLogout(response.data.expiresIn))
        }).catch((error)=>{
            console.log(error);
            dispatch(authFailed(error.response.data.error))
        })
    }
};

export const authRedirectPath=(path)=>{
    return{
        type:actionType.AUTH_REDIRECT_PATH,
        path:path
    }
};

export const checkAuthState=()=>{
    return (dispatch)=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }else {
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<=new Date()){
                dispatch(logout())
            }else {
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(authCheckLogout((expirationDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
};