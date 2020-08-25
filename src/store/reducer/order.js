import * as actionType from '../action/actionType'

const initialState={
    orders:[],
    loading:false,
    purchase:false
};
const orderReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return{
                ...state,
                purchase: false
            };
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder={
              ...state.orders,
              id:action.orderId
            };
            return{
                ...state,
                loading: false,
                purchase: true,
                orders: state.orders.concat(newOrder)
            };
        case actionType.PURCHASE_BURGER_FAILED:
            return{
                ...state,
                loading: false
            };
        case actionType.FETCH_ORDER_START:
            return{
              ...state,
              loading: true
            };
        case actionType.FETCH_ORDER_SUCCESS:
            return{
              ...state,
                orders: action.orders,
                loading: false
            };
        case actionType.FETCH_ORDER_FAILED:
            return{
                ...state,
                loading: false
            };
        default:
            return state
    }
};

export default orderReducer