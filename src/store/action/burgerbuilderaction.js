import * as actionType from './actionType'
import axios from "axios";

export const addHanler=(ingName)=>{
    return{
        type:actionType.ADD_INGREDIENTS,
        ingredientsName:ingName
    }
};
export const removeHanler=(ingName)=>{
    return{
        type:actionType.REMOVE_INGREDIENTS,
        ingredientsName:ingName
    }
};
export const setIngredients=(ingredients)=>{
    return{
        type:actionType.SET_INGREDIENTS,
        ingredients:ingredients
    }
};
export const getIngredientsFailed=()=>{
    return{
        type:actionType.GET_INGREDIENTS_FAILED
    }
};
export const getIngredients=()=>{
    return (dispatch)=>{
        axios.get('https://creat-burger.firebaseio.com/ingredients.json').then((response)=>{
            dispatch(setIngredients(response.data))
        }).catch((error)=>{
            dispatch(getIngredientsFailed())
        })
    }
};