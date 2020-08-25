import React from 'react';
import classes from './ordersummary.module.css'
import Button from "../../UI/button/button";

function Ordersummary(props) {
    let ingredients=Object.keys(props.ingredients).map((igKey)=>{
        return <li>{igKey}:{props.ingredients[igKey]}</li>
    });
    return (
        <div className={classes.ingredients}>
            <h3>Here is your burger:</h3>
            <ul className={classes.ingredients}>
                {ingredients}
            </ul>
            <h3>Total Price</h3>
            <p>{props.price.toFixed(2)}</p>
            <div className={classes.buttons}>
                <Button class={"continue"} click={props.post}>Continue</Button>
                <Button class={"cancel"} click={props.close}>Cancel</Button>
            </div>

        </div>
    );
}

export default Ordersummary;