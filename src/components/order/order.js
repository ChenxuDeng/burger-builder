import React from 'react';
import classes from './order.module.css'

function Order(props) {
    const ingredients=[];
    for(let ingredientsName in props.ingredients){
        ingredients.push({
            name:ingredientsName,
            amount:props.ingredients[ingredientsName]
        })
    }
    const outputIngredients= ingredients.map((ingredients)=>{
        return <span className={classes.ingredients}>
            {ingredients.name}: {ingredients.amount}
        </span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {outputIngredients}</p>
            <p>Price: <strong>USD{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;