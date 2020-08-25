import React from 'react';
import Burger from "../../burger/burger";
import Button from "../../UI/button/button";

function Checkoutsummary(props) {
    return (
        <div style={{textAlign:'center'}}>
            <h1>Here is your delicious burger!</h1>
            <Burger ingredients={props.ingredients}/>
            <Button class={'cancel'} click={props.cancel}>Cancel</Button>
            <Button class={'continue'} click={props.continue}>Continue</Button>
        </div>
    );
}

export default Checkoutsummary;