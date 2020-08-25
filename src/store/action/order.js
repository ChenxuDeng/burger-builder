import * as actionType from './actionType'
import axios from "axios";

export const purchaseBurgerSuccess=(id,formData)=>{
    return{
        type:actionType.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:formData
    }
};
export  const purchaseBurgerFailed=(error)=>{
    return{
        type:actionType.PURCHASE_BURGER_FAILED,
        error:error
    }
};
export const purchaseBurgerStart=()=>{
    return{
        type:actionType.PURCHASE_BURGER_START
    }
};
export const purchaseBurger=(orderData,token)=>{
    return (dispatch)=>{
        dispatch(purchaseBurgerStart());
        axios.post('https://creat-burger.firebaseio.com/order1.json?auth='+token,orderData).then((response)=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        }).catch((error)=>{
            dispatch(purchaseBurgerFailed(error))
        })
    }
};
export const purchaseInit=()=>{
    return{
        type:actionType.PURCHASE_INIT
    }
};
export const fetchOrderStart=()=>{
    return{
        type:actionType.FETCH_ORDER_START
    }
};
export const fetchOrderSuccess=(order)=>{
    return{
        type:actionType.FETCH_ORDER_SUCCESS,
        orders:order
    }
};
export const fetchOrderFailed=(error)=>{
    return{
        type:actionType.FETCH_ORDER_FAILED,
        error:error
    }
};
export const fetchOrder=(token,userId)=>{
    return (dispatch)=>{
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://creat-burger.firebaseio.com/order1.json' + queryParams).then((response)=>{
            const order=[];
            for(let key in response.data){
                order.push({
                    ...response.data[key],
                    id:key
                })
            }
            dispatch(fetchOrderSuccess(order))
        }).catch((error)=>{
            dispatch(fetchOrderFailed(error))
        })
    }
};