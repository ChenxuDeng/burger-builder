import React from 'react';
import Buildcontrol from "./buildcontrol/buildcontrol";
import classes from './buildcontrols.module.css'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
];
function Buildcontrols(props) {
    return (
        <div className={classes.BuildControls}>
            <p><strong>Total Price:{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map((ctrl)=>{
                return <Buildcontrol
                    key={ctrl.label}
                    label={ctrl.label}
                    add={()=>props.add(ctrl.type)}
                    remove={()=>props.remove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            })}
            <button className={classes.OrderButton} disabled={!props.purchase} onClick={props.open}>{props.isAuth?'ORDER NOW':'SIGN IN TO ORDER'}</button>
        </div>
    );
}

export default Buildcontrols;