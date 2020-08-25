import React from 'react';
import classes from './toolbar.module.css'
import Logo from "../logo/logo";
import Items from "../items/items";
import Menu from "../menu/menu";
import Backdrop from "../../UI/backdrop/backdrop";
import Toggle from "../toggle/toggle";

function Toolbar(props) {
    return (
        <div className={classes.toolbar}>
            <Backdrop show={props.show} close={props.close}/>
            <div><Menu show={props.show}/><Toggle open={props.open} isAuth={props.isAuth}/></div>
            <div><Logo/></div>
            <div className={classes.desktop}><Items isAuth={props.isAuth}/></div>
        </div>
    );
}

export default Toolbar;