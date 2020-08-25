import React from 'react';
import classes from './burger.module.css'
import Ingredients from '../burger/buildcontrols/ingredients/ingredients'


function Burger(props) {
    let transfromedIngreients=Object.keys(props.ingredients)
        .map((igKey)=>{
            return [...Array(props.ingredients[igKey])].map((_,index)=>{
                return <Ingredients key={igKey+index} type={igKey}/>
            })
        })
        .reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
    if(transfromedIngreients.length===0){
        transfromedIngreients=<p>Please start adding ingredients</p>
    }
    return (
        <div>
            <div className={classes.Burger}>
                <Ingredients type={'bread-top'}/>
                {transfromedIngreients}
                <Ingredients type={'bread-bottom'}/>
            </div>
        </div>

    );
}

export default Burger;