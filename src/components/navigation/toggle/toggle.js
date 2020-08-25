import React from 'react';
import classes from './toggle.module.css'

function Toggle(props) {
    return (
        <div onClick={props.open} className={classes.DrawerToggle}>
            <div className={classes.burger}></div>
            <div className={classes.burger}></div>
            <div className={classes.burger}></div>
        </div>
    );
}

export default Toggle;