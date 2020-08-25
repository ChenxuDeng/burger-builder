import React from 'react';
import classes from './backdrop.module.css'

function Backdrop(props) {
    return (
        props.show?<div className={classes.backdrop} onClick={props.close}></div>:null
    );
}

export default Backdrop;