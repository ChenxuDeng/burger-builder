import * as actionType from '../action/actionType'

const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false
};
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const burgerbuilderreducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]:state.ingredients[action.ingredientsName]+1
                },
                totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientsName],
                building: true
            };
        case actionType.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]:state.ingredients[action.ingredientsName]-1
                },
                totalPrice: state.totalPrice-INGREDIENT_PRICES[action.ingredientsName],
                building: true
            };
        case actionType.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error:false,
                building:false
            };
        case actionType.GET_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            };
        default:
            return state
    }
};

export default burgerbuilderreducer